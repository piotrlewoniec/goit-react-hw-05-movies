import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  headerDefaultGet,
  headerTrendingMovies,
  paramsTrendingMovies,
} from 'js/config/stdquery';
import { apikeyTMDB } from 'js/config/apikey';
import { axiosData } from 'js/apireset/axios-data';
import Notiflix from 'notiflix';
import PropTypes from 'prop-types';
import css from './Home.module.css';
import { useLoad } from 'components/loadcontext/LoadContext';

const HomeTrendingMoviesList = ({ title, id }) => {
  const location = useLocation();
  return (
    <li className={css.movielinks}>
      <Link to={`movies/${id}`} state={{ from: location }}>
        {title}
      </Link>
    </li>
  );
};

const Home = () => {
  const [data, setData] = useState([]);
  const { isLoadingOn, isLoadingOff } = useLoad();

  useEffect(() => {
    const getMovies = async () => {
      isLoadingOn();
      const response = await getDataFromServer();
      if (response) {
        setData([...response.data.results]);
      }
      isLoadingOff();
    };
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      <ul>
        {data.length > 0 ? (
          data.map(element => (
            <HomeTrendingMoviesList
              key={element.id}
              title={element.title}
              id={element.id}
            />
          ))
        ) : (
          <p>No data</p>
        )}
      </ul>
    </main>
  );
};

async function getDataFromServer() {
  const header = { ...headerDefaultGet, ...headerTrendingMovies };
  const parameters = {
    ...paramsTrendingMovies,
    api_key: apikeyTMDB,
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

HomeTrendingMoviesList.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
};

export default Home;
