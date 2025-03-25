import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector } from "react-redux";
import MoviesRow from "../Contents/MoviesRow";

const API_KEY = "935e07ca69489569f7c2f79bcad5cdfb";
const BASE_URL = "https://api.themoviedb.org/3";

const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { sessionId, accountDetails } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/account/${accountDetails.id}/watchlist/movies?api_key=${API_KEY}&session_id=${sessionId}&language=en-US&sort_by=created_at.desc&page=1`
        );
        setMovies(response.data.results);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching watchlist:", error);
        setIsLoading(false);
      }
    };

    if (sessionId && accountDetails) {
      fetchWatchlist();
    }
  }, [sessionId, accountDetails]);

  if (isLoading) {
    return <LoadingMessage>Loading your watchlist...</LoadingMessage>;
  }

  return (
    <WatchlistContainer>
      <WatchlistHeader>
        <h1>My Watchlist</h1>
        <p>{movies.length} movies</p>
      </WatchlistHeader>

      {movies.length > 0 ? (
        <MoviesRow movies={movies} title="" isWatchlist={true} />
      ) : (
        <EmptyState>
          <h2>Your watchlist is empty</h2>
          <p>Add movies and TV shows to keep track of what you want to watch</p>
        </EmptyState>
      )}
    </WatchlistContainer>
  );
};

const WatchlistContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 40px 20px;
  color: var(--color-white);
`;

const WatchlistHeader = styled.div`
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

export default Watchlist; 