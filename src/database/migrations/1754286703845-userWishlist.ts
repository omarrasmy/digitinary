import { MigrationInterface, QueryRunner } from "typeorm";

export class UserWishlist1754286703845 implements MigrationInterface {
    name = 'UserWishlist1754286703845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user_wishlist\` (\`usersId\` int NOT NULL, \`moviesId\` int NOT NULL, INDEX \`IDX_5335ad992e0d64f77b8c9eb7c1\` (\`usersId\`), INDEX \`IDX_1ea6ba7c0ddff89fef7bbafc44\` (\`moviesId\`), PRIMARY KEY (\`usersId\`, \`moviesId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`user_wishlist\` ADD CONSTRAINT \`FK_5335ad992e0d64f77b8c9eb7c19\` FOREIGN KEY (\`usersId\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`user_wishlist\` ADD CONSTRAINT \`FK_1ea6ba7c0ddff89fef7bbafc44b\` FOREIGN KEY (\`moviesId\`) REFERENCES \`movies\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user_wishlist\` DROP FOREIGN KEY \`FK_1ea6ba7c0ddff89fef7bbafc44b\``);
        await queryRunner.query(`ALTER TABLE \`user_wishlist\` DROP FOREIGN KEY \`FK_5335ad992e0d64f77b8c9eb7c19\``);
        await queryRunner.query(`DROP INDEX \`IDX_1ea6ba7c0ddff89fef7bbafc44\` ON \`user_wishlist\``);
        await queryRunner.query(`DROP INDEX \`IDX_5335ad992e0d64f77b8c9eb7c1\` ON \`user_wishlist\``);
        await queryRunner.query(`DROP TABLE \`user_wishlist\``);
    }

}
