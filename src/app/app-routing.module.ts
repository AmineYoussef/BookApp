import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { EmailLoginComponent } from './user/email-login/email-login.component';
import { BookComponent } from './book/book.component';
import { AuthGuard } from './user/auth.guard';


const routes: Routes = [
  { path: '', component: EmailLoginComponent },
{ path: 'book', component: BookComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
