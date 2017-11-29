webpackJsonp([0],{

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(8);
var createReactClass = __webpack_require__(7);

var Systemtable = createReactClass({
    displayName: 'Systemtable',

    render() {
        var rows = [];
        Object.keys(test).forEach(function (key) {
            rows.push(React.createElement(
                'tr',
                { key: key },
                React.createElement(
                    'td',
                    null,
                    test[key].name
                ),
                React.createElement(
                    'td',
                    null,
                    test[key].group
                ),
                React.createElement(
                    'td',
                    null,
                    test[key].basic1
                ),
                React.createElement(
                    'td',
                    null,
                    test[key].basic2
                ),
                React.createElement(
                    'td',
                    null,
                    test[key].basic3
                ),
                React.createElement(
                    'td',
                    null,
                    test[key].tags
                )
            ));
        });
        return React.createElement(
            'table',
            { key: 'systemtable' },
            React.createElement(
                'thead',
                { key: 'head' },
                React.createElement(
                    'tr',
                    { key: 'head-row' },
                    React.createElement(
                        'th',
                        null,
                        'Name'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Group'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Basic 1'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Basic 2'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Basic 3'
                    ),
                    React.createElement(
                        'th',
                        null,
                        'Tags'
                    )
                )
            ),
            React.createElement(
                'tbody',
                null,
                rows
            )
        );
    }
});

ReactDOM.render(React.createElement(Systemtable, null), document.getElementById('systemtable'));

/***/ }

},[29]);