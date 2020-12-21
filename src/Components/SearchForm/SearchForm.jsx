import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {allCoins} from '../../allCoinsList';
import './SearchForm.scss';

export const SearchForm = (props) => {
	const [searchVal, setSearchVal] = useState('BTC');

	const handleChange = (e) => {
		setSearchVal(e.target.value);
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		props.handleSubmit(searchVal);
	}

	const options = allCoins.map((coin, idx) => <option value={coin.symbol} key={idx + "-"+ coin.symbol}>{coin.name}</option>)

	return (
		<Form onSubmit={handleSubmit}>
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
