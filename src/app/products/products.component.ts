import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { FilterPipe } from "../filter.pipe";

@Component({
    selector: 'app-products',
    standalone: true,
    templateUrl: './products.component.html',
    styleUrl: './products.component.scss',
    imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, NgxPaginationModule, FilterPipe]
})
export class ProductsComponent {
  addProducts: FormGroup | any;
  porductsList:any=[];
  submitted = false;
  onSubmit = false;
  selectIndex = '';
totalLength: any;
page:number = 1;
searchText = '';

  constructor(private fb:FormBuilder, private http:HttpClient){
    this.addProducts = fb.group(({
      productName: ['', Validators.required],
      productColor: ['', Validators.required],
      productPrice: ['', Validators.required],
    }))
  }
    
  ngOnInit(){
    this.getProduct();
  }

  get f(){
    return this.addProducts.controls
  }

  getProduct(){
    this.http.get('http://localhost:3000/Products').subscribe((result)=>{
      this.porductsList = result;
    })
  }

  Submit(){
    this.submitted = true;
    if(this.addProducts.valid){
      this.http.post('http://localhost:3000/Products', this.addProducts.value).subscribe((result)=>{
        this.getProduct();
      })
    }
  }

  onEdit(list:any, id:any){
    this.selectIndex = id;
    this.onSubmit = true;
    this.addProducts.patchValue({
      productName:list.productName,
      productColor:list.productColor,
      productPrice:list.productPrice
    })
  }

  Update(){
    this.onSubmit = false;
    this.http.put('http://localhost:3000/Products/'+ this.selectIndex, this.addProducts.value)
    .subscribe((result)=>{
      this.getProduct();
    });
  }

  Delete(id:any){
    this.http.delete('http://localhost:3000/Products/'+ id)
    .subscribe((result)=>{
      this.getProduct();
    })
  }
}
