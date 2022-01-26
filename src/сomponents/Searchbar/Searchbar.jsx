import { Component } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { FcSearch } from "react-icons/fc";
import {
  SearchBar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from "../Style/styled";

class Searchbar extends Component {
  state = {
    searchQuery: "",
  };
  handleInputChange = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    this.setState({ searchQuery: searchQuery });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { searchQuery } = this.state;
    if (searchQuery.trim() === "") {
      return toast.error("Please enter a keyword to search!");
    }
    this.props.onSubmit(searchQuery);
    this.setState({ searchQuery: "" });
  };
  render() {
    const { searchQuery } = this.state;
    return (
      <SearchBar>
        <SearchForm onSubmit={this.handleSubmit}>
          <SearchFormButton type="submit">
            <FcSearch />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autocomplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </SearchBar>
    );
  }
}
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
