import {Component, OnInit} from '@angular/core';
import { __assign } from 'tslib';

import {IProduct} from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string = '';
    
    _listFilter: string;
    get listFilter(): string {
      return this._listFilter;
    }
    set listFilter(value:string) {
      this._listFilter = value;
      this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }
    
    filteredProducts: IProduct[];
    products: IProduct[] = [];

    // NB: constructor is executed before ngOnInit!
    constructor(private productService: ProductService) {
      
    }

    onRatingClicked(message:string): void {
      this.pageTitle = 'Product List: ' + message;
    }

    performFilter(filterBy: string): IProduct[] {
      filterBy = filterBy.toLocaleLowerCase();
      return this.products.filter((product: IProduct) => product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
      console.log('In OnInit');
      this.productService.getProducts().subscribe({
        next: products => {
          this.products = products;
          this.filteredProducts = this.products; 
          // becuase it is async we wait for service to emit all products and then __assign. So now it only gets executed after all products are fetched. 
        },
        error: err => this.errorMessage = err
      });
      
    }
}