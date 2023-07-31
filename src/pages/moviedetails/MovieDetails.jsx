import {
  Link,
  Outlet,
  useParams,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import { Suspense } from 'react';
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
import { useLoad } from 'components/loadcontext/LoadContext';

const MovieDeatailsInfo = ({ data }) => {
  const genres = data.genres.map(element => element.name).join(', ');
  const date = new Date(data.release_date).getFullYear();
  return (
    <div className={css.moviewrapper}>
      <div>
        <img
          className={css.movieposter}
          src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
          alt={data.title}
        ></img>
      </div>
      <ul className={css.moviedatawrapper}>
        <li className={css.movietitle}>
          {data.title} ({date})
        </li>
        <li>
          <span className={css.moviedatalabel}>User Score: </span>
          <span>{Math.trunc(data.vote_average * 10)}%</span>
        </li>
        <li className={css.movieoverview}>
          <span className={css.moviedatalabel}>Overview</span>
          <span>{data.overview}</span>
        </li>
        <li className={css.movieoverview}>
          <span className={css.moviedatalabel}>Genres</span>
          <span>{genres}</span>
        </li>
      </ul>
    </div>
  );
};

let locationStored;

const MovieDetails = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState({});
  const [isData, setIsData] = useState(false);
  const { isLoadingOn, isLoadingOff } = useLoad();

  useEffect(() => {
    locationStored = location;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const getMovies = async () => {
      isLoadingOn();
      const response = await getDataFromServer(movieId);
      if (response) {
        setData(response.data);
        setIsData(true);
      }
      isLoadingOff();
    };
    getMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieId]);

  const handleGoBack = () => {
    if (location.state === null) {
      navigate('/', { replace: false });
      return;
    }
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
      <section className={css.moviedetalsec}>
        <Button label="Go back" action={handleGoBack} />
        {isData && <MovieDeatailsInfo data={data} />}
      </section>
      <section className={css.addinfo}>
        Additional information
        <ul>
          <li>
            <Link to="cast" state={{ from: locationStored }}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: locationStored }}>
              Reviews
            </Link>
          </li>
        </ul>
      </section>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
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

export default MovieDetails;
