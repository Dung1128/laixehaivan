import React from 'react';
import { Container, Content, Text } from 'native-base';
import FabButton from '../../components/FabButton';
import { TabTask } from './tabTask';

export default class DoanhThu extends React.PureComponent {
  render() {
    return (
      <Container>
        <TabTask />

        <FabButton />
      </Container>
    );
  }
}
