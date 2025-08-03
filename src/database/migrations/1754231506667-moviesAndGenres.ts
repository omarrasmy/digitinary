import { MigrationInterface, QueryRunner } from "typeorm";

export class MoviesAndGenres1754231506667 implements MigrationInterface {
    name = 'MoviesAndGenres1754231506667'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`movies\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`adult\` tinyint NOT NULL, \`backdrop_path\` varchar(255) NOT NULL, \`original_language\` varchar(255) NOT NULL, \`original_title\` varchar(255) NOT NULL, \`overview\` varchar(255) NOT NULL, \`popularity\` decimal(10,2) NOT NULL, \`poster_path\` varchar(255) NOT NULL, \`release_date\` datetime NOT NULL, \`title\` varchar(255) NOT NULL, \`video\` tinyint NOT NULL, \`vote_average\` decimal(10,2) NOT NULL DEFAULT '0.00', \`vote_count\` int NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`genres\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`movie_genres\` (\`moviesId\` int NOT NULL, \`genresId\` int NOT NULL, INDEX \`IDX_6414c430d7ed6fd0821e56964b\` (\`moviesId\`), INDEX \`IDX_13017cf7e6e979595b6032388c\` (\`genresId\`), PRIMARY KEY (\`moviesId\`, \`genresId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`movie_genres\` ADD CONSTRAINT \`FK_6414c430d7ed6fd0821e56964ba\` FOREIGN KEY (\`moviesId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`movie_genres\` ADD CONSTRAINT \`FK_13017cf7e6e979595b6032388cd\` FOREIGN KEY (\`genresId\`) REFERENCES \`genres\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`movie_genres\` DROP FOREIGN KEY \`FK_13017cf7e6e979595b6032388cd\``);
        await queryRunner.query(`ALTER TABLE \`movie_genres\` DROP FOREIGN KEY \`FK_6414c430d7ed6fd0821e56964ba\``);
        await queryRunner.query(`DROP INDEX \`IDX_13017cf7e6e979595b6032388c\` ON \`movie_genres\``);
        await queryRunner.query(`DROP INDEX \`IDX_6414c430d7ed6fd0821e56964b\` ON \`movie_genres\``);
        await queryRunner.query(`DROP TABLE \`movie_genres\``);
        await queryRunner.query(`DROP TABLE \`genres\``);
        await queryRunner.query(`DROP TABLE \`movies\``);
    }

}
