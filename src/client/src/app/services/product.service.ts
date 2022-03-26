import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../entities/Product';
import "rxjs";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  domain: string = "http://localhost:3000"
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.domain + "/api/product")
  }
  createProduct(product: Product): Observable<any>{
    return this.http.post<any>(this.domain + "/api/product", product)
  }
  updateProduct(product: Product){
    return this.http.put<any>(this.domain+"/api/product/"+product._id,product)
  }
  deleteProduct(id: string){
    return this.http.delete<any>(this.domain+"/api/product/"+id)
  }
}
