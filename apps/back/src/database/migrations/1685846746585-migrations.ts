import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1685846746585 implements MigrationInterface {
  name = 'Migrations1685846746585';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`dishes\` DROP FOREIGN KEY \`FK_dishes_categoryId_categories_id\``,
    );
    await queryRunner.query(`DROP INDEX \`REL_078dfd20b43f0efe2b4e5fc520\` ON \`dishes\``);
    await queryRunner.query(
      `ALTER TABLE \`dishes\` ADD CONSTRAINT \`FK_dishes_categoryId_categories_id\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`dishes\` DROP FOREIGN KEY \`FK_dishes_categoryId_categories_id\``,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`REL_078dfd20b43f0efe2b4e5fc520\` ON \`dishes\` (\`category_id\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`dishes\` ADD CONSTRAINT \`FK_dishes_categoryId_categories_id\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
