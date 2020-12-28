import React from 'react';
import { SearchForm } from '../../Components/SearchForm/SearchForm';
import './Search.scss';

export const Search = ({ handleSubmit, type }): JSX.Element => {
	const typeOfData =
		type === 'news' ? (
			<>
				articles from{' '}
				<a href='https://messari.io' id='messari-news-link' target='blank'>
					Messari
				</a>
			</>
		) : (
				'an asset overview'
			);
	return (
		<div className='search-container'>
			<p>
				Enter the symbol of a coin or select from the dropdown to search
				for {typeOfData}.
			</p>
			<SearchForm handleSubmit={handleSubmit} />
		</div>
	);
};
