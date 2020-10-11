import React from 'react';
import { newsProviders } from '../../newsProviders';
import { NewsProvider } from '../NewsProvider/NewsProvider';

export const NewsProviderList = () => {
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
	return <div className='news-providers'>{providers}</div>;
};
