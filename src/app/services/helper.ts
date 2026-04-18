import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  constructor(){
     
  }


  lang = "en";

  greeting = "Hello"

  
  chageLanguage(){
      this.lang == "en" ? this.lang = "geo" : this.lang = "en";
      this.lang == "en" ? this.greeting = "Hello" : this.greeting = "გამარჯობა";
  }

  clearString(str : string){
    return str.trim().toLowerCase()
  }

}
