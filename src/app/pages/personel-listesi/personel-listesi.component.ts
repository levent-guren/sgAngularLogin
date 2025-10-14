import { Component, inject, OnInit } from '@angular/core';
import { Personel } from '../../shared/model/personel';
import { PersonelService } from '../../shared/service/personel.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-personel-listesi',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './personel-listesi.component.html',
  styleUrl: './personel-listesi.component.scss'
})
export class PersonelListesiComponent implements OnInit {
  personelListesi: Personel[] = [];
  personelService = inject(PersonelService);
  toastr = inject(ToastrService);
  ngOnInit(): void {
    this.personelService.getTumPersoneller().subscribe({
      next: (result: any) => {
        this.personelListesi = result;
      },
      error: (e) => {
        this.toastr.error('Hata oluştu');
      }
    }
    );
  }

}
