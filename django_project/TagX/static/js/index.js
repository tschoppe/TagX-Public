var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')

var Hello = createReactClass({
    render() {
        return (
            <h1>
            Hello, React!
            </h1>
        )
    }
})

ReactDOM.render(<Hello />, document.getElementById('container'))