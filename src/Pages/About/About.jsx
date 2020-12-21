import React from 'react';
import './About.scss';

export const About = () => {
	return (
		<div className='about-page'>
			<h1>About CoinRef</h1>
			<p>
				CoinRef is a free reference tool for crypto novices to learn about the basics of various cryptocurrencies and read news articles related to specific coins. Getting started learning about cryptocurrency can be very challenging due to the sheer amount of data available about the space. CoinRef aims to simplify the learning process by displaying only the most basic information necessary to start learning about any given cryptocurrency, and by limiting search results to one coin at a time.
			</p>
			<p>
				Often times crypto newcomers spend too much time focusing on price and not enough time learning the basics of the space or the specific cryptocurrencies they are invested in or considering investing in. There is no denying that price is an important aspect in evaluating a cryptocurrency, but it is only one factor that should be considered. In addition, comparing prices across different cryptocurrencies can be dangerous if one does not know the basics about the coins they are comparing. To combat this, CoinRef does not allow users to compare cryptocurrencies' prices. For those interested in more information about price and/or comparing prices across cryptocurrencies, check out <a href="https://onchainfx.com">OnChainFX.com</a> or the <a href="https://coinmetrics.io/mobile-app">CoinMetrics mobile app.</a></p>
			<h2>Data Sources</h2>
			<p>
				There is a lot of bad data in the crypto space. In order to provide reputable, objective and free data, CoinRef is powered by the <a href="https://messari.io/api">Messari OnChainFX API</a>. The Messari team is widely considered one of the best data sources in the space for their commitment to maintaining the highest level of data integrity as possible.
			</p>
			<h2>News & Research Articles</h2>
			<p>
				The news articles listed on the News page are from Messari's research analysts and other selected news sources. For the most up-to-date, general crypto news, visit one of the additional news sources listed under the <a href="/news#news-outlets">other news sources</a> section at the bottom of the page.
			</p>
			<h2>Additional News Sources</h2>
			<p>
				The news outlets listed on the News page are long-standing for the space and generally considered to be some of the most reputable in crypto. As with any news source, there may be opinion mixed in with fact in some articles, so please be careful.</p>
			<p>
				CoinRef is independent and does not have an association with Messari or any of the other resources listed on this site. CoinRef does not endorse any of the news articles or authors listed on this site.</p>
			<h2>Feedback</h2>
			<p>
				CoinRef is built and maintained by <a href="https://twitter.com/_samcasey" target="blank">Sam Casey</a> as a passion project. Please reach out to him via Twitter Direct Message if you have any recommendations on how to improve the site or any other feedback.
			</p>
		</div>
	);
};
