import { Injectable } from '@angular/core';
// import { map } from 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Recipe } from 'src/Recipe';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  // private recipes: Observable<String> = from(['pizza', 'burger', 'sandwich']);
  recipes: Recipe[] = [];
  private URL = 'http://localhost:3001/recipes';
  constructor(private http: HttpClient) {
    this.http.get(this.URL).subscribe((data: Recipe[]) => {
      this.recipes = data;
    });
  }

  get getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipesFromServer() {
    this.http.get(this.URL).subscribe((data: Recipe[]) => {
      this.recipes = data;
    });
    // return this.http.get(this.URL);
  }

  updateRecipe(updatedData) {
    console.log('Updated name: ' + updatedData.recipeName);
    console.log('Updated id: ' + updatedData.id);
    // const index = this.recipes.findIndex((r) => {
    //   r.id === updatedData.id;
    // });
    // const updatedRecipes = this.recipes.map((r) => {
    //   r.id === updatedData.id
    //     ? { ...r, recipeName: updatedData.recipeName }
    //     : r;
    // });
    // console.log(updatedRecipes);
    // this.recipes[index] = updatedData;
    // console.log(this.recipes);

    const headers = {
      'Content-Type': 'application/json',
    };

    this.http.put(`${this.URL}/${updatedData.id}`, updatedData).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.error(err);
      },
      () => {
        this.getRecipesFromServer();
      }
    );
  }

  createRecipe(recipe: Recipe) {
    const headers = {
      'Content-Type': 'application/json',
    };
    this.http.post(this.URL, recipe).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.error(err);
      },
      () => {
        this.getRecipesFromServer();
      }
    );
  }

  deleteRecipe(recipe: Recipe) {
    this.http.delete(`${this.URL}/${recipe.id}`).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.error(err);
      },
      () => {
        this.getRecipesFromServer();
      }
    );
  }
}
