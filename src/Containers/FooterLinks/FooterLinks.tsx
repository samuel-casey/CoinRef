import React from 'react';
import './FooterLinks.scss';

export const FooterLinks = (): JSX.Element => {
	return (
		<div id='footer-links'>
			<a href='https://github.com/samuel-casey/coinref' target='blank'>
				Github <i className="fab fa-github"></i>
			</a>
		</div>
	);
};
