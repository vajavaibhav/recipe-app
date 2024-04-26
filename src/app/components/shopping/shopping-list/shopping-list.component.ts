import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css',
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private shoppingServiceSubscription: Subscription;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredients();
    this.shoppingServiceSubscription =
      this.shoppingService.newIngredients.subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }

  ngOnDestroy(): void {
    this.shoppingServiceSubscription.unsubscribe();
  }
}
