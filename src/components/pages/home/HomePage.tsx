"use client";
import { BannerSection } from "./sections/BannerSection";
import { FilterSection } from "./sections/FilterSection";
import { MovieListSection } from "./sections/MovieListSection";

const HomePage = () => {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      {/* <div className="w-full items-center justify-between font-mono text-sm"> */}
      <div className="w-full">
        <BannerSection />

        <div className="w-full items-center justify-between text-sm">
          <div className="px-2 md:px-16 py-8 md:flex flex-row">
            <div className="hidden md:block basis-4/12 sm:basis-6/12">
              <FilterSection />
            </div>
            <div className="basis-12/12 md:basis-8/12">
              <MovieListSection/>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
