import React from 'react';
import { Container, Content, Text, View, Button } from 'native-base';
import { reduxForm, Field } from 'redux-form';
import { InputField } from '../../elements/Form';
import styles from './styles';
import styless from '../Register/styles';
import material from '../../theme/variables/material';

@reduxForm({
  form: 'maxe',
  validate: values => {},
  destroyOnUnmount: !__DEV__,
  enableReinitialize: true
})
export default class NhapMaXe extends React.PureComponent {
  render() {
    return (
      <Container style={styles.container}>
        {/* <Content>
          <View
            style={{
              ...styless.textInputContainer,
              flexDirection: 'row',
              alignItems: 'center'
            }}
          >
            <Field
              // onSubmitEditing={() => {
              //   this.password.focus();
              // }}
              keyboardType="default"
              returnKeyType="next"
              autoCapitalize={'none'}
              style={styless.textInput}
              icon={input => (input.value ? 'close' : null)}
              onIconPress={input => input.onChange('')}
              label={'Mã xe'}
              name={'maxe'}
              component={InputField}
              autoCorrect={false}
              placeholderTextColor="#7e7e7e"
              inputStyle={styless.input}
              IconIcom={'bus'}
              IconIcomColor={material.colorDark2}
            />
          </View>
          <Button success style={styles.btn}>
            <Text>Xác nhận</Text>
          </Button>
        </Content> */}

        <View style={{ padding: material.paddingNormal }}>
          <Text>Tính năng đang trong quá trình phát triển</Text>
        </View>
      </Container>
    );
  }
}
