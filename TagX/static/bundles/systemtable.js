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
        Object.keys(systems).forEach(function (system) {
            rows.push(React.createElement(
                'tr',
                { className: system, key: system },
                React.createElement(
                    'th',
                    { scope: 'row', className: 'sys-name row' },
                    systems[system].name
                ),
                React.createElement(
                    'td',
                    { className: 'sys-groups row' },
                    systems[system].groups
                ),
                React.createElement(
                    'td',
                    { className: 'sys-os row' },
                    systems[system].osVersion
                ),
                React.createElement(
                    'td',
                    { className: 'sys-model row' },
                    systems[system].model
                ),
                React.createElement(
                    'td',
                    { className: 'sys-location row' },
                    systems[system].location
                ),
                React.createElement(
                    'td',
                    { className: 'sys-tags row' },
                    systems[system].tags
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
                        'Operating System'
                    ),
                    React.createElement(
                        'th',
                        { scope: 'col' },
                        'Model'
                    ),
                    React.createElement(
                        'th',
                        { scope: 'col' },
                        'Location'
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