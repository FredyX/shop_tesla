import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/auth/entities/user.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImage } from './';

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: '5cb37a7b-a0a2-481a-b691-c939b0220c60',
        description: 'Product Id',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    
    
    @ApiProperty({
        example: 'Title shirt',
        description: 'Product title',
        uniqueItems: true
    }) 
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: '10',
        description: ' Product price'
    })
    @Column('float',{
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'example the description of the product',
        description: 'product description',
        default: null
    })
    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @ApiProperty({
        uniqueItems: true,
        description: 'Product SLUG - for SEO',
        example: 't_shirt_teslo'
    })
    @Column('text', {
        unique: true
    })
    slug: string;

    @ApiProperty({
        example: 10,
        description: 'Product stock',
        default: 0
    })
    @Column('int', {
        default: 0
    })
    stock: number;

    @ApiProperty({
        example: ['M','XL','S'],
        description: 'Product size'
    })
    @Column('text',{
        array: true
    })
    sizes: string[];

    @ApiProperty({
        example: 'women',
        description: 'men, woman, unisex'
    })
    @Column('text')
    gender: string;


    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[];

    // images
    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[];
    
    @ManyToOne(
        () => User,
        ( user ) => user.product,
        { eager: true }
    )
    user: User

    @BeforeInsert()
    checkSlugInsert() {

        if ( !this.slug ) {
            this.slug = this.title;
        }

        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')

    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLowerCase()
            .replaceAll(' ','_')
            .replaceAll("'",'')
    }


}
