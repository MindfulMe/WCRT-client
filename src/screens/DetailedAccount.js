import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, StatusBar, SectionList } from 'react-native';
import Wallpaper from '../components/Login/Wallpaper';
import staticData from '../data/transactions';
import { Card } from '../components/Card';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listHeader: {
    padding: 10,
  },
  listItem: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(222,222,222)',
  },
  headerDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgb(222,222,222)',
  },
  card: {
    marginBottom: '30px'
  }
});

export default class Home extends Component {
  static propTypes = {
    navigation: PropTypes.object,
  };
  state = {};
  handleClosePress = () => {
    this.props.navigation.navigate('Accounts', { title: 'Accounts' });
  };
  render() {
    return (
      <Wallpaper>
        
        <View style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Card style={styles.card}/>
          <SectionList
            renderItem={({ item, index }) => (
              <View key={index} style={styles.listItem}>
                <Text>{item.description}</Text>
                <Text>{`$${item.amount}`}</Text>
              </View>
            )}
            renderSectionHeader={({ section: { title } }) => (
              <View style={styles.listHeader}>
                <Text style={{ fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
              </View>
            )}
            sections={staticData}
            keyExtractor={(item, index) => item + index}
            ItemSeparatorComponent={() => <View style={styles.itemDivider} />}
            SectionSeparatorComponent={() => <View style={styles.headerDivider} />}
          />
        </View>
      </Wallpaper>
    );
  }
}
