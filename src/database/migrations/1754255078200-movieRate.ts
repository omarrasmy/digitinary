import { MigrationInterface, QueryRunner } from "typeorm";

export class MovieRate1754255078200 implements MigrationInterface {
    name = 'MovieRate1754255078200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movie_rates\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`rate\` int NOT NULL, \`usersId\` int NOT NULL, \`moviesId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie_rates\` ADD CONSTRAINT \`FK_85f5b9a0adfdd1822b39aac849a\` FOREIGN KEY (\`moviesId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`movie_rates\` ADD CONSTRAINT \`FK_b45143d5ea9726f7c7f1f48dd16\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_rates\` DROP FOREIGN KEY \`FK_b45143d5ea9726f7c7f1f48dd16\``);
        await queryRunner.query(`ALTER TABLE \`movie_rates\` DROP FOREIGN KEY \`FK_85f5b9a0adfdd1822b39aac849a\``);
        await queryRunner.query(`DROP TABLE \`movie_rates\``);
    }

}
