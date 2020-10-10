import React from 'react';
import { SearchForm } from '../../Components/SearchForm/SearchForm';
import './Search.scss';

export const Search = (props) => {
	return (
		<div className='search-container'>
			<h3>
				Enter the name of a cryptocurrency or select from the dropdown list and
				press submit to learn about it.
			</h3>
			<SearchForm />
		</div>
	);
};
