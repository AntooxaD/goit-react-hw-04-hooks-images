import { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FcSearch } from "react-icons/fc";
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from "../Style/styled";

function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (searchQuery.trim() === "") {
      return toast.error("Please enter a keyword to search!");
    }
    onSubmit(searchQuery);
    setSearchQuery("");
  };

  return (
    <SearchBar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FcSearch />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInputChange}
        />
      </SearchForm>
    </SearchBar>
  );
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
