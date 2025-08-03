import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullable1754238148320 implements MigrationInterface {
    name = 'Nullable1754238148320'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`backdrop_path\` \`backdrop_path\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`release_date\` \`release_date\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`release_date\` \`release_date\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`backdrop_path\` \`backdrop_path\` varchar(255) NOT NULL`);
    }

}
