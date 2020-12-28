import React from 'react';
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import ICoinBackgroundProps from '../../interfaces/props/ICoinBackgroundProps';
import './CoinBackground.scss'

export const CoinBackground = ({ coinBgVisible, background }: ICoinBackgroundProps): JSX.Element => {
    return (
        <SlideDown className={'my-dropdown-slidedown'}>
            {coinBgVisible ? <p id='bg-text'>{background}</p> : null}
        </SlideDown>
    )
}