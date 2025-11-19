import { Component, input, model, signal } from '@angular/core';

@Component({
  selector: 'app-option-selector',
  imports: [],
  templateUrl: './option-selector.component.html',
  styleUrl: './option-selector.component.css'
})
export class OptionSelectorComponent {
   options = input.required<string[]>();

   selected = model.required<string>();

   select(option : string){
    this.selected.set(option)
   }
}
