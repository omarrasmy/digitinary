import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullable1754238252122 implements MigrationInterface {
    name = 'Nullable1754238252122'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`poster_path\` \`poster_path\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`poster_path\` \`poster_path\` varchar(255) NOT NULL`);
    }

}
