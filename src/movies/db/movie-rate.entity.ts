import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { Check, Column, Entity, ManyToOne } from "typeorm";
import { Movies } from "./movie.entity";
import { Users } from "src/users/db/user.entity";

@Entity()
@Check(`"rate" >= 1 AND "rate" <= 10`)
export class MovieRates extends IdentifiableEntitySchema {
    @AutoMap()
    @Column({
        type: "numeric",
        nullable: false,
        precision: 3,
        scale: 1,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        }
    })
    rate: number;
    @AutoMap()
    @Column({ nullable: true })
    comment: string;
    @AutoMap()
    @ManyToOne(() => Movies, (movie) => movie.movie_rates, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false
    })
    movies: Movies;
    @AutoMap()
    @ManyToOne(() => Users, (user) => user.movie_rates, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        nullable: false
    })
    users: Users;
    @AutoMap()
    @Column()
    usersId: number;
    @AutoMap()
    @Column()
    moviesId: number;

}