import React, { useEffect, useContext } from 'react';
import { CoinContext } from '../../App';
import { NewsProviderList } from '../../Components/NewsProviderList/NewsProviderList';
import { ArticleList } from '../../Components/ArticleList/ArticleList';
import './News.scss';

export const News = () => {
	return (
		<div className='news-container'>
			<ArticleList />
			<NewsProviderList />
		</div>
	);
};
