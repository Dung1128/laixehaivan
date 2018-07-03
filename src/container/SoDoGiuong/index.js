import React from 'react';
import { Container, Content, Text, Button, Icon, Fab } from 'native-base';
import FabButton from '../../components/FabButton';

export default class SoDoGiuong extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  render() {
    return (
      <Container>
        <Content>
          <Text>SoDoGiuong</Text>
        </Content>
        <FabButton />
      </Container>
    );
  }
}
