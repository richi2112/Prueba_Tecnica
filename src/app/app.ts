import { Component } from '@angular/core';
import { ProductoList } from './components/producto-list/producto-list';
import { ProductoForm } from './components/producto-form/producto-form';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductoForm, ProductoList],
  template: `
    <hr>
    <app-producto-list></app-producto-list>
  `
})
export class App {}
