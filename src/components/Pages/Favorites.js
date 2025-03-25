import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';
import MoviesRow from '../Contents/MoviesRow';

const API_KEY = '935e07ca69489569f7c2f79bcad5cdfb';
const BASE_URL = 'https://api.themoviedb.org/3';

const Favorites = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { sessionId, accountDetails } = useSelector(state => state.auth);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/account/${accountDetails.id}/favorite/movies?api_key=${API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=1`,
        );
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching favorites:', error);
        setIsLoading(false);
      }
    };

    if (sessionId && accountDetails) {
      fetchFavorites();
    }
  }, [sessionId, accountDetails]);

  if (isLoading) {
    return <LoadingMessage>Loading your favorites...</LoadingMessage>;
  }

  return (
    <FavoritesContainer>
      <FavoritesHeader>
        <h1>My Favorites</h1>
        <p>{movies.length} movies</p>
      </FavoritesHeader>

      {movies.length > 0 ? (
        <MoviesRow movies={movies} title="" isFavorites={true} />
      ) : (
        <EmptyState>
          <h2>Your favorites list is empty</h2>
          <p>Add movies and TV shows that you love to your favorites</p>
        </EmptyState>
      )}
    </FavoritesContainer>
  );
};

const FavoritesContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px 20px;
  color: var(--color-white);
`;

const FavoritesHeader = styled.div`
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

const LoadingMessage = styled.div`
  color: var(--color-white);
  font-size: 1.2rem;
  text-align: center;
  padding: 40px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: var(--border-radius-lg);

  h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  p {
    color: var(--color-light-gray);
    font-size: 1.1rem;
  }
`;

export default Favorites;
