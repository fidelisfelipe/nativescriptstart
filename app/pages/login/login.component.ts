import {Injectable} from "@angular/core";
import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../../shared/user/user.service";
import {User} from "../../shared/user/user";
import {Router} from "@angular/router";
import {NS_ROUTER_DIRECTIVES} from "nativescript-angular/router";
import {Page} from "ui/page";
import {Color} from "color";
import {View} from "ui/core/view";
import {setHintColor} from "../../utils/hint-util";
import {TextField} from "ui/text-field";

Injectable()

@Component({
  selector: "main",
  providers: [UserService, User],
  templateUrl: "pages/login/login.html",
  styleUrls: ["pages/login/login-common.css", "pages/login/login.css"]
})

export class LoginPage implements OnInit {
	@ViewChild("container") container: ElementRef;
	@ViewChild("email") email: ElementRef;
	@ViewChild("password") password: ElementRef;
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
	  this.setTextFieldColors();
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
		if (!this.user.isValidEmail()) {
			alert("Enter a valid email address.");
			return;
		}
	
		if (this.isLoggingIn) {
			this.login();
		} else {
			this.signUp();
		}
	}
	setTextFieldColors() {
	  let emailTextField = <TextField>this.email.nativeElement;
	  let passwordTextField = <TextField>this.password.nativeElement;

	  let mainTextColor = new Color(this.isLoggingIn ? "black" : "#C4AFB4");
	  emailTextField.color = mainTextColor;
	  passwordTextField.color = mainTextColor;

	  let hintColor = new Color(this.isLoggingIn ? "#ACA6A7" : "#C4AFB4");
	  setHintColor({ view: emailTextField, color: hintColor });
	  setHintColor({ view: passwordTextField, color: hintColor });
	}

}