import {Component} from "angular2/core";
import {Router} from "angular2/router";
import * as dialogsModule from "ui/dialogs";
import * as frameModule from "ui/frame";

import {UserViewModel} from "../../shared/view-models/user-view-model";

@Component({
    selector: "login",
    templateUrl: "views/login/login.html"
})
export class LoginPage {
    user: UserViewModel;

    constructor() {
        this.user = new UserViewModel({
            email: "nativescriptrocks@telerik.com",
            password: "password"
        });
    }
    signIn() {
        this.user.login()
            .catch((error) => {
                dialogsModule.alert({
                    message: "Unfortunately we could not find your account.",
                    okButtonText: "OK"
                });
            })
            .then(() => {
                frameModule.topmost().navigate("views/list/list");
            });
    }
    register() {
        frameModule.topmost().navigate("views/register/register");
    }
}