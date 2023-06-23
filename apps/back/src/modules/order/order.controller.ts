import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Builder } from 'builder-pattern';

import { ResponseVo } from '../../common/vo/response.vo';
import { RoleType } from '../../constants';
import { ApiResponse, Auth, AuthUser } from '../../decorators';
import { ComboService } from '../combo/combo.service';
import { UserEntity } from '../user/user.entity';
import { AddOrderDto } from './dto/add-order.dto';
import { AddPaymentDto } from './dto/add-payment.dto';
import type { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import type { OrderDetailEntity } from './order-detail.entity';
import { OrderVo } from './vo/order.vo';

@Controller('order')
@ApiTags('Order')
export class OrderController {
  constructor(private orderService: OrderService, private comboService: ComboService) {}

  @ApiOperation({
    summary: 'add order',
  })
  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.CREATED,
  })
  @Auth([RoleType.USER])
  @Post()
  async addOrder(@AuthUser() user: UserEntity, @Body() addOrderDto: AddOrderDto) {
    const orderNumber: string = Date.now().toString();
    const dishIds: number[] = [];

    const orderDetailEntities: OrderDetailEntity[] = await Promise.all(
      addOrderDto.dishes.map((dish) => {
        dishIds.push(dish.id);

        return Builder<OrderDetailEntity>()
          .dishId(dish.id)
          .quantity(dish.quantity)
          .orderNumber(orderNumber)
          .build();
      }),
    );

    const price = await this.orderService.getPriceByOrderDetail(orderDetailEntities);
    const combo = await this.comboService.getComboByDishes(dishIds);

    const orderEntity: OrderEntity = Builder<OrderEntity>()
      .orderNumber(orderNumber)
      .userId(user.id)
      .orderDetail(orderDetailEntities)
      .price(price)
      .comboId(combo?.id)
      .build();

    const insertedOrderEntity: OrderEntity = await this.orderService.addOrder(orderEntity);

    // Process Entity to Vo
    const orderVo: OrderVo = OrderVo.fromEntity(insertedOrderEntity, combo?.name);

    return ResponseVo.Success(orderVo);
  }

  @ApiOperation({
    summary: 'Add the payment',
  })
  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER])
  @Post('/:orderNumber')
  async addPayment(
    @AuthUser() user: UserEntity,
    @Param('orderNumber') orderNumber: string,
    @Body() addPaymentDto: AddPaymentDto,
  ): Promise<ResponseVo<OrderVo>> {
    const order: OrderEntity | null = await this.orderService.getOrderByOrderNumber(orderNumber);

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.userId !== user.id) {
      throw new ForbiddenException('You are not the owner of this order');
    }

    if (addPaymentDto.amount < order.price) {
      throw new BadRequestException('The amount is not enough');
    }

    try {
      await this.orderService.addPayment(orderNumber, order.price - addPaymentDto.amount);
    } catch {
      throw new InternalServerErrorException('Unknown Error, please contact the admin');
    }

    const updatedOrder: OrderEntity | null = await this.orderService.getOrderByOrderNumber(
      orderNumber,
    );

    if (!updatedOrder) {
      throw new InternalServerErrorException('Unknown Error, please contact the admin');
    }

    const comboName = await this.orderService.getComboNameByOrderNumber(orderNumber);

    const orderVo = OrderVo.fromEntity(updatedOrder, comboName);

    return ResponseVo.Success(orderVo);
  }

  @Get('/:orderNumber')
  @ApiOperation({
    summary: 'Get the order detail',
  })
  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER])
  async getOrder(
    @AuthUser() user: UserEntity,
    @Param('orderNumber') orderNumber: string,
  ): Promise<ResponseVo<OrderVo>> {
    const order: OrderEntity | null = await this.orderService.getOrderByOrderNumber(orderNumber);

    if (!order) {
      throw new NotFoundException('No such order');
    }

    if (order.userId !== user.id) {
      throw new ForbiddenException('You are not the owner of this order');
    }

    const comboName = await this.orderService.getComboNameByOrderNumber(orderNumber);

    const orderVo = OrderVo.fromEntity(order, comboName);

    return ResponseVo.Success(orderVo);
  }

  @ApiOperation({
    summary: 'Cancel the order',
  })
  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.OK,
  })
  @HttpCode(HttpStatus.OK)
  @Auth([RoleType.USER])
  @Post('/:orderNumber/cancel')
  async cancelOrder(@AuthUser() user: UserEntity, @Param('orderNumber') orderNumber: string) {
    const order: OrderEntity | null = await this.orderService.getOrderByOrderNumber(orderNumber);

    if (!order) {
      throw new NotFoundException('No such order');
    }

    if (order.userId !== user.id) {
      throw new ForbiddenException('You are not the owner of this order');
    }

    try {
      await this.orderService.markCancelled(orderNumber);
    } catch {
      throw new InternalServerErrorException('Unknown Error, please contact the admin');
    }

    const updatedOrder: OrderEntity | null = await this.orderService.getOrderByOrderNumber(
      orderNumber,
    );

    if (!updatedOrder) {
      throw new InternalServerErrorException('Unknown Error, please contact the admin');
    }

    const comboName = await this.orderService.getComboNameByOrderNumber(orderNumber);

    const orderVo = OrderVo.fromEntity(updatedOrder, comboName);

    return ResponseVo.Success(orderVo);
  }

  @ApiOperation({
    summary: 'Get All Orders of User',
  })
  @ApiResponse({
    type: OrderVo,
    httpStatus: HttpStatus.OK,
    options: {
      isArray: true,
    },
  })
  @Get()
  @Auth([RoleType.USER])
  async getOrderByUserId(@AuthUser() user: UserEntity): Promise<ResponseVo<OrderVo[]>> {
    // the result may contains different orders
    const orderEntities: OrderEntity[] = await this.orderService.getOrderByUserId(user.id);

    const orderVoArr = await Promise.all(
      orderEntities.map(async (order) => {
        const comboName = await this.orderService.getComboNameByOrderNumber(order.orderNumber);

        return OrderVo.fromEntity(order, comboName);
      }),
    );

    return ResponseVo.Success(orderVoArr);
  }
}
