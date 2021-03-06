import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Grocery} from "../../shared/grocery/grocery";
import {GroceryListService} from "../../shared/grocery/grocery-list.service";
import {TextField} from "ui/text-field";
var socialShare = require("nativescript-social-share");

@Component({
  selector: "list",
  templateUrl: "pages/list/list.html",
  styleUrls: ["pages/list/list-common.css", "pages/list/list.css"],
  providers: [GroceryListService]
})
export class ListPage implements OnInit {
  groceryList: Array<Grocery> = [];
  groceryListcopy: Array<Grocery> = [];
  grocery: string = "";
  isLoading = false;
  listLoaded = false;
  @ViewChild("groceryTextField") groceryTextField: ElementRef;

constructor(private _groceryListService: GroceryListService) {}

  ngOnInit() {
	console.log('onInit list...');
	this.grocery = "";
	this.isLoading = true;

		
	  this._groceryListService.load()
		.forEach((groceryObject) => {
			this.groceryList.unshift(groceryObject);
		});
		this.isLoading = false;
		this.listLoaded = true;
	

/*
  this._groceryListService.load()
    .subscribe(loadedGroceries => {
      loadedGroceries.forEach((groceryObject) => {
        this.groceryList.unshift(groceryObject);
      });
    });
*/
  }

add() {
  if (this.grocery.trim() === "") {
    alert("Enter a grocery item");
    return;
  }

  // Dismiss the keyboard
  let textField = <TextField>this.groceryTextField.nativeElement;
  textField.dismissSoftInput();
  this.groceryList.push(new Grocery("test", this.grocery));
  this.grocery = "";
  
/*
  this._groceryListService.add(this.grocery)
    .subscribe(
      groceryObject => {
        this.groceryList.unshift(groceryObject);
        this.grocery = "";
      },
      () => {
        alert({
          message: "An error occurred while adding an item to your list.",
          okButtonText: "OK"
        });
        this.grocery = "";
      }
    )
*/
}
share() {
  let list = [];
  for (let i = 0, size = this.groceryList.length; i < size ; i++) {
    list.push(this.groceryList[i].name);
  }
  let listString = list.join(", ").trim();
  socialShare.shareText(listString);
}
delete(remover) {
	var index = this.groceryList.indexOf(remover);
	console.log('remover item: '+index+' '+remover.name);
	this.groceryList.splice(index,1);
	this.groceryList.forEach((groceryObject) => {
		console.log('item:'+groceryObject.name);
	});

}
}