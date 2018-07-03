import { unionBy } from 'lodash';
import React from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { Container, Spinner } from 'native-base';
import Contacts from 'react-native-contacts';
import Item from './Item';
import ItemContacts from './ItemContacts';
import Preload from '../Preload';
import material from '../../theme/variables/material';

export default class extends React.Component {
  state = {
    loading: false,
    hasMore: true,
    paginate: 20,
    start: 0,
    contacts: [],
    loadingSpiner: false
  };

  componentDidMount() {
    this.fetchData();
    // Contacts.getAll((err, contacts) => {
    //   if (err) throw err;

    //   // contacts returned
    //   console.log(contacts);
    // });

    if (Platform.OS == 'android') {
      Contacts.getAll((err, contacts) => {
        if (err) throw err;

        // contacts returned
        this.setState({
          contacts: contacts
        });
        console.log(contacts);
      });

      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'Describing why I need to access contact information.'
      })
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Contacts.getAll((err, contacts) => {
              console.log(contacts);
              this.setState({
                contacts: contacts || []
              });
            });
          } else {
            // Handle
          }
        })
        .catch(err => {
          console.log('PermissionsAndroid', err);
        });
    }
  }

  getData() {
    if (Platform.OS == 'android') {
      Contacts.getAll((err, contacts) => {
        if (err) throw err;

        // contacts returned
        this.setState({
          contacts: contacts
        });
        console.log(contacts);
      });

      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
        title: 'Contacts',
        message: 'Describing why I need to access contact information.'
      })
        .then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Contacts.getAll((err, contacts) => {
              console.log(contacts);
              this.setState({
                contacts: contacts || []
              });
            });
          } else {
            // Handle
          }
        })
        .catch(err => {
          console.log('PermissionsAndroid', err);
        });
    }
  }

  fetchData = async () => {
    try {
      const { paginate, loading, start, hasMore } = this.state;
      if (loading || !hasMore) {
        return;
      }
      this.setState({ loading: true });
      /* eslint-disable */
      let response = await fetch(
        `https://api.coinmarketcap.com/v1/ticker/?convert=USD&start=${start}&limit=${paginate}`
      );
      response = await response.json();
      if (response.error) {
        this.setState({ hasMore: false, loading: false });
        return;
      }
      this.setState(prev => ({
        hasMore: true,
        loading: false,
        data: unionBy(prev.data, response, 'id')
      }));
      /* eslint-enable */
    } catch (e) {
      console.log(e);
      this.setState({
        loading: false
      });
    }
  };

  // shouldComponentUpdate(nextProps, { data }) {
  //   return this.state.data !== data;
  // }\

  replaceUpdate(item, x) {
    console.log(x);
    switch (x) {
      case '0120':
        return item.replace('0120', '070');
      case '0121':
        return item.replace('0121', '079');
      case '0122':
        return item.replace('0122', '077');
      case '0126':
        return item.replace('0126', '076');
      case '0128':
        return item.replace('0128', '078');
      case '0123':
        return item.replace('0123', '083');
      case '0124':
        return item.replace('0124', '084');
      case '0125':
        return item.replace('0125', '085');
      case '0127':
        return item.replace('0127', '081');
      case '0129':
        return item.replace('0129', '082');

      case '0162':
        return item.replace('0162', '032');
      case '0163':
        return item.replace('0163', '033');
      case '0164':
        return item.replace('0164', '034');
      case '0165':
        return item.replace('0165', '035');
      case '0166':
        return item.replace('0166', '036');
      case '0167':
        return item.replace('0167', '037');
      case '0168':
        return item.replace('0168', '038');
      case '0169':
        return item.replace('0169', '039');

      case '0186':
        return item.replace('0186', '056');
      case '0188':
        return item.replace('0188', '058');
      case '0199':
        return item.replace('0199', '059');

      default:
        return item;
    }
  }

  updateContact() {
    this.setState({ loadingSpiner: true });
    this.state.contacts.map((item, index) => {
      if (item.phoneNumbers) {
        item.phoneNumbers.map((item, index) => {
          if (item) {
            if (
              item.number.slice(0, 3) === '+84' ||
              item.number.slice(0, 2) === '84'
            ) {
              item.number = item.number.replace('+84', '0');
              item.number = item.number.replace('84', '0');
            }

            setTimeout(() => {
              console.log(
                this.replaceUpdate(item.number, item.number.slice(0, 4))
              );
            }, 100);
          }
        });
      }
      Contacts.updateContact(item, err => {
        if (err) throw err;
      });
    });
    this.setState({ loadingSpiner: false });
  }

  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <Preload />;
    }
    console.log(this.state.loadingSpiner);

    return (
      <Container>
        <TouchableOpacity onPress={() => this.updateContact()}>
          <Text>Update</Text>
        </TouchableOpacity>
        {this.state.loadingSpiner && (
          <Spinner
            style={{
              position: 'absolute',
              top: material.deviceHeight / 2,
              left: material.deviceWidth / 2,
              zIndex: 10
            }}
          />
        )}

        <FlatList
          refreshControl={
            <RefreshControl
              tintColor={material.primaryColor}
              // refreshing={this.state.isRefreshing}
              onRefresh={this.getData()}
            />
          }
          data={this.state.contacts}
          keyExtractor={item => item.recordID}
          renderItem={({ item }) => <ItemContacts item={item} />}
          ItemSeparatorComponent={() => <View style={styles.divider} />}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1B2126',
    padding: 10
  },
  divider: {
    height: 5,
    backgroundColor: 'transparent'
  }
});
