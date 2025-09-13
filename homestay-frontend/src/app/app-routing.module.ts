import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from './shared/auth.guard';
import { adminGuard } from './shared/admin.guard';
import { ownerGuard } from './shared/owner.guard';
import { TermsnconditionsComponent } from './footer/termsnconditions/termsnconditions.component';
import { CancellationPolicyComponent } from './footer/cancellation-policy/cancellation-policy.component';

const routes: Routes = [
  {path: 'terms-and-conditions', component: TermsnconditionsComponent},
  {path: 'cancellation-policy', component: CancellationPolicyComponent},
  {path: 'home', component: HomeComponent, 
    // canActivate: [authGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'rooms',
    loadChildren: () => import('./rooms/rooms.module').then(m => m.RoomsModule),
    canActivate: [ownerGuard]
  },
  {
    path: 'bookings',
    loadChildren: () => import('./bookings/bookings.module').then(m => m.BookingsModule),
    // canActivate: [authGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [adminGuard]
  },
  // { path: '', redirectTo: '/rooms', pathMatch: 'full' },
  // { path: '**', redirectTo: '/rooms' }
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
