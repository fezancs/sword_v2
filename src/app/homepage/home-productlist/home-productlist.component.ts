import { Component, OnInit } from '@angular/core';
import { Store , select } from '@ngrx/store';
import * as CartActions from '../../cart.actions';
import * as WishlistActions  from '../../wishlist.actions';
import * as fromCart from '../../cart.selectors';
import * as fromWishlist from '../../wishlist.selectors';
import {CartItems} from '../../cart';
import { WishlistItems } from '../../wishlist';
import { createAction, props } from '@ngrx/store';
import { event } from 'jquery';
import { ValueTransformer } from '@angular/compiler/src/util';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home-productlist',
  templateUrl: './home-productlist.component.html',
  styleUrls: ['./home-productlist.component.css']
})
export class HomeProductlistComponent implements OnInit {

  env=environment;
  imageurl=this.env.imageUrl;
  showloadingspinner1=true;
  rows: Product[] = [];
  rows1: Product[] = [];
  quick:string="aaa";
  report:string="qq";
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

  constructor(private store : Store,private productService: ProductService,
    private router: Router,private toastr: ToastrService) { }

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
  
  showquickview(quickview_sku : string) : void{  
   
    if($(".search-content").css("display")=="none")
    {
      $(".search-content").css("display","block");
      
      this.productService.getquickview(quickview_sku).subscribe(
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
          this.showloadingspinner1=false;
          console.log(result);
        }
      )

    }
  }
  closeSearch():void{
    $(".search-content").css("display", "none");
  }
  
 
   ngOnInit(): void {
   
    let slides = document.getElementById('slideshow');
    let imgs = slides.getElementsByTagName('img');
    let imagemSelecionada = document.getElementById('displayed-img');
    let prev = document.getElementById('prev');
    let next = document.getElementById('next');
    let counter = 0;
    
    next.addEventListener('click',nextSlide, false);
    prev.addEventListener('click',prevSlide, false);
    
    for (let i = 0; i < imgs.length; i++) {
           console.log(i);
           let index = i;
           let imagem = imgs[i];  
           console.log(imagem);   
           clickImage(imagem, index);
           //imagem.setAttribute('data-index', index);       
      }
      function goToSlide(n) {
        counter = (n + imgs.length) % imgs.length;
        mudaImagem(imgs[counter], n);
        console.log(imgs[counter]);
        console.log(counter)
    }
    
      function nextSlide() {
        console.log("next");
        goToSlide(counter + 1);    
      }
      
      function prevSlide() {
        console.log("pre");
        goToSlide(counter - 1);
      }
    
      function mudaImagem(imagem, index) {    
        let path = imagem.getAttribute('src');
        console.log("path");
        console.log(path);
        imagemSelecionada.setAttribute('src', path);
      }
    
      function clickImage(imagem, index) {
          imagem.addEventListener('click', function(event){
          event.preventDefault();    
          mudaImagem(imagem, index); 
          goToSlide(index);
         });     
      }
    


    

    $('#bestseller').css("color","#a81000");
    this.getbestsellers();

    $( ".pclass" ).click(function(e) {
      e.preventDefault;
      $(".pclass").css("color","rgba(76,76,76,255)");
      $(this).css("color","#a81000");
      if(e.target.id=="bestseller")
      {
        console.log("best");  
       // this.get1();
      }
      if(e.target.id=="popular")
      {
        console.log("popular");  
      }
     
    });
  


}




  getbestsellers() {
    console.log("bestseller");
    this.productService.getbestsellers().subscribe(
      result => {
        this.rows = result;
        console.log(result);
      }
    )
  }  
  
  getpopular() {
    console.log("popular");
    this.productService.getpopular().subscribe(
      result => {
        this.rows = result;
        console.log(result);
      }
    )
  }

  // getquickview() {
  //   console.log("aaa");
  //   console.log(this.env1.quickview_sku);
  //   if(this.env1.quickview_sku.length>0){
  //   this.productService.getquickview(this.env1.quickview_sku).subscribe(
  //     result => {
  //       //this.rows = result.data;
  //       console.log(result);
  //     }
  //   )
  //   }
  // }

  
  adduser1(): void {
    var name = $(".product-name").text();
    var price =Number($(".product-price").text());
    var quantity=Number($("#num2").val());
    
    const user: CartItems = {"name" : name , "price" : price ,"image":"http://localhost:3000/images/product.png" ,"quantity" : quantity};
    
    this.store.dispatch(new CartActions.AddCartItem({"user1":user}));
  }


  slideData = [
    {
      image :"assets/images/productgallery.png",
      hr:"assets/images/productgallery.png",
    }, {
      image :"assets/images/productgallery.png",
      hr:"assets/images/productgallery.png",
    }, {
    image :"assets/images/productgallery.png",
    hr:"assets/images/productgallery.png",
    }, {
      image :"assets/images/productgallery.png",
      hr:"assets/images/productgallery.png",
    }, {
      image :"assets/images/productgallery.png",
      hr:"assets/images/productgallery.png",
    }
  ]

}
