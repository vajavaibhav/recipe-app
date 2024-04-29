import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  Form,
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrl: './recipe-edit.component.css',
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onAddingNewIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*/),
        ]),
      })
    );
  }

  private initForm() {
    let recipeName = '';
    let imagePath = '';
    let descritpion = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      let recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      descritpion = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*/),
              ]),
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(descritpion, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  getControl() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDelete(index : number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }
}
