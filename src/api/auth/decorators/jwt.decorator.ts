import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ExtractJwtContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    // console.log(request);
    // this.jwtService.decode(signedJwtAccessToken);
    return request.user;
  },
);
