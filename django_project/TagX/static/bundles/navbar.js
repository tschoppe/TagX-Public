webpackJsonp([1],{

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(8);
var createReactClass = __webpack_require__(7);

var Nav = createReactClass({
    displayName: 'Nav',

    render: function () {
        return React.createElement(
            'nav',
            { className: 'navbar navbar-default' },
            React.createElement(
                'div',
                { className: 'container' },
                React.createElement(
                    'div',
                    { className: 'navbar-header' },
                    React.createElement(
                        'button',
                        { type: 'button', className: 'navbar-toggle collapsed', 'data-toggle': 'collapse', 'data-target': '#navbar', 'aria-expanded': 'false', 'aria-controls': 'navbar' },
                        React.createElement(
                            'span',
                            { className: 'sr-only' },
                            'Toggle navigation'
                        ),
                        React.createElement('span', { className: 'icon-bar' }),
                        React.createElement('span', { className: 'icon-bar' }),
                        React.createElement('span', { className: 'icon-bar' })
                    ),
                    React.createElement(
                        'a',
                        { className: 'navbar-brand', href: '/' },
                        'TagX'
                    )
                ),
                React.createElement(
                    'div',
                    { id: 'navbar', className: 'collapse navbar-collapse' },
                    React.createElement(
                        'ul',
                        { className: 'nav navbar-nav' },
                        React.createElement(
                            'li',
                            { className: '' },
                            React.createElement(
                                'a',
                                { href: '#' },
                                'My Systems'
                            )
                        ),
                        React.createElement(
                            'li',
                            { className: '' },
                            React.createElement(
                                'a',
                                { href: '#' },
                                'My Groups'
                            )
                        ),
                        React.createElement(
                            'li',
                            { className: '' },
                            React.createElement(
                                'a',
                                { href: '#' },
                                'Admin'
                            )
                        )
                    ),
                    React.createElement(
                        'ul',
                        { className: 'nav navbar-nav navbar-right' },
                        React.createElement(
                            'li',
                            null,
                            React.createElement(
                                'a',
                                { href: '#' },
                                'Signed In As current_user'
                            )
                        )
                    )
                )
            )
        );
    }
});

ReactDOM.render(React.createElement(Nav, null), document.getElementById('nav'));

/***/ }

},[28]);