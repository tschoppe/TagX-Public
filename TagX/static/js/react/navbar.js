import DjangoCSRFToken from 'django-react-csrftoken'

var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')

var Nav = createReactClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
          <div className="container navbar">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                    <span className="icon-bar"></span>
                  </button>
                  <a className="navbar-brand" href="/mysystems/">TagX</a>
              </div>
              <div id="navbar" className="collapse navbar-collapse">
                <ul className="nav navbar-nav">
                  <li className={ url.toString() === '/mysystems/' ? 'mysystems active' : 'mysystems' }><a href="/mysystems/">My Systems</a></li>
                  <li className={ url.toString() === '/mygroups/' ? 'mygroups active' : 'mygroups' }><a href="/mygroups/">My Groups</a></li>
                </ul>
                <ul className="nav navbar-nav navbar-right">
                  <li>
                    <form method="POST" action="/logout/">
                      <DjangoCSRFToken/>
                      <button className="logout-button">Logout</button>
                    </form>
                  </li>
                </ul>
              </div>
          </div>
      </nav>
    )
  }
})

ReactDOM.render(<Nav />, document.getElementById('nav'))