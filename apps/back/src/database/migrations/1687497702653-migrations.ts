import type { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1687497702653 implements MigrationInterface {
  name = 'Migrations1687497702653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`order-details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`order_number\` varchar(255) NOT NULL, \`dish_id\` int NOT NULL, \`quantity\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`dishes\` (\`id\` int NOT NULL AUTO_INCREMENT, \`category_id\` int NOT NULL, \`name\` varchar(255) NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` float NOT NULL, \`image\` longblob NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`combos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`dish_id\` int NOT NULL, \`discount\` float NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`orders\` (\`order_number\` varchar(255) NOT NULL, \`user_id\` int NOT NULL, \`status\` enum ('PENDING_PAYMENT', 'COMPLETED', 'CANCELLED') NOT NULL DEFAULT 'PENDING_PAYMENT', \`price\` float NOT NULL, \`change\` float NOT NULL, \`combo_id\` int NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`completed_at\` datetime NULL, PRIMARY KEY (\`order_number\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`role\` enum ('USER', 'ADMIN') NOT NULL DEFAULT 'USER', \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order-details\` ADD CONSTRAINT \`FK_orderDetails_orderNumber_orders_orderNumber\` FOREIGN KEY (\`order_number\`) REFERENCES \`orders\`(\`order_number\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`order-details\` ADD CONSTRAINT \`FK_orderDetails_dishId_dishes_id\` FOREIGN KEY (\`dish_id\`) REFERENCES \`dishes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`dishes\` ADD CONSTRAINT \`FK_dishes_categoryId_categories_id\` FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`combos\` ADD CONSTRAINT \`FK_combos_dishId_dishes_id\` FOREIGN KEY (\`dish_id\`) REFERENCES \`dishes\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_orders_userId_users_id\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_orders_comboId_combos_id\` FOREIGN KEY (\`combo_id\`) REFERENCES \`combos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_orders_comboId_combos_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_orders_userId_users_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`combos\` DROP FOREIGN KEY \`FK_combos_dishId_dishes_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`dishes\` DROP FOREIGN KEY \`FK_dishes_categoryId_categories_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order-details\` DROP FOREIGN KEY \`FK_orderDetails_dishId_dishes_id\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`order-details\` DROP FOREIGN KEY \`FK_orderDetails_orderNumber_orders_orderNumber\``,
    );
    await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
    await queryRunner.query(`DROP TABLE \`users\``);
    await queryRunner.query(`DROP TABLE \`orders\``);
    await queryRunner.query(`DROP TABLE \`combos\``);
    await queryRunner.query(`DROP TABLE \`dishes\``);
    await queryRunner.query(`DROP TABLE \`order-details\``);
    await queryRunner.query(`DROP TABLE \`categories\``);
  }
}
