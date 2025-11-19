import { ChangeDetectionStrategy, Component, computed, input, output} from '@angular/core';
import { RATES } from './rates';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, interval, map, startWith, Subject, switchMap, takeUntil } from 'rxjs';
import { outputFromObservable, takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-currency-coverter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './currency-coverter.component.html',
  styleUrl: './currency-coverter.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyCoverterComponent{

  readonly manualRefresh$ = new BehaviorSubject<void>(undefined);

  // new Subject<void>() crea un oggetto su cui puoi chiamare .next() per inviare un semplice segnale senza dati.
  private readonly stop$ = new Subject<void>();

  stopRefresh(){
    this.stop$.next()
  }

  readonly refreshRequired$ = this.manualRefresh$.pipe(
    switchMap(() => interval(5000).pipe(startWith(0))),
    map(() => {}),
    takeUntilDestroyed(),
    takeUntil(this.stop$)
  )

  // outputFromObservable() = Trasforma un Observable → in un Output del componente.
  readonly refreshRequired = outputFromObservable(this.refreshRequired$)
  
  readonly amount = input.required<number>();

  readonly currency = input('USD');

  readonly rate = computed( () => RATES[this.currency()]);
  readonly converted = computed( () => this.amount() * this.rate());

  //ngOnChanges(): void {
  //   this.rate = RATES[this.currency]
  //   this.converted = this.amount * this.rate;
  // }

  // onRefresh(){
  //   this.refreshRequired.emit()
  // }
}
