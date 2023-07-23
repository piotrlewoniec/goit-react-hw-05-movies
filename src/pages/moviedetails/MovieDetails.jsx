import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'components/button/Button';
import {
  headerDefaultGet,
  headerSearchMovieDetails,
  paramsSearchMovieDetails,
} from 'js/config/stdquery';
import { apikeyTMDB } from 'js/config/apikey';
import { axiosData } from 'js/apireset/axios-data';
import Notiflix from 'notiflix';
import css from './MovieDetails.module.css';

const MovieDeatailsInfo = ({ data }) => {
  const genres = data.genres.map(element => element.name).join(', ');
  return (
    <div>
      <div>
        <img
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.title}
        ></img>
      </div>
      <ul>
        <li>{data.title}</li>
        <li>
          <span>User Score: </span>
          <span>{data.popularity}</span>
        </li>
        <li>
          <span>Overview</span>
          <span>{data.overview}</span>
        </li>
        <li>
          <span>Genres</span>
          <span>{genres}</span>
        </li>
      </ul>
    </div>
  );
};

export const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    const getMovies = async () => {
      const response = await getDataFromServer(movieId);
      if (response) {
        setData(response.data);
        setIsData(true);
      }
    };
    getMovies();
  }, [movieId]);

  const handleGoBack = () => {
    if (
      location.state.from.pathname === '/movies' &&
      location.state.from.search === ''
    ) {
      navigate('/movies', { replace: false });
    } else if (
      location.state.from.state !== null &&
      location.state.from.state.from.pathname === '/movies' &&
      location.state.from.state.from.search !== ''
    ) {
      navigate('/movies' + location.state.from.state.from.search, {
        replace: false,
      });
    } else if (
      location.state.from.pathname === '/movies' &&
      location.state.from.search !== ''
    ) {
      navigate('/movies' + location.state.from.search, { replace: false });
    } else {
      navigate('/', { replace: false });
    }
  };

  return (
    <main>
      <section>
        <Button label="Go back" action={handleGoBack} />
        {isData && <MovieDeatailsInfo data={data} />}
      </section>
      <section>
        Additional information
        <Link to="cast" state={{ from: location }}>
          Cast
        </Link>
        <Link to="reviews" state={{ from: location }}>
          Reviews
        </Link>
        <Outlet />
      </section>
    </main>
  );
};

async function getDataFromServer(movieId) {
  const header = { ...headerDefaultGet, ...headerSearchMovieDetails };
  header.url = `${movieId}`;
  const parameters = { ...paramsSearchMovieDetails, api_key: apikeyTMDB };
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

MovieDeatailsInfo.propTypes = {
  data: PropTypes.object,
};
