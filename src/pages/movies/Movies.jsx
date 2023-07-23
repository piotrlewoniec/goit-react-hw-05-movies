import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Notiflix from 'notiflix';
import { Button } from 'components/button/Button';
import {
  headerDefaultGet,
  headerSearchMovie,
  paramsSearchMovie,
} from 'js/config/stdquery';
import { apikeyTMDB } from 'js/config/apikey';
import { axiosData } from 'js/apireset/axios-data';
import css from './Movies.module.css';

const MoviesList = ({ title, id }) => {
  const location = useLocation();
  return (
    <li className={css.movielinks}>
      <Link to={`${id}`} state={{ from: location }}>
        {title}
      </Link>
    </li>
  );
};

const Movies = () => {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const query = searchParams.get('query');
    if (query === null) {
      return;
    } else {
      const getMovies = async () => {
        const response = await getDataFromServer(query);
        setData([...response.data.results]);
      };
      getMovies();
    }
  }, []);

  const handleSearch = async event => {
    event.preventDefault();
    const searchPchrase = event.target.form.searchinput.value;
    const response = await getDataFromServer(searchPchrase);
    if (response) {
      setSearchParams({ query: searchPchrase });
      setData([...response.data.results]);
    }
  };

  return (
    <main>
      <form
        className={css.movieform}
        name="searchform"
        autoComplete="off"
        method="POST"
        validate="false"
      >
        <input className={css.movienameinput} type="text" name="searchinput" />
        <Button label="Search" formButton={true} action={handleSearch} />
      </form>
      <ul>
        {data.length > 0 &&
          data.map(element => (
            <MoviesList
              key={element.id}
              title={element.title}
              id={element.id}
            />
          ))}
      </ul>
    </main>
  );
};

async function getDataFromServer(searchPchrase) {
  const header = { ...headerDefaultGet, ...headerSearchMovie };
  const parameters = {
    ...paramsSearchMovie,
    api_key: apikeyTMDB,
    query: searchPchrase,
    page: 1,
  };
  try {
    const response = await axiosData(header, parameters);
    if (response.code === 'ERR_NETWORK') {
      Notiflix.Notify.failure(`${response.message}`);
    } else if (response.code === 'ERR_BAD_REQUEST') {
      Notiflix.Notify.failure(`${response.response.data.status_message}`);
    } else {
      return response;
    }
  } catch (error) {
    Notiflix.Notify.failure(`${error}`);
    return error;
  }
}

MoviesList.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
};

export default Movies;
