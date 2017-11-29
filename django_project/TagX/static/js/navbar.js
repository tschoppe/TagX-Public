var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')

var Nav = createReactClass({
    render: function() {
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                          <span className="sr-only">Toggle navigation</span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                          <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/">TagX</a>
                    </div>
                    <div id="navbar" className="collapse navbar-collapse">
                      <ul className="nav navbar-nav">
                        <li className=""><a href="#">My Systems</a></li>
                        <li className=""><a href="#">My Groups</a></li>
                        <li className=""><a href="#">Admin</a></li>
                      </ul>
                      <ul className="nav navbar-nav navbar-right">
                        <li><a href="#">Signed In As current_user</a></li>
                      </ul>
                    </div>
                </div>
            </nav>
        )
    }
})

ReactDOM.render(<Nav />, document.getElementById('nav'))