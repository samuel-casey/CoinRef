import React, { useContext, useEffect, useState } from 'react';
import { CoinContext } from '../../App';
import './ArticleList.scss';

const MESSARI_API_KEY = '9ada99d9-1714-4298-b5b8-3c5330af5498';

export const ArticleList = () => {
	const currentCoin = useContext(CoinContext);
	const [newsArticles, setNewsArticles] = useState([]);

	useEffect(() => {
		function fetchNewsArticles() {
			fetch(`https://data.messari.io/api/v1/news/${currentCoin}`, {
				headers: {
					method: 'GET',
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'x-messari-api-key': MESSARI_API_KEY,
				},
			})
				.then((response) => {
					if (response.status === 404) {
						alert(
							`No articles found for ${currentCoin}. Please double check your input or select a coin from the list.`
						);
						document.location.reload();
					} else {
						const body = response.json();
						return body;
					}
				})
				.then((body) => {
					if (body.data === null) {
						alert(
							`No articles found for ${currentCoin}. Please double check your input or select a coin from the list.`
						);
						document.location.reload();
					}
					setNewsArticles(body.data);
				})
				.catch((error) => {
					console.log(error);
				});
		}

		fetchNewsArticles();
	}, [currentCoin]);

	const articles = newsArticles.map((article, index) => {
		return (
			<li className='article' key={`article-${index}`}>
				<a href={article.url} target='blank'>
					<p className='article-title'>{article.title}</p>
					<p className='article-author'>By: {article.author.name}</p>
					<p className='article-timestamp'>
						{new Date(article.published_at).toLocaleString([], {
							month: 'numeric',
							day: 'numeric',
							year: 'numeric',
							hour: '2-digit',
							minute: '2-digit',
						})}
					</p>
				</a>
			</li>
		);
	});
	return (
		<div>
			{currentCoin.toUpperCase()} News
			<ul>{articles}</ul>
		</div>
	);
};
