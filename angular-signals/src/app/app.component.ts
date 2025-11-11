import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject, combineLatest, map } from 'rxjs';


type Options = Record<string, string>
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'angular-signals';

  // -------------------------------------------------------------------
  
  // readonly counter$ = interval(1000);

  // readonly changeDetector =inject(ChangeDetectorRef)

  // doNothing(){}

  // -------------------------------------------------------------------

  readonly options$ = new BehaviorSubject<Options>({'r' : 'Red', 'g' : 'green', 'b' : 'blue'})

  readonly selectedKey$ = new BehaviorSubject<string>('b');

  readonly selectedValue$ = combineLatest([this.options$,this.selectedKey$]).pipe(
    map(([options,key]) => options[key])
  )

  switchOptions(){
    this.options$.next({'m' : 'magenta', 'y':'yellow', 'c':'cyan'})
    this.selectedKey$.next('c');
  }
 
  constructor(){
    // setInterval( () => {
    //   this.counter++
    //   console.log('Counter:' , this.counter);
    // },1000);

    // setInterval( () => {
    //   this.changeDetector.detectChanges();
    // },3000)

    // -------------------------------------------------------------------
    
    this.selectedValue$.subscribe(console.log);
  }
}
