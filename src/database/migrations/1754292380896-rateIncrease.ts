import { MigrationInterface, QueryRunner } from "typeorm";

export class RateIncrease1754292380896 implements MigrationInterface {
    name = 'RateIncrease1754292380896'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_rates\` CHANGE \`rate\` \`rate\` decimal(3,1) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_rates\` CHANGE \`rate\` \`rate\` decimal(2,1) NOT NULL`);
    }

}
