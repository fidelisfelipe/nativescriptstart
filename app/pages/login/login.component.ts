import {Injectable} from "@angular/core";
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../shared/user/user.service";
import {User} from "../../shared/user/user";
import {Router} from "@angular/router";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import {Page} from "ui/page";
import {Color} from "color";
import {View} from "ui/core/view";

Injectable()

@Component({
  selector: "main",
  providers: [UserService, User],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})

export class LoginPage implements OnInit {
	@ViewChild("container") container: ElementRef;
    private isLoggingIn = true;
	private user: User;
	constructor( private _router: Router, private _userService: UserService, private page: Page) {
		this.user = new User();
		this.user.email = "user@nativescript.org";
		this.user.password = "password";
	}

	ngOnInit() {
	  this.page.actionBarHidden = true;
	  this.page.backgroundImage = "res://bg_login";
	}

	login() {
	console.log('sign in...');
	this.isLoggingIn = true;
	this._router.navigate(["/list"]);
/*	this._userService.login(this.user)
		.subscribe(
		  () => this._router.navigate(["/list"]),
		  (error) => alert("Unfortunately we could not find your account.")
	);
*/
	}

	toggleDisplay () {
	  this.isLoggingIn = !this.isLoggingIn;
	  let container = <View>this.container.nativeElement;
	  container.animate({
		backgroundColor: this.isLoggingIn ? new Color("white") : new Color("#301217"),
		duration: 200
	  });
	}

	signUp() {
	console.log('sign up...');
	  this._userService.register(this.user)
		.subscribe(
		  () => {
			alert("Your account was successfully created.");
			this.toggleDisplay();
		  },
		  () => alert("Unfortunately we were unable to create your account.")
		);
	}

	submit(){
		if (this.isLoggingIn) {
			this.login();
		} else {
			this.signUp();
		}
	}

}