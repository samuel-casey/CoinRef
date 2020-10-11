import React, {useState, useEffect} from 'react';
import './CoinDescription.scss';

export const CoinDescription = (props) => {

const [currentCoin, setCurrentCoin] = useState("btc");
  const [coinProfileData, setCoinProfileData] = useState(null);

  function fetchAssetData(coin) {
    fetch(`https://data.messari.io/api/v2/assets/${coin}/profile`, {
      headers: {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then((response) => response.json())
      .then((body) => {
        const data = body.data;
        setCoinProfileData(data);
      })
      .catch((error) => console.log(error.message));
  }

  // logging twice
  useEffect(() => {
    fetchAssetData(currentCoin);
  }, []);

  let description;

    coinProfileData
      ? (description = coinProfileData.profile.general.overview.project_details.replace(
          /<([^>]+)>/g,
          ""
        ))
      : `Loading data for ${currentCoin}`;
  }
	return (
		<div className='coin-description'>
			<h5>bitcoin</h5>
			<p>
				Created by Satoshi Nakomoto in 2009. No one knows who they were to this
				day.
			</p>
		</div>
	);
};
