webpackJsonp([1],{

/***/ 28:
/***/ function(module, exports, __webpack_require__) {

var React = __webpack_require__(1);
var ReactDOM = __webpack_require__(8);
var createReactClass = __webpack_require__(7);

var Hello = createReactClass({
    displayName: 'Hello',

    render() {
        return React.createElement(
            'h1',
            null,
            'React: This is the login page.'
        );
    }
});

ReactDOM.render(React.createElement(Hello, null), document.getElementById('login'));

/***/ }

},[28]);