import { Routes } from '@angular/router';
import { EsercizioProductComponent } from './esercizio-product/esercizio-product/esercizio-product.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EsercizioSignalBaseComponent } from './esercizio-signal-base/esercizio-signal-base.component';

export const routes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path:'esercizio-product',
        component: EsercizioProductComponent
    },
    {
        path:'esercizio-signal-base',
        component: EsercizioSignalBaseComponent
    }
];
