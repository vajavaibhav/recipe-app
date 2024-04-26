import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RecipesComponent } from "./components/recipes/recipes.component";
import { ShoppingListComponent } from "./components/shopping/shopping-list/shopping-list.component";
import { AppComponent } from "./app.component";
import { RecipeDetailComponent } from "./components/recipes/recipe-detail/recipe-detail.component";
import { RecipeStartComponent } from "./components/recipes/recipe-start/recipe-start.component";

const appRoutes: Routes = [
    {path: '' , redirectTo: '/recipes' ,pathMatch: 'full' },
    {path: 'recipes' , component: RecipesComponent , children :[
        {path: '' , component: RecipeStartComponent },
        {path: ':id' , component: RecipeDetailComponent }
    ]},
    {path: 'shopping-list' , component: ShoppingListComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}