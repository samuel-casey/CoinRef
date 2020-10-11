import React, { useContext } from 'react';
import { SearchForm } from '../../Components/SearchForm/SearchForm';
import './Search.scss';
import { CoinContext } from '../../App';

export const Search = (props) => {
	const currentCoin = useContext(CoinContext);
	return (
		<div className='search-container'>
			<h3>
				Enter the name of a cryptocurrency or select from the dropdown list and
				press submit to learn about it.
			</h3>
			<SearchForm />
			{currentCoin}
		</div>
	);
};
