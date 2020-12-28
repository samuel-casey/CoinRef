import React, { useContext, useEffect, useState } from 'react';
import { fetchAssetNewsArticles } from '../../apis/messari';
import { Store } from '../../Store';
import { formatArticleDate } from '../../helpers/dateHelpers';
import './ArticleList.scss';

const { REACT_APP_MESSARI_API_KEY } = process.env;

export const ArticleList = () => {
	const { gState, dispatch } = useContext(Store);
	const { currentCoin, errorMsg } = gState;
	const [newsArticles, setNewsArticles] = useState([]);

	useEffect(() => {
		// const getArticles = async () => {
		// 	const newsData = await fetchAssetNewsArticles(currentCoin, gState, setGState);
		// 	if (newsData) setNewsArticles(newsData)
		// }
		// getArticles();
	}, [currentCoin]);

	const articles = newsArticles.length > 0 ? newsArticles.map((article, index) => {
		return (
			<div className='article' key={`article-${index}`}>
				<a href={article.url} target='blank'>
					<p className='article-title'>{article.title}</p>
					<p className='article-author'>By: {article.author.name}</p>
					<p className='article-timestamp'>
						{formatArticleDate(article.published_at)}
					</p>
				</a>
			</div>
		);
	}) : null;

	const pageContent = errorMsg === '' ? (<><div>{currentCoin.toUpperCase()} News & Research</div>
		<div id='article-list'>{articles}</div></>) : (<><div>{errorMsg}</div></>)

	return <div>{pageContent}</div>
};
