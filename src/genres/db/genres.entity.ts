import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Movies } from "src/movies/db/movie.entity";

@Entity()
export class Genres extends IdentifiableEntitySchema {
    @AutoMap()
    @Column()
    name: string;
    @AutoMap()
    @ManyToMany(() => Movies, movie => movie.genres)
    movies: Movies[];
}

