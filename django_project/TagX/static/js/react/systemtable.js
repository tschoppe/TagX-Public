var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')


var Systemtable = createReactClass({
    render() {
        var rows = [];
    	Object.keys(systems).forEach(function(system) {
    		rows.push(
                <tr key={ system }>
                    <th scope="row">{ systems[system].name }</th>
                    <td>{ systems[system].groups }</td>
                    <td>{ systems[system].osVersion }</td>
                    <td>{ systems[system].model }</td>
                    <td>{ systems[system].location }</td>
                    <td>{ systems[system].tags }</td>
                </tr>
	        )
    	});
    	return (
            <table key="systemtable" className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Group(s)</th>
                        <th scope="col">Operating System</th>
                        <th scope="col">Model</th>
                        <th scope="col">Location</th>
                        <th scope="col">Tag(s)</th>
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