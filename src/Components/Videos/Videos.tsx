import React, {useState, useEffect, useContext} from 'react';
import {CoinContext} from '../../App';
import {fetchVideos} from '../../apis/youtube';
import './Videos.scss'
import Spinner from 'react-bootstrap/Spinner';

export const Videos = () => {
    const {gState, setGState} = useContext(CoinContext)
    const [searchResults, setSearchResults] = useState([])
    const [ytSearchQuery, setYtSearchQuery ]= useState('eth')

    useEffect(() => {

        const getVideos = async () => {
            const ytSearchResults = await fetchVideos(gState, setGState, ytSearchQuery)
            setSearchResults(ytSearchResults.items)
        }
        getVideos();

    }, [])

    const thumbs = searchResults.length > 0 ? searchResults.map((vid, index) => (
        <div className='video-thumbnail' key={index}>
            <img src={vid.snippet.thumbnails.high.url} alt='thumb' />
            <a className='button' href={`https://www.youtube.com/watch?v=${vid.id.videoId}`}>
				YouTube <i className="fab fa-youtube"></i>
            </a>
        </div>
    )) : null

    return <div className='videos-page'>
    <nav className='sidebar'>
        <button>Custody</button>
        <button>Security</button>
        <button>Exchanges</button>
    </nav>
    <section className='videos-container'>
    {searchResults.length > 0 ? thumbs : <div className='spinner-container'><Spinner animation='border' variant='info' /></div>}
    </section>
</div>
}