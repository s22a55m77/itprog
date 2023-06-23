import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1687497971324 implements MigrationInterface {
    name = 'Migrations1687497971324'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`dishes\` CHANGE \`description\` \`description\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`change\` \`change\` float NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` CHANGE \`change\` \`change\` float NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`dishes\` CHANGE \`description\` \`description\` varchar(255) NOT NULL`);
    }

}
