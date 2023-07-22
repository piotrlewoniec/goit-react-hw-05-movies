import { Routes, Route } from 'react-router-dom';
import { Navigation } from './navigation/Navigation';
import { Home } from 'pages/home/Home';
import { Movies } from 'pages/movies/Movies';
import { MovieDetails } from 'pages/moviedetails/MovieDetails';
import { Cast } from './cast/Cast';
import { Reviews } from './reviews/Reviews';
import css from './App.module.css';

export const App = () => {
  return (
    <div
      className={css.app}
      // style={{
      //   // height: '100vh',
      //   display: 'flex',
      //   justifyContent: 'left',
      //   alignItems: 'center',
      //   fontSize: 40,
      //   color: '#010101',
      // }}
    >
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path="movies/:movieId" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route path="movies" element={<Movies />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
};

// Code Splitting (rozdzielenie kodu)
// Dodaj asynchroniczne ładownie kodu JS dla tras aplikacji, wykorzystując React.lazy() i <Suspense>.

///////////////////////////////////////////////////////////////////////////////////////

// Zadanie "Wyszukiwanie filmów"
// Stwórz bazowe trasowanie dla aplikacji do wyszukiwania i zapisywania filmów. Preview roboczej aplikacji zobacz link.
// https://drive.google.com/file/d/1vR0hi3n1236Q5Bg4-se-8JVKD9UKSfId/view?usp=sharing

// API themoviedb.org
// Do backendu wykorzystaj themoviedb.org API. Należy się zarejestrować (można wprowadzić dowolne dane) i pobrać klucz API. W tym zadaniu będzie się wykorzystywać następujące endpointy.
// https://www.themoviedb.org/

// /trending/get-trending lista najpopularniejszych filmów dzisiaj w celu utworzenia kolekcji na stronie głównej.
// https://developers.themoviedb.org/3/trending/get-trending

// /search/search-movies wyszukiwanie filmu po słowie kluczu na stronie filmów.
// https://developers.themoviedb.org/3/search/search-movies

// /movies/get-movie-details zapytanie o pełną informację o filmie dla strony filmu.
// https://developers.themoviedb.org/3/movies/get-movie-details

// /movies/get-movie-credits zapytanie o informację o zespole aktorskim dla strony filmu.
// https://developers.themoviedb.org/3/movies/get-movie-credits

// /movies/get-movie-reviews zapytanie o recenzje dla strony filmu.
// https://developers.themoviedb.org/3/movies/get-movie-reviews

// Link do dokumentacji https://developers.themoviedb.org/3/getting-started/introduction

// Trasy
// W aplikacji powinny znaleźć się następujące trasy. Jeśli użytkownik poszedł nieistniejącą trasą, należy przekierować go na stronę główną.

// '/' - komponent Home, strona domowa z listą popularnych filmów.
// '/movies' - komponent Movies, strona wyszukiwania filmów po słowie kluczu.
// '/movies/:movieId' - komponent MovieDetails, strona ze szczegółowymi informacjami o filmie.
// /movies/:movieId/cast - komponent Cast, informacja o zespole aktorskim. Renderuje się na stronie MovieDetails.
// /movies/:movieId/reviews - komponent Reviews, informacja o recenzjach. Renderuje się n stronie MovieDetails.

// Code Splitting (rozdzielenie kodu)
// Dodaj asynchroniczne ładownie kodu JS dla tras aplikacji, wykorzystując React.lazy() i <Suspense>.
