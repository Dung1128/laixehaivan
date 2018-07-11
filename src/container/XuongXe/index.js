import React from 'react';
import { Container, Content, Text } from 'native-base';
import FabButton from '../../components/FabButton';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class XuongXe extends React.PureComponent {
  componentDidMount() {
    this.getList();
  }

  getList() {
    const params = {
      token: this.props.token,
      did_id: this.props.did_id,
      adm_id: this.props.profile.adm_id
    };

    this.props.listXuongXe(params);
  }

  render() {
    return (
      <Container>
        <Content>
          <Text>xuong xe</Text>
        </Content>
        <FabButton />
      </Container>
    );
  }
}
