// Definisci un tipo generico MySignal<T>.

// MySignal<T> è il tipo di una funzione senza argomenti che restituisce un valore di tipo T. 
// In pratica è un getter: chiamando la funzione ottieni il valore.
export type MySignal<T> = () => T;

// Definisci un altro tipo generico MyWritableSignal<T>.
export type MyWritableSignal<T> = MySignal<T> & {
    set(value: T): void;
    update(updater: (value:T) => T): void;
}

export function mySignal<T>(value : T): MyWritableSignal<T>{
    const result = () => value;

    // aggiungo la proprietà set alla variabile result
    result.set = (newValue: T) => {
        // assegno direttamente newValue alla variabile value catturata,questo aggiorna il valore che 
        //  result() restituirà in futuro
        value = newValue;
    }
    
    // assegno la proprietà update alla variabile result,il metodo update prende come parametro un'altra funzione
    // updater = (valueCorrente) => nuovoValore
    result.update = (updater: (value: T) => T) => {
        // update riceve la funzione updater come argomento.
        // Chiama quella funzione passando l’attuale valore (value).
        // Assegna a value il risultato restituito da updater.

        // 
        value = updater(value) //value = value + 5
    }
    
    return result;
}