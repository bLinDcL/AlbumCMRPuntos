import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen }     from '@ionic-native/splash-screen/ngx';
import { StatusBar }        from '@ionic-native/status-bar/ngx';
import { Camera }           from '@ionic-native/camera/ngx';
import { Geolocation }      from '@ionic-native/geolocation/ngx';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginService }     from './services/login.service';
import { AppComponent }     from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { tokeninterceptor } from './interceptors/token.interceptor';
import { GoogleMaps }       from '@ionic-native/google-maps';
import { NativeGeocoder }   from '@ionic-native/native-geocoder/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Sim } from '@ionic-native/sim/ngx';
import { IonicStorageModule } from '@ionic/storage';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),IonicStorageModule.forRoot(), AppRoutingModule,HttpClientModule],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    LoginService,
    Geolocation,
    GoogleMaps,
    NativeGeocoder,
    BarcodeScanner,
    WebView,
    Sim,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: tokeninterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
