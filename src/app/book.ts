import { Review } from "./review";

export interface Book {
    img: string;
    name: string;
    author: string,
    pages: number,
    genre: string,
    publisher: string,
    year: number,
    price: number;
    bookId: number;
    reviews: Review[];
    rating: number;
  }

export interface BookDetailsData {
  book: Book;
}