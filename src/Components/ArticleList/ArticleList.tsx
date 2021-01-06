import React, { useContext, useEffect, useState } from 'react';
import { fetchAssetNewsArticles } from '../../apis/messari';
import { Store } from '../../Store';
import { formatArticleDate } from '../../helpers/dateHelpers';
import './ArticleList.scss';
import { TNewsArticle } from '../../types/TNewsArticle';

export const ArticleList = (): JSX.Element => {
	const { gState, dispatch } = useContext(Store);
	const { currentCoin, errorMsg } = gState;
	const [newsArticles, setNewsArticles] = useState([]);

	useEffect(() => {
		const getArticles = async () => {
			const newsData = await fetchAssetNewsArticles(currentCoin, dispatch);
			if (newsData) setNewsArticles(newsData)
		}
		getArticles();
	}, [currentCoin, dispatch]);

	const articles = newsArticles.length > 0 ? newsArticles.map((article: TNewsArticle, index: number) => {
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
