import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient);
  token = signal('');
  payload = signal<any | null>(null);

  login(adi: string, sifre: string) {
    return this.http.post('/auth/login', { adi, sifre }).pipe(
      map((r: any) => {
        this.token.set(r.token);
        this.payload.set(this.decodeJwt(r.token));
        console.log(this.payload().roller);
        return {};
      })
    );
  }
  refresh() {
    return this.http.post('/auth/refresh', null, { withCredentials: true }).pipe(
      tap((r: any) => {
        this.token.set(r.token);
        this.payload.set(this.decodeJwt(r.token));
      })
    );
  }
  logout() {
    this.token.set('');
    return this.http.post('/auth/logout', null);
  }
  hasRole(role: string): boolean {
    const roles: string[] = this.payload()?.roller || [];
    return roles.includes(role);
  }

  private decodeJwt<T = any>(token: string): T | null {
    try {
      const payload = token.split('.')[1];
      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const json = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(json) as T;
    } catch {
      return null;
    }
  }

}
