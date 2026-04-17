import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../services/producto';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './producto-form.html',
  styleUrl: './producto-form.css',
})
export class ProductoForm {
  producto = {
      nombre: '',
      precio: 0,
      fechaCreacion: ''
    };

  constructor(private productoService: ProductoService ) {}

  guardar() {
    this.productoService.crearProducto(this.producto).subscribe(() => {
      alert('Producto creado');
    });
  }
}
