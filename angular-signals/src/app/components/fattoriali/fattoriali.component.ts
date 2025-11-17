import { Component, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-fattoriali',
  standalone: true,
  imports: [],
  templateUrl: './fattoriali.component.html',
  styleUrl: './fattoriali.component.css'
})
export class FattorialiComponent {
  // iniettiamo ApiService per usare getPrimeFactors()
  readonly api = inject(ApiService)

  // signal che contiene il numero corrente da analizzare, parte da 10 
  readonly number = signal(10);
  
  // convertiamo il signal in un Observable che emette ogni volta che number cambia
  readonly number$ = toObservable(this.number)

  // ogni volta che number$ emette, viene chiamato getPrimeFactors(n)
    // switchMap annulla eventuali richieste precedenti e usa solo l’ultima
  readonly result$ = this.number$.pipe(
    switchMap(n => this.api.getPrimeFactors(n))
  )

  // convertiamo l'Observable result$ in un signal per usarlo nel template
  // initialValue serve come valore temporaneo finché l'API non risponde
  readonly primeFactors = toSignal(this.result$, {initialValue : []})

  // aumenta il numero di 1 e fa partire automaticamente una nuova richiesta
  increase(){
    this.number.update(n => n + 1);
  }

  // decrementa il numero, ma non va mai sotto 3
  decrease(){
    this.number.update(n => Math.max(n -1 ,3));
  }

  // debug: stampa in console ogni volta che il numero cambia
  constructor(){
    this.number$.subscribe(n => {
      console.log('numero cambiato in', n);
      
    })
    setTimeout(() => {
      this.number$.subscribe(n => {
        console.log('numero cambiato pt2', n);
        
      })
    },5000)
  }
}
