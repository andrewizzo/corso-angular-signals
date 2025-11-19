import { AfterViewInit, Component, effect, OnInit, signal, viewChild, viewChildren, ViewContainerRef } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RATES } from './components/currency-coverter/rates';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CurrencyCoverterComponent } from './components/currency-coverter/currency-coverter.component';
import { OptionSelectorComponent } from './components/option-selector/option-selector.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ReactiveFormsModule,CurrencyCoverterComponent,OptionSelectorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements AfterViewInit,OnInit{
  // title = 'angular-signals';

  currencyConverter = viewChild.required(CurrencyCoverterComponent);

  currencyConverters = viewChildren(CurrencyCoverterComponent);

  myRefDiv = viewChild.required('myRef', {read: ViewContainerRef});

  stopRefresh(){
    // this.currencyConverter().stopRefresh()
    for(const converter of this.currencyConverters()) {
      converter.stopRefresh();
    }
  }

  constructor(){
    effect(() => {
      console.log('effect',this.currencyConverter());
    })
  }

  ngOnInit(): void {
    console.log('on init');
  }
  ngAfterViewInit(): void {
    console.log('after view init' , this.currencyConverter());
    
  }

  readonly currencies = Object.keys(RATES)

  readonly currency = signal('GBP')

  amount = new FormControl(100);

  refreshData(){
    console.log('refreshData');
  }
}
