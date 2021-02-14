import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { Store , select } from '@ngrx/store';
import * as CartActions from '../../cart.actions';
import * as fromCart from '../../cart.selectors';
import {CartItems} from '../../cart';
import { createAction, props } from '@ngrx/store';
import { HomesliderService } from '../services/homeslider.service';
import { Homeslider } from '../models/homeslider';
import { Trendingnews } from '../models/homeslider';
import { Popularsearch } from '../models/homeslider';
import { Trendingproducts } from '../models/homeslider';
import { Router } from '@angular/router';
import { FilterallproductsService } from '../services/filterallproducts.service';
import { FilteredProduct } from '../models/product';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-homeheader',
  templateUrl: './homeheader.component.html',
  styleUrls: ['./homeheader.component.css']
})
export class HomeheaderComponent implements OnInit {

  env=environment;
  imageurl=this.env.imageUrl;
  active:number;
  close:number=0;
  language:string="ENGLISH";
  currency:string="Dollar";
  currency1:string="Dollar";
  cartitems : CartItems[] = [];
  totalbill :number;
  itemscount:number;
  slideData1:Homeslider[]=[];
  trendingnews:Trendingnews[]=[];
  popularsearch:Popularsearch[]=[];
  trendingproducts:Trendingproducts[]=[];
  products :FilteredProduct[]=[];
  filteredProducts :FilteredProduct[]=[];
  newfilteredProducts :FilteredProduct[]=[];
  private _searchTerm: string;
  current:number=2;
  i:number=0;
  j:number=3;

  constructor(private store : Store,private homesliderService: HomesliderService,private filteredproducts: FilterallproductsService,
    private router: Router) { }
  
    cchange(value: string){
      this.currency1=value;     
      // localStorage.setItem("currency",value);
      // window.location.reload();
    }

    
    onSearchChange(searchValue: string): void {  
      console.log(searchValue);
      localStorage.setItem("filterkeyword",searchValue);
      this.filteredProducts = this.filterproducts(searchValue);
      this.newfilteredProducts=this.filteredProducts.slice(this.i,this.j);
      console.log(this.newfilteredProducts);
      console.log(this.filteredProducts);
    }
     
    showmore(){
      if(this.j<this.filteredProducts.length){
        this.i=this.i+3;
        this.j=this.j+3;
        this.newfilteredProducts=this.filteredProducts.slice(this.i,this.j);
      } 
      else{
        return;
      }
    }
    showless(){
      if(this.i-3>=0){
        this.i=this.i-3;
        this.j=this.j-3;
        this.newfilteredProducts=this.filteredProducts.slice(this.i,this.j);
      } 
      else{
        return;
      }
    }
    
  // get searchTerm(): string {
  //   return this._searchTerm;
  // }

  // set searchTerm(value: string) {
  //   console.log("in setter");
  //   this._searchTerm = value;
  //   this.filteredProducts = this.filterproducts(value);
  // }

  filterproducts(searchString: string) {
    return this.products.filter(product =>
      product.thumbnail_label.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  showcart() : void{  
      if($("#mycart").css("display")=="none")
      {
        $("#mycart").css("display", "block");
      }
      else{
        $("#mycart").css("display", "none");
      }  
  }
  showinput1() : void{  
    console.log("hi");
    if($(".search-content11").css("display")=="none")
    {
      $(".org-btn").css("display", "none");
      $(".search-content11").css("display", "block");
    }
    else{
      $(".search-content11").css("display", "none");
      $(".org-btn").css("display", "block");
    }
  
}
   removeitem(name:string):void{
    const user: string =  name ;
    this.store.dispatch(new CartActions.RemoveCartItem(user));
   }

  openSearch() : void{
    if($("#myOverlay").css("display")=="none")
      {
        $("#myOverlay").css("display", "block");
      }
      else{
        $("#myOverlay").css("display", "none");
      }
  }
  closecart():void{
    $(".cart").css("display", "none");
  }
  

  ngOnInit(): void {
    
    this.gethomeslider();
    
    this.gettrendingnews();

    this.getpopularsearches();

    this.gettrendingproducts();

    this.getfilteredproducts();

    this.store.pipe(select(fromCart.getCartItems)).subscribe(
      cartitems => {
       this.cartitems = cartitems;
       console.log(cartitems);
     })

     this.store.pipe(select(fromCart.getTotalBill)).subscribe(
      totalbill => {
       this.totalbill = totalbill;
     })

     this.store.pipe(select(fromCart.getItemsCount)).subscribe(
      itemscount => {
       this.itemscount = itemscount;
       if(this.itemscount==0)
       {
         $(".cartempty").css("display", "block");
         $(".cartdiv").css("display", "none");
        }
       else
       {
        $(".cartdiv").css("display", "block");
        $(".cartempty").css("display", "none");
       }    
      })


  }


  gethomeslider() {
    this.homesliderService.gethomesliders().subscribe(
      result => {
        this.slideData1 = result;
        console.log(result);
      }
    )
  }

  gettrendingnews() {
    this.homesliderService.gettrendingnews().subscribe(
      result => {
        this.trendingnews = result;
        console.log(result);
      }
    )
  }

  getpopularsearches() {
    this.homesliderService.getpopularsearches().subscribe(
      result => {
        this.popularsearch = result;
        console.log(result);
      }
    )
  }

  gettrendingproducts() {
    this.homesliderService.gettrendingproducts().subscribe(
      result => {
        this.trendingproducts = result;
        console.log(result);
      }
    )
  }

  getfilteredproducts() {
    this.filteredproducts.getfilteredproducts().subscribe(
      result => {
        this.products = result;
        console.log(this.products);
      }
    )
  }

  search():void{
    console.log("kkk");
    this.router.navigateByUrl('/shoppage');
  }

  // slideData = [
  //   {
  //     name: "assets/images/placeholder.png",
  //   },
  //   {
  //     name: "assets/images/placeholder.png",
  //   },
  //   {
  //     name: "assets/images/placeholder.png",
  //   } 
  // ]

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    slidesPerView: 1,
    allowTouchMove: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
    
    on: { slideChange () { 
    $('header-box').show();
    console.log('slideChange') } },

    navigation: {
      nextEl: '.swiper-button-next-unique',
      prevEl: '.swiper-button-prev-unique'
    },
    loop: true
  };

  trending = [
    {
      news :"welcome to swordskingdom",
    },
    {
      news :"welcome to swordskingdom",
    },
    {
      news :"welcome to swordskingdom",
    } 
  ]




  config1: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    slidesPerView: 1,
    allowTouchMove: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: true
    },
    
    navigation: {
      nextEl: '.swiper-button-next-trending',
      prevEl: '.swiper-button-prev-trending'
    },
    loop: true
  };



}
