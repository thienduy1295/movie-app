import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import {
  getActionMovies,
  getComedyMovies,
  getDocumentaries,
  getHorrorMovies,
  getNetflixOriginals,
  getRomanceMovies,
  getTopRatedMovies,
  getTrendingMovies,
} from '../store/actions';
import MoviesRow from './MoviesRow';

const Contents = () => {
  const dispatch = useDispatch();
  const {
    NetflixOriginals,
    TrendingMovies,
    TopRatedMovies,
    ActionMovies,
    ComedyMovies,
    HorrorMovies,
    RomanceMovies,
    Documentaries,
  } = useSelector(state => state.infoMovies);

  useEffect(() => {
    const fetchAllMovies = () => {
      dispatch(getNetflixOriginals());
      dispatch(getTrendingMovies());
      dispatch(getTopRatedMovies());
      dispatch(getActionMovies());
      dispatch(getComedyMovies());
      dispatch(getHorrorMovies());
      dispatch(getRomanceMovies());
      dispatch(getDocumentaries());
    };

    fetchAllMovies();
  }, [dispatch]);

  // Movie category configuration for cleaner rendering
  const movieCategories = [
    { movies: NetflixOriginals, title: 'Netflix Originals', isNetflix: true },
    { movies: TrendingMovies, title: 'Trending Movies', isNetflix: true },
    { movies: TopRatedMovies, title: 'Top Rated Movies', isNetflix: true },
    { movies: ActionMovies, title: 'Action Movies' },
    { movies: ComedyMovies, title: 'Comedy Movies' },
    { movies: HorrorMovies, title: 'Horror Movies' },
    { movies: RomanceMovies, title: 'Romance Movies' },
    { movies: Documentaries, title: 'Documentaries' },
  ];

  return (
    <ContentsContainer>
      <BackgroundPattern />
      <ContentsWrapper>
        <SectionHeader>Movies & TV Shows</SectionHeader>
        {movieCategories.map((category, index) => (
          <CategorySection key={index} delay={index * 0.15}>
            <MoviesRow
              movies={category.movies}
              title={category.title}
              isNetflix={category.isNetflix || false}
            />
          </CategorySection>
        ))}
      </ContentsWrapper>
    </ContentsContainer>
  );
};

const ContentsContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.9) 0%,
    rgba(17, 17, 17, 0.95) 5%,
    rgba(17, 17, 17, 1) 100%
  );
  padding: 40px 0;
  position: relative;
  z-index: 1;
  overflow: hidden;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px
  );
  background-size: 40px 40px;
  z-index: -1;
  opacity: 0.3;
`;

const SectionHeader = styled.h2`
  color: var(--color-white);
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 30px;
  text-align: center;
  letter-spacing: 1px;
  position: relative;
  padding-bottom: 15px;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(
      to right,
      rgba(255, 0, 0, 0.5),
      red,
      rgba(255, 0, 0, 0.5)
    );
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const ContentsWrapper = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  gap: 40px;

  @media (max-width: 768px) {
    padding: 0 15px;
    gap: 30px;
  }
`;

const CategorySection = styled.div`
  opacity: 0;
  transform: translateY(20px);
  animation: fadeIn 0.5s ease forwards;
  animation-delay: ${props => props.delay || 0}s;
  backdrop-filter: blur(5px);
  border-radius: 8px;
  padding: 10px;
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.01);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    padding: 5px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export default Contents;
