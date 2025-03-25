import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../Contents/Footer';
import MoviesDetail from '../MoviesDetail/MoviesDetail';
import SearchMovies from '../SearchMovies/SearchMovies';

function Search() {
  const { MovieDetail } = useSelector(state => state.infoMovies);
  return (
    <div style={{ backgroundColor: 'var(--color-background' }}>
      <SearchMovies />
      <MoviesDetail
        showModal={MovieDetail ? true : false}
        movie={MovieDetail}
      />
      <Footer />
    </div>
  );
}

export default Search;
