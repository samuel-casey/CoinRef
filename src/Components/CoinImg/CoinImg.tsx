import React, { useState, useEffect, useContext } from 'react';
import { allCoins, validIds } from "../../allCoinsList";
import ICGCoins from '../../interfaces/ICGCoin';
import { Store } from '../../Store';
import { fetchCoinGeckoAssetList } from '../../apis/coinGecko';
import './CoinImg.scss'

export const CoinImg = (): JSX.Element => {
    const { gState, dispatch } = useContext(Store);
    const { currentCoin } = gState;
    const [cGeckoList, setCGeckoList] = useState<Array<ICGCoins>>([]);
    const [listCount, setListCount] = useState(0);
    const [imgCount, setImgCount] = useState(0);
    const [imageUrl, setImageUrl] = useState()

    // get lists of slugs and symbols for allCoins for use in filter
    const allCoinSlugs = allCoins.map((coin) => coin.slug)
    const allCoinSymbols = allCoins.map((coin) => coin.symbol)

    // map to hold symbols and ids of coins that are in allCoins AND have a valid coinGeckoId (359 coins total)
    type TSymbolsToIdMap = {
        [key: string]: { id: string; };
    }

    const symbolsToIdMap: TSymbolsToIdMap = {}


    useEffect(() => {

        const getCGeckoCoins = async () => {
            const cGCoins: ICGCoins[] = await fetchCoinGeckoAssetList(dispatch);
            setCGeckoList(cGCoins);
            if (listCount === 0) setListCount(listCount + 1);
        };

        const getImages = async () => {
            await getCGeckoCoins();

            const isInSlugsOrSymbols = (coin: ICGCoins) => {
                return allCoinSlugs.includes(coin.id) || allCoinSymbols.includes(coin.symbol)
            }

            const cGCoins =
                cGeckoList.length > 0
                    ? cGeckoList.filter(isInSlugsOrSymbols)
                    : null;

            let currentCoinCGeckoId

            if (cGCoins && symbolsToIdMap !== {}) {
                // add each coin to a map that has their coinGeckoId
                cGCoins.forEach((coin) => {
                    symbolsToIdMap[coin.symbol] = {
                        id: coin.id
                    }
                })

                if (symbolsToIdMap[currentCoin.toLowerCase()]) {
                    currentCoinCGeckoId = symbolsToIdMap[currentCoin.toLowerCase()]['id']
                } else {
                    setImageUrl(undefined)
                }
            }

            if (currentCoinCGeckoId) {
                const res = await fetch(`https://api.coingecko.com/api/v3/coins/${currentCoinCGeckoId}`)
                const data = await res.json()
                const image = data.image.large
                setImageUrl(image)
                if (imgCount === 0) setImgCount(imgCount + 1);
            }
        }
        getImages()
    }, [imgCount, listCount, currentCoin]);

    return (
        <>
            {imageUrl ? <img className='coin-img' src={imageUrl} alt={currentCoin} /> : <span className='coin-img-symbol'>{currentCoin.toUpperCase()}</span>}
        </>
    )
}
