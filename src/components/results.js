import React from 'react';
import './results.css';

export default ({ title, results }) => results && results.length ?
  <div className='results'>
    <h3>{title}</h3>
    <ul>{results.map((name) =>
      <li key={name}>{name[0].toUpperCase() + name.slice(1)}</li>)
    }</ul>
  </div> :
  null;
