import { Component } from 'react'

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: []
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

  render() {
    return (
      <div className="App">
        <input 
          type="search" 
          className='search-box' 
          placeholder='search Monsters' 
          onChange={(e) => {
            const searchString = e.target.value.toLocaleLowerCase();
            // when you modify array, you use new Array
            const filteredMonsters = this.state.monsters.filter((monster, index) => {
              return monster.name.toLocaleLowerCase().includes(searchString);
            })
            this.setState(() => {
              return {monsters: filteredMonsters}
            })
          }} 
        />
        {this.state.monsters.map((monster) => {
          return <div key={monster.id}><h1>{monster.name}</h1></div>
        })}
      </div>
    );
  }
}

export default App;
