import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  headerDefaultGet,
  headerSearchMovieCredits,
  paramsSearchMovieCredits,
} from 'js/config/stdquery';
import { apikeyTMDB } from 'js/config/apikey';
import { axiosData } from 'js/apireset/axios-data';
import Notiflix from 'notiflix';
import css from './Cast.module.css';
import PropTypes from 'prop-types';

const CastItem = ({ profile_path, name, character }) => {
  return (
    <li>
      <img
        className={css.cast_img}
        src={`https://image.tmdb.org/t/p/original${profile_path}`}
        alt={name}
      ></img>
      <p>{name}</p>
      <p>Character: {character}</p>
    </li>
  );
};

export const Cast = () => {
  const { movieId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await getDataFromServer(movieId);
      if (response) {
        setData([...response.data.cast]);
      }
    };
    getMovies();
  }, []);

  return (
    <ul>
      {data.length > 0 ? (
        data.map((element, index) => (
          <CastItem
            key={`id-` + index}
            profile_path={element.profile_path}
            name={element.name}
            character={element.character}
          />
        ))
      ) : (
        <p>No data.</p>
      )}
    </ul>
  );
};

async function getDataFromServer(movieId) {
  const header = { ...headerDefaultGet, ...headerSearchMovieCredits };
  header.url = `${movieId}/credits`;
  const parameters = {
    ...paramsSearchMovieCredits,
    api_key: apikeyTMDB,
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

CastItem.propTypes = {
  profile_path: PropTypes.string,
  name: PropTypes.string,
  character: PropTypes.string,
};
