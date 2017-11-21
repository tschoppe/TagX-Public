var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')

var Hello = createReactClass({
    render() {
        return (
            <h1>
            React: This is the login page.
            </h1>
        )
    }
})

ReactDOM.render(<Hello />, document.getElementById('login'))