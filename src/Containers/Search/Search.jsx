import React, { useContext } from 'react';
import { SearchForm } from '../../Components/SearchForm/SearchForm';
import './Search.scss';
import { CoinContext } from '../../App';

export const Search = ({ handleSubmit }) => {
	return (
		<div className='search-container'>
			<h3>
				Enter the name of a cryptocurrency or select from the dropdown to Search
				for an overview.
			</h3>
			<SearchForm handleSubmit={handleSubmit} />
		</div>
	);
};
