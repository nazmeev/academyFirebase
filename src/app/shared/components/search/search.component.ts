import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  searchControl: FormControl
  
  constructor(private filmsService: FilmsService){}

  @ViewChild("searchInput", {static: false})
    nameParagraph: ElementRef
    name: string
    click$ = fromEvent(document, 'click')
     
    change() { 
        this.nameParagraph.nativeElement.focus()
    }

  ngOnInit(): void {
    this.searchControl = new FormControl()
  }
  ngAfterViewInit(): void {
    this.nameParagraph.nativeElement.focus()
  }

  searchFilm(search: string){
  }

  submitSearch(form: NgForm){
    this.filmsService.getSearch(form.value.search)
  }
}
