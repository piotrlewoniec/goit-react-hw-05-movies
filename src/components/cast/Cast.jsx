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

const CastItem = ({ profile_path, name, character }) => {
  return (
    <li>
      <img
        src={`https://image.tmdb.org/t/p/w342${profile_path}`}
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
  const [isData, setIsData] = useState(false);

  useEffect(() => {
    console.log(movieId);
    console.log(data);
    setIsData(false);
    const getMovies = async () => {
      const response = await getDataFromServer(movieId);
      console.log(response);
      setData([...response.data.cast]);
    };
    getMovies();
  }, []);

  useEffect(() => {
    console.log(data);
    setIsData(true);
    data.map((element, index) => console.log(element));
  }, [data]);

  return (
    <ul>
      {isData &&
        data.map((element, index) => (
          <CastItem
            key={`id-` + index}
            profile_path={element.profile_path}
            name={element.name}
            character={element.character}
          />
        ))}
    </ul>
  );
};

// https://api.themoviedb.org/3/movie/{movie_id}/credits

async function getDataFromServer(movieId) {
  const header = { ...headerDefaultGet, ...headerSearchMovieCredits };
  header.url = `${movieId}/credits`;
  const parameters = {
    ...paramsSearchMovieCredits,
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
