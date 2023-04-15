import React, { Component } from 'react'
import NavBar from './components/NavBar'
import News from './components/News'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  pageSize = 8;
  state = { progress: 0 }
  APIKEY = process.env.REACT_APP_NEWS_APIKEY;
  setPrograss = (progress) => { this.setState({ progress: progress }) }

  render() {
    return (
      <div>
        <Router>
          <NavBar />
          {/* <News pageSize={5} country='in' category="science" /> */}
          <LoadingBar
            color='#f11946'
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            <Route path='/' element={<News setPrograss={this.setPrograss} apiKey={this.APIKEY} key="general" pageSize={this.pageSize} country='in' category="general" />} />
            <Route path='/business' element={<News setPrograss={this.setPrograss} apiKey={this.APIKEY} key="business" pageSize={this.pageSize} country='in' category="business" />} />
            <Route path='/entertainment' element={<News setPrograss={this.setPrograss} apiKey={this.APIKEY} key="entertainment" pageSize={this.pageSize} country='in' category="entertainment" />} />
            <Route path='/general' element={<News setPrograss={this.setPrograss} apiKey={this.APIKEY} key="general" pageSize={this.pageSize} country='in' category="general" />} />
            <Route path='/health' element={<News setPrograss={this.setPrograss} apiKey={this.APIKEY} key="health" pageSize={this.pageSize} country='in' category="health" />} />
            <Route path='/science' element={<News setPrograss={this.setPrograss} apiKey={this.APIKEY} key="science" pageSize={this.pageSize} country='in' category="science" />} />
            <Route path='/sports' element={<News setPrograss={this.setPrograss} apiKey={this.APIKEY} key="sports" pageSize={this.pageSize} country='in' category="sports" />} />
            <Route path='/technology' element={<News setPrograss={this.setPrograss} apiKey={this.APIKEY} key="technology" pageSize={this.pageSize} country='in' category="technology" />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
