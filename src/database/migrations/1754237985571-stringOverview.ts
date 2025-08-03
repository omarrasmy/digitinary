import { MigrationInterface, QueryRunner } from "typeorm";

export class StringOverview1754237985571 implements MigrationInterface {
    name = 'StringOverview1754237985571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movies\` DROP COLUMN \`overview\``);
        await queryRunner.query(`ALTER TABLE \`movies\` ADD \`overview\` varchar(5000) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movies\` DROP COLUMN \`overview\``);
        await queryRunner.query(`ALTER TABLE \`movies\` ADD \`overview\` varchar(255) NOT NULL`);
    }

}
