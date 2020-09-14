import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  public statusCode: number = 404;
  public statusText: string = 'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.';

  constructor(private route: ActivatedRoute) {
    this.getParams();
  }

  ngOnInit(): void {}

  getParams(){
    this.route.params.subscribe(params => {
      if(params.statusCode) this.statusCode = params.statusCode
      if(params.statusText) this.statusText = params.statusText
    })
  }
}
