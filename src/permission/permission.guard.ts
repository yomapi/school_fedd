import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../user/entities/user.entity';
import { USER_TYPE } from '../user/enums/usertype.enum';

export const AdminUserTypes: [string] = [USER_TYPE.ADMIN];

@Injectable()
export class isAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.isUserSignined(context)) return false;
    return this.isAdminUser(context);
  }
  private getUserFromContext(context: ExecutionContext): User {
    return context.switchToHttp().getRequest().user;
  }
  private isUserSignined(context: ExecutionContext): boolean {
    return this.getUserFromContext(context) ? true : false;
  }
  private isAdminUser(context: ExecutionContext): boolean {
    const userType = this.getUserFromContext(context)?.userType;
    return USER_TYPE.ADMIN === userType;
  }
}
