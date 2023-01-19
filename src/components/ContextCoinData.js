import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

const CoinDataContext = React.createContext();

export function useCoinData() {
    return useContext(CoinDataContext);
}

export function CoinDataProvider({ children }) {
    const [coins, setCoins] = useState([]);
    // on page load, grab crypto data from API
    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source()

        const getData = () => {
            axios({
                url: "https://api.coingecko.com/api/v3/coins/markets",
                method: "get",
                dataResponse: "json",
                params: {
                    vs_currency: "usd",
                    per_page: 1000,
                    price_change_percentage: "1h,24h,7d"
                }
            }, { cancelToken: source.token }).then((res) => {
                setCoins(res.data);
            }).catch((err) => {
                if (axios.isCancel(err)) {
                    console.log('Successfully Aborted');
                } else {
                    alert("Fetch Error", err);
                }
            });
        }
        // performs a refresh of coins & prices every 15s
        const id = setInterval(getData, 15000)
        // immediately invokes the fetch request on launch
        getData();
        return () => {
            source.cancel();
            clearInterval(id);
        }
    }, [])

    return (
        <CoinDataContext.Provider value={coins}>
            {children}
        </CoinDataContext.Provider>
    )
} 