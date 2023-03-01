import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CifraComponent } from './cifra.component';

describe('CifraComponent', () => {
  let component: CifraComponent;
  let fixture: ComponentFixture<CifraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CifraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CifraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
