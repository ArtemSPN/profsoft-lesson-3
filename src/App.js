import React from 'react';
import './index.scss';
import Collection from './Collection';
import axios from 'axios';

function App() {
  const [collections, setCollections] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [textSearch, setTextSearch] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState(0);
  const [activePage, setActivePage] = React.useState(1);
  const limitOnPage = 3;

  const categories = [
    "Все",
    "Походы в горы",
    "Море (июнь)",
    "Поездка в Европу",
    "Идеальная архитектура",
    "Красивые здания",
    "Путешествие по миру",
    "Путешествие куда-то",
    "Хороший вкус",
    "Летний отдыx"
  ];

  const getFullBackUrl = ()=> {
    let baseUrl = `http://63273cdb5731f3db9955fb8a.mockapi.io/photos-data?page=${activePage}&limit=${limitOnPage}&`;
    if (activeCategory) baseUrl += `category=${activeCategory}`;
    return baseUrl;
  };

  const getFilteredCollections = () => {
    return collections.filter((collection) =>
      collection.name.toLowerCase().includes(textSearch.toLowerCase()),
    );
  };

  React.useEffect(() => {
    setIsLoading(true);
    axios
      .get(getFullBackUrl())
      .then(({ data }) => {
        setCollections(data);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получении данных');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [activeCategory, activePage]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map((category, index) => (
            <li
              className={index == activeCategory ? 'active' : ''}
              onClick={() => setActiveCategory(index)}>
              {category}
            </li>
          ))}
        </ul>
        <input
          className="search-input"
          placeholder="Поиск по названию"
          value={textSearch}
          onChange={(e) => setTextSearch(e.target.value)}
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Идет загрузка...</h2>
        ) : (
          getFilteredCollections().map((collection) => (
            <Collection name={collection.name} photos={collection.photos} />
          ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, i) => (
          <li className={i + 1 == activePage ? 'active' : ''} onClick={() => setActivePage(i + 1)}>
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;