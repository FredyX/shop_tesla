import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

//this decorator gets the users only if it is authenticated
export const GetUser = createParamDecorator(
    ( data, ctx: ExecutionContext) => {
        const req = ctx.switchToHttp().getRequest();
        const user = req.user;

        if( ! user)
            throw new InternalServerErrorException('User not found in request');
        return user;
    }
)