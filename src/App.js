import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Coin from "./components/Coin";

function App() {

  
  //allows to have a variable when its values changes it will trigger and re render in our page to show the new value being displayed in the page
  const [listOfCoins, setListOfCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  //when page renders show info
  useEffect(() => {
    Axios.get("https://api.coinstats.app/public/v1/coins?skip=0&").then(
      (response) => {
        setListOfCoins(response.data.coins);
        //console.log(response.data);
      }
    );
  }, []);

  //list of coins after the filter is aplied
  const filteredCoins = listOfCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  })


  return (
    <div className="App">
      <div className="cryptoHeader">
        <input type="text" placeholder="Bitcoin..." onChange={(event) => {setSearchWord(event.target.value)}}/>
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coin
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
