import React from 'react';

const Movie = (props) => (
    <div>
        <h4>{props.Title}</h4>
        <p>Year: {props.Year}</p>
    </div>
);

export default Movie;
