// Importing necessary Angular modules and services
import { Component, IterableDiffer, IterableDiffers } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { ActivatedRoute, Router } from "@angular/router";

// Component decorator specifying the template file for this component
@Component({
  templateUrl: "productEditor.component.html"
})

// ProductEditorComponent class to manage product creation and editing
export class ProductEditorComponent {
  // Flag to determine if the component is in edit mode
  editing: boolean = false;
  
  // Product object to bind data in the form
  product: Product = new Product();

  // Injecting ProductRepository, Router, and ActivatedRoute into the constructor
  constructor(private repository: ProductRepository,
              private router: Router,
              activeRoute: ActivatedRoute) {

    // Setting editing flag based on route parameter "mode"
    this.editing = activeRoute.snapshot.params["mode"] == "edit";

    // If editing, retrieve the product by ID from the repository
    if (this.editing) {
      Object.assign(this.product,
        repository.getProduct(activeRoute.snapshot.params["id"]));
    }
  }

  // Method to save product details and navigate to the product list page
  save() {
    this.repository.saveProduct(this.product);
    this.router.navigateByUrl("/admin/main/products");
  }
}
