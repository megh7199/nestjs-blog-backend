import { Injectable, CanActivate, ExecutionContext, Inject, forwardRef } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserServiceService } from 'src/user/user-service/user-service.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector,
    @Inject(forwardRef(()=>UserServiceService))
    private userService:UserServiceService) {}

  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user.user;
    return this.userService.findOne(user.id).pipe(
        map((user:User) => {
            //const hasRole = () => roles.indexOf(user.role)>-1;
            //return true;
            return user && roles.indexOf(user.role)>-1; 
        })
    )

}
}