import { Component, OnInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { YoumaylikeService } from '../services/youmaylike.service';
import { Product } from '../models/product';
import { QuickviewService } from '../services/quickview.service';
import { environment } from '../../../environments/environment';
import { Store , select } from '@ngrx/store';
import * as CartActions from '../../cart.actions';
import * as WishlistActions  from '../../wishlist.actions';
import {CartItems} from '../../cart';
import { WishlistItems } from '../../wishlist';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-youmaylike',
  templateUrl: './youmaylike.component.html',
  styleUrls: ['./youmaylike.component.css']
})
export class YoumaylikeComponent implements OnInit {

  env=environment;
  imageurl=this.env.imageUrl;
  rows:Product[]=[];
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
  showloadingspinner1=true;
  constructor(private productService: YoumaylikeService, private quickService: QuickviewService,private store : Store,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getpopular();

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

  getpopular() {
    console.log("popular");
    this.productService.getpopular().subscribe(
      result => {
        this.rows = result;
        console.log(result);
      }
    )
  }

  showquickview(quickview_sku : string) : void{  
   
    if($(".search-content").css("display")=="none")
    {
      $(".search-content").css("display","block");
      
      this.quickService.getquickview(quickview_sku).subscribe(
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
  

  slideData = [
    {
      id: 382,
      name: "Metal bluetooth cyan",
    }, {
      id: 822,
      name: "Avon",
    }, {
      id: 159,
      name: "Infrastructures",
    }, {
      id: 424,
      name: "Users Cotton",
    }, {
      id: 572,
      name: "Haptic Oklahoma Jewelery",
    }, {
      id: 127,
      name: "Circles Integration Street",
    }, {
      id: 1009,
      name: "uniform Communications Tuna",
    }, {
      id: 619,
      name: "North Carolina",
    }, {
      id: 716,
      name: "Eyeballs Rubber",
    }, {
      id: 382,
      name: "Nevada green unleash",
    }
  ]

  config: SwiperOptions = {
    pagination: { el: '.swiper-pagination', clickable: true },
    autoHeight: true,
    slidesPerView: 4,
    allowTouchMove: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: true
    },
    
    navigation: {
      nextEl: '.swiper-button-next-unique',
      prevEl: '.swiper-button-prev-unique'
    },
    loop: true
  };


}
