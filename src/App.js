import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './Components/Nav/Nav';
import { Logo } from './Components/Logo/Logo';
import { About } from './Containers/About/About';
import { FooterLinks } from './Containers/FooterLinks/FooterLinks';
import { Search } from './Containers/Search/Search';
import { News } from './Containers/News/News';
import { CoinProfile } from './Containers/CoinProfile/CoinProfile';

function App() {
	return (
		<div className='App'>
			<header>
				<Logo />
				<Nav />
			</header>
			<main>
				<Switch>
					<Route exact path='/' component={Search} />
					<Route path='/coin-profile' component={CoinProfile} />
					<Route path='/news' component={News} />
					<Route path='/about' component={About} />
				</Switch>
			</main>
			<footer>
				<Logo />
				<FooterLinks />
			</footer>
		</div>
	);
}

export default App;
