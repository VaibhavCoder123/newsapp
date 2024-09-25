import React from "react";

const NewsItem=(props)=>{

    let { title, description, imageUrl, newsUrl, author, publishedAt, source } =
      props;
    let mystyle = {
      border: "2px solid",
      borderColor: "dark",
    };
    return (
      <div className="my-3">
        <div className="card">
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              position: "absolute",
              left: "0",
            }}
          >
            <span className="badge rounded-pill bg-dark">{source}</span>
          </div>
          <img
            src={
              !imageUrl
                ? "https://img.freepik.com/premium-photo/envisioning-future-futuristic-illustration-computer-technology_956920-26240.jpg"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
            style={mystyle}
          />
          <div className="card-body" style={mystyle}>
            <h5 className="card-title">{title ? title : "Title"}...</h5>
            <p className="card-text">
              {description ? description : "description"}...
            </p>
            <p className="card-text">
              <small className="text-muted">
                By {author ? author : "Author"} on{" "}
                {new Date(publishedAt ? publishedAt : "Time").toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-outline-dark"
              style={mystyle}
            >
              Read More
            </a>
          </div>
        </div>{" "}
      </div>
    );
  
}

export default NewsItem;
