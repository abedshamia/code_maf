import { useContext } from 'react';
import styled from 'styled-components';
import searchTermContext from '../../context/searchTerm';

function Search() {
  const { searchTerm, setSearchTerm } = useContext(searchTermContext);
  const onChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <SearchBox>
      <SearchLabel>Search by</SearchLabel>
      <SearchInput placeholder="Search term" value={searchTerm} onChange={onChange} />
    </SearchBox>
  );
}

export default Search;

const SearchLabel = styled.label`
    background-color: #ccc;
    border: none;
    color: white;
    padding: 14px 24px;
    height: 100%;
    color: black;
    cursor: pointer;
`;

const SearchInput = styled.input`
flex: 1;
padding: 12px 8px ;
margin-bottom: 3.2rem;
border: 2px solid #bbb;
border-left: none;
`;

const SearchBox = styled.div`
display: flex;
justify-content: center;
width: 50%;
margin: 0 auto;
margin-top: 7.2rem;
`;
