webpackJsonp([1],{

/***/ 147:
/***/ function(module, exports, __webpack_require__) {

var React = __webpack_require__(3);
var ReactDOM = __webpack_require__(19);
var createReactClass = __webpack_require__(18);

var Systemtable = createReactClass({
    displayName: 'Systemtable',

    render() {
        var rows = [];
        Object.keys(test).forEach(function (key) {
            rows.push(React.createElement(
                'tr',
                { key: key },
                React.createElement(
                    'th',
                    { scope: 'row' },
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
            { key: 'systemtable', className: 'table table-hover' },
            React.createElement(
                'thead',
                null,
                React.createElement(
                    'tr',
                    null,
                    React.createElement(
                        'th',
                        { scope: 'col' },
                        'Name'
                    ),
                    React.createElement(
                        'th',
                        { scope: 'col' },
                        'Group(s)'
                    ),
                    React.createElement(
                        'th',
                        { scope: 'col' },
                        'Basic1'
                    ),
                    React.createElement(
                        'th',
                        { scope: 'col' },
                        'Basic2'
                    ),
                    React.createElement(
                        'th',
                        { scope: 'col' },
                        'Basic3'
                    ),
                    React.createElement(
                        'th',
                        { scope: 'col' },
                        'Tag(s)'
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

},[147]);