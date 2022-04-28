import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaTiendaComponent } from './pagina-tienda.component';

describe('PaginaTiendaComponent', () => {
  let component: PaginaTiendaComponent;
  let fixture: ComponentFixture<PaginaTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaTiendaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
