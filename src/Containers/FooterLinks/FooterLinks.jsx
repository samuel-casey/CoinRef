import React from 'react';
import './FooterLinks.scss';

export const FooterLinks = (props) => {
	return (
		<div id='footer-links'>
			<div id='disclaimer'>
				All content on this site is intended to be educational and should not be
				perceived as financial advice. Data from
				<span>
					<a href='https://messari.io' target='blank'>
						{' '}
						messari.io.
					</a>
				</span>
			</div>
			<ul id='links'>
				<li>
					<a href='https://github.com/samuel-casey/coinref' target='blank'>
						GitHub
					</a>
				</li>
			</ul>
		</div>
	);
};
