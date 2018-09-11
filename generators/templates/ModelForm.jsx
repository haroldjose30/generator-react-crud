import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FieldInput from '../common/FieldInput';
import Button from '../common/Button';

class <%= model %>Form extends Component {
	constructor(props, context) {
		super(props, context);
	};
	
	render() {
		return (
			<form>
				<FieldInput type="text" name="first_name" classNames="form-control" label="First Name" value={this.props.user.first_name} placeholder="First Name" onChange={this.props.onChange} />
				<FieldInput type="text" name="last_name" classNames="form-control" label="Last Name" value={this.props.user.last_name} placeholder="Last Name" onChange={this.props.onChange} />
				<Button type="submit" name="Save" disabled={this.props.saving} value={this.props.saving ? 'Saving...' : 'Save'} classNames="btn btn-primary" onClick={this.props.onSave} />
			</form>
		);
	};
};

<%= model %>Form.propTypes = {
	user: PropTypes.object.isRequired,
	saving: PropTypes.bool,
	onSave: PropTypes.func.isRequired,
	onChange: PropTypes.func.isRequired
};

export default <%= model %>Form;