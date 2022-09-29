import React, {
  useContext, useEffect, useMemo, useRef,
} from 'react';
import styled from 'styled-components';
import perPageContext from '../../context/perPage';
import searchTermContext from '../../context/searchTerm';
import useFetchData from '../../hooks/useFetchData';
import ImageContainer from '../ImageContainer';
import MyFavouriteImages from '../MyFavouriteImages';
import PerPageDropDown from '../PerPageDropDown';

function IncomingImages() {
  const { perPage } = useContext(perPageContext);
  const { searchTerm } = useContext(searchTermContext);
  const { data = [], isLoading, isError } = useFetchData(perPage, searchTerm);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [shownImages, setShownImages] = React.useState([]);
  const [toggleFavourites, setToggleFavourites] = React.useState(true);
  const pages = useRef(0);
  const pagesArray = useRef([]);
  const setToggle = () => {
    setToggleFavourites((prevToggle) => !prevToggle);
  };

  useEffect(() => {
    if (data?.length) {
      setShownImages(data);
    }
  }, [data, isLoading]);
  const incomingimages = useMemo(() => shownImages?.map(({
    farm, server, id, secret, title,
  }) => {
    const url = `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
    return <ImageContainer url={url} title={title} id={id} key={url} />;
  }), [data, isLoading, shownImages]);

  pages.current = Math.ceil(data.length / 6);
  pagesArray.current = Array.from({ length: pages.current }, (_, i) => i);

  const handlePageChange = (chosenPage) => {
    // if (chosenPage === pagesArray.current.length) return;

    setCurrentPage(chosenPage);
    const startIndex = (chosenPage - 1) * 6;
    const endIndex = startIndex + 6;
    const currentImages = data?.slice(startIndex, endIndex);
    setShownImages(currentImages);
  };

  const handlePrevClick = () => {
    if (currentPage === 1) return;

    if (currentPage >= 1) {
      setCurrentPage(currentPage - 1);
      const startIndex = (currentPage - 2) * 6;
      const endIndex = startIndex + 6;
      const currentImages = data?.slice(startIndex, endIndex);
      setShownImages(currentImages);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pages.current) {
      setCurrentPage(currentPage + 1);
      const startIndex = currentPage * 6;
      const endIndex = startIndex + 6;
      const currentImages = data?.slice(startIndex, endIndex);
      setShownImages(currentImages);
    }
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <h1>Something went wrong</h1>;
  }
  return (
    <Container>
      <PerPageDropDown />
      <MyFavouriteImages
        toggleFavourites={toggleFavourites}
        setToggleFavourites={setToggle}
      />
      {toggleFavourites && (
        <>
          <GridContainer>
            {!isLoading && incomingimages?.slice(0, 6)}
          </GridContainer>

          {!isLoading && incomingimages?.length >= 1
      && (
        <PaginationContainer>
          <PreviousButton
            type="button"
            onClick={handlePrevClick}
            disabled={currentPage + 1 === 1}
          >
            Previous
          </PreviousButton>
          {pagesArray.current.map((page) => (
            <PageButton
              type="button"
              key={page}
              style={{
                backgroundColor: currentPage === page + 1 ? 'black' : 'white',
                color: currentPage === page + 1 ? 'white' : 'black',
              }}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </PageButton>
          ))}
          <NextButton
            type="button"
            onClick={handleNextClick}
            disabled={currentPage === pages.current}
          >
            Next
          </NextButton>

        </PaginationContainer>
      )}
        </>
      )}
    </Container>
  );
}

export default IncomingImages;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 1rem;
  margin: 1rem;
`;

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  

  select {
    padding: 0.4rem;
    background-color: #999;
    color: white;
    margin: 1rem;
  }
`;

const PaginationContainer = styled(Container)`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 6.2rem;

`;

const PreviousButton = styled.button`
color: #aaa;
padding: 0.4rem 0.8rem;
border: #ddd 1px solid;
cursor: pointer;
transition: all 0.2s ease-in-out;
&:hover {
  background-color: #ccc;
}

`;

const NextButton = styled(PreviousButton)`
color: blue;
`;

const PageButton = styled(NextButton)``;
