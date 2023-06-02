import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ComboEntity } from './combo.entity';
import { ComboService } from './combo.service';

@Module({
  imports: [TypeOrmModule.forFeature([ComboEntity])],
  exports: [ComboService],
  providers: [ComboService],
})
export class ComboModule {}
