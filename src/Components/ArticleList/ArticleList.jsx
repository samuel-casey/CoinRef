import React, { useContext, useEffect, useState } from 'react';
import { fetchAssetNewsArticles } from '../../apis/messari';
import { CoinContext } from '../../App';
import './ArticleList.scss';

const { REACT_APP_MESSARI_API_KEY } = process.env;

export const ArticleList = () => {
	const {gState, setGState} = useContext(CoinContext);
	const {currentCoin, errorMsg} = gState;
	const [newsArticles, setNewsArticles] = useState([]);

	useEffect(() => {
		// const fetchNewsArticles = () => {
		// 	fetch(`https://data.messari.io/api/v1/news/${currentCoin}`, {
		// 		headers: {
		// 			method: 'GET',
		// 			Accept: 'application/json',
		// 			'Content-Type': 'application/json',
		// 			'x-messari-api-key': REACT_APP_MESSARI_API_KEY,
		// 		},
		// 	})
		// 		.then((response) => {
		// 			if (response.status === 404) {
		// 				setGState({...gState, errorMsg: `No articles found for ${currentCoin}. Please double check your input or select a coin from the list.`});
		// 			} else {
		// 				setGState({...gState, errorMsg: ''});
		// 				const body = response.json();
		// 				return body;
		// 			}
		// 		})
		// 		.then((body) => {
		// 			if (body.data === null) {
		// 				setGState({...gState, errorMsg: `No articles found for ${currentCoin}. Please double check your input or select a coin from the list.`});
		// 			}
		// 			setNewsArticles(body.data);
		// 		})
		// 		.catch((error) => {
		// 			console.log(error);
		// 		});
		// }

		const getArticles = async () => {
			const newsData = await fetchAssetNewsArticles(currentCoin, gState, setGState);
			if (newsData) setNewsArticles(newsData)
		}
		getArticles();
	}, [currentCoin]);

	const articles = newsArticles.length > 0 ? newsArticles.map((article, index) => {
		return (
			<div className='article' key={`article-${index}`}>
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
			</div>
		);
	}): null ;

	const pageContent = errorMsg === '' ? (<><div>{currentCoin.toUpperCase()} News & Research</div>
			<div id='article-list'>{articles}</div></>) : (<><div>{errorMsg}</div></>)

	return <div>{pageContent}</div>
};
