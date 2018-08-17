import React, { Component } from 'react';
import { Text } from 'native-base';
import {
  TouchableOpacity,
  Modal,
  FlatList,
  ImageBackground,
  View,
  Image
} from 'react-native';
import IconFoundation from 'react-native-vector-icons/Foundation';
import ImagePicker from 'react-native-image-picker';
import _ from 'lodash';
import { connect } from 'react-redux';
import Icon from '../../elements/Icon';

// import * as jobActions from '~/store/actions/job';
// import * as authActions from '~/store/actions/auth';
// import * as accountSelector from '~/store/selectors/account';
// import * as jobSelector from '~/store/selectors/job';

import styles from './styles';
import material from '../../theme/variables/material';

const imagePickerOptions = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

@connect(
  state => ({
    // auth: state.auth,
    // device_info: accountSelector.deviceInfo(state),
    // imgg: jobSelector.img(state)
  }),
  {}
)
export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
      // img: this.props.img
    };
    // this.listImg = `${this.props.img}`;
    // this.listImgBase = this.props.imgg ? `${this.props.imgg}` : '';
    this.arrayImg = [];
    // console.log(this.listImgBase);
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  addImage() {
    ImagePicker.launchImageLibrary(imagePickerOptions, response => {
      // console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        this.setModalVisible(true);
        // console.log('response', response);
        this.arrayImg.push(response.data);
        this.setState(
          {
            dataImage: this.arrayImg
          },
          () => this.props.chooseImage(this.arrayImg)
        );

        // const source = { uri: response.uri };
        // const params = {
        //   api_secret: this.props.auth.api_secret,
        //   device_info: this.props.device_info,
        //   data: `data:image/jpeg;base64,${response.data}`
        // };
        // this.props.upLoadImage(params, (err, data) => {
        //   if (data) {
        //     // this.listImgBase = `${this.listImgBase + data.path},`;
        //     // console.log(this.listImgBase);
        //     this.props.saveImage(this.listImgBase);

        //     this.arrayImg = _.split(this.listImgBase, ',');

        //     if (this.arrayImg && this.arrayImg.length > 0) {
        //       this.arrayImg.pop();
        //     }
        //     this.setState(
        //       {
        //         img: this.arrayImg
        //       },
        //       () => {
        //         this.setModalVisible(false);
        //         // console.log('fffffff', this.state.img);
        //       }
        //     );
        //   } else {
        //     this.setModalVisible(false);
        //   }
        // });

        console.log(response);
        this.setModalVisible(false);

        // You can also display the image using data:
        // const source = { uri: `data:image/jpeg;base64,${response.data}` };
        // Alert.alert('Change Avatar successfull', `Pick avatar successfull uri: ${source.uri}`, [
        //   {
        //     title: 'Ok'
        //   }
        // ]);

        // this.setState({
        //   avatarSource: source
        // });
      }
    });
  }
  Delete(index) {
    const arr = this.state.img;
    arr.splice(index, 1);
    this.setState(
      {
        img: arr
      }
      // () => {
      //   const haizz = _.join(this.state.img, ',');
      //   this.listImgBase = haizz;
      //   // this.props.saveImage(haizz);
      // }
    );
  }

  deleteImage(item, index) {
    this.state.dataImage.splice(index, 1);
    this.setState(
      {
        dataImage: this.state.dataImage
      },
      () => this.props.chooseImage(this.state.dataImage)
    );
  }

  render() {
    return (
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Modal
          style={styles.modal}
          animationType="slide"
          transparent
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        />
        <FlatList
          style={{ width: '100%' }}
          data={this.state.dataImage}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={() => (
            <TouchableOpacity
              style={{
                ...styles.drawerImage,
                ...styles.footer,
                borderStyle: 'dashed'
              }}
              onPress={() => this.addImage()}
              activeOpacity={0.5}
            >
              <Icon name={'add'} style={styles.icon} />
            </TouchableOpacity>
          )}
          renderItem={({ item, index }) => (
            <TouchableOpacity activeOpacity={1}>
              <TouchableOpacity
                onPress={() => this.deleteImage(item, index)}
                activeOpacity={0.5}
                style={styles.buttonDelete}
              >
                <IconFoundation
                  name="x"
                  size={12}
                  style={{ backgroundColor: 'transparent' }}
                  color="white"
                />
              </TouchableOpacity>

              <Image
                resizeMode="cover"
                source={{ uri: `data:image/png;base64,${item}` }}
                style={{ ...styles.drawerImage, marginRight: 8 }}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => 'item.fileName' + index}
        />
      </View>
    );
  }
}
