import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Ingredient } from '../../../shared/ingredient.model';
import { ShoppingListService } from '../../shopping-list.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrl: './shopping-list-edit.component.css',
})
export class ShoppingListEditComponent implements OnInit, OnDestroy {
  @ViewChild('form', { static: false }) form: NgForm;

  editMode = false;
  editItemSubscription: Subscription;
  editedItem: Ingredient;
  editedIndex: number;

  constructor(private shoppingService: ShoppingListService) {}

  ngOnInit(): void {
    this.editItemSubscription = this.shoppingService.editedItem.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIndex = index;
        this.editedItem = this.shoppingService.getIngredient(index);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.editItemSubscription.unsubscribe();
  }

  addItem(form) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.shoppingService.updatedIngredient(this.editedIndex, newIngredient);
    } else {
      this.shoppingService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.form.reset();
  }

  onClear(){
    this.editMode = false;
    this.form.reset();
  }

  onRemoveItem(){
    this.shoppingService.deleteIngredient(this.editedIndex);
    this.editMode = false;
    this.form.reset();
  }
}
