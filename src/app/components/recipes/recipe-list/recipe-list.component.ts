import { Component, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {

  recipes : Recipe[] = [
    new Recipe('Pesto Pasta' , 'Tasty Italian pasta with pesto sauce' , 'https://richanddelish.com/wp-content/uploads/2023/02/creamy-pesto-pasta-1.jpg'),
    new Recipe('Red Pasta' , 'Tasty Italian pasta with Red sauce' , 'https://www.theburntbuttertable.com/wp-content/uploads/2022/03/roast-tomato-pasta-sauce-2.jpg'),
    new Recipe('Pink Pasta' , 'Tasty Italian pasta with pink sauce' , 'https://beatthebudget.com/wp-content/uploads/2022/06/Pink-Sauce-Pasta-Tiktok-Pasta-featured-image-1200-x-1500px.jpg'),
  ];

  @Output() selectedRecipe = new EventEmitter<Recipe>();

  OnRecipeSelected(event : Recipe) {
      this.selectedRecipe.emit(event);
  }

}
