import React, { useContext, useEffect } from 'react';
import { CoinContext } from '../../App';
import './ArticleList.scss';

export const ArticleList = () => {
	const currentCoin = useContext(CoinContext);
	return (
		<div>
			{currentCoin} articles
			<ul>
				<li>One</li>
				<li>Two</li>
			</ul>
		</div>
	);
};
