import { Injectable } from "@angular/core";
import { delay, map, Observable, of } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ApiService{
    getPrimeFactors(n : number):Observable<number[]>{
        return of(n).pipe(
            delay(1000),
            map(getPrimeFactors)
        )
    }
}


// accetta un numero n e restituisce un array con tutti i fattori primi di n
function getPrimeFactors(n: number) : number[]{
    // array vuoto dove salveremo i fattori primi trovati
    const factors : number[] = [];
    // iniziamo a provare i divisori da 2 (il primo numero primo)
    let divisor = 2;


    // continuiamo finché n è almeno 2 (se n diventa 1 abbiamo finito)
    while(n >= 2){

    // se divisor divide n senza resto (quindi è un fattore)
    if(n % divisor === 0){
        // aggiungiamo divisor alla lista dei fattori
        factors.push(divisor)
        // dividiamo n per divisor (riduciamo n rimuovendo quel fattore)
        n /= divisor;
        }else{
            // altrimenti proviamo il numero successivo come possibile divisore
            divisor++;
        }
    }
    // quando il while termina, restituiamo l'array dei fattori trovati
    return factors;
}