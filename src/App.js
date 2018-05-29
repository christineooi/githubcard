import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    user: {},
    active: false
  }

  handleClick = () => {
      // Get data from github api
      fetch('https://api.github.com/users/christineooi')
      .then((resp) => resp.json())
      .then((data) => {
        this.setState(prevState => ({
          user: data,
          active: !prevState.active
        }));
      })
      .catch(function(error) {
        console.log(error);
      });  
  }

  render() {
    return (
      <div className="container">
        <div>
          <button class="btn waves-effect waves-light" onClick={this.handleClick}>
            {this.state.active ? 'Hide' : 'Show'}
          </button>
        </div>  
        {this.state.active &&
        <div className="row">
          <div className="col s6 offset-s3">
            <div className="card">
              <div className="card-image">
                {this.state.user.avatar_url &&
                <img src={this.state.user.avatar_url+'.png'} alt="avatar"/>
                }
                <span className="card-title">{this.state.user.name} {this.state.user.location && <React.Fragment>({this.state.user.location})</React.Fragment>}</span>
              </div>
              <div class="card-content">
                <p>{this.state.user.bio}</p>
                {this.state.user.public_repos && 
                <p>Number of public repos: { this.state.user.public_repos}</p>
                }
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

export default App;
