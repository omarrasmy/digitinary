import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieRateComments1754258150901 implements MigrationInterface {
    name = 'MovieRateComments1754258150901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_rates\` CHANGE \`comment\` \`comment\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_rates\` CHANGE \`comment\` \`comment\` varchar(255) NOT NULL`);
    }

}
