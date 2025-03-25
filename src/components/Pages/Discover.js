import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import MoviesRow from '../Contents/MoviesRow';

const API_KEY = '935e07ca69489569f7c2f79bcad5cdfb';
const BASE_URL = 'https://api.themoviedb.org/3';

const Discover = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortBy, setSortBy] = useState('popularity.desc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`,
        );
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${sortBy}&with_genres=${selectedGenre}&page=1`,
        );
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setIsLoading(false);
      }
    };
    fetchMovies();
  }, [selectedGenre, sortBy]);

  return (
    <DiscoverContainer>
      <DiscoverHeader>
        <h1>Discover Movies</h1>
        <p>Find new movies based on your preferences</p>
      </DiscoverHeader>

      <FiltersContainer>
        <FilterGroup>
          <label>Genre:</label>
          <Select
            value={selectedGenre}
            onChange={e => setSelectedGenre(e.target.value)}
          >
            <option value="">All Genres</option>
            {genres.map(genre => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </Select>
        </FilterGroup>

        <FilterGroup>
          <label>Sort By:</label>
          <Select value={sortBy} onChange={e => setSortBy(e.target.value)}>
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
          </Select>
        </FilterGroup>
      </FiltersContainer>

      {isLoading ? (
        <LoadingMessage>Loading movies...</LoadingMessage>
      ) : (
        <MoviesRow movies={movies} title="" isDiscover={true} />
      )}
    </DiscoverContainer>
  );
};

const DiscoverContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px 20px;
  color: var(--color-white);
`;

const DiscoverHeader = styled.div`
  margin-bottom: 40px;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }

  p {
    color: var(--color-light-gray);
    font-size: 1.1rem;
  }
`;

const FiltersContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  label {
    font-size: 1.1rem;
    color: var(--color-light-gray);
  }
`;

const Select = styled.select`
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: var(--border-radius-md);
  color: var(--color-white);
  padding: 10px 15px;
  font-size: 1rem;
  cursor: pointer;
  transition: var(--transition-normal);

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }

  &:focus {
    outline: none;
    background: rgba(255, 255, 255, 0.2);
  }

  option {
    background: var(--color-background);
    color: var(--color-white);
  }
`;

const LoadingMessage = styled.div`
  color: var(--color-white);
  font-size: 1.2rem;
  text-align: center;
  padding: 40px;
`;

export default Discover;
