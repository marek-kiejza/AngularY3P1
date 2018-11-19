import { Injectable } from '@angular/core';
import { IProduct } from '../product-list/product';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError, tap, map } from 'rxjs/operators';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Action } from 'rxjs/internal/scheduler/Action';
import { ActionSequence } from 'protractor';

@Injectable(
   {providedIn: 'root'}
)
export class ProductService {
  //URL to Fake JSON Server
  private _productUrl = 'http://localhost:3000/products';
 
  //Service wrapper around the native Firestore SDK's
  //CollectionReference and Query type.
  productsCollection: AngularFirestoreCollection<IProduct>;

  //A representation of any set of Products over any amount of time.
  products: Observable<IProduct[]>;

  //Array to hold all products
  allProducts: IProduct[];
  errorMessage: string;
  
  

  constructor(private _http: HttpClient, private _afs: AngularFirestore) {
    // Connect to the database
    this.productsCollection = _afs.collection<IProduct>("products");   
    //this.addAllProducts(); 

   }

  getProducts(): Observable<IProduct[]> {
     /*return this._http.get<IProduct[]>(this._productUrl).pipe(
     tap(data => console.log('All: ' + JSON.stringify(data))),
     catchError(this.handleError));*/


/*     //valueChanges() returns the current state of the collection as an
     //Observable of data as a synchronized array of JSON objects.
     this.products = this.productsCollection.valueChanges();

     //As the data is now available as an Observable we can subscride to it and 
     //Output to the console to have a peek at it
     this.products.subscribe(data => console.log("getProducts" + data));
*/
 //Observable of data as a synchronized array of JSON objects.
          this.products = this.productsCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
              const data = a.payload.doc.data() as IProduct;
              console.log("getProducts:data" + JSON.stringify(data));
              const id = a.payload.doc.id;
              console.log("getProduct:id = " + id);
              return{ id,...data }
            }))
          );
          return this.products;      
  }

  deleteProduct(id:string): void {
    this.productsCollection.doc(id).delete()
    .catch(error => {console.log("deleteProduct error: " + error); })
    .then(() => console.log('deleteProduct: id = '+id));
  }

  	addProduct(product: IProduct): void {
      this.productsCollection.add(product);
    }

    addAllProducts() {
      this._http.get<IProduct[]>(this._productUrl).subscribe(
        products => {
          this.allProducts = products;
          for (let product of this.allProducts) {
            console.log("Adding: " + product.productName); 
            this.productsCollection.add(product);
          }
        },
        error => (this.errorMessage = <any>error)
      );
    }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message);
    }
}
