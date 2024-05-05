import React from 'react';
import Slider from 'react-slick';
import { IMovieDetail } from "../../pages/Show/types";
import { MovieCard } from '../MovieCard';
import { IMovieResponse } from '../MovieCard/types';  
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { MovieCarouselProps } from './types';

const MovieCarousel: React.FC<MovieCarouselProps> = ({ movies }) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <Slider {...settings}>
            {movies.map((movie: IMovieResponse) => (  
                <MovieCard
                    key={movie.id}
                    movieId={movie.id}
                    posterPath={movie.poster_path}
                    title={movie.title}
                    voteAvergae={movie.vote_average}
                    genreId={movie.genre_ids[0]}
                />
            ))}
        </Slider>
    );
}

export default MovieCarousel;
