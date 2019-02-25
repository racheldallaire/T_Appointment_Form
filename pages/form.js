import "../styles.scss";
import fetch from 'node-fetch';

import callTimes from '../data/callTimes';


export default class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            form: [],
			fields: [],
        };
    }

    componentWillMount() {
        fetch(`https://clinia-coding-challenge.s3.ca-central-1.amazonaws.com/services.json`)
        .then((res) => res.json())
        .then((payload) => {
            this.setState({services: [...payload]});
        });
        fetch(`https://clinia-coding-challenge.s3.ca-central-1.amazonaws.com/form.json`)
        .then((res) => res.json())
        .then((payload) => {
            this.setState({form: [...payload]});
        });
    }

    populateServices = (arr) => {
        var options = [];
        arr.forEach((option, index)=> {
            options.push(<option key={index}>{option}</option>)
        });
        return options;
    }

    buildForm = (service) => {
        var form = this.state.form;
        var fields = [];
        var formItem;
        
        form.forEach((formType) => {
            if (formType.services.indexOf(service) !== -1) {
                fields.push(...formType.fields)
            }
        })
 
        if (fields.length === 0) {
            form.forEach((formType) => {
                if (formType.services.indexOf("*") !== -1) {
                    fields.push(...formType.fields)
                }
            })
        }
		
		this.setState({fields: fields});
    }
	
	renderForm = () => {
	    return this.state.fields.map((field) => {
            if (field.type === "dropdown") {
                return (
                    <div className="col">
                        <label htmlFor={field.name}>{field.label}</label>
                        <select className="form-control" id={field.name}>
                            {this.populateServices(field.options)}
                        </select>
                    </div>
                )
            } else {
                return (
                    <div className="col">
                        <label htmlFor={field.name}>{field.label}</label>
                        <input type={field.type} class="form-control" id={field.name} />
                    </div>
                )
            }
        })
	}

    render() {
        return (
            <form>
                <div className="row">
                    <div className="col">
                        <label htmlFor="desiredReview">Desired Review</label>
                        <select className="form-control" id="desiredReview" onChange={(event) => this.buildForm(event.target.value)}>
                            {this.populateServices(this.state.services)}
                        </select>
                    </div>
                    <div className="col">
                    <label htmlFor="timeToCall">Time to Call</label>
                        <select className="form-control" id="timeToCall" >
                            {this.populateServices(callTimes)}
                        </select>
                    </div>
                </div>
                {this.renderForm()}
            </form>
        );
    }
}