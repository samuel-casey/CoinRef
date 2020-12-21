import Axios from 'axios';
import React, {useState, useEffect, useContext} from 'react';
import {CoinContext} from '../../App';
import axios from 'axios';
import './Videos.scss'
import Button from 'react-bootstrap/Button';

const {REACT_APP_YOUTUBE_API_KEY} = process.env;

export const Videos = () => {
    const [searchResults, setSearchResults] = useState([])

    const ytSearchQuery = 'btc'
    useEffect(() => {
        const getVideos = async () => {
            const search = await axios.get(`https://cors-anywhere.herokuapp.com/https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${ytSearchQuery}&key=${REACT_APP_YOUTUBE_API_KEY}`);
            console.log(search.data)
            setSearchResults(search.data.items)
        }
        getVideos()

    }, [])

    const thumbs = searchResults.length > 0 ? searchResults.map((vid, index) => (
        <div className='video-thumbnail' key={vid.id.videoId}>
            <img src={vid.snippet.thumbnails.high.url} alt='thumb' />
            <a className='button' href={`https://www.youtube.com/watch?v=${vid.id.videoId}`}>
				<i className="fab fa-youtube"></i>
            </a>
        </div>
    )) : null

    return <>
    {thumbs}
</>
}