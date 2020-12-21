import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import {Logo} from '../../Components/Logo/Logo'
import {useLocation} from 'react-router-dom'
import './Header.scss'

export const Header = () => {
	const location = useLocation();
	
	let activeRoute;

	switch(location.pathname) {
		case '/':
			activeRoute = 'learn'
			break;
		case '/news':
			activeRoute = 'news'
			break;
		case '/about':
			activeRoute = 'about'
			break;
		default:
			activeRoute = 'learn'
			break;
	}

    return (
    		<>
			<Navbar expand='md'>
				<Navbar.Brand href='/'>
					<Logo />
				</Navbar.Brand>
				<Navbar.Toggle
					aria-controls='basic-navbar-nav'
					className='navbar-dark'
					id='hamburger'
				/>
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto'>
						<br></br>
						<Nav.Link href='/' className={activeRoute === 'learn' ? 'active-link' : ''}>Learn</Nav.Link>
						<Nav.Link href='/news' className={activeRoute === 'news' ? 'active-link' : ''}>News</Nav.Link>
						<Nav.Link href='/about' className={activeRoute === 'about' ? 'active-link' : ''}>About</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>)
}