import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmsComponent } from './films/films.component';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FilmComponent } from './film/film.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';
import { UsersComponent } from './users/users.component';
import { ExitRegistrationGuard } from './shared/guards/exit.registration.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { GuestGuard } from './shared/guards/guest.guard';
import { LogoutComponent } from './users/logout/logout.component';

const appRoutes: Routes = [
  {path: '', 
    redirectTo: '/albums',
    pathMatch: 'full'
  },
  {path: 'pokemons', component: PokemonsComponent, canActivate: [AuthGuard]},
  {path: 'films', component: FilmsComponent, canActivate: [AuthGuard]},
  {path: 'films/:filmId', component: FilmComponent, canActivate: [AuthGuard]},
  {path: 'albums', component: FavoritesComponent, canActivate: [AuthGuard]},
  {path: 'registration', 
    component: RegistrationComponent, 
    canActivate: [GuestGuard],
    canDeactivate: [ExitRegistrationGuard]
  },
  {path: 'login', component: LoginComponent, canActivate: [GuestGuard]},
  {path: 'user', component: UsersComponent},
  {path: 'logout', component: LogoutComponent},
  {path: '**', component:  NotFoundComponent},
]
@NgModule({
  imports: [RouterModule.forRoot(appRoutes) ],
  providers: [AuthGuard, GuestGuard, ExitRegistrationGuard],
  exports: [RouterModule]
})
export class AppRoutingModule { }
