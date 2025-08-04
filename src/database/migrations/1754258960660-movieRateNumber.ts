import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieRateNumber1754258960660 implements MigrationInterface {
    name = 'MovieRateNumber1754258960660'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_rates\` DROP COLUMN \`rate\``);
        await queryRunner.query(`ALTER TABLE \`movie_rates\` ADD \`rate\` decimal(2,1) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_rates\` DROP COLUMN \`rate\``);
        await queryRunner.query(`ALTER TABLE \`movie_rates\` ADD \`rate\` int NOT NULL`);
    }

}
