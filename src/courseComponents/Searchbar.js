  
import React from "react";
import { connect } from "react-redux";
import { changeSearchText } from "../redux/actions";

const Searchbar = props => (
    <div style={{paddingTop: 20}}>
        <h1 className="courses-title">Browse Our Courses Here</h1>
        <br /><br />
        <div className="search-div">
            <input class="search" 
            placeholder="Search by course name or organization" 
            type="text" 
            name="search" 
            onChange={(event) => props.changeSearchText(event.target.value)}>
            </input>
        </div>
    </div>
  );
  
  const mapStateToProps = state => {
    return {
      value: state.searchText
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      changeSearchText: (searchText) => {dispatch(changeSearchText(searchText))}
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);