import { HttpInterceptorFn } from '@angular/common/http';

export const urlInterceptor: HttpInterceptorFn = (req, next) => {
  let request = req;
  if (!req.url.startsWith("/assets")) {
    request = req.clone(
      {
        url: 'http://localhost:8080/api/v1' + req.url
      }
    );
  }
  return next(request);
};
