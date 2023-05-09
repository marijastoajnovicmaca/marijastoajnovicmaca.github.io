export interface Book {
    img: string,
    name: string,
    author: string,
    pages: number,
    genre: string,
    publisher: string,
    year: number,
    price: number,
    rating: number,
    bookId: number
  }

export interface BookDetailsData {
  book: Book;
}