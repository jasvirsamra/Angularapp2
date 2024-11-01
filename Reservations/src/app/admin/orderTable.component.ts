// Importing Angular core modules and Angular Material components
import { Component, IterableDiffer, IterableDiffers } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Order } from "../model/order.model";
import { OrderRepository } from "../model/order.repository";

// Component decorator specifying the template file for this component
@Component({
  templateUrl: "orderTable.component.html"
})

// OrderTableComponent class to handle order data and table display
export class OrderTableComponent {
  // Columns configuration for the table
  colsAndRows: string[] = ['name', 'zip', 'cart_p', 'cart_q', 'buttons'];
  
  // Data source for table, initialized with Order model type
  dataSource = new MatTableDataSource<Order>;
  
  // Differ to detect changes in the order list
  differ: IterableDiffer<Order>;

  // Injecting OrderRepository and IterableDiffers into the constructor
  constructor(private repository: OrderRepository, differs: IterableDiffers) {
    // Initializing differ to track changes in the orders array from the repository
    this.differ = differs.find(this.repository.getOrders()).create();
    
    // Setting up the data source with initial data from repository
    this.dataSource = new MatTableDataSource<Order>(this.repository.getOrders());
    
    // Setting the initial filter value
    this.dataSource.filter = "true";
    
    // Custom filter predicate to include/exclude shipped orders
    this.dataSource.filterPredicate = (order, include) => {
      return !order.shipped || include.toString() == "true";
    };
  }

  // Getter for includeShipped flag
  get includeShipped(): boolean {
    return this.dataSource.filter == "true";
  }

  // Setter for includeShipped flag to toggle filter based on shipped status
  set includeShipped(include: boolean) {
    this.dataSource.filter = include.toString();
  }

  // Method to toggle shipped status of an order and update in repository
  toggleShipped(order: Order) {
    order.shipped = !order.shipped;
    this.repository.updateOrder(order);
  }

  // Method to delete an order from the repository by ID
  delete(id: number) {
    this.repository.deleteOrder(id);
  }

  // Angular lifecycle hook to check for changes in the order list
  ngDoCheck() {
    // Differ checks for any changes in the orders array
    let changes = this.differ?.diff(this.repository.getOrders());
    if (changes != null) {
      // Update data source with the latest order list if changes are detected
      this.dataSource.data = this.repository.getOrders();
    }
  }
}
