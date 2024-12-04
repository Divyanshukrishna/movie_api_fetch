import React from 'react';

const SearchArea = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col s4 offset-s4">
          <form onSubmit={props.handleSubmit}>
            <div className="input-field">
              <input
                type="text"
                placeholder="Search for movies..."
                value={props.searchTerm} // Bind to searchTerm state
                onChange={props.handleChange} 
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchArea;
