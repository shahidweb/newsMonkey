const NewsItem = (props) => {
  let { title, description, imgurl, newsUrls, author, source, date } = props;

  return (
    <div className='my-3'>
      <div className="card">
        <img src={imgurl ? imgurl : 'https://images.moneycontrol.com/static-mcnews/2023/04/stocks_sensex_nifty_stockmarket-2-770x433.jpg'} className="card-img-top" alt="..." />
        <span className="position-absolute badge rounded-pill end-0 bg-danger">{source}</span>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-body-secondary">By {author} on {new Date(date).toDateString()}</small></p>
          <a rel="noopener noreferrer" href={newsUrls} className="btn btn-sm btn-primary" target='_blank'>Read More</a>
        </div>
      </div>
    </div>
  )
}

export default NewsItem
