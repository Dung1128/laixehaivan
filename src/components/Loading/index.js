import React, { Component } from 'react';
import { areRequestsPending } from '../../store/selectors/common';
import { Spinner } from 'native-base';
import { connect } from 'react-redux';
import styles from './styles';
import material from '../../theme/variables/material';

@connect(state => ({
  isPending: areRequestsPending(state)
}))
export default class extends Component {
  render() {
    return this.props.isPending ? (
      <Spinner style={styles.container} color={material.colorComplete} />
    ) : null;
  }
}
