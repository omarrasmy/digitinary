import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieRateComments1754258126821 implements MigrationInterface {
    name = 'MovieRateComments1754258126821'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_rates\` ADD \`comment\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_rates\` DROP COLUMN \`comment\``);
    }

}
