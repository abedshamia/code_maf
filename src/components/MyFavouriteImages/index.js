import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import imagesContext from '../../context/images';
import ImageContainer from '../ImageContainer';

function MyFavouriteImages({ toggleFavourites, setToggleFavourites }) {
  const { images, setImages } = useContext(imagesContext);
  useEffect(() => {
    const favouriteImages = JSON.parse(localStorage.getItem('images'));
    if (favouriteImages) {
      setImages(favouriteImages);
    }

    return () => {
      setImages([]);
    };
  }, [toggleFavourites]);
  return (
    <>
      <FavouritesButton
        onClick={() => setToggleFavourites((prevToggle) => !prevToggle)}
        type="button"
      >
        My favourites
      </FavouritesButton>
      {!toggleFavourites && (
      <div>
        {images.length === 0 ? (
          <h1>
            You have no favourite images
          </h1>
        ) : (
          <div>
            {images.map((image) => (
              <ImageContainer key={image.id} url={image.url} title={image.title} id={image.id} />
            ))}
          </div>
        )}
      </div>
      )}
    </>
  );
}

export default MyFavouriteImages;

const FavouritesButton = styled.button`
background-color: #999;
color: white;
padding: 0.5rem 1.2rem;
font-weight: bold;
border: none;
float: right;
margin: 1rem;
cursor: pointer;
`;

MyFavouriteImages.propTypes = {
  toggleFavourites: PropTypes.bool.isRequired,
  setToggleFavourites: PropTypes.func.isRequired,
};
