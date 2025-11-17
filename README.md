# corso-angular-signlas

I Signals sono un nuovo modo introdotto in Angular (da Angular 16) per gestire lo stato reattivo dell’applicazione, cioè quei dati che cambiano nel tempo e che devono aggiornare automaticamente la UI.

In pratica sono variabili speciali che:

quando cambiano, Angular aggiorna automaticamente i componenti che le usano;

tracciano da sole le dipendenze → niente più ChangeDetection pesante;

funzionano senza RxJS (anche se possono convivere).

Un signal è un contenitore di un valore + un meccanismo di notifica delle modifiche.

🔵 Perché Angular ha introdotto i Signals?

Per risolvere limiti e complessità di:

ChangeDetection basato su zone

Input/Output troppo rigidi

RxJS difficile per chi viene da fuori

Performance non sempre ottimali

I signals infatti forniscono:

✔️ Performance molto più alte
✔️ Semplicità di utilizzo
✔️ Reattività prevedibile
✔️ Zero callback annidate, zero subscribe/unsubscribe