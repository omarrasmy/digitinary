import { AutoMap } from "@automapper/classes";
import { IdentifiableEntitySchema } from "src/database/identifiable-entity.schema";
import { Column, Entity } from "typeorm";

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


}
