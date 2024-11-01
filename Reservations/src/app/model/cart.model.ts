// Importing necessary Angular core module and Product model
import { Injectable } from "@angular/core";
import { Product } from "./product.model";

// Marking Cart as injectable to allow it to be provided across the app
@Injectable()
export class Cart {
  // Array to hold items added to the cart
  public lines: CartLine[] = [];
  
  // Total item count in the cart
  public itemCount: number = 0;
  
  // Total price of items in the cart
  public cartPrice: number = 0;

  // Method to add a product to the cart or update quantity if it already exists
  addLine(product: Product, quantity: number = 1) {
    let line = this.lines.find(line => line.product.id == product.id);
    if (line != undefined) {
      // If product is already in the cart, increase quantity
      line.quantity += quantity;
    } else {
      // Otherwise, add new product to the cart
      this.lines.push(new CartLine(product, quantity));
    }
    // Recalculate totals after adding
    this.recalculate();
  }

  // Method to update the quantity of a product in the cart
  updateQuantity(product: Product, quantity: number) {
    let line = this.lines.find(line => line.product.id == product.id);
    if (line != undefined) {
      // Update the quantity if the product exists in the cart
      line.quantity = Number(quantity);
    }
    // Recalculate totals after updating quantity
    this.recalculate();
  }

  // Method to remove a product from the cart by its ID
  removeLine(id: number) {
    let index = this.lines.findIndex(line => line.product.id == id);
    // Remove product if found
    this.lines.splice(index, 1);
    // Recalculate totals after removing item
    this.recalculate();
  }

  // Method to clear the cart entirely
  clear() {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

  // Private method to recalculate total item count and cart price
  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;

    // Calculate total items and price based on each line's quantity and lineTotal
    this.lines.forEach(l => {
      this.itemCount += l.quantity;
      this.cartPrice += l.lineTotal;
    });
  }
}

// Class representing an individual item in the cart with a product and quantity
export class CartLine {
  constructor(public product: Product, public quantity: number) {}

  // Getter to calculate total price for this line based on quantity and product price
  get lineTotal() {
    return this.quantity * (this.product.price ?? 0);
  }
}
