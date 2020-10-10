import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

export const Nav = () => {
	return (
		<nav>
			<Link to='/'>
				<h6>Learn</h6>
			</Link>

			<Link to='/news'>
				<h6>News</h6>
			</Link>

			<Link to='/about'>
				<h6>About</h6>
			</Link>
		</nav>
	);
};
