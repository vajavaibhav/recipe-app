import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../../shared/ingredient.model';
import {
  addIngredient,
  deleteIngredient,
  stopEdit,
  updatedIngredient,
} from '../../store/shopping.action';
import { AppState } from '../../../../store/app.reducer';

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

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.editItemSubscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.form.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  ngOnDestroy(): void {
    this.editItemSubscription.unsubscribe();
  }

  addItem(form) {
    const newIngredient = new Ingredient(form.value.name, form.value.amount);
    if (this.editMode) {
      this.store.dispatch(updatedIngredient({ ingredient: newIngredient }));
    } else {
      this.store.dispatch(addIngredient({ ingredient: newIngredient }));
    }
    this.editMode = false;
    this.form.reset();
  }

  onClear() {
    this.editMode = false;
    this.form.reset();
    this.store.dispatch(stopEdit());
  }

  onRemoveItem() {
    this.store.dispatch(deleteIngredient());
    this.editMode = false;
    this.form.reset();
  }
}
