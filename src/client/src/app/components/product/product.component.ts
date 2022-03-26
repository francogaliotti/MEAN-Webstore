import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/entities/Product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  productForm: FormGroup;
  editProductForm: FormGroup;
  newProduct: Product = new Product('',0);

  constructor(private productService: ProductService, private _product: FormBuilder, private _editProduct: FormBuilder,
    private router: Router) {
      this.productForm = this._product.group({
        tittle: ['', [Validators.required, Validators.maxLength(10)]],
        price: ['', Validators.required]
      });
      this.editProductForm = this._editProduct.group({
        id: ['', Validators.required],
        tittle: ['', [Validators.required, Validators.maxLength(10)]],
        price: ['', Validators.required]
      })
   }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void{
    this.productService.getProducts().subscribe(
      data=> {
        this.products = data;
        console.log(data);
      },
      err => {
        console.log(err);
      }
    )
  }
  createProduct(): void{
    const product = new Product(this.productForm.get('tittle')?.value, this.productForm.get('price')?.value);
    console.log(product)
    this.productService.createProduct(product).subscribe(
      data => {
        this.getProducts();
      },
      err =>{
        console.log(err);
      }
    )
  }
  deleteProduct(id: string):void{
    this.productService.deleteProduct(id).subscribe(
      data => {
        this.getProducts();
      },
      err =>{
        console.log(err);
      }
    )
  }
}
