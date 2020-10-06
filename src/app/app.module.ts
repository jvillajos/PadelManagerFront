import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AuthModule } from './components/auth/auth.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/shared/Alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthService } from './components/auth/auth.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProfileComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
