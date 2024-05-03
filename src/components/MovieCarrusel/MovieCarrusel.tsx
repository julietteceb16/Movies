import React from 'react';
import Slider from 'react-slick';
import { MovieCard } from '../MovieCard';
import { IMovieResponse } from '../MovieCard/types';  // Asumiendo que existe este tipo

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Definir props para el componente MovieCarousel
interface MovieCarouselProps {
    movies: IMovieResponse[];  // Usar el tipo IMovieResponse para movies
}

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
            {movies.map((movie: IMovieResponse) => (  // Asegúrate de tipar cada película como IMovieResponse
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
