/** @jsx React.DOM */
'use strict';

var React = require('react');
var mui = require('material-ui');
var FacebookButton = require('react-social').FacebookButton;
var TwitterButton = require('react-social').TwitterButton;
var ThemeManager = new mui.Styles.ThemeManager();
var List = mui.List;
var ListItem = mui.ListItem;
var ListDivider = mui.ListDivider;

function getTopicListItem (topic, id) {
    return (
        <div>
            <ListItem
                key={id}
                primaryText={
                    <a href={topic.href} target="_blank">{topic.text}</a>
                }
                secondaryText={
                    <p>
                        Score: {topic.score}
                        <FacebookButton className="facebook" url={topic.href}>
                            {" Facebook "}
                        </FacebookButton>
                        <TwitterButton
                            className="twitter twitter-share-button"
                            url=""
                            message={
                                topic.href + " shared by @rodrwan"
                            }>
                            {" Twitter "}
                        </TwitterButton>
                    </p>
                }
                secondaryTextLines={2} />
        </div>
    );
}

class SearchExample extends React.Component {
    constructor () {
        super();
        this.state = {
            'href': ''
        };
        this.props = {
            'data': []
        };
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    componentDidMount() {
        console.log('mounting...');
    }

    render() {
        var topicList, topics;

        topics = this.props.data.sort(function (a, b) {
            return parseInt(b.score, 10) - parseInt(a.score, 10);
        });
        topicList = topics.map(getTopicListItem);
        return (
            <div className="list-wrapper">
                <List className="list-text">
                { topicList }
                </List>
                <img className="img-list" src="assets/images/bottom-tear.svg" />
            </div>
        );
    }
}

SearchExample.childContextTypes = {
  muiTheme: React.PropTypes.object.isRequired
};

module.exports = SearchExample;
/** <table>
     <thead>
        <tr>
            <th>Link</th>
            <th>Score</th>
        </tr>
    </thead>
    <tbody>
    { topics.map(function(l, id){
        return (<tr key={id}>
                    <td><a href={l.href} target="_blank">{l.text}</a></td>
                    <td>{l.score}</td>
                </tr>);
    }) }
    </tbody>
</table>
 */
