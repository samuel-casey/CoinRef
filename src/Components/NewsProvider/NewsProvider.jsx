import React from 'react';
import './NewsProvider.scss';

export const NewsProvider = ({ name, image, url }) => {
	return (
		<div className='news-provider'>
			<a href={url} target='blank'>
				<img src={image} alt={`${name}-img`} />
				<h6>{name}</h6>
			</a>
		</div>
	);
};
