import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginServiceService } from '../services/login-service.service';


export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(LoginServiceService);
  const token = authService.token;

  console.log('Token en el interceptor:', token); // Agrega esta línea para ver el token

  if (token) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
};

