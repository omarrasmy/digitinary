import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { MovieRates } from "src/movies/db/movie-rate.entity";

@Entity()
export class Users extends IdentifiableEntitySchema {
    @AutoMap()
    @Column({ unique: true })
    email: string;
    @AutoMap()
    @Column()
    name: string;
    @AutoMap()
    @Column()
    password: string;
    @AutoMap()
    @Column()
    salt: string;
    @AutoMap()
    @OneToMany(() => MovieRates, (movieRate) => movieRate.users)
    MovieRates: MovieRates[];

    @BeforeInsert()
    async hashPassword() {
        if (this.password) {
            const saltRounds = process.env.SALT;
            this.salt = bcrypt.genSaltSync(Number(saltRounds));
            this.password = bcrypt.hashSync(this.password, this.salt);
        }
    }
    private tempPassword: string;
    @AfterLoad()
    private loadTempPassword(): void {
        this.tempPassword = this.password;
    }
    @BeforeUpdate()
    async handleUpdate() {
        if (this.password && this.tempPassword !== this.password) {
            const saltRounds = process.env.SALT;
            this.salt = bcrypt.genSaltSync(Number(saltRounds));
            this.password = bcrypt.hashSync(this.password, this.salt);
        }
    }
}

