import React, {Component} from 'react';
// import React from 'react';
import { Header, Icon, List } from 'semantic-ui-react'
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    values: []
  }

  async componentDidMount () {
    let {data} = await axios.get('http://localhost:5000/api/values')
    this.setState({
      values: data
    })
  }

  render() {
    return (
      <div className="App">
        <Header as='h2'>
          <Icon name='users' />
          <Header.Content>React ASP Net Boilerplate</Header.Content>
        </Header>

        <h3>By Roger Lester Palabasan</h3>

        <List>
          {this.state.values.map((value: any) => (
            <List.Item key={value.name}>{value.name}</List.Item>
          ))}
        </List>
      </div>
    )
  }
}

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
