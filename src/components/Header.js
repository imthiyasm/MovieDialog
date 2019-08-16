import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'
import Loader from './Loader';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: 'Batman',
      isLoaded: true,
      error: null,
    }
    this.siteName = 'Movie Catalog';
    this.loginUser = 'Imthiyas';
    this.APIURL = 'http://www.omdbapi.com/?i=tt3896198&apikey=fa281222';
    this.pageNo = 1;
    this.timeOut = null;
  }

  componentDidMount() {
    this.makeAPICall();
  }

  /* Info: This method will trigger when the keypress happends in search box */
  searchKeyUp = (e) => {
    const keyCode = (e.keyCode ? e.keyCode : e.which);
    const value = e.target.value;
    if (!value) {
      this.setState({
        isLoaded: true,
        error: null,
        searchValue: '',
      }, () => {
        this.props.getMatchedItems(value, []);
      });
    }
    if (keyCode === 13) this.makeAPICall();
  }

  /* Info: This method will trigger when search input box value changes */
  searchRecords = (e) => {
    const value = e.target.value;
    this.setState({
      isLoaded: false,
      searchValue: value,
    }, () => {
      if (value) {
        window.clearTimeout(this.timeOut);
        this.timeOut = window.setTimeout(() => {
          this.makeAPICall();
        }, 500);
      }
    });
  }

  /* Info: Making the API call to get the movie catalog records */
  makeAPICall = () => {
    const { searchValue } = this.state;
    const { getMatchedItems } = this.props;
    const createURL = `${this.APIURL}&s=${searchValue}&page=${this.pageNo}`;
    if (searchValue) {
      fetch(createURL)
        .then(res => res.json())
        .then(
          (result) => {
            const recordsFound = (result.Response === 'True') ? result.Search : [];
            this.setState({
              isLoaded: true,
              error: null,
            }, () => {
              getMatchedItems(searchValue, recordsFound);
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  }

  render() {
    const { isLoaded, searchValue } = this.state;
    return (
      <Row className="headerHolder">
        <Col xs={3}>
          <h4>{this.siteName}</h4>
        </Col>
        <Col xs={7}>
          <input
            type="search"
            autoComplete="off"
            maxLength="50"
            value={searchValue}
            pattern={'[a-zA-Z0-9]*$'}
            onKeyUp={(e) => this.searchKeyUp(e)}
            onChange={(e) => this.searchRecords(e)} />
        </Col>
        <Col xs={2}>
          <FontAwesomeIcon icon={faUser} />
          <span className="userName">{this.loginUser}</span>
        </Col>
        {!isLoaded && <Loader />}
      </Row>
    );
  }
}

Header.propTypes = {
  getMatchedItems: PropTypes.func,
}

export default Header;
