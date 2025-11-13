import { CommonModule } from '@angular/common';
import { Component, linkedSignal, signal } from '@angular/core';
import { PRODUCTS } from './products';

@Component({
  selector: 'app-esercizio-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './esercizio-product.component.html',
  styleUrls: ['./esercizio-product.component.css']
})
export class EsercizioProductComponent {
  readonly products = signal(['Mela','Pera','Banana'])

  readonly selected_product = linkedSignal<string[] , string>({
    source: this.products,
    computation: (prod, prev) => {
      if(!prev) return prod[0]
      if(prod.includes(prev.value)) return prev.value;
      return prod[0];
    }
  });

  addProduct(){
    this.products.update(prods => [...prods,PRODUCTS[prods.length]]);
  }

  removeProduct(){
    this.products.update(prods => prods.slice(0,-1));
  }

  nextProduct(){
    this.selected_product.update(selected => {
      const index = this.products().indexOf(selected);
      return this.products()[(index + 1) % this.products().length]
    });
  }

  prevProduct(){
    this.selected_product.update(selected => {
      const index = this.products().indexOf(selected);
      return this.products()[(index - 1 + this.products().length) % this.products().length];
    });
  }
}
