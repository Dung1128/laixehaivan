import React from 'react';
import { Button, Icon, Fab, Text } from 'native-base';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import material from '../../theme/variables/material';

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
          backgroundColor: material.colorHeader,
          width: 48,
          height: 48,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        position="bottomRight"
        onPress={() => this.setState({ active: !this.state.active })}
      >
        <Icon name="redo" />
        <Button
          onPress={() => this.props.forwardTo('xuongXe')}
          style={{ backgroundColor: '#34A34F' }}
        >
          <Icon name="arrow-round-down" />
        </Button>
        <Button
          onPress={() => this.props.forwardTo('huyVe')}
          style={{ backgroundColor: '#3B5998' }}
        >
          <Icon name="close-circle" />
        </Button>
        <Button
          onPress={() => this.props.forwardTo('veOffline')}
          style={{ backgroundColor: '#DD5144' }}
        >
          <Icon name="wifi" />
        </Button>
        <Button
          onPress={() => this.props.forwardTo('chiPhiChuyenDi')}
          style={{ backgroundColor: material.colorPending }}
        >
          <Icon name="cash" />
        </Button>
        <Button
          onPress={() => this.props.forwardTo('doanhThuHang')}
          style={{ backgroundColor: material.brandSuccess }}
        >
          <Icon name="outlet" />
        </Button>

        <Button
          onPress={() => this.props.forwardTo('nhienLieu')}
          style={{ backgroundColor: material.colorRequest }}
        >
          <Icon name="subway" />
        </Button>
      </Fab>
    );
  }
}
