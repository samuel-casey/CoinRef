import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.scss';

export const Nav = () => {
	return (
		<nav>
			<Link to='/'>
				<h4>Learn</h4>
			</Link>

			<Link to='/news'>
				<h4>News</h4>
			</Link>

			<Link to='/about'>
				<h4>About</h4>
			</Link>
		</nav>
	);
};
