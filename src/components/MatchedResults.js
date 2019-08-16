import React from 'react';
import { Row, Col } from 'reactstrap';
import PropTypes from 'prop-types';

const MatchedResults = (props) => {
    const { searchValue, resultsCount } = props.label;
    const searchLabel = 'You searched for: ';
    return (
        <Row className="searchLabel">
            <Col xs={12}>
                <p>
                    <span>{searchLabel}</span>
                    <span>{searchValue ? `${searchValue}, ` : ''}</span>
                    <span>{(resultsCount > 0) ? `${resultsCount} results found` : 'No Results Found'}</span>
                </p>
            </Col>
        </Row>
    )
}

MatchedResults.propTypes = {
    count: PropTypes.bool,
}

export default MatchedResults;
