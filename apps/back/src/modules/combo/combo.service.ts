import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ComboEntity } from './combo.entity';

@Injectable()
export class ComboService {
  constructor(@InjectRepository(ComboEntity) comboRepository: Repository<ComboEntity>) {}
}
