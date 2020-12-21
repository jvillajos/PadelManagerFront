import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { RankingsComponent } from './components/rankings/rankings.component';
import { RankingFormComponent } from './components/rankings/pages/ranking-form/ranking-form.component';
import { AuthModule } from './components/auth/auth.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlertComponent } from './components/shared/Alert/alert.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './components/auth/auth.guard';
import { AuthService } from './components/auth/auth.service';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { CookieService } from 'ngx-cookie-service';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { ModalModule } from './components/shared/modal/modal.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RankingComponent } from './components/rankings/ranking/ranking.component';
import { UserManagementComponent } from './components/users/userManagement.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserFormComponent } from './components/users/user-form/user-form/user-form.component';
import { MessageboxComponent } from './components/shared/messagebox/messagebox/messagebox.component';
import { CoupleManagementComponent } from './components/couples/couple-management/couple-management.component';
import { CoupleFormComponent } from './components/rankings/pages/couple-form/couple-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { PhaseFormComponent } from './components/rankings/pages/phase-form/phase-form.component';
import { MatchCardComponent } from './components/home/pages/match-card/match-card.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    RankingsComponent,
    AlertComponent,
    RankingFormComponent,
    RankingComponent,
    UserManagementComponent,
    UserFormComponent,
    MessageboxComponent,
    CoupleManagementComponent,
    CoupleFormComponent,
    PhaseFormComponent,
    MatchCardComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    AuthModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule
  ],
  providers: [
    CookieService,
    AuthService,
    AuthGuard,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }],
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
