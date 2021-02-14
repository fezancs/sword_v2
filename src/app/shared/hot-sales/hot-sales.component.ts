import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-hot-sales',
  templateUrl: './hot-sales.component.html',
  styleUrls: ['./hot-sales.component.css']
})
export class HotSalesComponent implements OnInit {

  env=environment;
  imageurl=this.env.imageUrl;
  rows: Product[] = [];

  constructor(private productService: ProductService,
    private router: Router) { }

  ngOnInit(): void {
    this.gethotsales();
  }

  gethotsales() {
    this.productService.gethotsales().subscribe(
      result => {
        this.rows = result;
        console.log(result);
      }
    )
  }


}
