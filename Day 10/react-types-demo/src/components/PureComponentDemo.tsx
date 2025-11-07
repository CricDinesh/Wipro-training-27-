import React, { PureComponent } from "react";

interface PureProps {
  message: string;
}

class PureComponentDemo extends PureComponent<PureProps> {
  render() {
    return <p> PureComponent says: {this.props.message}</p>;
  }
}

export default PureComponentDemo;
