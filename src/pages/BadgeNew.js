import React, {Component, Fragment} from 'react';
import header from '../images/platziconf-logo.svg';
import '../components/styles/BadgeNew.css';
import Badge from "../components/Badge";
import BadgeForm from '../components/BadgeForm';
import Api from '../api';
import PageLoading from "../components/PageLoading";

export default class BadgeNew extends Component
{
    state = {
        loading: false,
        error: null,
        form: {
            firstName: '',
            lastName: '',
            email: '',
            jobTitle: '',
            twitter: ''
        }
    };

    handleChange = e => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    };

    handleSubmit = async e => {
        e.preventDefault();
        this.setState({ loading: true, error: null});
        try {
            await Api.badges.create(this.state.form);
            this.setState({ loading: false });
            this.props.history.push('/badges');
        } catch (e) {
            this.setState({ loading: false, error: e});
        }
    };

    render()
    {
        if(this.state.loading)
        {
            return <PageLoading/>
        }
        return (
            <Fragment>
                <div className="BadgeNew__hero">
                    <img className="BadgeNew__hero-image img-fluid" src={header} alt="logo"/>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <Badge
                                firstName={this.state.form.firstName || 'First name'}
                                lastName={this.state.form.lastName || 'Last name'}
                                twitter={this.state.form.twitter || 'Twitter'}
                                jobTitle={this.state.form.jobTitle || 'Job title'}
                                email={this.state.form.email || 'E-mail'}
                                //avatar="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"
                            />
                        </div>
                        <div className="col-6">
                            <BadgeForm
                                textForm="New Attendant"
                                onChange={this.handleChange}
                                onSubmit={this.handleSubmit}
                                formValues={this.state.form}
                                error={this.state.error}
                            />
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}