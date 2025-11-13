import { Component, computed, effect, signal } from '@angular/core';

@Component({
  selector: 'app-esercizio-signal-base',
  imports: [],
  standalone: true,
  templateUrl: './esercizio-signal-base.component.html',
  styleUrl: './esercizio-signal-base.component.css'
})
export class EsercizioSignalBaseComponent {
  readonly firstSignal = signal(42);
  readonly secondSignal = signal('Signal')
  readonly thirdSignal = signal(11);

  // readonly firstSignal = mySignal(42);
  // readonly secondSignal = mySignal('Signal')

  // devono essere funzioni sincrone
  readonly derived = computed(() => this.firstSignal() * this.thirdSignal());

  setSignal(){
    this.firstSignal.set(10);
    this.firstSignal.update(value => value + 1);
  }

  updateSignal(){
    this.firstSignal.update(value => value +1);
  }

  constructor(){
    // l'unica limitazione è che non si possono modificare i segnali all'interno dell'effect
    effect(() => {
      console.log('Il valore del primo signal è:' , this.firstSignal());
      console.log('Il valore del secondo signal è:' , this.secondSignal());
    });
  }
}
