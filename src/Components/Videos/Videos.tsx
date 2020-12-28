import React, { useState, useEffect, useContext } from 'react';
import { Store } from '../../Store';
import { fetchVideos } from '../../apis/youtube';
import './Videos.scss'
import Spinner from 'react-bootstrap/Spinner';

export const Videos = (): JSX.Element => {
    const { gState, dispatch } = useContext(Store)
    const [searchResults, setSearchResults] = useState([])
    const [ytSearchQuery, setYtSearchQuery] = useState('eth')

    useEffect(() => {

        const getVideos = async () => {
            const ytSearchResults = await fetchVideos(gState, dispatch, ytSearchQuery)
            setSearchResults(ytSearchResults.items)
        }
        getVideos();

    }, [])

    const thumbs = searchResults.length > 0 ? searchResults.
        map((vid: any, index: number) => (
            // change vid type to be an interface with appropriate props
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