import { useEffect, useState } from 'react'

import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

const App = () => {
  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilterMonsters] = useState(monsters);

  useEffect(() => {
    console.log('effect fired');
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => setMonsters(users))
  }, []);

  useEffect(() => {
    const newFilteredMonsters = monsters.filter((monster, index) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })
    setFilterMonsters(newFilteredMonsters);
  }, [monsters, searchField])

  const onSearchChange = (e) => {
    const searchFieldString = e.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }

    

    return (
      <div className="App">
        <h1 className='app-title'>Monsters Rolodex</h1>
        <SearchBox 
            onChangeHandler={onSearchChange} 
            placeholder='search Monsters'
            className='monsters-search-box'
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }

export default App;
