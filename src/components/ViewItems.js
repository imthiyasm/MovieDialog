import React from 'react';
import { Row, Col } from 'reactstrap';
// import PropTypes from 'prop-types';

class ViewItems extends React.PureComponent {

  /* Info: Showing the placeholder image, if image is a broken */
  showPlaceholderImage = (e) => {
    e.target.onerror = null;
    e.target.src = 'images/placeholder.png';
  }

  render() {
    const { resultData = [] } = this.props;
    console.log(resultData);
    return (
      <Row>
        {resultData.length > 0 && resultData.map((value, index) => (
          <Col xs={6} sm={4} md={3} key={index.toString()} className="catalogItems">
            <img src={value.Poster} alt="Catalog image" onError={(e) => { this.showPlaceholderImage(e); }} />
            <p>{`Name: ${value.Title}`}</p>
            <p>{`Year: ${value.Year}`}</p>
            <p>{`imdbID: ${value.imdbID}`}</p>
            <p>{`Type: ${value.Type}`}</p>
          </Col>
        ))
        }
      </Row>
    );
  }
}

export default ViewItems;
