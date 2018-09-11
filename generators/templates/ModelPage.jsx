import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as userActions from '../../actions/<%= model %>Actions';
import UserForm from './<%= model %>Form';
import Button from '../common/Button';
import { browserHistory } from 'react-router';

class U<%= model %>Page extends Component {
	constructor(props, context) {
		super(props, context);
	
		this.state = {
			user: this.props.user,
			saving: false,
			isEditing: false
		};
		
		this.updateUserState = this.updateUserState.bind(this);
		
		this.saveUser = this.saveUser.bind(this);
		
		this.deleteUser = this.deleteUser.bind(this);
		
		this.toggleEdit = this.toggleEdit.bind(this);
		
		this.redirect = this.redirect.bind(this);
	};
	
	componentWillReceiveProps(nextProps) {
		if (this.props.user.id != nextProps.user.id) {
			this.setState({
				user: nextProps.user
			});
		}
		
		this.setState({
			saving: false, 
			isEditing: false
		});
	};
	
	saveUser(event) {
		event.preventDefault();
		
		this.setState({
			saving: true
		});
		
		this.props.actions.updateUser(this.state.user);
	};
	
	deleteUser(event) {
		event.preventDefault();
		
		this.props.actions.deleteUser(this.state.user);
	};
	
	updateUserState(event) {
		const field = event.target.name;
		
		const user = this.state.user;
		
		user[field] = event.target.value;
		
		return this.setState({
			user: user
		});
	};
	
	toggleEdit() {
		this.setState({isEditing: !this.state.isEditing})
	};
	
	redirect() {
		browserHistory.push('/users');
	};
	
	render() {
		if (this.state.isEditing) {
			return (
				<div>
					<h1>Edit User</h1>
					<<%= model %>Form user={this.state.user} onSave={this.saveUser} onChange={this.updateUserState} saving={this.state.saving} />
				</div>
			);
		}
		
		return (
			<div className="col-md-8 col-md-offset-2">
				<h1>{this.props.user.first_name} {this.props.user.last_name}</h1>
				<Button type="button" name="Edit" value="Edit" classNames="btn btn-warning" onClick={this.toggleEdit} />
				<Button type="button" name="Delete" value="Delete" classNames="btn btn-danger" onClick={this.deleteUser} />
			</div>
		);
	};
};

const getUserById = (users, id) => {
	let user = users.find(user => user.id == id);
	
	return Object.assign({}, user);
};

const mapDispatchToProps = dispatch => {
	return {
		actions: bindActionCreators(userActions, dispatch)
	};
};

const mapStateToProps = (state, ownProps) => {
	let user = {
		first_name: '', 
		last_name: ''
	};
	
	const userId = ownProps.params.id;
	
	if (userId && state.users.length > 0) {
		user = getUserById(state.users, ownProps.params.id);
	}
	
	return {
		user: user
	};
};

UserPage.propTypes = {
	user: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);