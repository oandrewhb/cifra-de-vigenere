import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaVigenereComponent } from './tabela-vigenere.component';

describe('TabelaVigenereComponent', () => {
  let component: TabelaVigenereComponent;
  let fixture: ComponentFixture<TabelaVigenereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaVigenereComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaVigenereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
