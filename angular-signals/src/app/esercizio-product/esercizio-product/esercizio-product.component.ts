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

  // è un linkedSignal<string[], string> - indica che la sorgente è string[]
  // e il valore prodotto è string.
  readonly selected_product = linkedSignal<string[] , string>({

    // la linkedSignal si aggancia alla signal products.
    // quando prodcuts cambia, la computation viene rieseguita.
    source: this.products,

    // prod contiene l'attuale valore della sorgente (qui l'array di prodotti).

    // prev rappresenta il valore precedente (o qualcosa che incapsula il precedente). 
    // Nel tuo codice usi prev.value, quindi prev sembra essere un oggetto che contiene la proprietà value 
    // (dipende dall'API: spesso prev è il precedente valore o una struttura che lo avvolge).
    computation: (prod, prev) => {

      // se non esiste il valore precedente,imposta il valore selezionato al primo prodotto dell'array (prod[0])
      if(!prev) return prod[0]

      // se l'array prod contiene ancora il precedente valore selezionato, mantieni quel precedente(non cambia selezione)
      if(prod.includes(prev.value)) return prev.value;

      // ltrimenti (es. il precedente non è più presente perché è stato rimosso), 
      // imposta la selezione sul primo elemento disponibile.
      return prod[0];
    }
  });

  addProduct(){
    // prende l'array corrente prods,
    // crea un nuovo array con tutti gli elementi esistenti (...prods) e aggiunge un nuovo elemento preso da PRODUCTS[prods.length].
    // PRODUCTS è una costante/array esterno (non mostrato nel file) che contiene una lista di nomi da aggiungere; 
    // PRODUCTS[prods.length] usa la lunghezza corrente come indice — es. se ci sono 3 prodotti, 
    // prende l'elemento con indice 3 da PRODUCTS.
    this.products.update(prods => [...prods,PRODUCTS[prods.length]]);
  }

  removeProduct(){
    // Rimuove l'ultimo elemento dell'array creando un nuovo array con slice(0, -1) (tutti gli elementi tranne l'ultimo).
    // Anche qui si ritorna un nuovo array: signal rileva il cambiamento e la linkedSignal selected_product verrà ricalcolata, 
    // assicurando che la selezione rimanga valida (o venga spostata al primo prodotto se il precedente scompare).
    this.products.update(prods => prods.slice(0,-1));
  }

  nextProduct(){
    // Vuole muovere la selezione al prodotto successivo nella lista, con wrap-around (se sei all'ultimo, vai al primo).
    // selected è il valore corrente della selezione (string).
    // this.products() invoca la signal products per ottenere l'array corrente.
    // indexOf(selected) trova la posizione della selezione corrente.
    // (index + 1) % this.products().length calcola l'indice del prossimo elemento, 
    // usando l'operatore modulo per tornare a 0 quando si supera la lunghezza.
    // return this.products()[calculatedIndex] ritorna il nuovo valore di selezione.
    this.selected_product.update(selected => {
      const index = this.products().indexOf(selected);
      return this.products()[(index + 1) % this.products().length]
    });
  }

  prevProduct(){
    // Simile a nextProduct ma va al prodotto precedente.L
    // a formula (index - 1 + this.products().length) % this.products().length è la classica per il wrap-around andando indietro (evita indici negativi).
    // Anche qui bisogna stare attenti se l'array è vuoto.
    this.selected_product.update(selected => {
      const index = this.products().indexOf(selected);
      return this.products()[(index - 1 + this.products().length) % this.products().length];
    });
  }
}
