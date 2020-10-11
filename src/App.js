import React, { useState } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { Nav } from './Components/Nav/Nav';
import { Logo } from './Components/Logo/Logo';
import { About } from './Containers/About/About';
import { FooterLinks } from './Containers/FooterLinks/FooterLinks';
import { Search } from './Containers/Search/Search';
import { News } from './Containers/News/News';
import { CoinProfile } from './Containers/CoinProfile/CoinProfile';

export const CoinContext = React.createContext();

function App() {
	const [currentCoin, setCurrentCoin] = useState('eth');

	return (
		<div className='App'>
			<header>
				<Logo />
				<Nav />
			</header>
			<main>
				<Switch>
					<Route exact path='/' component={Search} />
					<Route path='/coin-profile'>
						<>
							<CoinContext.Provider value={currentCoin}>
								<CoinProfile />
							</CoinContext.Provider>
						</>
					</Route>
					<Route path='/news' component={News} />
					<Route path='/about' component={About} />
				</Switch>
			</main>
			<footer>
				<Logo />
				<FooterLinks />
				<div id='disclaimer'>
					All content on this site is intended to be educational and should not
					be perceived as financial advice. Data from
					<span>
						<a href='https://messari.io' target='blank'>
							{' '}
							messari.io.
						</a>
					</span>
				</div>
			</footer>
		</div>
	);
}

export default App;
