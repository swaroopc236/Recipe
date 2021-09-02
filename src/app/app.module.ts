import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { RecipeFormComponent } from './recipe-form/recipe-form.component';

@NgModule({
  declarations: [AppComponent, RecipeListComponent, RecipeDetailComponent, RecipeFormComponent],
  imports: [BrowserModule, ReactiveFormsModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
