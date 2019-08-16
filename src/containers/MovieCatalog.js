import React from 'react';
import { Container } from 'reactstrap';
import Header from '../components/Header';
import MatchedResults from '../components/MatchedResults';
import ViewItems from '../components/ViewItems';

class MovieContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matchedText: {
                searchValue: '',
                resultsCount: 0,
            },
            resultsData: [],
        }
    }

    /* Info: Callback function for the header component */
    itemsFound = (val, rec) => {
        const obj = {
            searchValue: val || '',
            resultsCount: (rec) ? rec.length : 0,
        }
        this.setState({
            matchedText: obj,
            resultsData: rec,
        });
    }

    render() {
        const { matchedText, resultsData } = this.state;
        return (
            <Container>
                <Header getMatchedItems={(val, rec) => this.itemsFound(val, rec)}></Header>
                {matchedText.searchValue && <MatchedResults label={matchedText}></MatchedResults>}
                {resultsData.length > 0 && <ViewItems resultData={resultsData} />}
            </Container>
        )
    }
}
export default MovieContainer;