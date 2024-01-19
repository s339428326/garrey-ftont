import axios from 'axios';

export const getTWDExchangeRate = async () => {
  try {
    const res = await axios.get(
      'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=twd'
    );
    return res.data.ethereum.twd;
  } catch (error) {
    console.log(error);
  }
};
