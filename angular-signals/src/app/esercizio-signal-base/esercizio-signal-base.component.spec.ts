import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsercizioSignalBaseComponent } from './esercizio-signal-base.component';

describe('EsercizioSignalBaseComponent', () => {
  let component: EsercizioSignalBaseComponent;
  let fixture: ComponentFixture<EsercizioSignalBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsercizioSignalBaseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsercizioSignalBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
