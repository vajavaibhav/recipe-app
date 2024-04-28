import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Form, FormArray, FormControl, FormGroup } from '@angular/forms';

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
    private recipeService: RecipeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  onAddingNewIngredient(){
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        'name' : new FormControl(''),
        'amount' : new FormControl('')
      })
    )
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
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name),
              'amount' : new FormControl(ingredient.amount)
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imagePath': new FormControl(imagePath),
      'description': new FormControl(descritpion),
      'ingredients' : recipeIngredients
    });
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  getControl(){
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
}
