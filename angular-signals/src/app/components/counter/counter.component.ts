import { Component, DestroyRef, effect, EffectRef, inject, Injector, runInInjectionContext, signal } from '@angular/core';
import { interval } from 'rxjs';
import { startCounting } from '../../util';

@Component({
  selector: 'app-counter',
  imports: [],
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  // private dr = inject(DestroyRef)

  // private injector = inject(Injector)

  // --------------------------------------
  
  // Variabile che conterrà l’effetto.
  // È inizialmente null.
  // Serve perché l’utente può premere “go” per avviare l’effetto, ma solo una volta.
  ef : EffectRef | null = null;

  readonly value = signal(1);


  // Ottieni l’injector del componente.
  // Serve per “legare” un effetto alla vita del componente.
  // Così, quando il componente viene distrutto, l’effetto viene automaticamente distrutto.
  readonly injector = inject(Injector);

  constructor(){
    // startCounting()
    const int = setInterval(() => {
      this.value.update(v => v + 1)
    },1000)
  }
  
  go(){
    // Se l’effetto è già stato creato, non farne un altro.
    // Evita effetti duplicati.
    if(this.ef){
      return;
    }

    // effect() crea un effetto reattivo.
    // L’effetto si attiva ogni volta che una signal letta dentro cambia.
    // In questo caso legge this.value(), quindi si attiverà ogni secondo (dallo setInterval).
    this.ef = effect(() => {
      console.log(this.value());
    },{
      // lega l’effetto alla vita del componente
      // se il componente viene distrutto (ad esempio cambi pagina)
      // Angular distrugge automaticamente l’effetto
      injector: this.injector
    })
  }

  // Se this.ef esiste, chiama .destroy() sull’effetto.
  // Questo ferma l’effetto: non ascolta più la signal.
  // Poi rimetti ef a null per poterlo ricreare se premi “go” di nuovo.
  stop(){
    this.ef?.destroy();
    this.ef = null;
  }

  // --------------------------------------

  // ngOnInit(){
  //   runInInjectionContext(this.injector, () => {
  //     startCounting()
  //   })
  // }
}
