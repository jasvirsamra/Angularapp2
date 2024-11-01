// Importing necessary modules and services
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../model/auth.service";

// Component decorator specifying the template file for this component
@Component({
  templateUrl: "auth.component.html"
})

// AuthComponent class to handle user authentication
export class AuthComponent {
  // Properties to hold username, password, and error message
  username?: string;
  password?: string;
  errorMessage?: string;

  // Injecting Router and AuthService into the component's constructor
  constructor(private router: Router, private auth: AuthService) {}

  // Method to authenticate the user, triggered when the form is submitted
  authenticate(form: NgForm) {
    // Checking if the form data is valid
    if (form.valid) {
      // Attempting to authenticate with the entered username and password
      this.auth.authenticate(this.username ?? "", this.password ?? "")
        .subscribe(response => {
          // If authentication is successful, navigate to the admin page
          if (response) {
            this.router.navigateByUrl("/admin/main");
          } else {
            // Display an error message if authentication fails
            this.errorMessage = "Authentication Failed";
          }
        });
    } else {
      // Display an error message if form data is invalid
      this.errorMessage = "Form Data Invalid";
    }
  }
}
