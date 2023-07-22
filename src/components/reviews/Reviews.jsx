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

const ReviewsItem = ({ author, content }) => {
  return (
    <li>
      <p>Author: {author}</p>
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
      setData([...response.data.results]);
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
    // if (response.code !== 'ERR_NETWORK') {
    //   this.setState({ isLoading: false });
    //   setIsLoading(false);
    //   totalHits = response.data.totalHits;
    //   let filteredResponse = [];
    //   if (response.data.hits.length !== 0) {
    //     for (let element of response.data.hits) {
    //       const { webformatURL, largeImageURL, tags, id } = element;
    //       filteredResponse.push({ webformatURL, largeImageURL, tags, id });
    //     }
    //   }
    //   return filteredResponse;
    // } else {
    return response;
    // }
  } catch (error) {
    //this.setState({ isLoading: false });
    // setIsLoading(false);
    Notiflix.Notify.failure(`${error}`);
    return error;
  }
}

// https://api.themoviedb.org/3/movie/{movie_id}/reviews
