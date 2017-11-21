var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')

var Goodbye = createReactClass({
    render() {
        return (
            <h1>
            React: This is the mysystems page.
            </h1>
        )
    }
})

ReactDOM.render(<Goodbye />, document.getElementById('mysystems'))