var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')


var Groups = createReactClass({
    render() {
        var groupList = [];
        var keys = Object.keys(groups);
    	keys.forEach(function(key) {
    		groupList.push(
                <div key={ key } className="row groupEntry">
                    <div className="col-lg-12">
                        <div className={ key + " thumbnail" }>
                            <div className={ key + " row group" }>
                                <div className="col-xs-4">
                                    <h4 className="group-name">
                                        <strong>{ groups[key].name }</strong>
                                    </h4>
                                </div>
                                <div className="col-xs-4">
                                    <p className="owner">Owner: { groups[key].owner }</p>
                                </div>
                                <div className="col-xs-4">
                                    <span className="glyphicon glyphicon-chevron-down"></span>
                                </div>    
                            </div>
                        </div>
                    </div>
                </div>
	        )
    	});
    	return (
            <div className="container">
                    { groupList }
            </div>
        )
    }
})

ReactDOM.render(<Groups />, document.getElementById('groups'))