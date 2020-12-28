import React from 'react';
import './CoinResources.scss';

export const CoinResources = ({ coinProfileData }): JSX.Element => {
	let resources;

	if (coinProfileData) {
		resources = coinProfileData.profile.general.overview.official_links.map(
			(resource, index) => {
				return (
					<li key={index} className='coin-resource'>
						<a href={resource.link} target='blank'>
							{resource.name}
						</a>
					</li>
				);
			}
		);
	}

	return (
		<div className='coin-resources'>
			<h6>Additional Resources</h6>
			<ul>{resources}</ul>
		</div>
	);
};
