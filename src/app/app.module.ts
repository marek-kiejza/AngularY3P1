import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { HttpClientModule } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faCoffee, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ConvertToSpaces } from './shared/convert-to-spaces-pipe';
import { StarRatingComponent } from './shared/star-rating/star-rating.component';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule} from '@angular/fire';
import { environment } from '../environments/environment';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SignupComponent } from './signup/signup.component';
import { AuthGuard } from './service/auth.guard';
import { MatCardModule, MatToolbarModule, MatFormFieldModule, MatButtonModule, MatListModule, MatInputModule, MatProgressSpinnerModule } from '@angular/material';
import { DisplayClipartComponent } from './display-clipart/display-clipart.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from './service/auth.service';
import { NotificationService } from './notifications/notification.service';
library.add(faCoffee);
library.add(faStar);
library.add(faTrashAlt);

const routes: Routes = [
 /*
  { path: '', redirectTo: 'products', pathMatch: 'full'},
  { path: 'products', component:ProductListComponent },
  { path: 'add', component: AddProductComponent }
  */

  { path: '', redirectTo: 'login', pathMatch: 'full',canActivate: [AuthGuard] },
  { path: 'product-list', component: ProductListComponent,canActivate: [AuthGuard] },
  { path: 'add-product', component: AddProductComponent,canActivate: [AuthGuard] },
  { path: 'home', component: ProductListComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: 'login', canActivate: [AuthGuard] }

];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ConvertToSpaces,
    StarRatingComponent,
    AddProductComponent,
    NavbarComponent,
    LoginComponent,
    NotificationsComponent,
    SignupComponent,
    DisplayClipartComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    MatInputModule,
    MatProgressSpinnerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    
    AngularFireModule.initializeApp(environment.firebase,),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FlexLayoutModule,
    RouterModule.forRoot(routes),
  ],
  providers: [AuthService, AuthGuard, NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
