import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import { BrowserRouter } from 'react-router-dom';
import { LoadProvider } from 'components/loadcontext/LoadContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadProvider>
      <BrowserRouter basename="/goit-react-hw-05-movies/">
        <App />
      </BrowserRouter>
    </LoadProvider>
  </React.StrictMode>
);

// Kryteria zaliczenia
// Użyj tego szablonu projektu React jako punktu wyjścia dla swojej aplikacji.
// https://github.com/goitacademy/react-homework-template#readme
// Stworzone repozytorium goit-react-hw-05-movies.
// W oddawanym zadaniu domowym są odnośniki: do oryginalnych plików i strony roboczej każdego projektu na GitHub Pages.
// W stanie komponentów przechowywany jest minimalny niezbędny zestaw danych, pozostałe są obliczane.
// Po włączeniu kodu zadania, na konsoli nie ma błędów i ostrzeżeń.
// Dla każdego komponentu stworzony został folder z plikiem komponentu React i plikiem stylów.
// Dla komponentu opisane są propTypes.
// Wszystko, czego komponent żąda w postaci propsów, przekazuje się do niego przy wywołaniu.
// Nazwy komponentów są zrozumiałe, opisowe.
// Kod JS jest czysty i zrozumiały, wykorzystuje się Prettier.
// Stylizacja wykonania CSS-modułami lub Styled Components.
