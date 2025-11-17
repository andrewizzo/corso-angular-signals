import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, signal } from '@angular/core';

@Component({
  selector: 'app-nomi',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './nomi.component.html',
  styleUrl: './nomi.component.css',
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class NomiComponent {
  readonly names = signal(['Andrea','Mario','Franco']);
  readonly person = signal({name: 'Pippo', age: 30})

  constructor(){
    setTimeout(() => {
      // this.names().push('David')
      this.names.update(names => [...names,'David'])
      this.person.update(person => ({...person , name : 'Coca'}))
      console.log('aggiunto il nome davide', this.names());
    },2000)

    // console.log('person',this.person());
   
    effect( () => {
      console.log('person changed',this.person());
      
    })
  }
}
