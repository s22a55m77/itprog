import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1686038687606 implements MigrationInterface {
  name = 'Migrations1686038687606';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dishes\` ADD \`description\` varchar(255) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dishes\` DROP COLUMN \`description\``);
  }
}
