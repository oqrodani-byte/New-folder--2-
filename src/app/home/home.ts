import { ChangeDetectorRef, Component } from '@angular/core';
import { Helper } from '../services/helper';
import { Api } from '../services/api';
import { Product } from '../models/product';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
   
     constructor(private help : Helper, private api : Api, private cdr : ChangeDetectorRef){
      // console.log(this.help.clearString("            hELllo    "));
      console.log(this.help.greeting);

      this.greet = this.help.greeting;

      console.log(this.greet);
        
     }



    ngOnInit(){
        this.api.getAll("Products/GetAll").subscribe((resp:any) => {
          console.log(resp)
           this.productsarr = resp 

          this.cdr.detectChanges()  // ყველა ქოლის მერე დაამატეთ 
           
        })


          this.api.getAll("Categories/GetAll").subscribe((resp:any) => {
          console.log(resp)
           this.categories = resp 

          this.cdr.detectChanges()  // ყველა ქოლის მერე დაამატეთ 
           
        })

        this.api.getAll2("products").subscribe((resp:any) => {
          console.log(resp.data.products)
           
          this.cdr.detectChanges()  // ყველა ქოლის მერე დაამატეთ 
           
        })

        
    }



    // Categories/GetAll

     greet = ""
     categories : any[] = []
     productsarr :Product[]=[]

    //  inject()
}


//  promise    observeable
// .then      .subscribe 


// zone.js