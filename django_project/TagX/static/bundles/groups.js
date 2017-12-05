webpackJsonp([2],{

/***/ 145:
/***/ function(module, exports, __webpack_require__) {

var React = __webpack_require__(3);
var ReactDOM = __webpack_require__(19);
var createReactClass = __webpack_require__(18);

var Groups = createReactClass({
    displayName: 'Groups',

    render() {
        var groups = [];
        var keys = Object.keys(test);
        keys.forEach(function (key) {
            groups.push(React.createElement(
                'div',
                { key: key, className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-lg-12' },
                    React.createElement(
                        'div',
                        { className: 'thumbnail' },
                        React.createElement(
                            'h4',
                            { className: 'group-tag' },
                            React.createElement(
                                'strong',
                                null,
                                key
                            ),
                            React.createElement('span', { className: 'glyphicon glyphicon-chevron-down' })
                        )
                    )
                )
            ));
        });
        return React.createElement(
            'div',
            { className: 'container' },
            React.createElement(
                'div',
                { className: 'row header' },
                React.createElement(
                    'h1',
                    null,
                    'My Groups'
                ),
                React.createElement('hr', null)
            ),
            groups
        );
    }
});

ReactDOM.render(React.createElement(Groups, null), document.getElementById('groups'));

/***/ }

},[145]);