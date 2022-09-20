import { useState, useEffect } from 'react';
import './App.css';

// https://api2.binance.com/api/v3/ticker/24hr

// symbols we want...
// BTCUSDT (Bitcoin)
// ETHUSDT (Ethereum)
// SOLUSDT (Solana)
// ADAUSDT (Cardano)
// DOGEUSDT (DogeCoin)

const COIN_NAMES = {
  BTCUSDT: 'Bitcoin',
  ETHUSDT: 'Ethereum',
  SOLUSDT: 'Solana',
  ADAUSDT: 'Cardano',
  DOGEUSDT: 'DogeCoin',
};

export default function App() {
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    fetch('https://api2.binance.com/api/v3/ticker/24hr')
      .then(res => res.json())
      .then(data => {
        const filteredData = data.filter(ticker => {
          if (Object.keys(COIN_NAMES).includes(ticker.symbol)) {
            return true;
          }
        });
        setCryptoData(filteredData);
      });
  }, []);

  return (
    <div className='App'>
      <nav>
        <img
          alt='logo'
          src='https://assets.codepen.io/6060109/crypto-logo-secondary.png'
        />
        <input type='text' placeholder='Search' />
      </nav>
      <div className='main-content'>
        <h2>Today's cryptocurrency prices</h2>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>24h %</th>
            </tr>
            {cryptoData.map((coin, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{COIN_NAMES[coin.symbol]}</td>
                <td>${Number(coin.lastPrice).toLocaleString()}</td>
                {coin.priceChangePercent < 0 ? (
                  <td style={{ color: 'red' }}>▼{coin.priceChangePercent}%</td>
                ) : (
                  <td style={{ color: 'green' }}>
                    ▲{coin.priceChangePercent}%
                  </td>
                )}
              </tr>
            ))}
          </thead>
        </table>
        <div className='bottom-logo-ctr'>
          <img
            className='bottom-logo'
            alt='logo'
            src='https://assets.codepen.io/6060109/crypto-logo-primary.png'
          />
        </div>
      </div>
    </div>
  );
}
