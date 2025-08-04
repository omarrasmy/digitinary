import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { AfterLoad, BeforeInsert, BeforeUpdate, Column, Entity, JoinTable, ManyToMany, OneToMany } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Genres } from "src/genres/db/genres.entity";
import { MovieRates } from "./movie-rate.entity";
import { Users } from "src/users/db/user.entity";

@Entity()
export class Movies extends IdentifiableEntitySchema {
    @AutoMap()
    @Column()
    adult: boolean;
    @AutoMap()
    @Column({ nullable: true })
    backdrop_path: string;
    @AutoMap()
    @Column()
    original_language: string;
    @AutoMap()
    @Column()
    original_title: string;
    @AutoMap()
    @Column({ length: 5000 })
    overview: string;
    @AutoMap()
    @Column({ type: 'numeric', precision: 10, scale: 2 })
    popularity: number;
    @AutoMap()
    @Column({ nullable: true })
    poster_path: string;
    @AutoMap()
    @Column({ default: () => 'CURRENT_TIMESTAMP', nullable: true })
    release_date: Date;
    @AutoMap()
    @Column()
    title: string;
    @AutoMap()
    @Column()
    video: boolean;
    @AutoMap()
    @Column({
        type: 'numeric', precision: 10, scale: 2, default: 0, transformer: {
            to: (value: number) => value,
            from: (value: string) => parseFloat(value),
        }
    })
    vote_average: number;
    @AutoMap()
    @Column({ type: 'int', default: 0 })
    vote_count: number;
    @AutoMap()
    @ManyToMany(() => Genres, genre => genre.movies, { onDelete: 'CASCADE' })
    @JoinTable({ name: 'movie_genres' })
    genres: Genres[];
    @AutoMap()
    @OneToMany(() => MovieRates, (movieRate) => movieRate.movies)
    movie_rates: MovieRates[];
    @AutoMap()
    @ManyToMany(() => Users, (user) => user.wishlist, { onDelete: 'CASCADE' })
    user_wishlist: Users[];
}

