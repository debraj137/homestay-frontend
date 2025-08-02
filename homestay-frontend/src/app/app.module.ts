import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './shared/jwt.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    //  BrowserAnimationsModule, 
    AppRoutingModule,
    HttpClientModule,  
    // MatSnackBarModule 
    // ToastrModule.forRoot({
    //   timeOut: 3000,
    //   positionClass: 'toast-bottom-right',
    //   preventDuplicates: true,
    // })
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
