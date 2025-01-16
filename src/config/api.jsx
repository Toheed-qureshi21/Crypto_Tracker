import axios from "axios";

const api = axios.create({
    baseURL:"https://api.coinlore.net/api"
});

export const trendingCoins = async () => {
    const response = await api.get(`/tickers/?limit=10`)
    return response.data.data;
    
}
export const coinList = async(page) => {
  const response = await api.get(`/tickers/?start=${page}&limit=10`);
  return response.data.data;
}

export const singleCoin = async(id) => {
    try {
        const response = await api.get(`/ticker/?id=${id}`);
        const data = await response.data;
        return data;
    } catch (error) {
        return error;
        
    }
 

}
