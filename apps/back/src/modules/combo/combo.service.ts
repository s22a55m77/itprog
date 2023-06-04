import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ComboEntity } from './combo.entity';

@Injectable()
export class ComboService {
  constructor(@InjectRepository(ComboEntity) private comboRepository: Repository<ComboEntity>) {}

  getComboByDishes(dishIds: number[]): Promise<ComboEntity | null> {
    const qb = this.comboRepository.createQueryBuilder();

    qb.select().where('dish_id IN (:...dishIds)', { dishIds });

    qb.andWhere(
      'name = ' +
        qb
          .subQuery()
          .select('c.name')
          .from(ComboEntity, 'c')
          .where('c.dish_id IN (:...dishIds)', { dishIds })
          .groupBy('c.name')
          .having(`COUNT(DISTINCT dish_id) = ${dishIds.length}`)
          .getQuery(),
    );

    return qb.getOne();
  }
}
