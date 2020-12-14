import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {allCoins} from '../../allCoinsList';
import './Form.scss';

export const SearchForm = (props) => {
	const [searchVal, setSearchVal] = useState('');

	function handleChange(e) {
		setSearchVal(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		props.handleSubmit(searchVal);
	}

	console.log(allCoins)

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group controlId='formBasic'>
				<Form.Control
					type='text'
					name='searchBar'
					placeholder='Enter name of a cryptocurrency...'
					value={searchVal}
					onChange={handleChange}
				/>
				<Button variant='primary' type='submit'>
					Search
				</Button>
				{/* DROPDOWN GOES HERE */}
			</Form.Group>
		</Form>
	);
};
