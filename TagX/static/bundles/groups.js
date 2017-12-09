webpackJsonp([2],{

/***/ 145:
/***/ function(module, exports, __webpack_require__) {

var React = __webpack_require__(3);
var ReactDOM = __webpack_require__(19);
var createReactClass = __webpack_require__(18);

var Groups = createReactClass({
    displayName: 'Groups',

    render() {
        var groupList = [];
        var keys = Object.keys(groups);
        keys.forEach(function (key) {
            groupList.push(React.createElement(
                'div',
                { key: key, className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-lg-12' },
                    React.createElement(
                        'div',
                        { className: key + " thumbnail" },
                        React.createElement(
                            'div',
                            { className: key + " row group" },
                            React.createElement(
                                'div',
                                { className: 'col-xs-4' },
                                React.createElement(
                                    'h4',
                                    { className: 'group-name' },
                                    React.createElement(
                                        'strong',
                                        null,
                                        groups[key].name
                                    )
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-xs-4' },
                                React.createElement(
                                    'p',
                                    { className: 'owner' },
                                    'Owner: ',
                                    groups[key].owner
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-xs-4' },
                                React.createElement('span', { className: 'glyphicon glyphicon-chevron-down' })
                            )
                        )
                    )
                )
            ));
        });
        return React.createElement(
            'div',
            { className: 'container' },
            groupList
        );
    }
});

ReactDOM.render(React.createElement(Groups, null), document.getElementById('groups'));

/***/ }

},[145]);