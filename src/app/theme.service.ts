import {Injectable} from "@angular/core";
import { CookieService } from 'ngx-cookie-service';
/**
 * Created by sagar on 30/8/17.
 */
@Injectable()
export class ThemeService{
 themeName:string;
 constructor(private cookieService:CookieService){
 }

 setThemeName(themeName:string){
   this.themeName=themeName;
   this.cookieService.set('theme_name',this.themeName);
 }
 getCurrentUsageThemeName(){
   if(this.cookieService.get('theme_name')){
    return this.cookieService.get('theme_name');
   }
 }
}
