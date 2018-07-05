import { TabNavigator } from 'react-navigation';
import material from '../../theme/variables/material';
import TabBarComponent from '../../components/TabBarComponent';
import ChieuDi from './ChieuDi';
import ChieuVe from './ChieuVe';

export const TabTask = TabNavigator(
  {
    all: {
      screen: ChieuDi
    },
    near: {
      screen: ChieuVe
    }
  },
  {
    tabBarPosition: 'top',
    tabBarComponent: TabBarComponent,
    swipeEnabled: true,
    animationEnabled: true,
    lazy: true,
    tabBarOptions: {
      style: {
        backgroundColor: '#fff',
        height: material.deviceHeight * 0.1,
        padding: 0,
        paddingTop: 0,
        marginTop: 0,
        borderBottomWidth: 0,
        borderBottomColor: '#F3F6F7',
        overflow: 'hidden',
        borderWidth: 0
      },

      activeTintColor: '#000',
      inactiveTintColor: '#8796A0',
      upperCaseLabel: false,
      showIcon: true,
      labelStyle: {
        fontSize: material.textNormal,
        padding: 0,
        margin: 0
      },
      tabStyle: {
        paddingTop: 0,
        padding: 0,
        // overflow: 'hidden',
        borderWidth: 0
      },
      indicatorStyle: {
        // backgroundColor: '#FCBA4D',
        height: 3,
        position: 'absolute',
        bottom: 0
      }
    }
  }
);
