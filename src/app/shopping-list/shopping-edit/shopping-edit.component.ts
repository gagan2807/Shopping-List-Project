import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {
 @ViewChild("f") slForm:NgForm;
  subscription=new Subscription();
  editMode=false;
  index:number;
  editedIngredient:Ingredient;

  ngOnInit(): void {
    this.subscription = this.slService.startEditing.
    subscribe(
      (id:number)=>{
        this.index=id
        this.editMode=true
        this.editedIngredient=this.slService.getIngredient(this.index);
        this.slForm.setValue({
          name:this.editedIngredient.name,
          amount:this.editedIngredient.amount
        })
      }
    );
  }

  constructor(private slService:ShoppingListService){

  }

  addItem(form:NgForm){
    let ingredient=new Ingredient(form.value.name,Number(form.value.amount));
    if(this.editMode){
      this.slService.updateIngredient(ingredient,this.index);
      this.editMode=false
    }else{
      this.slService.addIngredient(ingredient)
    }
    form.reset()
  }

  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }

  onDelete(){
    this.onClear();
    console.log(this.index);
    
    this.slService.deleteIngredient(this.index);
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
