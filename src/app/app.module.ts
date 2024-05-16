import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AppRoutingModule } from './app-routing.module';
import { RecipesModule } from './components/recipes/recipes.module';
import { ShoppingModule } from './components/shopping/shopping.module';
import { SharedModule } from './components/shared/shared.module';
import { CoreModule } from './core.module';
import { AuthModule } from './components/auth/auth.module';

@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    ShoppingModule,
    SharedModule,
    CoreModule,
    AuthModule
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
