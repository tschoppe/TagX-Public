var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')


var Systemtable = createReactClass({
    render() {
        var rows = [];
    	Object.keys(systems).forEach(function(system) {
    		rows.push(
                <tr className={ system } key={ system }>
                    <th scope="row" className="sys-name row">{ systems[system].name }</th>
                    <td className="sys-groups row">{ systems[system].groups.join(', ') }</td>
                    <td className="sys-os row">{ systems[system].osVersion }</td>
                    <td className="sys-model row">{ systems[system].model }</td>
                    <td className="sys-location row">{ systems[system].location }</td>
                    <td className="sys-tags row">{ systems[system].tags.join(', ') }</td>
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