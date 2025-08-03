import { MigrationInterface, QueryRunner } from "typeorm";

export class Salt1754222690881 implements MigrationInterface {
    name = 'Salt1754222690881'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`salt\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`salt\``);
    }

}
