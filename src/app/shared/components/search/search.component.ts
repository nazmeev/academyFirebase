import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';

import { FormControl, NgForm } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { FilmsService } from '../../services/films.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit {
  searchControl: FormControl;
  
  // @Input() search:string;
  // public searchText: string;
  // @Output() searchText = new EventEmitter<string>();
  
  constructor(private filmsService: FilmsService){

  }

  @ViewChild("searchInput", {static: false})
    nameParagraph: ElementRef;
    name: string;
    click$ = fromEvent(document, 'click')
     
    change() { 
        console.log(this.nameParagraph.nativeElement.textContent); 
        this.nameParagraph.nativeElement.focus();
    }
  // @ViewChild("searchInput", { read: ElementRef }) 
  // public searchValue: ElementRef;

  ngOnInit(): void {
    this.searchControl = new FormControl()
    // this.searchValue.nativeElement.focus();
  }
  ngAfterViewInit(): void {
    this.nameParagraph.nativeElement.focus();
  }
  // ngaftervoewinit

  // searchFilm(text: string) {
  //   this.searchText.emit(text);
  // }

  searchFilm(search: string){
    console.log('searchFilm turn off', search)
    // let films = this.filmsService.getSearch(search);
  }
  // searchFilm2(search: NgForm){
  //   console.log('222222222222', search)
  // }

  submitSearch(form: NgForm){
    this.filmsService.getSearch(form.value.search)
    // Object.keys(form.value).map(key => console.log({value: form.value[key], field: key}) )
      
  }
}
