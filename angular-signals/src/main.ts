import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Esercizio } from './app/esercizio-stackBlitz/esercizio';

bootstrapApplication(
  AppComponent,
  // Esercizio,
   appConfig)
  .catch((err) => console.error(err));
