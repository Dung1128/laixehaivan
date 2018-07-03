import React from 'react';
import { Button, Icon, Fab } from 'native-base';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';

@connect(
  state => ({}),
  { ...commonActions }
)
export default class ChieuDi extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  render() {
    return (
      <Fab
        active={this.state.active}
        direction="up"
        containerStyle={{}}
        style={{
          backgroundColor: '#5067FF',
          width: 48,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        position="bottomRight"
        onPress={() => this.setState({ active: !this.state.active })}
      >
        <Icon name="hand" />
        <Button
          onPress={() => this.props.forwardTo('xuongXe')}
          style={{ backgroundColor: '#34A34F' }}
        >
          <Icon name="cloud-done" />
        </Button>
        <Button
          onPress={() => this.props.forwardTo('huyVe')}
          style={{ backgroundColor: '#3B5998' }}
        >
          <Icon name="close-circle" />
        </Button>
        <Button
          onPress={() => this.props.forwardTo('danhSachGoi')}
          style={{ backgroundColor: '#DD5144' }}
        >
          <Icon name="call" />
        </Button>
      </Fab>
    );
  }
}
