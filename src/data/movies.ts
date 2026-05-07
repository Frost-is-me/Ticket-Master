export interface Movie {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  durationMinutes: number;
  genre: string[];
}

export const movies: Movie[] = [
  {
    id: "dune-2",
    title: "Dune: Part Two",
    description:
      "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    durationMinutes: 166,
    genre: ["Sci-Fi", "Adventure"],
  },
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    description:
      "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    durationMinutes: 180,
    genre: ["Drama", "History"],
  },
  {
    id: "inside-out-2",
    title: "Inside Out 2",
    description:
      "Riley enters puberty and her emotions face new challenges as Anxiety, Envy, and others arrive at headquarters.",
    posterUrl: "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    durationMinutes: 96,
    genre: ["Animation", "Family", "Comedy"],
  },
  {
    id: "the-batman",
    title: "The Batman",
    description:
      "When a sadistic serial killer begins murdering key political figures in Gotham, Batman uncovers corruption.",
    posterUrl: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
    durationMinutes: 176,
    genre: ["Action", "Crime", "Mystery"],
  },
  {
    id: "barbie",
    title: "Barbie",
    description: "Barbie suffers a crisis that leads her to question her world and her existence.",
    posterUrl: "https://image.tmdb.org/t/p/w500/iuFNMS8U5cb6xfzi51Dbkovj7vM.jpg",
    durationMinutes: 114,
    genre: ["Comedy", "Adventure", "Fantasy"],
  },
  {
    id: "interstellar",
    title: "Interstellar",
    description:
      "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
    durationMinutes: 169,
    genre: ["Sci-Fi", "Drama", "Adventure"],
  },
  {
    id: "spiderman-across-spiderverse",
    title: "Spider-Man: Across the Spider-Verse",
    description:
      "Miles Morales catapults across the Multiverse, where he encounters a team of Spider-People charged with protecting its very existence.",
    posterUrl: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg",
    durationMinutes: 140,
    genre: ["Animation", "Action", "Adventure", "Sci-Fi"],
  },
  {
    id: "inception",
    title: "Inception",
    description:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterUrl: "https://image.tmdb.org/t/p/w500/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg",
    durationMinutes: 148,
    genre: ["Action", "Sci-Fi", "Adventure"],
  },
  {
    id: "deadpool-wolverine",
    title: "Deadpool & Wolverine",
    description:
      "A listless Wade Wilson toils in civilian life. His days as the morally flexible mercenary, Deadpool, behind him. When his homeworld faces an existential threat.",
    posterUrl: "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    durationMinutes: 127,
    genre: ["Action", "Comedy", "Sci-Fi"],
  },
  {
    id: "gladiator-2",
    title: "Gladiator II",
    description:
      "Years after witnessing the death of the revered hero Maximus at the hands of his uncle, Lucius is forced to enter the Colosseum.",
    posterUrl: "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    durationMinutes: 148,
    genre: ["Action", "Adventure", "Drama"],
  },
  {
    id: "joker-2",
    title: "Joker: Folie à Deux",
    description:
      "Arthur Fleck is institutionalized at Arkham, awaiting trial for his crimes as Joker. While struggling with his dual identity, Arthur not only stumbles upon true love.",
    posterUrl: "https://image.tmdb.org/t/p/w500/aciP8Km0waTLXEYf5ybFK5CSUxl.jpg",
    durationMinutes: 138,
    genre: ["Drama", "Crime", "Thriller"],
  },
  {
    id: "avatar-2",
    title: "Avatar: The Way of Water",
    description:
      "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns to finish what was previously started.",
    posterUrl: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
    durationMinutes: 192,
    genre: ["Sci-Fi", "Action", "Adventure"],
  },
  {
    id: "the-godfather",
    title: "The Godfather",
    description:
      "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone, barely survives an attempt on his life.",
    posterUrl: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    durationMinutes: 175,
    genre: ["Drama", "Crime"],
  },
  {
    id: "pulp-fiction",
    title: "Pulp Fiction",
    description:
      "A burger-loving hit man, his philosophical partner, a drug-addled gangster's moll and a washed-up boxer converge in this sprawling, comedic crime caper.",
    posterUrl: "https://image.tmdb.org/t/p/w500/vQWk5YBFWF4bZaofAbv0tShwBvQ.jpg",
    durationMinutes: 154,
    genre: ["Thriller", "Crime"],
  },
];
