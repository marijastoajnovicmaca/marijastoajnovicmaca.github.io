import { Book } from "./book";

export enum Stage {
    cancelled =  "Otkazano" ,
    during = "U toku",
    arrived = "Pristiglo"
}

export interface CartItem{
    book: Book;
    count: number;
    stage: Stage;
}