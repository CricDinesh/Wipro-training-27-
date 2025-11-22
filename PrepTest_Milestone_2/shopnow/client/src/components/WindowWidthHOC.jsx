import React from 'react';

// HOC that provides `windowWidth` prop to wrapped component
export function withWindowWidth(WrappedComponent) {
  return class extends React.Component {
    state = { width: typeof window !== 'undefined' ? window.innerWidth : 0 };

    update = () => this.setState({ width: window.innerWidth });

    componentDidMount() {
      window.addEventListener('resize', this.update);
    }
    componentWillUnmount() {
      window.removeEventListener('resize', this.update);
    }

    render() {
      return <WrappedComponent {...this.props} windowWidth={this.state.width} />;
    }
  };
}
