import React, { useState, useEffect } from 'react';
import Movie from '../Movie';

const Form = () => {
    const [movies, setMovies] = useState([]);
    const [year, setYear] = useState(2018);
    const [term, setTerm] = useState('');

    const onChangeTerm = (event) => {
        setTerm(event.currentTarget.value);
    };

    useEffect(() => {
        async function fetchData() {
            const currentYear = new Date().getFullYear();
            if (currentYear < year < 1900) {
                const newMovies = [];
                const firstResponse = await fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${year}&page=1`).then(response => response.json());
                const totalPages = firstResponse.total_pages;
                newMovies.push(...firstResponse.data);

                if (totalPages > 1) {
                    for (let page = 2; page <= totalPages; page++) {
                        const newResponse = await fetch(`https://jsonmock.hackerrank.com/api/movies?Year=${year}&page=${page}`).then(response => response.json());
                        newMovies.push(...newResponse.data);
                    }
                }
                setMovies(newMovies);
            }
        }
        fetchData();
    }, [year]);

    return(
        <div>
            <form>
                <label htmlFor='title-input'>Search based on title</label>
                <input type='text' id='title-input' onChange={onChangeTerm} value={term} />
                <label htmlFor='year-input'>Year</label>
                <input type='number' id='year-input' onChange={event => setYear(event.currentTarget.value)} value={year} />
            </form>
            {movies.length > 0 && term.length > 3 && movies.map((movie, index) => {
                return movie.Title.toLowerCase().includes(term.toLowerCase()) && <Movie key={index} {...movie} />
            })}
        </div>
    );
};

export default Form;
