import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { SmoothHorizontalScrolling } from '../../utils';
import { useViewport } from '../hooks';
import { useDispatch } from 'react-redux';
import { setMovieDetail } from '../store/actions';

function MoviesRow(props) {
  const { movies, title, isNetflix } = props;
  const sliderRef = useRef();
  const movieRef = useRef();
  const [showControls, setShowControls] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [windowWidth] = useViewport();

  const dispatch = useDispatch();

  const handleSetMovie = movie => {
    dispatch(setMovieDetail(movie));
  };

  const handleScrollRight = () => {
    const maxScrollLeft =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    const movieWidth = movieRef.current.clientWidth;
    const targetScroll = Math.min(
      sliderRef.current.scrollLeft + movieWidth * 2,
      maxScrollLeft,
    );

    SmoothHorizontalScrolling(sliderRef.current, targetScroll);
  };

  const handleScrollLeft = () => {
    const movieWidth = movieRef.current.clientWidth;
    const targetScroll = Math.max(
      sliderRef.current.scrollLeft - movieWidth * 2,
      0,
    );

    SmoothHorizontalScrolling(sliderRef.current, targetScroll);
  };

  const handleMouseDown = e => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = e => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = e => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = e => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <MoviesRowContainer
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <h1 className="heading">{title}</h1>
      <MoviesSlider
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        className={isDragging ? 'dragging' : ''}
        style={
          movies && movies.length > 0
            ? {
                gridTemplateColumns: `repeat(${movies.length},${
                  windowWidth > 1200
                    ? '360px'
                    : windowWidth > 992
                      ? '300px'
                      : windowWidth > 768
                        ? '250px'
                        : '200px'
                })`,
              }
            : {}
        }
      >
        {movies &&
          movies.length > 0 &&
          movies.map((movie, index) => {
            if (movie.poster_path && movie.backdrop_path !== null) {
              let imageUrl = isNetflix
                ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
                : `https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`;

              return (
                <div
                  key={index}
                  className="movieItem"
                  ref={movieRef}
                  onClick={() => handleSetMovie(movie)}
                >
                  <img src={imageUrl} alt="" draggable="false" />
                  <div className="movieName">{movie.title || movie.name}</div>
                </div>
              );
            }
            return null;
          })}
      </MoviesSlider>
      {showControls && movies && movies.length > 0 && (
        <>
          <div
            className={`btnLeft ${isNetflix && 'isNetflix'}`}
            onClick={handleScrollLeft}
          >
            <FiChevronLeft />
          </div>
          <div
            className={`btnRight ${isNetflix && 'isNetflix'}`}
            onClick={handleScrollRight}
          >
            <FiChevronRight />
          </div>
        </>
      )}
    </MoviesRowContainer>
  );
}

export default MoviesRow;

const MoviesRowContainer = styled.div`
  background-color: var(--color-background);
  color: var(--color-white);
  padding: 20px 20px 0;
  position: relative;
  width: 100%;
  height: 100%;

  .heading {
    font-size: 18px;
    user-select: none;
    border-left: 2px solid red;
    padding-left: 5px;
  }

  .btnLeft {
    position: absolute;
    top: 50%;
    left: 30px;
    z-index: 20;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    height: 50px;
    width: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transform: translateY(-20%);
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    &:hover svg {
      opacity: 1;
      transform: scale(1.2);
    }

    svg {
      opacity: 0.7;
      font-size: 50px;
      transition: all 0.3s linear;
    }

    &.isNetflix {
      height: 100px;
      width: max-content;
    }
  }

  .btnRight {
    position: absolute;
    top: 50%;
    right: 30px;
    z-index: 20;
    transform-origin: center;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.5);
    height: 50px;
    width: 40px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    transform: translateY(-20%);
    transition: all 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);
    }

    &:hover svg {
      opacity: 1;
      transform: scale(1.2);
    }

    svg {
      opacity: 0.7;
      font-size: 50px;
      transition: all 0.3s linear;
    }

    &.isNetflix {
      height: 100px;
      width: max-content;
    }
  }
`;

const MoviesSlider = styled.div`
  display: grid;
  gap: 6px;
  transition: all 0.3s linear;
  user-select: none;
  overflow-y: hidden;
  overflow-x: auto;
  overflow: hidden;
  padding-top: 28px;
  padding-bottom: 28px;
  scroll-behavior: smooth;
  cursor: grab;

  &.dragging {
    cursor: grabbing;
    scroll-behavior: auto;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  &:hover .movieItem {
    opacity: 0.5;
  }

  .movieItem {
    transform: scale(1);
    max-width: 400px;
    max-height: 500px;
    width: 100%;
    height: 100%;
    transition: all 0.3s linear;
    user-select: none;
    overflow: hidden;
    border-radius: 6px;
    transform: center left;
    position: relative;

    &:hover {
      opacity: 1;
      transform: scale(1.1);
      z-index: 10;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .movieName {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 4px;
      text-align: center;
      font-size: 14px;
      background-color: rgba(0, 0, 0, 0.65);
    }
  }
`;
