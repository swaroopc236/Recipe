import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.css'],
})
export class RecipeFormComponent implements OnInit {
  @Input() recipeData;
  @Output() recipeDataChange = new EventEmitter();
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.recipeForm = this.fb.group({
      recipeName: [this.recipeData.recipeName, [Validators.required]],
    });
  }

  get recipeName() {
    return this.recipeForm.get('recipeName');
  }

  onSave() {
    this.recipeData.recipeName = this.recipeForm.get('recipeName').value;
    // this.recipeData = Object.assign({}, this.recipeData);
    // console.log(this.recipeData);
    this.recipeDataChange.emit(this.recipeData);
  }

  onCancel() {
    this.recipeDataChange.emit(this.recipeData);
  }

  onSubmit($event) {
    // this.recipeData.recipeName = this.recipeForm.get('recipeName').value;
    // this.recipeDataChange.emit(this.recipeData);
  }
}
