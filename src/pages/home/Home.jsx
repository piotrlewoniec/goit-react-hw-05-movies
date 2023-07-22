import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import {
  headerDefaultGet,
  headerTrendingMovies,
  paramsTrendingMovies,
} from 'js/config/stdquery';
import { apikeyTMDB } from 'js/config/apikey';
import { axiosData } from 'js/apireset/axios-data';
import Notiflix from 'notiflix';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const HomeTrendingMoviesList = ({ title, id }) => {
  const location = useLocation();
  return (
    <li>
      <Link to={`movies/${id}`} state={{ from: location }}>
        {title}
      </Link>
    </li>
  );
};

export const Home = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getMovies = async () => {
      const response = await getDataFromServer();
      setData([...response.data.results]);
    };
    getMovies();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      <ul>
        {data.map(element => (
          <HomeTrendingMoviesList
            key={element.id}
            title={element.title}
            id={element.id}
          />
        ))}
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

HomeTrendingMoviesList.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
};
