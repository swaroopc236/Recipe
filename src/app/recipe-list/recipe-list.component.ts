import {
  Component,
  DoCheck,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from 'src/Recipe';
import { RecipeService } from 'src/services/recipe-service.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, DoCheck {
  recipes$: Observable<String>;
  recipes: Recipe[] = [];
  newRecipe: Recipe = null;
  previousRecipe: Recipe;
  addMode: boolean = false;
  view: boolean = true;
  @Output() recipeObj = new EventEmitter<Recipe>();
  @Output() isAddMode = new EventEmitter<boolean>();
  recipeForm: FormGroup;

  constructor(private recipeService: RecipeService, private fb: FormBuilder) {}

  get recipeName() {
    return this.recipeForm.get('recipeName');
  }
  get recipeDescription() {
    return this.recipeForm.get('recipeDescription');
  }
  get recipeImage() {
    return this.recipeForm.get('recipeImage');
  }

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipeName: ['', [Validators.required]],
      recipeDescription: [''],
      recipeImage: [''],
    });
    this.recipes = this.recipeService.getRecipes;
    // this.recipes$ = this.recipeService.getRecipes();

    // this.recipeService
    //   .getRecipesFromServer()
    //   .pipe(tap(console.log))
    //   .subscribe((data: Recipe[]) => {
    //     this.recipes = data;
    //     // this.recipes.map((r) => console.log(r.recipeName));
    //   });

    // this.recipeService.getRecipes().subscribe(
    //   (data: Recipe[]) => {
    //     this.recipes = data;
    //   },
    //   tap((d) => console.log(d))
    // );
    // console.log(this.recipes);
    // this.recipes.map((r) => console.log(r.recipeName));
  }

  ngDoCheck() {
    // console.log('DoCheck called');
    this.recipes = this.recipeService.getRecipes;
  }

  get_recipes() {
    return this.recipeService.getRecipes;
  }

  onRecipeClick(index) {
    let recipeData = this.recipes[index];
    if (
      this.previousRecipe !== undefined &&
      this.previousRecipe.id === recipeData.id &&
      this.view
    ) {
      console.log('sameclicked');
      this.view = !this.view;
      recipeData = undefined;
    } else {
      this.view = true;
    }
    this.previousRecipe = this.recipes[index];
    console.log(recipeData);
    this.recipeObj.emit(recipeData);
  }

  onAddClicked() {
    this.addMode = true;
    // this.isAddMode.emit(true);
  }

  onSave() {
    // this.newRecipe = {
    //   id: uuidv4(),
    //   recipeName: this.recipeForm.value['recipeName'],
    // };
    this.addMode = false;
    // this.recipeForm.get('recipeName').setValue('');
  }

  onCancel() {
    this.addMode = false;
    this.recipeForm.get('recipeName').setValue('');
    this.recipeForm.get('recipeDescription').setValue('');
    this.recipeForm.get('recipeImage').setValue('');
  }

  onSubmit($event) {
    this.newRecipe = {
      id: uuidv4(),
      recipeName: this.recipeForm.value['recipeName'],
      recipeDescription: this.recipeForm.value['recipeDescription'],
      recipeImage: this.recipeForm.value['recipeImage'],
    };
    this.recipeService.createRecipe(this.newRecipe);
    this.recipeForm.get('recipeName').setValue('');
    this.recipeForm.get('recipeName').markAsUntouched();
    this.recipeForm.get('recipeDescription').setValue('');
    this.recipeForm.get('recipeDescription').markAsUntouched();
    this.recipeForm.get('recipeImage').setValue('');
    this.recipeForm.get('recipeImage').markAsUntouched();
    this.recipeForm.markAsUntouched();
    this.addMode = false;
  }
}
