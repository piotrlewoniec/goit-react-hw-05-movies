import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  headerDefaultGet,
  headerSearchMovieReviews,
  paramsSearchMovieReviews,
} from 'js/config/stdquery';
import { apikeyTMDB } from 'js/config/apikey';
import { axiosData } from 'js/apireset/axios-data';
import Notiflix from 'notiflix';
import css from './Reviews.module.css';
import PropTypes from 'prop-types';

const ReviewsItem = ({ author, content }) => {
  return (
    <li>
      <p className={css.review_author}>Author: {author}</p>
      <p>{content}</p>
    </li>
  );
};

export const Reviews = () => {
  const { movieId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await getDataFromServer(movieId);
      if (response) {
        setData([...response.data.results]);
      }
    };
    getMovies();
  }, []);

  return (
    <ul>
      {data.length > 0 ? (
        data.map(element => (
          <ReviewsItem
            key={element.id}
            author={element.author}
            content={element.content}
          />
        ))
      ) : (
        <p>We don't have any reviews for this movie.</p>
      )}
    </ul>
  );
};

async function getDataFromServer(movieId) {
  const header = { ...headerDefaultGet, ...headerSearchMovieReviews };
  header.url = `${movieId}/reviews`;
  const parameters = {
    ...paramsSearchMovieReviews,
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

ReviewsItem.propTypes = {
  author: PropTypes.string,
  content: PropTypes.string,
};
