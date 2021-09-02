import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Recipe } from 'src/Recipe';
import { RecipeService } from 'src/services/recipe-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [RecipeService],
})
export class AppComponent {
  recipeData: Recipe;
  isAddMode: boolean;

  getRecipeData(data) {
    this.recipeData = data;
  }

  getAddMode(data) {
    this.isAddMode = data;
  }

  get username() {
    return this.regForm.get('username');
  }

  constructor(private fb: FormBuilder) {}

  regForm = this.fb.group({
    username: ['Superman', [Validators.required, Validators.minLength(3)]],
    password: [''],
    confirmPassword: [''],
    address: this.fb.group({
      city: [''],
      state: [''],
      postalCode: [''],
    }),
  });

  loadAPIData() {
    this.regForm.setValue({
      username: 'Batman',
      password: 'abcd',
      confirmPassword: 'abcd',
      address: {
        city: 'Gotham',
        state: 'New York',
        postalCode: '432098',
      },
    });
  }
}
