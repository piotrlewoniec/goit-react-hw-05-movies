export const headerDefaultGet = {
  method: 'get',
  accept: 'application/json',
};

export const headerGenres = {
  baseURL: 'https://api.themoviedb.org/3/genre/movie/list',
};

export const paramsGenres = {
  language: 'en',
};

export const headerTrailer = {
  baseURL: 'https://api.themoviedb.org/3/movie/',
  url: '',
};

export const paramsTrailer = {
  language: 'en-US',
};

export const headerTrendingMovies = {
  baseURL: 'https://api.themoviedb.org/3/trending/movie/day',
};
export const paramsTrendingMovies = {
  language: 'en-US',
};

export const headerSearchMovie = {
  baseURL: 'https://api.themoviedb.org/3/search/movie',
};
export const paramsSearchMovie = {
  language: 'en-US',
  include_adult: false,
};

export const headerSearchMovieDetails = {
  baseURL: 'https://api.themoviedb.org/3/movie/',
  url: '',
};

export const paramsSearchMovieDetails = {
  language: 'en-US',
};

export const headerSearchMovieCredits = {
  baseURL: 'https://api.themoviedb.org/3/movie/',
  url: '',
};

export const paramsSearchMovieCredits = {
  language: 'en-US',
};
export const headerSearchMovieReviews = {
  baseURL: 'https://api.themoviedb.org/3/movie/',
  url: '',
};

export const paramsSearchMovieReviews = {
  language: 'en-US',
  page: 1,
};
