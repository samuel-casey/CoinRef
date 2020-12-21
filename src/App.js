import React, { useState } from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { Header } from './Pages/Header/Header';
import { Logo } from './Components/Logo/Logo';
import { About } from './Pages/About/About';
import { FooterLinks } from './Pages/FooterLinks/FooterLinks';
import { Search } from './Pages/Search/Search';
import { News } from './Pages/News/News';
import { CoinProfile } from './Pages/CoinProfile/CoinProfile';
import { allCoins } from './allCoinsList';
import { Videos } from './Components/Videos/Videos';

export const CoinContext = React.createContext();

const App = () => {
	const [gState, setGState] = useState({
		currentCoin: 'btc',
		errorMsg: '',
	});

	const handleSearchSubmit = (coin) => {
		setGState({ ...gState, currentCoin: coin });
	};

	return (
		<div className='App'>
			<header>
				<Header />
			</header>
			<CoinContext.Provider value={{ gState, setGState }}>
				<main>
					<Switch>
						<Route exact path='/'>
							<>
								<Search handleSubmit={handleSearchSubmit} type='coinProfile' />
								<CoinProfile />
							</>
						</Route>
						<Route path='/news'>
							<>
								<Search handleSubmit={handleSearchSubmit} type='news' />
								<News />
							</>
						</Route>
						<Route path='/about' component={About} />
						<Route path='/videos' component={Videos} />
					</Switch>
				</main>
			</CoinContext.Provider>
			<footer>
				<div id='footer-logo-container'>
					<Logo />
				</div>
				<div id='disclaimer'>
					<span>
						All content on this site is intended to be educational and should
						not be perceived as financial advice. Data from{' '}
						<a href='https://messari.io' target='blank'>
							{' '}
							Messari.io.
						</a>
					</span>
					<FooterLinks />
				</div>
			</footer>
		</div>
	);
};

export default App;
