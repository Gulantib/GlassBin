import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class GlassBin {
    @PrimaryGeneratedColumn({
        type: 'int',
    })
    id: number

    @Column({
        nullable: false,
        default: '',
        type: 'varchar'
    })
    name: string

    @Column({
        nullable: false,
        type: 'decimal'
    })
    latitude: number

    @Column({
        nullable: false,
        type: 'decimal'
    })
    longitude: number


    constructor(
        id: number,
        name: string,
        latitude: number,
        longitude: number
    ) {
        this.id = id;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}


