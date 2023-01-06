import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppStateInterface } from './types/appState.interface';
import * as PostService from '../app/store/actions'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  constructor(private store: Store<AppStateInterface>){
    
  }
  // this.store.dispatch(PostService.getPosts())
  ngOnInit(): void {
    this.store.dispatch(PostService.getPosts())
  }
}
