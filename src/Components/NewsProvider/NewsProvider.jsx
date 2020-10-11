import React from 'react';
import './NewsProvider.scss';

export const NewsProvider = ({ name, image, url }) => {
	return (
		<div className='news-provider'>
			<a href={url} target='blank'>
				<h6>{name}</h6>
				<img src={image} alt='name-image' />
			</a>
		</div>
	);
};
