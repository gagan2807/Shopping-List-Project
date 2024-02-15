import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes:Recipe[]=[new Recipe("Chicken","murga","https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_800,h_400/https%3A%2F%2Fs3.amazonaws.com%2Fpixtruder%2Foriginal_images%2Ff5cffedb779ce8ea3991f8020b5616d39ef6c0ee",[new Ingredient("Chicken",2)]),
  new Recipe("Chicken Pakoda","murga","https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_800,h_400/https%3A%2F%2Fs3.amazonaws.com%2Fpixtruder%2Foriginal_images%2Ff5cffedb779ce8ea3991f8020b5616d39ef6c0ee",[new Ingredient("Chicken",2)])];
  recipeChanged=new Subject<Recipe[]>();
  recipeSelected=new EventEmitter<Recipe>();

  constructor() { }

  getRecipe(){
    return this.recipes.slice();
  }
  getRecipeById(id:number){
    return this.recipes[id];
  }

  addRecipe(recipe:Recipe){
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes);

  }

  updateRecipe(index:number,recipe:Recipe){
    this.recipes[index]=recipe;
    this.recipeChanged.next(this.recipes);
  }
  
  deleteRecipe(id:number){
    this.recipes.splice(id,1);
    this.recipeChanged.next(this.recipes);

  }
}
