import { Component, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent {

  @Input() selectedRecipe : Recipe;

  constructor(private recipeService: RecipeService){}

  onSendToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.selectedRecipe.ingredients)
  }
}
