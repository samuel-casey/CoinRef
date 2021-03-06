import React from 'react';
import { Link } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import './Nav.scss';

export const Nav = (): JSX.Element => {
	return (
		<nav>
			<Dropdown>
				<Dropdown.Toggle variant='secondary' id='menu'>
					<i className="fas fa-bars"></i>
				</Dropdown.Toggle>

				<Dropdown.Menu>
					<Dropdown.Item>
						<Link to='/'>
							<h6>Learn</h6>
						</Link>
					</Dropdown.Item>
					<Dropdown.Item>
						<Link to='/news'>
							<h6>News & Research</h6>
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
