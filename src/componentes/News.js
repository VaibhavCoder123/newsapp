import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 6,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capital = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    console.log("hello i am a constructor");
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
    };
    document.title = `𝓜𝓸𝓷𝓴𝓮𝔂𝓜𝓮𝓭𝓲𝓪 ❆☞${this.capital(this.props.category)}☚❆
    
    ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌
    ▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌
    ▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌
    ▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌
    ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌
    ▄▄▄▄▄▄▄▄▄▄▄▄╔══╗▄▄╔╗╔╗▄▄▄▄▄▄╔╗▄▄▄▄▄▄▄▄▄▄▄▌
    ▄▄▄▄▄▄▄▄▄▄▄▄║║║╠╦╗║╚╝╠═╦═╗╔╦╣╚╗▄▄▄▄▄▄▄▄▄▄▌
    ▄▄▄▄▄▄▄▄▄▄▄▄║║║║║║║╔╗║╩╣║╚╣╔╣╔╣▄▄▄▄▄▄▄▄▄▄▌
    ▄▄▄▄▄▄▄▄▄▄▄▄╚╩╩╬╗║╚╝╚╩═╩══╩╝╚═╝▄▄▄▄▄▄▄▄▄▌▌
    ▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄╚═╝▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌
    ▌▌▄▄▄▄▄▄▄▄▄▄▄▄╔═╗▄▄▄▄╔═╦╗▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌
    ▌▌▌▄▄▄▄▄▄▄▄▄▄▄║═╬═╦╦╗╚╗║╠═╦╦╗▄▄▄▄▄▄▄▄▄▌▌▌▌
    ▌▌▌▌▄▄▄▄▄▄▄▄▄▄║╔╣║║╔╝╔╩╗║╬║║║▄▄▄▄▄▄▄▄▌▌▌▌▌
    ▌▌▌▌▌▄▄▄▄▄▄▄▄▄╚╝╚═╩╝▄╚══╩═╩═╝▄▄▄▄▄▄▄▌▌▌▌▌▌
    ▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▄▄▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▄▄▄▄▄▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▄▄▄▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▄▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌
    ▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌▌





    `;
  }

  async updateNews(props) {

    this.props.setProgress(10);

    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    this.props.setProgress(30);

    let parsedData = await data.json();
    this.props.setProgress(50);


    console.log(parsedData);

    this.setState({
      articles: parsedData.articles || [],
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);

  }

  async componentDidMount() {
    this.updateNews();
  }

  handlepreviousclick = async () => {
    this.setState({ page: this.state.page - 1 });
    this.updateNews();
  };
  handlenextclick = async () => {
    console.log("next");
    this.setState({ page: this.state.page + 1 });
    this.updateNews();
  };
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}&page=${this.state.page}`;

    this.setState({ loading: true });

    let data = await fetch(url);
    let parsedData = await data.json();

    console.log(parsedData);

    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };
  render() {
    // let mystyle = {
    //   border: "2px solid",
    //   borderColor: "dark",
    // };
    return (
      <>
        <h1 className="text-center">
          ⓂⓞⓝⓚⓔⓨⓂⓔⓓⓘⓐ - 🅣🅞🅟 {this.capital(this.props.category)} 🅗🅔🅐🅓🅛🅘🅝🅔🅢
        </h1>
      {this.state.loading && <Spinner/>}

        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={this.state.loading && <Spinner/>}
        >
          <div className="container">
            <div className="row">
              {this.state.articles.map((element,index) => {
                return (
                  <div className="col-md-4" key={`${element.url}-${index}`}>
                    <NewsItem
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      publishedAt={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
