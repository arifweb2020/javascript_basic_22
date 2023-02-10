// how to genearte apk
go to android folder app  under main make one folder assets
   
   D:\React-Native\chefooz\android\app\src\main\assets
   
   step1: go to main folder -  npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle

step2: cd android

step3: gradlew assembleRelease

https://instamobile.io/android-development/generate-react-native-release-build-android/

https://medium.com/geekculture/react-native-generate-apk-debug-and-release-apk-4e9981a2ea51

https://www.youtube.com/watch?v=l3CZmXtEe_Y


https://www.asapdevelopers.com/build-a-react-native-login-app-with-node-js-backend/
npm i react-native-size-matters for resposnive

1>npm i react-native
2>npx react-native init AwesomeProject
3>npx react-native run-android


// inside android folder
add local.properties  file
## This file must *NOT* be checked into Version Control Systems,
# as it contains information specific to your local configuration.
#
# Location of the SDK. This is only used by Gradle.
# For customization when using a Version Control System, please read the
# header note.
#Tue Aug 02 23:42:31 IST 2022

sdk.dir = C:/Users/Admin/AppData/Local/Android/sdk


// chnages in .prettierrc.js file
module.exports = {  
  trailingComma: "all",
  tabWidth: 4,
  singleQuote: "avoid",
};









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
