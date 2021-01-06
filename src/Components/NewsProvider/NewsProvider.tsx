import React from 'react';
import { TNewsProviderProps } from '../../types/props/TNewsProviderProps'
import './NewsProvider.scss';

export const NewsProvider = ({ name, image, url }: TNewsProviderProps): JSX.Element => {
	return (
		<div className='news-provider'>
			<a href={url} target='blank'>
				<img src={image} alt={`${name}-img`} />
				<h6>{name}</h6>
			</a>
		</div>
	);
};
