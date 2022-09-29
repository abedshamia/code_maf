import axios from 'axios';
import { useQuery } from 'react-query';

const useFetchData = (perPage, text = '') => {
  const fetchData = async () => {
    const { data } = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${process.env.REACT_APP_API_KEY}&tags=technology&per_page=${perPage}&text=${text}&format=json&nojsoncallback=1`);

    return data.photos.photo;
  };
  const { isLoading, isError, data } = useQuery(`images${perPage}${text}`, fetchData, {
    refetchOnWindowFocus: false,
  });

  return { isLoading, isError, data };
};

export default useFetchData;
