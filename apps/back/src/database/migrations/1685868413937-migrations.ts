import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1685868413937 implements MigrationInterface {
  name = 'Migrations1685868413937';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dishes\` DROP COLUMN \`image\``);
    await queryRunner.query(`ALTER TABLE \`dishes\` ADD \`image\` longblob NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`dishes\` DROP COLUMN \`image\``);
    await queryRunner.query(`ALTER TABLE \`dishes\` ADD \`image\` blob NULL`);
  }
}
