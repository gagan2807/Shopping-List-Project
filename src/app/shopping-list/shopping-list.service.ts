import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredients:Ingredient[]=[new Ingredient("Aloo",2)]
  startEditing=new Subject<number>();
  constructor() { }

  getIngredients(){
    return this.ingredients;
  }

  getIngredient(index:number){
    return this.ingredients[index];
  }

  addIngredient(ingredient:Ingredient){
     const itemPosition=this.ingredients.findIndex((i)=>i.name==ingredient.name);
    if(itemPosition!=-1){
      this.ingredients[itemPosition].amount=this.ingredients[itemPosition].amount+ingredient.amount;
    } else{
      this.ingredients.push(ingredient);
    }    
  }

  updateIngredient(ingredient:Ingredient,id:number){
    this.ingredients[id]=ingredient;
  }

  deleteIngredient(index:number){
    this.ingredients.splice(index,1);
  }
}
