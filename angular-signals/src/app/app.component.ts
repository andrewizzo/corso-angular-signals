import { Component, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CounterComponent } from "./components/counter/counter.component";
import { FattorialiComponent } from "./components/fattoriali/fattoriali.component";
import { NomiComponent } from './components/nomi/nomi.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CounterComponent, FattorialiComponent,NomiComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'angular-signals';

  readonly x = signal(10);
  readonly isLarge = signal(false);


  showCounter = false;

  startaCounter(){
    this.showCounter = !this.showCounter;
  }

  incrementX(){
    this.x.update( v => v + 1);
  }

  constructor(){
    effect( () => {
      if(this.x() > 12){
        console.log('x è maggiore di 12');
        this.isLarge.set(true);
      }
    })
  }
}
