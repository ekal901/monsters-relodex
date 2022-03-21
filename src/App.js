import { Component } from 'react'

import './App.css';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  // first time react render, only happends once 
  // 1. constrctor -> 2. render -> 3. componentDidMount -> 4. render(state변화로 다시 render)
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((users) => this.setState(
      () => {
        return {monsters: users}
      },
      () => { // callback
        console.log(this.state);
      }
    ))
  }

  onSearchChange = (e) => {
    const searchField = e.target.value.toLocaleLowerCase();
    
    this.setState(() => {
      return {searchField}
    })
  }

  render() {
    // destructuring
    const {monsters, searchField} = this.state;
    const {onSearchChange} = this;

    // when you modify array, you use new Array
    const filteredMonsters = monsters.filter((monster, index) => {
      return monster.name.toLocaleLowerCase().includes(searchField);
    })

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
}

export default App;
