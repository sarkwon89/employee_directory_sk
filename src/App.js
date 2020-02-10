import React, { Component } from "react";
// import logo from './logo.svg';
import UserList from './components/UserList';
import Title from './components/Title';
import Search from './components/Search';
import API from './utils/API';
import './App.css';

class App extends Component {

  state = {
    result: [],
    search: ""
  };

  componentDidMount() {
    API.randomuser()
      .then(res => this.setState({ result: res.data.results }))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    const value = event.target.value;
    const name = event.target.name;
    this.setState({
      [name]: value
    });

    //creating a new array by taking in new search value by using filter
    let newResult = this.state.result.filter(employee =>{
      // console.log(employee.name.first.toLowerCase().indexOf(this.state.search), employee.name,employee.name.last.toLowerCase().indexOf(this.state.search))
      return employee.name.first.toLowerCase().indexOf(value)>-1 || employee.name.last.toLowerCase().indexOf(value)>-1
    })
    //this updates the existing result state
    this.setState({
      result: newResult
    })
    //conditional statement to load the original results once search length is at 0
    if (value.length===0){
      API.randomuser()
      .then(res => this.setState({ result: res.data.results }))
      .catch(err => console.log(err));
    }

  };


  render() {

    return (
      <div className="container">
        <Title />
        <div className="flex">
          <div className="formbox">
          <Search
           value={this.state.search}
           handleInputChange={this.handleInputChange} 
           />
          </div>
          <div className="listbox">
          {this.state.result.map((element, index) => (
            <UserList
              key={index}
              name={element.name.first + " " + element.name.last}
              picture={element.picture.medium}
              city={element.location.city}
              email={element.email}
              state={element.location.state}
            />
          ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
