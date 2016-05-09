import React from 'react';
 
export default class SubComponentA extends React.Component {

	componentDidMount() {
    var context = this.getDOMNode().getContext('2d');
    this.paint(context);
    }

  componentDidUpdate() {
    var context = this.getDOMNode().getContext('2d');
    context.clearRect(0, 0, 200, 200);
    this.paint(context);
  }

  paint(context) {
    context.save();
    context.translate(100, 100);
    context.rotate(this.props.rotation, 100, 100);
    context.fillStyle = '#F00';
    context.fillRect(-50, -50, 100, 100);
    context.restore();
  }

  render() {
    return <canvas width={200} height={200}></canvas>;
  }
}