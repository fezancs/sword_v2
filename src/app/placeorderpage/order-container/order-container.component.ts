import { Component, OnInit } from '@angular/core';
import { Store , select } from '@ngrx/store';
import * as CartActions from '../../cart.actions';
import * as fromCart from '../../cart.selectors';
import {CartItems} from '../../cart';
import { createAction, props } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginserviceService } from '../services/loginservice.service';
import { MessageService } from 'src/app/services/message.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-order-container',
  templateUrl: './order-container.component.html',
  styleUrls: ['./order-container.component.css']
})
export class OrderContainerComponent implements OnInit {

  env=environment;
  imageurl=this.env.imageUrl;
  cartitems : CartItems[] = [];
  totalbill :number;
  loginForm: FormGroup;
  submitted =false;
  email:string;

  constructor(private store : Store,
    private fb: FormBuilder,
    private loginservice:LoginserviceService,
    private messageService: MessageService,
    private router: Router,) { 
      if (this.loginservice.isLoggedIn()) {
        console.log("redirected");
        this.router.navigateByUrl('/clientdashboard');      
      }
    }

  // adduser(): void {
  //   const user: CartItems = {"name" : "sword" , "price" : 99 ,"image":"http://localhost:3000/images/product.png","quantity" : 1};
    
  //   this.store.dispatch(new CartActions.AddCartItem({"user1":user}));
  // }

  ngOnInit(): void {

    this.createForm();

    this.store.pipe(select(fromCart.getCartItems)).subscribe(
      cartitems => {
       this.cartitems = cartitems;
     })

     this.store.pipe(select(fromCart.getTotalBill)).subscribe(
      totalbill => {
       this.totalbill = totalbill;
     })

  }

  createForm() {
    this.loginForm = this.fb.group({
      emailaddress: ['',[Validators.required,Validators.email]],
      password: ['', [Validators.required]],
    },)

  }
  get f() { return this.loginForm.controls; }

  onSubmit1(event) {
    console.log("hi");
    this.submitted=true;
    if (this.loginForm.invalid) {
      return;
    }
    event.preventDefault();
    
    this.loginservice.login({
      emailaddress: this.loginForm.get('emailaddress').value,
      password: this.loginForm.get('password').value
    }).subscribe(
      result => {
        if (result) {
          this.messageService.clear();
          this.email=this.loginForm.get('emailaddress').value;
          localStorage.setItem("email",this.email);
        //  this.env.user_email=this.loginForm.get('emailaddress').value
       //   console.log(this.env.user_email);
          this.router.navigateByUrl('/clientdashboard');
        }
      }
    )

    this.submitted=false;
  }


  // slideData = [
  //   {
  //     name: "Flusas Knife",
  //     quantity: "1",
  //     price :"$99.00"
  //   },
  //   {
  //     name: "Number 1 SWORD",
  //     quantity: "2",
  //     price :"$99.00"
  //   },
  //   {
  //     name: "Fighter Sword",
  //     quantity: "1",
  //     price :"$99.00"
  //   }      
  // ]
}
