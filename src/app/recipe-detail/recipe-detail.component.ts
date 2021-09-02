import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/services/recipe-service.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit, OnChanges, DoCheck {
  @Input() selectedRecipeData = null;
  @Input() addMode = false;
  actions = {
    EDIT: 'Edit',
    SAVE: 'Save',
  };
  displayMode: boolean = true;
  recipeForm: FormGroup;
  oldValue: string = '';

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
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.selectedRecipeData) {
    //   console.log('Data in detail ' + this.selectedRecipeData.recipeName);
    // }
    // this.oldValue = this.selectedRecipeData.recipeName;
    // const chng = changes['selectedRecipeData'];
    // const cur = JSON.stringify(chng.currentValue);
    // const prev = JSON.stringify(chng.previousValue);
    // console.log(cur);
    // console.log(prev);
    // if (chng.currentValue !== chng.previousValue) {
    //   this.displayMode = true;
    //   console.log('change detected');
    // }
    // console.log('Add mode :' + this.addMode);
  }

  ngDoCheck() {
    // if (this.oldValue !== this.selectedRecipeData.recipeName) {
    //   console.log('name updated');
    //   this.oldValue = this.selectedRecipeData.recipeName;
    //   this.recipeService.updateRecipe(this.selectedRecipeData);
    //   this.displayMode = true;
    // }
    // console.log(this.selectedRecipeData.recipeName);
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.selectedRecipeData);
    this.selectedRecipeData = undefined;
  }

  onEdit() {
    this.displayMode = false;
    console.log('before' + this.selectedRecipeData.recipeDescription);
    this.selectedRecipeData.recipeDescription =
      this.selectedRecipeData.recipeDescription === undefined
        ? ''
        : this.selectedRecipeData.recipeDescription;
    console.log('after' + this.selectedRecipeData.recipeDescription);
    this.selectedRecipeData.recipeImage =
      this.selectedRecipeData.recipeImage === undefined
        ? ''
        : this.selectedRecipeData.recipeImage;

    this.recipeForm
      .get('recipeName')
      .setValue(this.selectedRecipeData.recipeName);
    this.recipeForm
      .get('recipeDescription')
      .setValue(this.selectedRecipeData.recipeDescription);
    this.recipeForm
      .get('recipeImage')
      .setValue(this.selectedRecipeData.recipeImage);
    // this.recipeForm.controls['recipeName'].setValue(
    //   this.selectedRecipeData.recipeName
    // );
    // this.recipeForm.controls['recipeDescription'].setValue(
    //   this.selectedRecipeData.recipeDescription
    // );
    // this.recipeForm.controls['recipeName'].setValue(
    //   this.selectedRecipeData.recipeImage
    // );
    console.log(this.selectedRecipeData);
  }

  onSave() {
    this.displayMode = true;
  }

  onCancel() {
    this.displayMode = true;
  }

  onSubmit($event) {
    console.log(this.recipeForm.value['recipeName']);
    this.selectedRecipeData.recipeName = this.recipeForm.value['recipeName'];
    this.selectedRecipeData.recipeDescription =
      this.recipeForm.value['recipeDescription'];
    this.selectedRecipeData.recipeImage = this.recipeForm.value['recipeImage'];
    this.recipeService.updateRecipe(this.selectedRecipeData);
  }
}
