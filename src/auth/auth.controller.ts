import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IncomingHttpHeaders, request } from 'http';
import { use } from 'passport';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeaders } from './decorators/raw-headers.decorator';
import { RoleProtected } from './decorators/role-protected.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { UserRoleGuard } from './guards/user-role.guard';
import { validRoles } from './interfaces/valid-roles';

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

  @Get('check-status')
  @Auth()
  checkAuthStatus(
    @GetUser() user: User
  ) {
    return this.authService.checkAuthStatus( user );
  }

  //@GetUser() request: Express.Request
  @Get('private')
  @UseGuards( AuthGuard())
  testPrivateRoute(
    @Req() request: Express.Request,
    @GetUser(['email','role']) user: User,
    @RawHeaders() rawHeaders: string[],
    //@Headers() headers: IncomingHttpHeaders,
  ){
    console.log( user)
    //console.log(request.user)
    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      rawHeaders,
      //headers
    };
  }

  
  // @SetMetadata('roles',['admin','super-user'])
  @Get('private2')
  //@RoleProtected(validRoles.superUser)
  @UseGuards( AuthGuard(), UserRoleGuard)
  privateRoute(
    @GetUser() user: User 
  ){
    return {
      ok: true,
      user  
    }
  }
 
  @Get('private3')
  @Auth( validRoles.admin )
  privateRoute3(
    @GetUser() user: User
  ) {

    return {
      ok: true,
      user
    }
  }
 
 

  
}
