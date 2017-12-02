var React = require('react')
var ReactDOM = require('react-dom')
var createReactClass = require('create-react-class')

var Systemtable = createReactClass({
    render() {
        var rows = [];
    	Object.keys(test).forEach(function(key) {
    		rows.push(
                <tr key={ key }>
                    <th scope="row">{ test[key].name }</th>
                    <td>{ test[key].group }</td>
                    <td>{ test[key].basic1 }</td>
                    <td>{ test[key].basic2 }</td>
                    <td>{ test[key].basic3 }</td>
                    <td>{ test[key].tags }</td>
                </tr>
	        )
    	});
    	return (
            <table key="systemtable" className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Group(s)</th>
                        <th scope="col">Basic1</th>
                        <th scope="col">Basic2</th>
                        <th scope="col">Basic3</th>
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