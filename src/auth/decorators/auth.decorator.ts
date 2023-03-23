import { applyDecorators, SetMetadata, UnauthorizedException, UseGuards } from "@nestjs/common"; 
import { AuthGuard } from "@nestjs/passport";
import { UserRoleGuard } from "../guards/user-role.guard";
import { validRoles } from "../interfaces/valid-roles";
import { RoleProtected } from "./role-protected.decorator";
  // @SetMetadata('roles',['admin','super-user'])
  
  export function Auth(...roles: validRoles[]){
    return applyDecorators(
        RoleProtected(...roles),
       
        // SetMetadata('roles', roles),
        UseGuards(AuthGuard(), UserRoleGuard),
    );
  }
  