import React, { Component } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner'
import { PropTypes } from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
  loadData = true;
  static defaultProps = {
    country: 'in',
    pageSize: 10,
    category: 'general',
  }

  PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }


  caplitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  constructor(props) {
    super(props)
    this.state = { articles: [], loading: true, page: 1, pageSize: this.props.pageSize, total: 0 };
    document.title = `${this.caplitalFirstLetter(this.props.category)} - NewsMonkey`
  }

  async componentDidMount() {
    if (this.loadData) {
      this.loadData = false;
      this.fetchApiData(this.state.page);
    }
  }

  // handlePrevClick = () => {
  //   this.setState({ page: this.state.page - 1 });
  //   this.fetchApiData();
  // }

  handleNextClick = () => {
    this.fetchApiData(this.state.page + 1, true);
  }

  fetchApiData = async (page, isAddData = false) => {
    this.props.setPrograss(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.state.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({ articles: isAddData ? this.state.articles.concat(parseData.articles) : parseData.articles, page: page, total: parseData.totalResults, loading: false });
    this.props.setPrograss(100);
  }

  render() {
    return (
      <>
        <h2 className='text-center'>NewsMonkey - Top {this.caplitalFirstLetter(this.props.category)} Headlines</h2>
        {this.state.loading && <Spinner />}
        <InfiniteScroll dataLength={this.state.articles.length} next={this.handleNextClick}
          hasMore={this.state.articles.length !== this.state.total} loader={<h4><Spinner /></h4>}>
          <div className='container my-3'>
            <div className="row">
              {this.state.articles.map(item => {
                return <div className="col-sm-3" key={item.url}>
                  <NewsItem title={item.title} description={item.description} imgurl={item.urlToImage} newsUrls={item.url} author={item.author} source={item.source.name} date={item.publishedAt} />
                </div>
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
          <button type="button" className="btn btn-dark" disabled={this.state.page <= 1} onClick={this.handlePrevClick}>&larr; Previous</button>
          <button type="button" className="btn btn-dark" disabled={this.state.page + 1 > Math.ceil(this.state.total / 9)} onClick={this.handleNextClick}>Next &rarr;</button>
        </div> */}
      </ >
    )
  }
}
