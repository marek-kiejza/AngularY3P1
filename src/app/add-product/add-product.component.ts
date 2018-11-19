import { Component, OnInit } from '@angular/core';
import { IProduct } from '../product-list/product';
import { ProductService } from '../shared/product.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  providers: [ProductService]
})
export class AddProductComponent /*implements OnInit*/ {
/*
    pageTitle: string = 'Add Product'
    products: IProduct[] = [];
  */  
    productId: number;
    productName: string;
    productCode: string;
    releaseDate: string;
    description: string;
    price: number;
    starRating: number;
    imageUrl: string; 
    showDisplayClipartComponent: boolean;
    imageStr: string;

    listFiter: string;
    constructor(private _productService:ProductService, private router: Router){}

    //control hiding the component until the button press
    showHideDisplayClipartComponent(): boolean {
      this.showDisplayClipartComponent = !this.showDisplayClipartComponent;
      return false;
    }
    // received the URL string from the display-clipart component
    // and displays in the text box
    addImageStringToFormTextBox(evt): boolean {
      this.imageUrl = evt;
      return false;
    }
    addProduct(): void{
    console.log("productID =" + this.productId);
    console.log("productName =" + this.productName);
    console.log("productCode =" + this.productCode);
    console.log("releaseDate =" + this.releaseDate);
    console.log("price =" + this.price);
    console.log("description =" + this.description);
    console.log("starRating =" + this.starRating);
    console.log("imageUrl =" + this.imageUrl);
  

    let product: IProduct={
      productId: this.productId,
      productName: this.productName,
      productCode: this.productCode,
      releaseDate: this.releaseDate,
      description: this.description,
      price: this.price,
      starRating: this.starRating,
      imageUrl: this.imageUrl,
      imageStr: this.imageStr
      
    };
  
    this._productService.addProduct(product);
    //redirect to the product-list component
    this.router.navigate(['/product-list']);
    }
     ngOnInit() {
  }

 
}
