import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto-list',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './producto-list.html',
  styleUrl: './producto-list.css',
})

export class ProductoList implements OnInit {
  productos: any[] = [];
  filtroCodigo: string = '';
  filtroNombre: string = '';
  productosOriginal: any[] = [];
  mostrarFormulario: boolean = false;
  nuevoProducto = {
  nombre: '',
  precio: 0,
  fechaCreacion: ''
  };

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
  this.obtenerProductos();
  }

  obtenerProductos() {
    this.productoService.getProductos().subscribe(data => {
      this.productos = data;
      this.productosOriginal = data;
    });
  }

  filtrar() {
    this.productos = this.productosOriginal.filter(p =>
      (this.filtroCodigo === '' || p.id.toString().includes(this.filtroCodigo)) &&
      (this.filtroNombre === '' || p.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase()))
    );
  }

  toggleFormulario() {
  this.mostrarFormulario = !this.mostrarFormulario;
  }

  guardar() {
    this.productoService.crearProducto(this.nuevoProducto).subscribe(() => {

    this.obtenerProductos();

    this.nuevoProducto = {
      nombre: '',
      precio: 0,
      fechaCreacion: ''
    };

    this.mostrarFormulario = false;
    });


  }

  onPrecioInput(event: any) {
    let value = event.target.value;
    value = value.replace(/[^0-9.]/g, '');

    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts[1];
    }

    this.nuevoProducto.precio = value;
  }

    form = new FormGroup({
    codigo: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]+$/)
    ]),
    precio: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.pattern(/^\d+(\.\d{1,2})?$/)
    ])
  });
}
