import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent {
  constructor(private shoppingService: ShoppingListService) {}

  addItem(form) {
    this.shoppingService.addIngredient(
      new Ingredient(form.value.name, form.value.amount)
    );
  }
}
