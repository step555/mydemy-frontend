  
import React from "react";
import { connect } from "react-redux";
import { changeSearchText } from "../redux/actions";

const Searchbar = props => (
    // <div className="ui container">
    //   <div className="ui very large fluid input">
    //     <input
    //       type="text"
    //       placeholder="Search"
    //       value={props.value}
    //       onChange={e => props.onChange(e.target.value)}
    //     />
    //   </div>
    //   <div className="ui clearing section divider" />
    // </div>
    <div>
        <h1 className="courses-title">Browse Our Courses Here</h1>
        <div class="wrapper">
            <input class="search" placeholder="Search" type="text" name="search" value={props.value} onChange={(event) => props.changeSearchText(event.target.value)}></input>
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