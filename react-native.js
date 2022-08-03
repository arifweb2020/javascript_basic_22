/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors, Header} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  listContainer: {
    backgroundColor: '#fff',
    padding: 20,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      const res1 = await res.json();
      return res1;
    };
    getData().then(resp => setData(resp));
  }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View style={styles.listContainer}>
          {data.map(x => {
            return (
              <Text key={x.id} style={styles.sectionTitle}>
                {x.name}
              </Text>
            );
          })}
        </View>
        <View style={styles.bottomContainer}>
          <View style={{backgroundColor: 'red'}}>
            <Text style={{fontSize: 24}}> One</Text>
          </View>
          <View style={{backgroundColor: 'red'}}>
            <Text style={{fontSize: 24}}> Two</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
