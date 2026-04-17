import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  private apiUrl = 'https://localhost:7162/api/producto'; // tu API

  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearProducto(producto: any) {
    return this.http.post(this.apiUrl, producto);
  }
}
