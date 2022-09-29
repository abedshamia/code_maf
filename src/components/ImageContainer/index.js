import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

function ImageContainer({ url, title, id }) {
  const handleClick = () => {
    const image = {
      url,
      title,
      id,
    };
    const images = JSON.parse(localStorage.getItem('images')) || [];
    images.push(image);
    localStorage.setItem('images', JSON.stringify(images));
  };

  return (
    <Imagecontainer>
      <img src={url} alt={title} key={id} />
      <button
        onClick={handleClick}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feather feather-heart"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.07a5.5 5.5 0 0 0-7.78 7.78l1.07 1.07 7.78 7.78 7.78-7.78 1.07-1.07a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      </button>
    </Imagecontainer>
  );
}

const Imagecontainer = styled.div`
width: 100%;
position: relative;
img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  button {
    position: absolute;
    bottom: 5%;
    right: 3.5%;
    background-color: transparent;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    svg {
        width: 2.5rem;
        height: 2.5rem;
        fill: #fff;
        stroke: #fff;
        stroke-width: 2px;
        stroke-linecap: round;
        stroke-linejoin: round;
        padding: 0.5rem;
        background-color:red;
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
        &:hover {
            background-color: rgba(0, 0, 0, 0.8);
        }
    }
  }
`;

export default ImageContainer;

ImageContainer.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};
