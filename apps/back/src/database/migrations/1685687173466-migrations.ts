import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1685687173466 implements MigrationInterface {
  name = 'Migrations1685687173466';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`combos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`dish_id\` int NOT NULL, \`discount\` float NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`dishes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`category_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`image\` blob NULL, UNIQUE INDEX \`REL_078dfd20b43f0efe2b4e5fc520\` (\`category_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order_number\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, \`dish_id\` int NOT NULL, \`quantity\` int NOT NULL, \`status\` enum ('PENDING_PAYMENT', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING_PAYMENT', \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, \`completed_at\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`combos\` ADD CONSTRAINT \`FK_combos_dishId_dishes_id\` FOREIGN KEY (\`dish_id\`) REFERENCES \`dishes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`dishes\` ADD CONSTRAINT \`FK_dishes_categoryId_categories_id\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_orders_userId_users_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_orders_dishId_dishes_id\` FOREIGN KEY (\`dish_id\`) REFERENCES \`dishes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_orders_dishId_dishes_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_orders_userId_users_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`dishes\` DROP FOREIGN KEY \`FK_dishes_categoryId_categories_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`combos\` DROP FOREIGN KEY \`FK_combos_dishId_dishes_id\``,
    );
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP INDEX \`REL_078dfd20b43f0efe2b4e5fc520\` ON \`dishes\``);
    await queryRunner.query(`DROP TABLE \`dishes\``);
    await queryRunner.query(`DROP TABLE \`combos\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
