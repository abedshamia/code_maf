import React, { useContext } from 'react';
import perPageContext from '../../context/perPage';

function PerPageDropDown() {
  const { perPage, setPerPage } = useContext(perPageContext);
  const handleChange = (e) => {
    const { value } = e.target;
    setPerPage(value);
  };
  return (
    <select
      name="perPage"
      defaultValue={perPage}
      onChange={handleChange}
    >
      <option
        value="10"
      >
        10 Per page

      </option>
      <option
        value="20"
      >
        20 Per page

      </option>
      <option
        value="50"
      >
        50 Per page

      </option>
    </select>
  );
}

export default PerPageDropDown;
