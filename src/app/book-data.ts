import { Book } from "./book";
import { Review } from "./review";
import { reviews } from "./review-data";

export function calculateAverageRating(reviews: Review[]): number {
  if (reviews.length === 0) {
    return 0; // Vraćamo 0 ako nema recenzija
  }

  const sum = reviews.reduce((acc, review) => acc + review.star, 0);
  const average = sum / reviews.length;

  return average;
}

export const books: Book[] = [
    {
        img: '../assets/images/saptac.jpg',
        name: 'Šaptač',
        author: 'Donato Karizi',
        pages: 360,
        genre: 'misterija',
        publisher: 'Vulkan',
        year: 2021,
        price: 850,
        bookId: 1,
        reviews: [reviews[0], reviews[4]],
        rating: 0
    }, 
    {
      img: '../assets/images/majstor.jpg',
      name: 'Majstor i Margarita',
      author: 'Mihail Bulgakov',
      pages: 519,
      genre: 'klasik',
      publisher: 'Laguna',
      year: 2020,
      price: 999,
      bookId: 2,
      reviews: [reviews[0], reviews[5]],
      rating: 0
    },{
      img: '../assets/images/mojmuz.jpg',
      name: 'Moj muž',
      author: 'Rumena Bužarovska',
      pages: 149,
      genre: 'zbirka priča',
      publisher: 'Booka',
      year: 2017,
      price: 792,
      bookId: 3,
      reviews: [reviews[2], reviews[4]],
      rating: 0
    },{
      img: '../assets/images/nastanci.jpg',
      name: 'Nastanci',
      author: 'Nil de Gras Tajson',
      pages: 317,
      genre: 'astronomija',
      publisher: 'Laguna',
      year: 2005,
      price: 749,
      bookId: 4,
      reviews: [reviews[5], reviews[1]],
      rating: 0
    },{
      img: '../assets/images/poreklo.jpg',
      name: 'Poreklo',
      author: 'Den Braun',
      pages: 419,
      genre: 'misterija',
      publisher: 'Solaris',
      year: 2017,
      price: 2749,
      bookId: 5,
      reviews: [reviews[0], reviews[1]],
      rating: 0
    },{
      img: '../assets/images/autostoper.jpg',
      name: 'Autostoperski vodič kroz galaksiju',
      author: 'Daglas Adams',
      pages: 632,
      genre: 'fantastika',
      publisher: 'Vulkan',
      year: 2013,
      price: 1115,
      bookId: 6,
      reviews: [reviews[0], reviews[4]],
      rating: 0
    },{
      img: '../assets/images/volime.jpg',
      name: 'Voli me više od svega na svijetu',
      author: 'Mira Furlan',
      pages: 736,
      genre: 'biografija',
      publisher: 'Booka',
      year: 2022,
      price: 1694,
      bookId: 7,
      reviews: [],
      rating: 0
    },{
      img: '../assets/images/uhvatizeca.jpg',
      name: 'Uhvati zeca',
      author: 'Lana Bastašić',
      pages: 273,
      genre: 'roman',
      publisher: 'Booka',
      year: 2020,
      price: 792,
      bookId: 8,
      reviews: [reviews[0], reviews[4]],
      rating: 0
    },{
      img: '../assets/images/paralelni.jpg',
      name: 'Paralelni univezumi',
      author: 'Mičio Kaku',
      pages: 384,
      genre: 'fizika',
      publisher: 'Helix',
      year: 2014,
      price: 1793,
      bookId: 9,
      reviews: [reviews[3], reviews[0]],
      rating: 0
    },{
      img: '../assets/images/labud.jpg',
      name: 'Crni Labud',
      author: 'Nasim Nikolas Taleb',
      pages: 472,
      genre: 'ekonomija',
      publisher: 'Helix',
      year: 2015,
      price: 1840,
      bookId: 10,
      reviews: [reviews[3], reviews[2]],
      rating: 0
    }
];