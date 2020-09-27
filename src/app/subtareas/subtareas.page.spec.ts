import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubtareasPage } from './subtareas.page';

describe('SubtareasPage', () => {
  let component: SubtareasPage;
  let fixture: ComponentFixture<SubtareasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubtareasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubtareasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
