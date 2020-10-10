import React from 'react';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import './Nav.scss';

export const Nav = () => {
	return (
		<nav>
			<Dropdown>
				<Dropdown.Toggle variant='primary' id='dropdown-basic'>
					Menu
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item>
						<Link to='/'>
							<h6>Learn</h6>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item>
						<Link to='/news'>
							<h6>News</h6>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item>
						<Link to='/about'>
							<h6>About</h6>
						</Link>
					</Dropdown.Item>
				</Dropdown.Menu>
			</Dropdown>
		</nav>
	);
};
