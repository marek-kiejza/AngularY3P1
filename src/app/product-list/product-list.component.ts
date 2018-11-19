import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { registerContentQuery } from '@angular/core/src/render3/instructions';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ProductService } from '../shared/product.service';


@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle: string ="Tom's Products";
  imageWidth: number = 50;
  imageMargin: number = 2;
  showImage: boolean = false;
  _listFilter: string;
  errorMessage: string;

  get listFilter(): string {
    return this._listFilter;
  }

  set listFilter(value:string) {
    this._listFilter = value;
    this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter):this.products;
  }

  filteredProducts: IProduct[];
  products: IProduct[] = [
    
  ];

  constructor(private _productService:ProductService) {
    this.filteredProducts = this.products;
  }

  onNotify(message: string): void {
    console.log(message);
  }

  performFilter(filterBy:string):IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product:IProduct)=> product.productName.toLocaleLowerCase().indexOf(filterBy) !=-1);
  }

  deleteProduct(id:string): void {
    this._productService.deleteProduct(id);
  }
  toggleImage(): void{
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
     this._productService.getProducts().subscribe(products => {
      this.products = products,
    
      this.filteredProducts = this.products;
    },
   error => this.errorMessage = <any>error);
  }
}
