import React from "react";
import MovieDetailPage from "./MovieDetailPage";

const MovieDetail = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <MovieDetailPage slug={params?.slug} />
    </>
  );
};

export default MovieDetail;
