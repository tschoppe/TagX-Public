var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')

var Groups = createReactClass({
    render() {
        var groups = [];
    	Object.keys(test).forEach(function(key) {
    		groups.push(
                <div key={ key } className="col-lg-4 col-sm-6">
                    <div className="thumbnail">
                        <p>This is group number { key } <span className="glyphicon glyphicon-chevron-down"></span></p>
                    </div>
                </div>
	        )
    	});
    	return (
            <div className="container">
                <div className="row header">
                    <h1>My Groups</h1>
                </div>
                <div className="row">
                    { groups }
                </div>
            </div>
        )
    }
})

ReactDOM.render(<Groups />, document.getElementById('groups'))