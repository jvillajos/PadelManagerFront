import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  declarations: [
    AuthComponent,
    RegisterComponent,
    LoginComponent,
  ],

  exports: [
    AuthComponent,
    RegisterComponent,
    LoginComponent
  ],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }
