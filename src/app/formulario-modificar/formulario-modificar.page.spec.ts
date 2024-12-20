import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioModificarPage } from './formulario-modificar.page';

describe('FormularioModificarPage', () => {
  let component: FormularioModificarPage;
  let fixture: ComponentFixture<FormularioModificarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioModificarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
