import React from 'react';
import { SlideDown } from 'react-slidedown'
import 'react-slidedown/lib/slidedown.css'
import { TCoinBackgroundProps } from '../../types/props/TCoinBackgroundProps';
import './CoinBackground.scss'

export const CoinBackground = ({ coinBgVisible, background }: TCoinBackgroundProps): JSX.Element => {
    return (
        <SlideDown className={'my-dropdown-slidedown'}>
            {coinBgVisible ? <p id='bg-text'>{background}</p> : null}
        </SlideDown>
    )
}