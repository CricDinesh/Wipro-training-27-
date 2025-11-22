import React from 'react';
import PropTypes from 'prop-types';

export default class UserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = { statusMessage: 'Fetching user status...' };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.setState({ statusMessage: 'Active User' });
    }, 2000); // 2 seconds
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  render() {
    const style = { padding: 10, border: '1px solid #ddd', display: 'inline-block', borderRadius: 6 };
    return (
      <div style={style}>
        <div>User ID: {this.props.userId}</div>
        <div><strong>{this.state.statusMessage}</strong></div>
      </div>
    );
  }
}

UserStatus.propTypes = {
  userId: PropTypes.number.isRequired
};
