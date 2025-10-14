import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonelService {
  http = inject(HttpClient);

  getTumPersoneller() {
    return this.http.post('/personel/list', null);
  }
}
