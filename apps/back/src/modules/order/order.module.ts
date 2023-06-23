import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComboEntity } from '../combo/combo.entity';
import { ComboService } from '../combo/combo.service';
import { DishEntity } from '../dish/dish.entity';
import { DishService } from '../dish/dish.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';
import { OrderDetailEntity } from './order-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, OrderDetailEntity, ComboEntity, DishEntity])],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService, ComboService, DishService],
})
export class OrderModule {}
