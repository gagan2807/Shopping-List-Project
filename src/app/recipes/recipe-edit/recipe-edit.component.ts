import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup

  constructor(
    private activeRoute: ActivatedRoute, 
    private recipeService: RecipeService,
    private router:Router) {

  }
  ngOnInit(): void {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        
        this.id = +params['id'];
        console.log(this.id);
        
        this.editMode = !Number.isNaN(this.id);
        console.log(this.editMode);
        
        this.initForm();
        // console.log(this.recipeForm);
        
      })
  }

  onSubmit() {
    // const recipe=new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients'],);
    if(!this.editMode){
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    else{
      this.recipeService.updateRecipe(this.id,this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../',"recipes"])
  }

  initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name,Validators.required),
              'amount': new FormControl(ingredient.amount,[Validators.required])

            })
          )
        }
      }
      // console.log(recipe);

    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName,Validators.required),
      'imagePath': new FormControl(imagePath,Validators.required),
      'description': new FormControl(description,Validators.required),
      'ingredients': recipeIngredients
    })
  }

  get controls(){
    
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  addIngredients(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name':new FormControl(null,Validators.required),
        'amount':new FormControl(null,Validators.required)
      })
    )

  }
  deleteIngredient(index:number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  
}
