import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Contents from "../Contents/Contents";
import Footer from "../Contents/Footer";
import Intro from "../intro/Intro";
import MoviesDetail from "../MoviesDetail/MoviesDetail";

function Home() {
  const { MovieDetail } = useSelector((state) => state.infoMovies);
  const [isShowMovieDetail, setIsShowMovieDetail] = useState(false);

  useEffect(() => {
    setIsShowMovieDetail(MovieDetail ? true : false);
  }, [MovieDetail]);

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      <Intro />
      <Contents />
      <MoviesDetail movie={MovieDetail} showModal={isShowMovieDetail} />
      <Footer />
    </div>
  );
}

export default Home;
