import React, {Component, Fragment} from 'react';
import '../components/styles/Badges.css'
import confLogo from '../images/platziconf-logo.svg';
import BadgesList from "../components/BadgesList";
import {Link} from "react-router-dom";
import Api from '../api';
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import MiniLoader from "../components/MiniLoader";

export default class Badges extends Component
{
    state = {
        loading: true,
        error: null,
        data: undefined
    };

    componentDidMount() {
        this.fetchData();
        this.intervalId = setInterval(this.fetchData,5000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    fetchData = async () => {
        this.setState({loading: true, error: null});
        try {
            const data = await Api.badges.list();
            this.setState({
                loading: false,
                data: data
            });
        } catch (e) {
            this.setState({
                loading: false,
                error: e
            });
        }
    };

    render()
    {
        if (this.state.loading === true && !this.state.data)
        {
            return <PageLoading />;
        }

        if(this.state.error)
        {
            return <PageError error={this.state.error.message}/>
        }

        return (
            <Fragment>
                <div className="Badges">
                    <div className="Badges__hero">
                        <div className="Badges__container">
                            <img
                                className="Badges_conf-logo"
                                src={confLogo}
                                alt="Conf Logo"
                            />
                        </div>
                    </div>
                </div>

                <div className="Badges__container">
                    <div className="Badges__buttons">
                        <Link to="/badges/new" className="btn btn-primary">
                            New Badge
                        </Link>
                    </div>

                    <BadgesList badges={this.state.data} />
                    {this.state.loading && <MiniLoader/>}
                </div>
            </Fragment>
        );
    }
}