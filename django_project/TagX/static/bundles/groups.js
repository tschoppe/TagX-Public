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
        Object.keys(test).forEach(function (key) {
            groups.push(React.createElement(
                'div',
                { key: key, className: 'col-lg-4 col-sm-6' },
                React.createElement(
                    'div',
                    { className: 'thumbnail' },
                    React.createElement(
                        'p',
                        null,
                        'This is group number one  ',
                        React.createElement('span', { className: 'glyphicon glyphicon-chevron-down' })
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
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                groups
            )
        );
    }
});

ReactDOM.render(React.createElement(Groups, null), document.getElementById('groups'));

/***/ }

},[145]);