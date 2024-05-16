import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes',
    loadChildren: () =>
      import('./components/recipes/recipes.module').then(
        (m) => m.RecipesModule
      ),
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('./components/shopping/shopping.module').then(
        (m) => m.ShoppingModule
      ),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./components/auth/auth.module').then(
        (m) => m.AuthModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes , {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
