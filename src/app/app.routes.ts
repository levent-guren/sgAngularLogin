import { Routes } from '@angular/router';
import { LoginComponent } from './core/component/login/login.component';
import { MenuComponent } from './core/component/menu/menu.component';
import { HataComponent } from './core/component/hata/hata.component';
import { PersonelListesiComponent } from './pages/personel-listesi/personel-listesi.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'personelListesi', component: PersonelListesiComponent },
    { path: '**', component: HataComponent },
];
