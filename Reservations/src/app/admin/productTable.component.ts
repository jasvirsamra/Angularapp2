// Importing necessary Angular core modules and Material components
import { Component, IterableDiffer, IterableDiffers, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { MatPaginator } from "@angular/material/paginator";

// Component decorator specifying the template file for this component
@Component({
  templateUrl: "productTable.component.html"
})

// ProductTableComponent class to manage product table display and operations
export class ProductTableComponent {

  // Columns configuration for the table
  colsAndRows: string[] = ['id', 'name', 'category', 'price', 'timeFrame', 'buttons'];
  
  // Data source for table, defined without initialization here
  dataSource: MatTableDataSource<Product>;
  
  // Differ to detect changes in the product list
  differ: IterableDiffer<Product>;

  // Paginator view child to handle pagination on the table
  @ViewChild(MatPaginator)
  paginator?: MatPaginator;

  // Injecting ProductRepository and IterableDiffers into the constructor
  constructor(private repository: ProductRepository, differs: IterableDiffers) {
    // Initialize data source with products from repository
    this.dataSource = new MatTableDataSource<Product>(this.repository.getProducts());
    
    // Initialize differ to track changes in the products array from repository
    this.differ = differs.find(this.repository.getProducts()).create();
  }

  // Angular lifecycle hook to check for changes in the product list
  ngDoCheck() {
    // Differ checks for any changes in the products array
    const changes = this.differ?.diff(this.repository.getProducts());
    if (changes != null) {
      // Update data source with the latest product list if changes are detected
      this.dataSource.data = this.repository.getProducts();
    }
  }

  // Angular lifecycle hook to set up paginator after view initialization
  ngAfterViewInit() {
    // Assign paginator to data source if paginator view child is available
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  // Method to delete a product from the repository by ID
  deleteProduct(id: number) {
    this.repository.deleteProduct(id);
  }
}
