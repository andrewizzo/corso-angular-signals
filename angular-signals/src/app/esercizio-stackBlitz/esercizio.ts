import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './esercizio.html',
  // styleUrl: './app.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Esercizio {
  // 1. replace with a writeable signal with an initial value of 0
  readonly firstNumber = signal(0);

  // 2. replace with a writeable signal with an initial value of 0
  readonly secondNumber = signal(0);

  // 3. replace with a computed signal that emits the sum of the first and second numbers
  readonly sum = computed(() => this.firstNumber() + this.secondNumber());

  setSecondSignalTo10() {
    // 4. set the second number signal to 10
    this.secondNumber.set(10);
  }

  incrementFirstSignal() {
    // 5. increment the first number signal by 1 but only if it's less than 10
    if (this.firstNumber() < 10) {
      this.firstNumber.update((value) => value + 1);
    }
  }

  incrementBothSignals() {
    // 6. increment both number signals by 1 with a maximum of 10
    if (this.firstNumber() < 10) {
      this.firstNumber.update((value) => value + 1);
    }

    if (this.secondNumber() < 10) {
      this.secondNumber.update((value) => value + 1);
    }
  }

  constructor() {
    // 7. Define an effect that displays both signals to the console whenever any of them changes
  }
}
