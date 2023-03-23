import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class LoginUserDto{
    @ApiProperty({
        nullable:false,
        example: 'MariaAlejandra@gmail.com'
    })
    @IsString()
    @IsEmail()
    email: string;
    
    @ApiProperty({
        nullable: false,
        example: 'myscecret123A'
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
    /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password must have a Uppercase, lowercase letter and a number'})
    password: string;
}