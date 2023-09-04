"use client";
import { BannerSection } from "./sections/BannerSection";
import { FilterSection } from "./sections/FilterSection";
import { MovieListSection } from "./sections/MovieListSection";

const HomePage = () => {
  return (
    <main className="main">
      <div className="cph-header">
        <main className="flex flex-col items-center justify-between">
          <div className="w-full">
            <BannerSection />
          </div>
        </main>
      </div>

      <nav className="breadcrumb-nav has-border">
        <div className="container">
          <ul className="breadcrumb"></ul>
        </div>
      </nav>

      <div className="page-content mb-10 shop-page">
        <div className="container">
          <div className="row main-content-wrap">
            <FilterSection />
            <MovieListSection />
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
