import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IClaims, IClaimsFirebase, IPayloadToken } from '../interface/claims.interface';

export const Claims = createParamDecorator((data: unknown, ctx: ExecutionContext): IClaims => {
  const request = ctx.switchToHttp().getRequest();
  const user: IPayloadToken = request.user;
  return {
    fid: user.fid,
    employeeUuid: user.employeeId,
  };
});

export const ClaimsFirebase = createParamDecorator((data: unknown, ctx: ExecutionContext): IClaimsFirebase => {
  const request = ctx.switchToHttp().getRequest();
  return request.headers?.claimsFirebase;
});
