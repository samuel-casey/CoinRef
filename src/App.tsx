import React from 'react';
import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { Header } from './Containers/Header/Header';
import { Logo } from './Components/Logo/Logo';
import { About } from './Containers/About/About';
import { FooterLinks } from './Containers/FooterLinks/FooterLinks';
import { Search } from './Containers/Search/Search';
import { News } from './Containers/News/News';
import { CoinProfile } from './Containers/CoinProfile/CoinProfile';
import { Videos } from './Components/Videos/Videos';
import { Store } from './Store'


const App = (): JSX.Element => {
	const { dispatch } = React.useContext(Store)

	const handleSearchSubmit = (coin: string) => {
		dispatch({
			type: 'UPDATE_CURRENT_COIN',
			payload: coin
		})
	};

	return (
		<div className='App'>
			<header>
				<Header />
			</header>
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
