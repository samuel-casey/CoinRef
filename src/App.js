import React, { useState } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { Header } from './Containers/Header/Header';
import { Logo } from './Components/Logo/Logo';
import { About } from './Containers/About/About';
import { FooterLinks } from './Containers/FooterLinks/FooterLinks';
import { Search } from './Containers/Search/Search';
import { News } from './Containers/News/News';
import { CoinProfile } from './Containers/CoinProfile/CoinProfile';

export const CoinContext = React.createContext();

function App() {
	const [currentCoin, setCurrentCoin] = useState('btc');

	function handleLearnSubmit(coin) {
		setCurrentCoin(coin);
	}

	return (
		<div className='App'>
			<header>
				<Header />
			</header>
			<CoinContext.Provider value={currentCoin}>
				<main>
					<Switch>
						<Route exact path='/'>
							<>
								<Search handleSubmit={handleLearnSubmit} type='coinProfile' />
								<CoinProfile />
							</>
						</Route>
						<Route path='/news'>
							<>
								<Search handleSubmit={handleLearnSubmit} type='news' />
								<News />
							</>
						</Route>
						<Route path='/about' component={About} />
					</Switch>
				</main>
			</CoinContext.Provider>
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
