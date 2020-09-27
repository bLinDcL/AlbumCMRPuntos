import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresaInventarioPage } from './ingresa-inventario.page';

describe('IngresaInventarioPage', () => {
  let component: IngresaInventarioPage;
  let fixture: ComponentFixture<IngresaInventarioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresaInventarioPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresaInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
