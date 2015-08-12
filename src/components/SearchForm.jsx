/** @jsx React.DOM */
'use strict';

var React = require('react');
var $http = require('./http.jsx');
var mui = require('material-ui');
var SearchExample = require('./SearchExample.jsx');
var ThemeManager = new mui.Styles.ThemeManager();
var RaisedButton = mui.RaisedButton;
var TextField = mui.TextField;

class SearchForm extends React.Component {
    constructor() {
        super();
        this.state = {
            url: 'http://hacker-news-filter.herokuapp.com/api/query',
            searchString: '',
            data: []
        };
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    getTopicFromServer(query) {
        var self = this;
        $http(this.state.url + '/' + query)
        .get()
        .then(data => {
            this.setState({
                data: JSON.parse(data)
            });
        });
    }

    getTopicsFromServer() {
        var self = this;
        $http(this.state.url)
        .get()
        .then(data => {
            this.setState({
                data: JSON.parse(data)
            });
        });
    }

    componentDidMount() {
        this.getTopicsFromServer();
    }

    handleChange(e) {
        var searchString;
        // If you comment out this line, the text box will not change its value.
        // This is because in React, an input cannot change independently of the value
        // that was assigned to it. In our case this is this.state.searchString.
        this.setState({searchString:e.target.value});
        searchString = this.state.searchString.trim().toLowerCase();

        if (e.keyCode === 13) {
            this.getTopicFromServer(searchString);
        }
        if (e.type === 'click') {
            this.getTopicFromServer(searchString);
        }
    }

    restartBtn() {
        this.getTopicsFromServer();
    }

    render() {
        return (<div>
                    <div className="form-group">
                    <TextField
                        hintText="Type your query here"
                        floatingLabelText="Type your query here"
                        value={this.state.searchString}
                        onChange={this.handleChange.bind(this)}
                        onKeyDown={this.handleChange.bind(this)}
                        className="new-width"/>
                    </div>
                    <div className="bottons">
                         <RaisedButton
                            label="Search"
                            primary={true}
                            onClick={this.handleChange.bind(this)} />
                        <RaisedButton
                            label="Get latest posts"
                            secondary={true}
                            onClick={this.restartBtn.bind(this)} />
                    </div>
                    <SearchExample data={this.state.data} />
                </div>
            );
    }
}

SearchForm.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};

module.exports = SearchForm;
