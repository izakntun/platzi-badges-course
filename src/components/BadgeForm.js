import React, {Component, Fragment} from 'react';

export default class BadgeForm extends Component
{

    handleClick = e => {
        console.log('button was clicked')
    };

    render()
    {
        return (
            <Fragment>
                <h1>{this.props.textForm}</h1>
                <form onSubmit={this.props.onSubmit}>
                    <div className="form-group">
                        <label htmlFor="">First name</label>
                        <input
                            onChange={this.props.onChange}
                            className="form-control"
                            type="text"
                            name="firstName"
                            value={this.props.formValues.firstName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Last name</label>
                        <input
                            onChange={this.props.onChange}
                            className="form-control"
                            type="text"
                            name="lastName"
                            value={this.props.formValues.lastName}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">E-mail</label>
                        <input
                            onChange={this.props.onChange}
                            className="form-control"
                            type="email"
                            name="email"
                            value={this.props.formValues.email}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Job Title</label>
                        <input
                            onChange={this.props.onChange}
                            className="form-control"
                            type="text"
                            name="jobTitle"
                            value={this.props.formValues.jobTitle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Twitter</label>
                        <input
                            onChange={this.props.onChange}
                            className="form-control"
                            type="text"
                            name="twitter"
                            value={this.props.formValues.twitter}
                        />
                    </div>
                    <button onClick={this.handleClick} className="btn btn-primary">save</button>
                    {this.props.error && (<p className="text-danger">{this.props.error.message}</p>)}
                </form>
            </Fragment>
        );
    }
}