import React from 'react';
import { IMovieCard } from './types';
import { IMAGE_SOURCE } from '../../constants/moviesMock';
import genres from '../../constants/genres.json';
import '../../index.css';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../routes/constants';

const MovieCard: React.FC<IMovieCard> = ({
    title,
    genreId,
    movieId,
    voteAvergae,
    posterPath,
}) => {
    const navigate = useNavigate();
    const poster = IMAGE_SOURCE + posterPath;

    const getGenre = (genreId: number): string => {
        if (genreId === 0) {
            return "No genre available";
        }

        const key = Object.values(genres.genres).find(genre => genre.id === genreId);
        return key ? key.name : "Not classified";
    };

    const navigateMovies = (id: number, movieName: string) => {
        navigate(`${ROUTES.SHOW}${id}`, { state: { movieName } });
    };

    return (
        <div className="movie-card max-w-xs bg-white rounded-lg overflow-hidden shadow-md relative"
            onClick={() => {
                navigateMovies(movieId, title);
            }}
        >
            <img className="w-full" src={poster} alt='poster' />
            <div className="absolute bottom-0 w-full bg-opacity-75 text-white p-4">
                <div className="font-bold text-xl mb-2">{title}</div>
                <div className="text-base pb-2">
                    <span className="bg-red-900 text-white rounded-full px-2 py-1">
                        {getGenre(genreId)}
                    </span>
                </div>
                <div className="text-base">
                    <span role="img" aria-label="star" className='pr-1'>⭐</span>{voteAvergae}/10
                </div>
            </div>
        </div>
    );
};

export default MovieCard;


