import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ThemeService} from "./theme.service";
declare var $;
const CSS_LOCATION : string = 'assets/themes/';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isMobile : boolean;
  deviceHeight : any;
  deviceWidth : any;
  constructor(private _router : Router,private themeService:ThemeService){
  }
  routeToLink(data: any){
    if(!data.hasOwnProperty('childrens') && data.routerLink)
      this._router.navigate([data.routerLink]);
  }
  reAdjust(){
    this.deviceHeight = $(window).height();
    this.deviceWidth = $(window).width();
    if(this.deviceWidth < 768){
      this.isMobile = true;
    }
  }
  onResize(event:any){
    this.reAdjust();
    if (event.target.innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }
  //apply theme and remove old theme css
  applyTheme(name : any){

    let currentTheme = document.head.querySelectorAll(`link[rel="stylesheet"]`);
    this.removeExistingTheme(currentTheme);
    if(name!=null)
      this.createAndApplyNewTheme(name);
  }

  //remove old theme css
  removeExistingTheme(keyList : any){
    if(keyList!=null && keyList && keyList.length!=0){
      keyList.forEach(
        (key)=>{
          document.head.removeChild(key);
        }
      );

    }

  }

  createAndApplyNewTheme(theme : any){

    if(theme==="MDB"){
      //this is for MDB theme
      let linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'stylesheet');
      linkEl.href = CSS_LOCATION+'styles1.css';
      document.head.appendChild(linkEl);

      //add material +family=Roboto api
      let font1 = document.createElement('link');
      font1.setAttribute('rel', 'stylesheet');
      font1.href = "https://fonts.googleapis.com/css?family=Roboto:400,500,700;";
      document.head.appendChild(font1);

      let font2 = document.createElement('link');
      font2.setAttribute('rel', 'stylesheet');
      font2.href = "https://fonts.googleapis.com/icon?family=Material+Icons";
      document.head.appendChild(font2);
    }else{
      //this is for default theme
      let linkEl = document.createElement('link');
      linkEl.setAttribute('rel', 'stylesheet');
      linkEl.href = CSS_LOCATION+'styles.css';
      document.head.appendChild(linkEl);
    }

  }
  ngOnInit(){
    //set themename which user selected
    this.themeService.setThemeName(this.themeService.getCurrentUsageThemeName());

    //Theme apply
    if(this.themeService.getCurrentUsageThemeName()){
      this.applyTheme(this.themeService.getCurrentUsageThemeName());
    }
    this.reAdjust();
  }
}
