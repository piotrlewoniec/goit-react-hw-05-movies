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

const MoviesList = ({ title, id }) => {
  const location = useLocation();
  return (
    <li>
      <Link to={`${id}`} state={{ from: location }}>
        {title}
      </Link>
    </li>
  );
};

export const Movies = () => {
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
    setSearchParams({ query: searchPchrase });
    const query = searchParams.get('query');
    setData([...response.data.results]);
  };

  return (
    <main>
      <form name="searchform" autoComplete="off" method="POST" validate="false">
        <input type="text" name="searchinput" />
        <Button label="Search" formButton={true} action={handleSearch} />
      </form>
      <ul>
        {data.map(element => (
          <MoviesList key={element.id} title={element.title} id={element.id} />
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

MoviesList.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
};
