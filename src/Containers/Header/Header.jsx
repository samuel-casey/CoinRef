import React from 'react'
import { Nav, Navbar } from 'react-bootstrap';
import {Logo} from '../../Components/Logo/Logo'
import './Header.scss'

export const Header = () => {
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
						<Nav.Link href='/'>Learn</Nav.Link>
						<Nav.Link href='/news'>News</Nav.Link>
						<Nav.Link href='/about'>About</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</>)
}