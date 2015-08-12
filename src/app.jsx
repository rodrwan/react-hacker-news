/** @jsx React.DOM */
(function () {
    // Let's create a "real-time search" component
    var React = require('react');
    var injectTapEventPlugin = require("react-tap-event-plugin");
    var SearchForm = require('./components/SearchForm.jsx');

    window.React = React;
    injectTapEventPlugin();
    // Render the SearchExample component on the page
    React.render(
        <SearchForm />,
        document.getElementById('searchForm')
    );
})();
