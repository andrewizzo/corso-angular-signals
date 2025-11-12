import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { mySignal } from './my-signal';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  // title = 'angular-signals';

  // readonly firstSignal = signal(42);
  // readonly secondSignal = signal('Signal')

  readonly firstSignal = mySignal(42);
  readonly secondSignal = mySignal('Signal')

  setSignal(){
    this.firstSignal.set(10);
  }

  updateSignal(){
    this.firstSignal.update(value => value +1);
  }

  constructor(){
    console.log('Il valore del primo signal è:' , this.firstSignal());
    console.log('Il valore del secondo signal è:' , this.secondSignal());
    
  }

}
