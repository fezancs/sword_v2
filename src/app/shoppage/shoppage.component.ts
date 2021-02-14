import { Component, OnInit } from '@angular/core';
import { Options } from 'ng5-slider';
import { ProductService } from './services/product.service';
import { Product } from './models/product';
import {  ActivatedRoute,Router } from '@angular/router';
import {CategoryService} from './services/category.service';
import { Category } from './models/category';
import { Subcategory } from './models/subcategory';
import { from } from 'rxjs';
import { SelectiveproductsService } from './services/selectiveproducts.service';
import { SortbyService } from './services/sortby.service';
import { environment } from './../../environments/environment';
import { Store , select } from '@ngrx/store';
import * as CartActions from './../cart.actions';
import * as WishlistActions  from './../wishlist.actions';
import {CartItems} from './../cart';
import { WishlistItems } from './../wishlist';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-shoppage',
  templateUrl: './shoppage.component.html',
  styleUrls: ['./shoppage.component.css']
})
export class ShoppageComponent implements OnInit {
  
  env=environment;
  imageurl=this.env.imageUrl;
  minValue: number = 10;
  maxValue: number = 90;
  options: Options = {
    floor: 0,
    ceil: 100,
    step: 1,
    noSwitching: true
  };


  showloadingspinner=true;
  category: Category[] = [];
  subcategory: Subcategory[] = [];
  show:string="no";
  p: number = 1;
  limit: number = 8;
  total: number;
  title: string;
  productcategory:string;
  slideData: Product[] = [];
  myImage="/images/";
  filterkeyword:string;

  rows: Product[] = [];
  image1:string;
  image2:string;
  image3:string;
  image4:string;
  image5:string;
  short_description:string;
  name:string;
  price:number;
  sale_percent:string;
  sale:string;
  visibility:number;
  rating:number;
  showloadingspinner2=true;
 
  layout:string = 'grid';

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private selectiveproductsService: SelectiveproductsService,
    private sortbyService: SortbyService,
    private store : Store,
    private toastr: ToastrService
  ) { }


  adduser(name :string , price : number, image :string,visibility : number): void {
    console.log(price);
    console.log(image);
    if(visibility == 0)
    {
         alert("this product is out of stock");
    }
    else
    {
      const user: CartItems = {"name" : name , "price" : price,"image":image ,"quantity" : 1};
    
      this.store.dispatch(new CartActions.AddCartItem({"user1":user}));

      this.toastr.success('added to cart' , name);
    }
  }

  addwishlist(name :string , price : number,image :string): void {
    console.log(price);
    console.log(name);
    const user: WishlistItems = {"name" : name ,"image": image, "price" : price ,"quantity" : 1};
    
    this.store.dispatch(new WishlistActions.AddWishlistItem({"user1":user}));

    this.toastr.success('added to wishlist' , name);

  }

  onChange(deviceValue) {
    console.log(deviceValue);
    this.limit=deviceValue;
    this.getProducts(this.p);
  }
  onChangecategory(value){
    console.log(value);
    this.productcategory=value;
    this.getproductsbytype(1);
  }
  onChangesort(value){
    console.log(value);
    if(value=='name'){
      var p=1;
      let offset = (p - 1) * this.limit;
      this.showloadingspinner=true;
      this.sortbyService.getProductsbyname(offset, this.limit).subscribe(
        result => {
          this.slideData = result.data;
          console.log(result.data);
          console.log(this.slideData);
          this.total = result.total;
          this.showloadingspinner=false;
          this.show="yes"
          console.log(result);
        }
      )
    }
    if(value=='price'){
      var p=1;
      let offset = (p - 1) * this.limit;
      this.showloadingspinner=true;
      this.show="no";
      this.sortbyService.getProductsbyprice(offset, this.limit).subscribe(
        result => {
           this.slideData = result.data;
           console.log(result.data);
           console.log(this.slideData);
           this.total = result.total;
          this.showloadingspinner=false;
          this.show="yes";
          console.log(result.total);
        }
      )
    }

  }

  ngOnInit(): void {
    
    if(localStorage.getItem("filterkeyword"))
    {
      this.filterkeyword=localStorage.getItem("filterkeyword");
      console.log(this.filterkeyword);
      this.getfilteredproducts(1);
      localStorage.removeItem("filterkeyword");
    }
    else if( this.route.snapshot.paramMap.get('category') ) {
      this.productcategory = this.route.snapshot.paramMap.get('category');
      console.log(this.productcategory);
      this.getproductsbytype(1);
    }
    else{
      this.getProducts(this.p);
    }

    this.getcategorys();
    this.getsubcategorys();

    this.title = 'Products';
  

  $('button').on('click',function(e) {
    if ($(this).hasClass('grid')) {
        $('#listgrid-container ul').removeClass('list').addClass('grid');
    }
    else if($(this).hasClass('list')) {
        $('#listgrid-container ul').removeClass('grid').addClass('list');
    }
   });

   let slides = document.getElementById('slideshow');
let imgs = slides.getElementsByTagName('img');
let imagemSelecionada = document.getElementById('displayed-img');
let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let counter = 0;

next.addEventListener('click',nextSlide, false);
prev.addEventListener('click',prevSlide, false);

for (let i = 0; i < imgs.length; i++) {
       let index = i;
       let imagem = imgs[i];     
       clickImage(imagem, index);
       //imagem.setAttribute('data-index', index);       
  }
  function goToSlide(n) {
    counter = (n + imgs.length) % imgs.length;
    mudaImagem(imgs[counter], n);
    console.log(counter)
}

  function nextSlide() {
    goToSlide(counter + 1);    
  }
  
  function prevSlide() {
    goToSlide(counter - 1);
  }

  function mudaImagem(imagem, index) {    
    let path = imagem.getAttribute('src');
    imagemSelecionada.setAttribute('src', path);
  }

  function clickImage(imagem, index) {
      imagem.addEventListener('click', function(event){
      event.preventDefault();    
      mudaImagem(imagem, index); 
      goToSlide(index);
     });     
  }




  }

  getProducts(p: number) {
    let offset = (p - 1) * this.limit;
    this.productService.getProducts(offset, this.limit).subscribe(
      result => {
        this.slideData = result.data;
        console.log(result.data);
        console.log(this.slideData);
        this.total = result.total;
        this.showloadingspinner=false;
      }
    )
  }

  getPage(pageNo: number) {
    this.p = pageNo;
    this.getProducts(this.p);
  }

  getcategorys() {
    this.categoryService.getcategorys().subscribe(
      result => {
        this.category= result;
        console.log(this.category);
      }
    )
  }

  getsubcategorys() {
    this.categoryService.getsubcategorys().subscribe(
      result => {
        this.subcategory = result;
        console.log(this.subcategory);
      }
    )
  }

  getupdatesearchresult(pageNo: number) {
    this.p = pageNo;
    console.log(this.p);
    this.updatesearchresult(this.p);
  }

  updatesearchresult(p: number){
    let offset = (p - 1) * this.limit;
    console.log("offset");
    console.log(offset);
    this.showloadingspinner=true;
    this.show="no";
    this.selectiveproductsService.getselectiveproducts(this.minValue,this.maxValue,offset, this.limit).subscribe(
      result => {
        console.log("priceslider");
        this.slideData = result.data;
        console.log(result.data);
        console.log(this.slideData);
        this.total = result.total;
        this.showloadingspinner=false;
        this.show="yes";
      }
    )
  }

  getproductsbytype(pageNo: number) {
    this.p = pageNo;
    console.log(this.p);
    this.productsbytype(this.p);
  }

  productsbytype(p: number){
    let offset = (p - 1) * this.limit;
    console.log("offset");
    console.log(offset);
    this.selectiveproductsService.getproductsbytype(this.productcategory,offset, this.limit).subscribe(
      result => {
        console.log("category");
        this.slideData = result.data;
        console.log(result.data);
        console.log(this.slideData);
        this.total = result.total;
        this.showloadingspinner=false;
      }
    )
  }

  getfilteredproducts(pageNo: number) {
    this.p = pageNo;
    this.filteredproducts(this.p);
  }
  filteredproducts(p: number){
    console.log("filter");
    let offset = (p - 1) * this.limit;
    this.selectiveproductsService.getfilterproducts(this.filterkeyword,offset, this.limit).subscribe(
      result => {
        console.log("filter");
        console.log(result);
        this.slideData = result.data;
        this.total = result.total;
        this.showloadingspinner=false;
      }
    )
  }

  slideData2 = [
    {
      image: "assets/images/product1.png",
      name: "CLASSIC SWORD",
      price: "$99.00",
    },
    {
      image: "assets/images/product1.png",
      name: "CASUAL GOLD SWORD",
      price: "$99.00",
    },
    {
      image: "assets/images/product1.png",
      name: "HOBBIT BLACK KNIGHT",
      price: "$99.00",
    },
    {
      image: "assets/images/product1.png",
      name: "CLASSIC SWORD",
      price: "$99.00",
    },
    {
      image: "assets/images/product1.png",
      name: "HOBBIT BLACK KNIGHT",
      price: "$99.00",
    },
    {
      image: "assets/images/product1.png",
      name: "HAYYAR POTER SWORD",
      price: "$99.00",
    },
  ]

  // category1 = [
  //   {
  //     id:"1",
  //     name: "abc",
  //   },
  //   {
  //     id:"3",
  //     name: "def",
  //   },
  //   {
  //     id:"2",
  //     name: "ghi",
  //   } 
  // ]

  // subcategory1 = [
  //   {
  //     id:"1",
  //     parentid:"1",
  //     name: "aaa",
  //   },
  //   {
  //     id:"1",
  //     parentid:"1",
  //     name: "aaaaaaaaaa",
  //   },
  //   {
  //     id:"3",
  //     parentid:"2",
  //     name: "eee",
  //   },
  //   {
  //     id:"2",
  //     parentid:"3",
  //     name: "sss",
  //   } 
  // ]

  showquickview(quickview_sku : string) : void{  
    if($(".search-content").css("display")=="none")
    {
      $(".search-content").css("display", "block");
      
      this.selectiveproductsService.getquickview(quickview_sku).subscribe(
        result => {
          
          this.image1=result.data.image1;
          this.image2=result.data.image2;
          this.image3=result.data.image3;
          this.image4=result.data.image4;
          this.image5=result.data.image5;
          this.short_description=result.data.short_description;
          this.name=result.data.name;
          this.price=result.data.price;
          this.sale=result.data.sale;
          this.visibility=result.data.visibility;
          this.sale_percent=result.data.sale_percent;
          this.rating=result.data.rating;
          this.showloadingspinner2=false;
          console.log(this.image1);
        }
      )
    }
  }

  closeSearch():void{
    $(".search-content").css("display", "none");
  }

  print(category:string , subcategory:string)
  {
    console.log(category);
    console.log(subcategory);
    
    let offset = (this.p - 1) * this.limit;
    
    this.productService.getroductbycategory(category, subcategory,offset, this.limit).subscribe(
      result => {
        this.slideData = result.data;
        console.log(result);
        this.total = result.total;
      }
    )


  }


}
