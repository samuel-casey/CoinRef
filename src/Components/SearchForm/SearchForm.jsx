import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Form.scss';

export const SearchForm = (props) => {
	return (
		<Form>
			<Form.Group controlId='formBasicEmail'>
				<Form.Control type='text' placeholder='Enter cryptocurrency' />
				<Button variant='primary' type='submit'>
					Search
				</Button>
			</Form.Group>
		</Form>
	);
};
