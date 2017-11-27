var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')

var Systemtable = createReactClass({
    render() {
        var rows = [];
    	Object.keys(test).forEach(function(key) {
    		rows.push(
    			<tr key={ key }>
            		<td>{ test[key].name }</td>
	                <td>{ test[key].group }</td>
	                <td>{ test[key].basic1 }</td>
	                <td>{ test[key].basic2 }</td>
	                <td>{ test[key].basic3 }</td>
	                <td>{ test[key].tags }</td>
	            </tr>
	        )
    	});
    	return (

            <table key="systemtable">
        		<thead key="head">
		            <tr key="head-row">
		                <th>Name</th>
		                <th>Group</th>
		                <th>Basic 1</th>
		                <th>Basic 2</th>
		                <th>Basic 3</th>
		                <th>Tags</th>
		            </tr>
        		</thead>
        		<tbody>
        			{ rows }
        		</tbody>
    		</table>
        )
    }
})

ReactDOM.render(<Systemtable />, document.getElementById('systemtable'))