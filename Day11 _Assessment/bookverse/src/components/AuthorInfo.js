
import React, { Component } from "react";
import "./AuthorInfo.css";

class AuthorInfo extends Component {
  componentDidMount() {
    console.log("AuthorInfo component mounted. Author data loaded.");
  }

  render() {
    const { author } = this.props;
    return (
      <div className="author-info card mt-4 shadow-sm">
        <div className="card-body">
          <h4 className="card-title text-success">About the Author</h4>
          <p className="card-text">{author.bio}</p>
          <h5 className="mt-3">Top Books:</h5>
          <ul>
            {author.topBooks.map((book, index) => (
              <li key={index}>{book}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default AuthorInfo;
