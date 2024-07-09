import { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import InfiniteScroll from "react-infinite-scroll-component";
import { ImSpinner } from "react-icons/im";
import { FaLongArrowAltUp } from "react-icons/fa";

const apiKey = import.meta.env.VITE_APP_NEWS_API;

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capitalizeFunc = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page}&pagesize=${props.pageSize}`;
    setLoading(true)
    let response = await fetch(url);
    props.setProgress(30);
    let parsedData = await response.json();
    if (!parsedData || parsedData.status !== 'ok') {
      setError(parsedData.message || 'Something went wrong');
      setLoading(false);
      props.setProgress(100);
      return;
    }
    props.setProgress(60);
    setArticles(parsedData.articles)
    setLoading(false)
    setTotalResults(parsedData.totalResults)
    props.setProgress(100);
  }

  useEffect(() => {
    updateNews();
    document.title = `NewsMan - ${capitalizeFunc(props.category)}`;
  }, [])

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${apiKey}&page=${page + 1}&pagesize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true)
    let response = await fetch(url);
    let parsedData = await response.json();
    setArticles(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
    setLoading(false);
  };

  return (
    <>
      <h1 className="mt-24 font-bold mb-6 text-center text-3xl">NewsMan - Top Headlines - {capitalizeFunc(props.category)}</h1>
      {loading && <ImSpinner className='animate-spin w-full h-28 mt-12' />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading && <ImSpinner className='animate-spin' />}
      >
        {error && <h1 className="text-center text-gray-600 text-2xl mt-12">{error}</h1>}

        <div className="custom-grid gap-x-4 mx-12 lg:mx-16 place-content-center justify-items-center">
          {articles.map(element =>
            <NewsItem key={element.url} title={element?.title.slice(0, 70)} description={(element.description !== null) ? element.description : element.title} imageUrl={(element.urlToImage !== null) ? element.urlToImage : 'https://i.quotev.com/b2gtjqawaaaa.jpg'} newsUrl={element.url} source={element.source.name} date={element.publishedAt} />
          )}
        </div>

        {!loading && <div className="flex justify-center w-full my-4" >
          <button className="bg-blue-500 text-white px-4 py-3 rounded-md flex items-center gap-1 hover:bg-blue-600" onClick={handleBackToTop}>back to top <FaLongArrowAltUp />
          </button>
        </div>}

      </InfiniteScroll>

    </>
  )
}

export default News