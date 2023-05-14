import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/book';
import { books } from 'src/app/book-data';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Output() filteredBooks = new EventEmitter<Book[]>();

  sliderValue: number = 50;
  minRate: number = 0;

  pages = books.reduce((acc, book) => {
    return {
      min: Math.min(acc.min, book.pages),
      max: Math.max(acc.max, book.pages)
    };
  }, { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER });

  price = books.reduce((acc, book) => {
    return {
      min: Math.min(acc.min, book.price),
      max: Math.max(acc.max, book.price)
    };
  }, { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER });

  year = books.reduce((acc, book) => {
    return {
      min: Math.min(acc.min, book.year),
      max: Math.max(acc.max, book.year)
    };
  }, { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER });

  genres: string[] = [];
  authors: string[] = [];
  publishers: string[] = [];

  selectedGenres: string[] = [];
  selectedAuthors: string[] = [];
  selectedPublishers: string[] = [];

  constructor() {
    // popunite nizove žanrova, autora i izdavača na osnovu postojećih knjiga
    this.genres = Array.from(new Set(books.map(book => book.genre)));
    this.authors = Array.from(new Set(books.map(book => book.author)));
    this.publishers = Array.from(new Set(books.map(book => book.publisher)));
  }

  applyFilter() {
    // filtrirajte knjige na osnovu izabranih žanrova, autora i izdavača
    let filteredBooks = books.filter(book => {
      return (
        (this.selectedGenres.length === 0 || this.selectedGenres.includes(book.genre)) &&
        (this.selectedAuthors.length === 0 || this.selectedAuthors.includes(book.author)) &&
        (this.selectedPublishers.length === 0 || this.selectedPublishers.includes(book.publisher))
      );
    });
    console.log(filteredBooks);
    this.filteredBooks.emit(filteredBooks);
  }

  toggleGenreSelection(genre: string) {
    const index = this.selectedGenres.indexOf(genre);
    if (index === -1) {
      this.selectedGenres.push(genre);
    } else {
      this.selectedGenres.splice(index, 1);
    }
    this.applyFilter();
  }

  toggleAuthorSelection(author: string) {
    const index = this.selectedAuthors.indexOf(author);
    if (index === -1) {
      this.selectedAuthors.push(author);
    } else {
      this.selectedAuthors.splice(index, 1);
    }
    this.applyFilter();
  }

  togglePublisherSelection(publisher: string) {
    const index = this.selectedPublishers.indexOf(publisher);
    if (index === -1) {
      this.selectedPublishers.push(publisher);
    } else {
      this.selectedPublishers.splice(index, 1);
    }
    this.applyFilter();
  }

  formatLabel(value: number): string {
    return `${value}`;
  }


}