import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { FilmsComponent } from './films/films.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FilmComponent } from './film/film.component';
import { FilmsItemComponent } from './films/films-item/films-item.component';
import { ApiinterceptorService } from './shared/services/apiinterceptor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PipeFavoritedPipe } from './shared/pipes/pipe-favorited.pipe';
import { FavoritesComponent } from './favorites/favorites.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { SearchComponent } from './shared/components/search/search.component';
import { UsersComponent } from './users/users.component';
import { RegistrationComponent } from './users/registration/registration.component';
import { LoginComponent } from './users/login/login.component';
import { LogoutComponent } from './users/logout/logout.component';
import { environment } from "../../src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { EditComponent } from './favorites/edit/edit.component';
import { MessagesComponent } from './shared/components/messages/messages.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonsComponent } from './pokemons/pokemons.component';
import { ModalPokemonComponent } from './pokemons/modal-pokemon/modal-pokemon.component';
import { ModalPokemonEditComponent } from './pokemons/modal-pokemon-edit/modal-pokemon-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FilmsComponent,
    MenuComponent,
    FilmComponent,
    FilmsItemComponent,
    PipeFavoritedPipe,
    FavoritesComponent,
    SearchComponent,
    RegistrationComponent,
    UsersComponent,
    LoginComponent,
    LogoutComponent,
    EditComponent,
    MessagesComponent,
    PokemonsComponent,
    ModalPokemonComponent,
    ModalPokemonEditComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApiinterceptorService,
    multi: true,    
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
