import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComboEntity } from '../combo/combo.entity';
import { ComboService } from '../combo/combo.service';
import { OrderController } from './order.controller';
import { OrderEntity } from './order.entity';
import { OrderService } from './order.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ComboEntity])],
  exports: [OrderService],
  controllers: [OrderController],
  providers: [OrderService, ComboService],
})
export class OrderModule {}
