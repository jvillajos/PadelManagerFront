import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'profile', component: ProfileComponent },
  { path: 'auth', loadChildren: './components/auth/auth.module#AuthModule'},
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
