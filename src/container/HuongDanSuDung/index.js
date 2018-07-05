import React from 'react';
import { Container, Content, Text, Spinner } from 'native-base';
import { WebView } from 'react-native';

export default class HuongDanSuDung extends React.PureComponent {
  render() {
    return (
      <Container>
        <WebView
          source={{ uri: 'https://hasonhaivan.com/' }}
          renderLoading={() => <Spinner color="grey" />}
          startInLoadingState
        />
      </Container>
    );
  }
}
