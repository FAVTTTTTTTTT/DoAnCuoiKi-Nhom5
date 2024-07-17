import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native';
import Home from './components/Home'
import Login from './components/Login'
import Screen03 from './components/Screen03'
import Screen04 from './components/Screen04'
import Screen05 from './components/Screen05'
import Screen06 from './components/Screen06'
import Screen07 from './components/Screen07'
import Screen08 from './components/Screen08'
import Annoucement from './components/Announcement'
import { NavigationContainer ,useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Footer from './components/Footer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { UserProvider } from './components/UserProvider';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



export default function App() {
  // const navigation = useNavigation();
  return (
    <UserProvider>
      <NavigationContainer >

        <Tab.Navigator tabBar={(props) => <Footer {...props} />}>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Screen03" component={Screen03} 
           options = {{
            headerStyle: { backgroundColor: '#fff' },
            title: 'Select beneficiary',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              color: '#000'
            },
            headerLeft: () => (
              <ScreenHeaderLeft iconUri="left-arrow_kzcqni.png" targetScreen="Home" />
            ),

            // headerLeft: () => (
            //   <TouchableOpacity
            //     onPress={() => {
            //       navigation.navigate(
            //         "Home"
            //       )
            //     }}
            //   > <Image source={{ uri: 'https://res.cloudinary.com/doqbelkif/image/upload/v1700927197/DeTaiBIDV/left-arrow_kzcqni.png' }}   style={{ width: 32, height: 32, marginLeft: 10 }}></Image>

                
            //   </TouchableOpacity>
            // ),
           
          
          }}/>
          <Tab.Screen name="Screen04" component={Screen04}  options = {{
            headerStyle: { backgroundColor: '#fff' },
            title: 'Introduce Trade',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              color: '#000'
            },
            headerLeft: () => (
              <ScreenHeaderLeft iconUri="left-arrow_kzcqni.png" targetScreen="Screen03" />
            ),
            headerRight: () => (
              <ScreenHeaderLeft iconUri="home_1_qibla4.png" targetScreen="Home" />
            ),
          
          }}/>
          <Tab.Screen name="Screen05" component={Screen05} 
           options = {{
            headerStyle: { backgroundColor: '#fff' },
            title: 'Accept trade ',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              color: '#000'
            },
            headerLeft: () => (
              <ScreenHeaderLeft iconUri="left-arrow_kzcqni.png" targetScreen="Screen04" />
            ),
            headerRight: () => (
              <ScreenHeaderLeft iconUri="home_1_qibla4.png" targetScreen="Home" />
            ),
          
          }}/>
          <Tab.Screen name="Screen06" component={Screen06} />
          <Tab.Screen name="Screen07" component={Screen07}/>
          <Tab.Screen name="Screen08" component={Screen08}
           options = {{
            headerStyle: { backgroundColor: '#fff' },
            title: 'change password',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              color: '#000'
            },
            headerLeft: () => (
              <ScreenHeaderLeft iconUri="left-arrow_kzcqni.png" targetScreen="Screen07" />
            ),
            headerRight: () => (
              <ScreenHeaderLeft iconUri="home_1_qibla4.png" targetScreen="Home" />
            ),
          
          }}/>
          <Tab.Screen name="Announcement" component={Annoucement}
          options = {{
            headerStyle: { backgroundColor: '#fff' },
            title: 'Thông báo',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 20,
              color: '#000'
            },
            headerLeft: () => (
              <ScreenHeaderLeft iconUri="left-arrow_kzcqni.png" targetScreen="Screen07" />
            ),
            headerRight: () => (
              <ScreenHeaderLeft iconUri="home_1_qibla4.png" targetScreen="Home" />
            ),
          
          }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

const ScreenHeaderLeft = ({ iconUri, targetScreen }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(targetScreen);
      }}
    >
      <Image
        source={{ uri: `https://res.cloudinary.com/doqbelkif/image/upload/v1700927197/DeTaiBIDV/${iconUri}` }}
        style={{ width: 32, height: 32, marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
  
};
const ScreenHeaderRight = ({ iconUri, targetScreen }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(targetScreen);
      }}
    >
      <Image
        source={{ uri: `https://res.cloudinary.com/doqbelkif/image/upload/v1700927195/DeTaiBIDV/${iconUri}` }}
        style={{ width: 32, height: 32, marginLeft: 10 }}
      />
    </TouchableOpacity>
  );
  
};


