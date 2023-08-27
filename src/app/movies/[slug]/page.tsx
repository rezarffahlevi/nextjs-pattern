import React from "react";
import MovieDetailPage from "@/components/pages/movie/MovieDetailPage";

const MovieDetail = ({ params }: { params: { slug: string } }) => {
  return (
    <>
      <MovieDetailPage slug={params?.slug} />
    </>
  );
};

export default MovieDetail;
