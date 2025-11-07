import React, { Component } from "react";

interface ClassProps {
  name: string;
}

class ClassComponent extends Component<ClassProps> {
  render() {
    return <p> Hello from Class Component, {this.props.name}!</p>;
  }
}

export default ClassComponent;
