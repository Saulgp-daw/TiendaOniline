import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaCarritoComponent } from './pagina-carrito.component';

describe('PaginaCarritoComponent', () => {
  let component: PaginaCarritoComponent;
  let fixture: ComponentFixture<PaginaCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaCarritoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
