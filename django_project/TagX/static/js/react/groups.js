var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')


var Groups = createReactClass({
    render() {
        var groups = [];
        var keys = Object.keys(test);
    	keys.forEach(function(key) {
    		groups.push(
                <div key={ key } className="row">
                    <div className="col-lg-12">
                        <div className="thumbnail">
                            <h4 className="group-tag">
                                <strong>{ key }</strong>
                                <span className="glyphicon glyphicon-chevron-down"></span>
                            </h4>
                        </div>
                    </div>
                </div>
	        )
    	});
    	return (
            <div className="container">
                <div className="row header">
                    <h1>My Groups</h1>
                    <hr></hr>                    
                </div>
                    { groups }
            </div>
        )
    }
})

ReactDOM.render(<Groups />, document.getElementById('groups'))