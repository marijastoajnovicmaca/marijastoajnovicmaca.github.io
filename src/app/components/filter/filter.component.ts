import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from 'src/app/book';
import { books, calculateAverageRating } from 'src/app/book-data';
import { Review } from 'src/app/review';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  @Output() filteredBooks = new EventEmitter<Book[]>();

  sliderValue: number = 50;
  rateInput: number = 0;

  pages = books.reduce((acc, book) => {
    return {
      min: Math.min(acc.min, book.pages),
      max: Math.max(acc.max, book.pages) + 10
    };
  }, { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER });

  selectedPage: number = this.pages.max;

  price = books.reduce((acc, book) => {
    return {
      min: Math.min(acc.min, book.price),
      max: Math.max(acc.max, book.price) + 10
    };
  }, { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER });

  selectedPrice: number = this.price.max;

  year = books.reduce((acc, book) => {
    return {
      min: Math.min(acc.min, book.year),
      max: Math.max(acc.max, book.year)
    };
  }, { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER });

  selectedYearMin: number = this.year.min;
  selectedYearMax: number = this.year.max;

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

  calculateAverageRating(reviews: Review[]): number
  {
    return calculateAverageRating(reviews);
  }

  applyFilter() {
    // filtrirajte knjige na osnovu izabranih žanrova, autora i izdavača
    let filteredBooks = books.filter(book => {
      return (
        (this.selectedGenres.length === 0 || this.selectedGenres.includes(book.genre)) &&
        (this.selectedAuthors.length === 0 || this.selectedAuthors.includes(book.author)) &&
        (this.selectedPublishers.length === 0 || this.selectedPublishers.includes(book.publisher)) &&
        (calculateAverageRating(book.reviews) >= this.rateInput || !this.rateInput) &&
        (book.price <= this.selectedPrice) &&
        (book.pages <= this.selectedPage) &&
        (book.year >= this.selectedYearMin && book.year <= this.selectedYearMax)
      );
    });
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

  resetFilters() {
    this.selectedGenres = [];
    this.selectedAuthors = [];
    this.selectedPublishers = [];
    this.rateInput = 0;
    this.selectedPrice = this.price.max;
    this.selectedPage = this.pages.max;
    this.selectedYearMin = this.year.min;
    this.selectedYearMax = this.year.max;
    this.applyFilter();
  }

  formatLabel(value: number): string {
    return `${value}`;
  }


}