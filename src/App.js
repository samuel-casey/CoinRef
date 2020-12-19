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
import { allCoins } from './allCoinsList';
import { Videos } from './Components/Videos/Videos';

export const CoinContext = React.createContext();

function App() {
	const [gState, setGState] = useState({
		currentCoin: 'btc',
		errorMsg: '',
	});

	function handleSearchSubmit(coin) {
		setGState({ ...gState, currentCoin: coin });
		console.log(coin);
		console.log(allCoins.filter((obj) => obj.slug === coin.slug));
	}

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
