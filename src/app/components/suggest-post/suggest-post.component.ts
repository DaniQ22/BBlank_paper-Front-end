import { Component } from '@angular/core';

@Component({
  selector: 'app-suggest-post',
  templateUrl: './suggest-post.component.html',
  styleUrls: ['./suggest-post.component.css']
})
export class SuggestPostComponent {

  openSuggestPost: boolean = false;


  openSuggest(){
    this.openSuggestPost = !this.openSuggestPost;
  }

}
