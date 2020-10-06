import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from '../profile/profile.component';


const routes: Routes = [
    { path: '', component: AuthComponent,
        children: [
        { path: 'login', component: LoginComponent },
        { path: 'register', component: RegisterComponent},
        { path: 'profile', component: ProfileComponent}
    ]}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export  class  AuthRoutingModule {}

