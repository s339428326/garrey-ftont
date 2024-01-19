import { useState } from 'react';

import DefaultLayout from '../layouts/DefaultLayout';
import SearchArtworkList from '../components/SearchArtworkList';
import SearchBar from '../components/SearchBar';

const ArtworkPage = () => {
  //目前搜尋結果
  const [resultData, setResultData] = useState([]);

  return (
    <DefaultLayout>
      <main className="container mx-auto mt-[120px] mb-6">
        <SearchBar setResultData={setResultData} />
        <SearchArtworkList data={resultData} />
      </main>
    </DefaultLayout>
  );
};

export default ArtworkPage;
