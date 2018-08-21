import React from 'react';
import { Container, Content, Text } from 'native-base';
import {
  FlatList,
  RefreshControl,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import numeral from 'numeral';
import { connect } from 'react-redux';
import * as commonActions from '../../store/actions/common';
import * as authSelectors from '../../store/selectors/auth';
import * as haivanActions from '../../store/actions/haivan';
import * as haivanSelectors from '../../store/selectors/haivan';
import styles from './styles';
import material from '../../theme/variables/material';

@connect(
  state => ({
    token: authSelectors.getToken(state),
    profile: authSelectors.getUser(state),
    did_id: haivanSelectors.getChuyenDi(state)
  }),
  { ...commonActions, ...haivanActions }
)
export default class XuongXe extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataContent: this.props.route.params.data
    };
    this.currentOffset = 0;
    this.listImgTask = [];
  }

  componentWillFocus() {
    this.dataRef.scrollToOffset({
      offset: this.currentOffset + 1,
      animated: false
    });
  }

  componentWillBlur() {
    this.dataRef.scrollToOffset({
      offset: this.currentOffset - 1,
      animated: false
    });
  }

  handlePlayGallery(data, playingIndex) {
    this.props.app.props.openGallery(data, playingIndex);
  }

  renderItem(text, name, color, styleText) {
    return (
      <View style={styles.row}>
        <View style={{ flex: 2 }}>
          <Text style={styles.textNormal}>{text}</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text
            style={{
              ...styles.textNormal,
              color: color,
              fontWeight: styleText
            }}
          >
            {name}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { dataContent } = this.state;
    return (
      <Container style={styles.container}>
        <Content>
          <Text style={styles.textNormal}>
            Họ và tên:{' '}
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              {dataContent.adm_name}
            </Text>
          </Text>
          {this.renderItem('Tuyến xe: ', dataContent.tuy_ten, 'green', 'bold')}
          {this.renderItem(
            'Biển kiểm soát: ',
            dataContent.xe_bien_kiem_soat,
            'black',
            'bold'
          )}
          {this.renderItem('Lái xe 1: ', dataContent.lai_xe_1, 'black', 'bold')}
          {this.renderItem('Lái xe 2: ', dataContent.lai_xe_2, 'black', 'bold')}
          {this.renderItem(
            'Tiếp viên: ',
            dataContent.tiep_vien,
            'black',
            'bold'
          )}
          {this.renderItem(
            'Địa điểm kiểm tra: ',
            dataContent.xtt_dia_diem,
            'black',
            'bold'
          )}
          {this.renderItem(
            'Tổng số khách: ',
            dataContent.xtt_so_khach,
            'green',
            'bold'
          )}
          {this.renderItem(
            'Số khách trên xe: ',
            dataContent.xtt_so_khach_tren_xe,
            'green',
            'bold'
          )}
          {this.renderItem(
            'Tiền khách: ',
            `${numeral(dataContent.xtt_tien_khach).format('0,0')} VNĐ`,
            'green',
            'bold'
          )}
          {this.renderItem(
            'Tiền hàng: ',
            `${numeral(dataContent.xtt_tien_hang).format('0,0')} VNĐ`,

            'green',
            'bold'
          )}
          {this.renderItem(
            'Nhóm lỗi: ',
            dataContent.nhom_loi,
            material.colorAccept,
            'normal'
          )}
          {this.renderItem(
            'Lỗi vi phạm: ',
            dataContent.xtt_noi_dung_vi_pham,
            material.colorAccept,
            'normal'
          )}

          {this.renderItem(
            'Ghi chú: ',
            dataContent.xtt_ghi_chu,
            'black',
            'normal'
          )}
          <View style={styles.viewImage}>
            <Text style={{ ...styles.textNormal, fontWeight: 'bold' }}>
              Hình ảnh vi phạm
            </Text>

            <FlatList
              style={{ width: '100%', marginTop: material.paddingNormal }}
              data={this.state.dataContent.xtt_img}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  onPress={() =>
                    this.handlePlayGallery(
                      this.state.dataContent.xtt_img,
                      index
                    )
                  }
                  activeOpacity={1}
                >
                  <Image
                    resizeMode="cover"
                    source={{ uri: item }}
                    style={{ ...styles.drawerImage, marginRight: 8 }}
                  />
                </TouchableOpacity>
              )}
              keyExtractor={(item, index) => 'item.fileName' + index}
            />
          </View>
        </Content>
      </Container>
    );
  }
}
