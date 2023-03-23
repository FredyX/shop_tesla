import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/products/entities";
import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
    
    @ApiProperty({
        nullable: false,
    })    
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @ApiProperty({
        nullable: false,
        uniqueItems: true
    })
    @Column('text',{
        nullable: false,
        unique: true
    })
    email: string;

    @ApiProperty({
        nullable: false,
    })
    @Column('text',{
        nullable: false
    })
    password: string;

    @ApiProperty({
        description:'Maria Pineda'
    })
    @Column('text')
    fullName: string;

    @ApiProperty()
    @Column('bool',{
        default: true
    })
    isActive: boolean;
    
    @ApiProperty({
        
    })
    @Column('text',{
        array: true,
        default: ['user']
    })
    roles: string[];

    @OneToMany(
        () => Product,
        ( product ) => product.user
    )
    product: Product;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.email = this.email.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }
}
