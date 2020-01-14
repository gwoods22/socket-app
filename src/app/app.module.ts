import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from 'src/app/app.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:4444', options: {} };

// Components
import { HomeComponent } from 'src/app/components/home/home.component';
import { BasicComponent } from 'src/app/components/basic/basic.component';
import { DocumentComponent } from 'src/app/components/document/document.component';
import { DocumentListComponent } from 'src/app/components/document-list/document-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BasicComponent,
    DocumentComponent,
    DocumentListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
