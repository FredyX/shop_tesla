import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { request } from 'http';
import { use } from 'passport';
import { AuthService } from './auth.service';
import { GetUser } from './decorators/get-user.decorators';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto){
    return this.authService.loginUser(loginUserDto);
  }

  @Get('private')
  @UseGuards( AuthGuard())
  testPrivateRoute(
    //@GetUser() request: Express.Request
  @GetUser(['email','role']) user: User
  ){
    console.log( user)
    //console.log(request.user)
    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
    };
  }

  @Get('private2')
  @SetMetadata('roles',['admin','super-user',])
  @UseGuards( AuthGuard(), UserRoleGuard)
  privateRoute(
    @GetUser() user: User 
  ){
    return {
      ok: true,
      user  
    }
  }
 

 

  
}
