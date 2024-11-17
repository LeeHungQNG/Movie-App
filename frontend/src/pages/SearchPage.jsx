import { useState } from 'react';
import { useContentStore } from '../store/content';
import Navbar from '../components/Navbar';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ORIGINAL_IMG_BASE_URL } from '../utils/constants';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('movie');
  const [searchTerm, setSearchTerm] = useState('');

  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    tab === 'movie' ? setContentType('movie') : setContentType('tv');
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast.error('Nothing found, make sure you are searching under the right category');
      } else {
        toast.error('An error occurred, please try again later');
      }
    }
  };

 

  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button onClick={() => handleTabClick('movie')} className={`px-4 py-2 rounded ${activeTab === 'movie' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}>
            Movies
          </button>
          <button onClick={() => handleTabClick('tv')} className={`px-4 py-2 rounded ${activeTab === 'tv' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}>
            TV Shows
          </button>
          <button onClick={() => handleTabClick('person')} className={`px-4 py-2 rounded ${activeTab === 'person' ? 'bg-red-600' : 'bg-gray-800'} hover:bg-red-700`}>
            Person
          </button>
        </div>
        <form onSubmit={handleSearch} className="flex gap-2 items-stretch mb-8 max-w-2xl mx-auto">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={'Search for a' + activeTab}
            className="w-full p-2 rounded bg-gray-800 text-white"
          />
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded">
            <Search className="size-6" />
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;
            return (
              <div key={result.id} className="bg-gray-800 p-4 rounded">
                {activeTab === 'person' ? (
                  <Link to={'/actor/' + result.name} className="flex flex-col items-center">
                    <img src={ORIGINAL_IMG_BASE_URL + result.profile_path} alt={result.name} />
                    <h2 className="mt-2 text-xl font-bold">{result.name}</h2>
                  </Link>
                ) : (
                  <Link to={'/watch/' + result.id}>
                    <img className="w-full h-auto rounded" src={ORIGINAL_IMG_BASE_URL + result.poster_path} alt={result.title || result.name} />
                    <h2 className="mt-2 text-xl font-bold">{result.title || result.name}</h2>
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default SearchPage;