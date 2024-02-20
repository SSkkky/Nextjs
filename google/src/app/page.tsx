"use client";

import styles from "./page.module.css";
import React, {useState } from 'react';
import axios from 'axios';
import {googleSearchItem} from '@/app/types/datatype';

export default function Home() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<googleSearchItem[] | null>(null);

  const search: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    console.log('검색어 = ', query)
    await axios.get('/api/searchQuery', { params: { q: query } })
    .then(response =>{
      setResults(response.data.items);
    })
    .catch(error => {
      console.error('Error fetching data', error);
    })
  };

  return (
    <div>
      <form onSubmit={search}>
        <input
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {results && (
        <ul>
          {results.map((item:googleSearchItem) => (
            <li key={item.link}>
              <a href={item.link}>{item.title}</a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
