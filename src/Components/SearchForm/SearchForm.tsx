import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { allCoins } from '../../allCoinsList';
import './SearchForm.scss';
import { TSearchFormProps } from '../../types/props/TSearchFormProps';

export const SearchForm = ({ handleSubmit }: TSearchFormProps): JSX.Element => {
	const [searchVal, setSearchVal] = useState('BTC');

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchVal(e.target.value);
	}

	const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSubmit(searchVal);
	}

	const options = allCoins.map((coin: any, index: number) => <option value={coin.symbol} key={index + "-" + coin.symbol}>{coin.name}</option>)

	return (
		<Form onSubmit={handleSearchSubmit}>
			<Form.Group controlId='formBasic'>
				<Form.Control
					type='text'
					name='searchBar'
					placeholder='Enter name of a cryptocurrency or select from dropdown'
					value={searchVal}
					onChange={handleChange}
				/>
				<div id='search-and-list'>
					<Button variant='primary' type='submit'>
						<i className="fas fa-search"></i>
					</Button>
					<Form.Control as='select' name='coinsList' className='coins-list' value={searchVal} onChange={handleChange}>
						{options}
					</Form.Control>
					<i className="fas fa-angle-double-down" id='custom-drop'></i>
				</div>
			</Form.Group>
		</Form>
	);
};
