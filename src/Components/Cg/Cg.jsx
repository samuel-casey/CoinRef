import React, {useState, useEffect, useContext} from 'react';
import { allCoins, validIds } from "../../allCoinsList";
import {CoinContext} from '../../App';

export const Cg = () => {
const [cGeckoList, setCGeckoList] = useState([]);
const [listCount, setListCount] = useState(0);
const [imgCount, setImgCount] = useState(0);
const [imageUrl, setImageUrl] = useState(null)
const currentCoin = useContext(CoinContext)

// get lists of slugs and symbols for allCoins for use in filter
const allCoinSlugs = allCoins.map((coin) => coin.slug)
const allCoinSymbols = allCoins.map((coin) => coin.symbol)

// map to hold symbols and ids of coins that are in allCoins AND have a valid coinGeckoId (359 coins total)
const symbolsToIdMap = {}


useEffect(() => {
    
    const getCGeckoCoins = async () => {
        const res = await fetch("https://api.coingecko.com/api/v3/coins/list");
        const list = await res.json();
        setCGeckoList(list);
        if (listCount === 0) setListCount(listCount + 1);
    };
    
    const getImages = async () => {
        await getCGeckoCoins();
        
        const isInSlugsOrSymbols = (coin) => {
            return allCoinSlugs.includes(coin.id) || allCoinSymbols.includes(coin.symbol)
        }
        
        const cGCoins =
        cGeckoList.length > 0
        ? cGeckoList.filter(isInSlugsOrSymbols)
        : null;
        
        let currentCoinCGeckoId
        
        if (cGCoins) {
            // add each coin to a map that has their coinGeckoId
            cGCoins.forEach((coin) => {
                symbolsToIdMap[coin.symbol] = {
                    id: coin.id
                }
            })    
            currentCoinCGeckoId = symbolsToIdMap[currentCoin.toLowerCase()]['id']
        }
        
        if (currentCoinCGeckoId) {
            const res = await fetch(`https://api.coingecko.com/api/v3/coins/${currentCoinCGeckoId}`)
            const data = await res.json()
            const image = data.image.large
            setImageUrl(image)
            if (imgCount === 0) setImgCount(imgCount + 1);
        }
        console.log(imageUrl)
    }
    getImages()
  }, [imgCount, listCount]);

    return (
    <>
    <div>{validIds.length}</div>
    {imageUrl ? <img src={imageUrl} alt={currentCoin} /> : null } 
    </>
    )
}
