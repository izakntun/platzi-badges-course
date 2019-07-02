import React, {Component} from 'react';
import PageLoading from '../components/PageLoading';
import PageError from '../components/PageError';
import Api from '../api';
import BadgeDetails from "./BadgeDetails";

export default class BadgeDetailsContainer extends Component {
    state = {
        loading: true,
        error: null,
        data: undefined,
        modalIsOpen: false
    };

    componentDidMount() {
        this.fetchData();
    }

    fetchData = async () => {
        this.setState({loading: true, error: null});
        try {
            const id = this.props.match.params.badgeId;
            const data = await Api.badges.read(id);
            this.setState({loading: false, data: data});
        } catch (e) {
            this.setState({loading: false, error: e});
        }
    };

    handleCloseModal = e => {
        this.setState({modalIsOpen: false})
    };

    handleOpenModal = e => {
        this.setState({modalIsOpen: true})
    };

    handleDeleteBadge = async e => {
        this.setState({loading: true, error: null});
        try {
            await Api.badges.remove(this.props.match.params.badgeId);
            this.setState({loading: false});
            this.props.history.push('/badges');
        } catch (e) {
            this.setState({loading: false, error: e})
        }
    };

    render() {
        if (this.state.loading)
        {
            return <PageLoading />
        }

        if (this.state.error)
        {
            return <PageError error={this.state.error} />
        }

        return (
            <BadgeDetails
                onCloseModal={this.handleCloseModal}
                onOpenModal={this.handleOpenModal}
                modalIsOpen={this.state.modalIsOpen}
                onDeleteBadge={this.handleDeleteBadge}
                badge={this.state.data}/>
        );
    }
}