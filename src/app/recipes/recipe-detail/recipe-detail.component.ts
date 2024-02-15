import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id:number;
  constructor(private slService:ShoppingListService,private route:ActivatedRoute, private recipeService:RecipeService,private router:Router){

  }
  ngOnInit(): void {
      this.route.params.subscribe((params:Params)=>{
        this.id=+params['id'];
        this.recipe=this.recipeService.getRecipeById(this.id);
      })
  }
  sendToShoppingList(){
    this.recipe.ingredients.forEach(ingredient => {
      this.slService.addIngredient(ingredient);
    });
  }
  deleteRecipe(){
    console.log("hi");
    
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(["/recipes"]);
  }
}
