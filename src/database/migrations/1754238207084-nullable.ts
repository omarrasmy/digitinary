import { MigrationInterface, QueryRunner } from "typeorm";

export class Nullable1754238207084 implements MigrationInterface {
    name = 'Nullable1754238207084'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`release_date\` \`release_date\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movies\` CHANGE \`release_date\` \`release_date\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
