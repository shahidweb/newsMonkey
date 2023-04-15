import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import Spinner from './Spinner'
import { PropTypes } from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)


  const caplitalFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const handleNextClick = () => {
    const pageNo = page + 1;
    fetchApiData(pageNo, true);
  }

  const fetchApiData = async (pageNo = 1, isAddData = false) => {
    props.setPrograss(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${pageNo}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(isAddData ? articles.concat(parseData.articles) : parseData.articles);
    setLoading(false);
    setPage(pageNo);
    setTotalResults(parseData.totalResults);
    props.setPrograss(100);
  }

  useEffect(() => {
    fetchApiData();
  }, [])


  return (
    <>
      <h2 className='text-center'>NewsMonkey - Top {caplitalFirstLetter(props.category)} Headlines</h2>
      {loading && <Spinner />}
      <InfiniteScroll dataLength={articles.length} next={handleNextClick}
        hasMore={articles.length !== totalResults} loader={<h4><Spinner /></h4>}>
        <div className='container my-3'>
          <div className="row">
            {articles.map(item => {
              return <div className="col-sm-3" key={item.url}>
                <NewsItem title={item.title} description={item.description} imgurl={item.urlToImage} newsUrls={item.url} author={item.author} source={item.source.name} date={item.publishedAt} />
              </div>
            })}
          </div>
        </div>
      </InfiniteScroll>
    </ >
  )
}

News.defaultProps = {
  country: 'in',
  pageSize: 10,
  category: 'general',
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}


export default News;
