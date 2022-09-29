import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { QueryClient, QueryClientProvider } from 'react-query';
import imagesContext from '../context/images';
import perPageContext from '../context/perPage';
import searchTermContext from '../context/searchTerm';

function Providers({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });
  const [perPage, setPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [images, setImages] = useState([]);
  const perPageProviderValue = useMemo(() => ({
    perPage,
    setPerPage(value) {
      setPerPage(value);
    },
  }), [perPage, setPerPage]);

  const searchTermProviderValue = useMemo(() => ({
    searchTerm,
    setSearchTerm(value) {
      setSearchTerm(value);
    },
  }), [searchTerm, setSearchTerm]);

  const imagesProviderValue = useMemo(() => ({
    images,
    setImages(value) {
      setImages(value);
    },
  }), [images, setImages]);

  return (
    <QueryClientProvider client={queryClient}>
      <imagesContext.Provider value={imagesProviderValue}>
        <perPageContext.Provider value={perPageProviderValue}>
          <searchTermContext.Provider value={searchTermProviderValue}>
            {children}
          </searchTermContext.Provider>
        </perPageContext.Provider>
      </imagesContext.Provider>
    </QueryClientProvider>
  );
}

export default Providers;

Providers.propTypes = {
  children: PropTypes.node.isRequired,
};
