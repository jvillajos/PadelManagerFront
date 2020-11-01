import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { AuthGuard } from './components/auth/auth.guard';
import { RankingComponent } from './components/rankings/ranking/ranking.component';
import { UserManagementComponent } from './components/users/userManagement.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'rankings', component: RankingsComponent },
  { path: 'ranking/:id', component: RankingComponent },
  { path: 'users', component: UserManagementComponent },
  { path: 'auth', loadChildren: './components/auth/auth.module#AuthModule'},
  { path: '**', pathMatch: 'full', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
