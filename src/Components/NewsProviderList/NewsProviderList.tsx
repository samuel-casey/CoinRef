import React from 'react';
import { newsProviders } from '../../newsProviders';
import { NewsProvider } from '../NewsProvider/NewsProvider';
import './NewsProviderList.scss';

export const NewsProviderList = (): JSX.Element => {
	const providers = newsProviders.map((provider, index) => {
		return (
			<NewsProvider
				image={provider.image}
				url={provider.url}
				name={provider.name}
				key={index}
			/>
		);
	});
	return (
		<>
			<h5 id="#news-outlets">Other News Outlets:</h5>
			<div className='news-list'>{providers}</div>
		</>
	);
};
