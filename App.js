// import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Button, Alert, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authenticate from './Authenticate';
import Login from './Login';
import QRScanner from './QRScanner';
import CompanyView from './CompanyView';
import TruckForm from './TruckForm';

const Stack = createNativeStackNavigator()

export default function App() {
  const [ user, setUser ] = useState(null)
  const [ companyUser, setCompanyUser ] = useState(null)
  const [ truck, setTruck ] = useState('')
  const [ mine, setMine ] = useState('')
  const [ tare, setTare ] = useState('')
  const [ gross, setGross ] = useState('')
  const [ ticket, setTicket ] = useState('')
  const [ po, setPo ] = useState('')
  const [location, setLocation] = useState('')

  useEffect(() => {
    fetch("http://track-my-sand.herokuapp.com/api/me").then((resp) => {
      if (resp.ok) {
        resp.json().then((user) => {
          setUser(user)
        });
      }
    });
  }, [setUser]);

  useEffect(() => {
      fetch('http://track-my-sand.herokuapp.com/api/company_personnel')
      .then(resp => {
        if(resp.ok) {
          resp.json().then(user => setCompanyUser(user))
        }
      })
  },[setCompanyUser])

  function handleLogout() {
    fetch("http://track-my-sand.herokuapp.com/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        setCompanyUser(null)
      }
    });
  } 
  // Alert.alert('Simple Button pressed')
  console.log(truck, mine, tare, gross, ticket, po, location)
  return (
    <>
    <StatusBar
        backgroundColor="rgb(45, 45, 45)" 
        barStyle="default"
      />
    <NavigationContainer>
    {user && (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" style={styles.view}>
          {(props) => <Authenticate {...props} handleLogout={handleLogout}/>}
        </Stack.Screen>
        <Stack.Screen name="QR Scanner" style={styles.view}>
          {(props) => <QRScanner {...props} 
            setTruck={setTruck}
            setMine={setMine}
            setTare={setTare}
            setGross={setGross}
            setTicket={setTicket}
            setPo={setPo}
            setLocation={setLocation}
            />}
        </Stack.Screen>
        <Stack.Screen name="Truck Form" style={styles.view}>
          {(props) => <TruckForm {...props}
            setTruck={setTruck}
            setMine={setMine}
            setTare={setTare}
            setGross={setGross}
            setTicket={setTicket}
            setPo={setPo} 
            setLocation={setLocation}
            truck={truck}
            mine={mine}
            tare={tare}
            gross={gross}
            ticket={ticket}
            po={po}
            location={location}
          />}
        </Stack.Screen>
      </Stack.Navigator>
    )}
    {companyUser &&  (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" style={styles.view}>
          {(props) => <CompanyView {...props} handleLogout={handleLogout} companyUser={companyUser}/>}
        </Stack.Screen>
      </Stack.Navigator>
    )}
    {user === null && companyUser === null && (
      <View style={styles.container}>
        <Login setUser={setUser} setCompanyUser={setCompanyUser}/>
      </View>
    )}
    </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(45, 45, 45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    backgroundColor: 'rgb(45, 45, 45)',
  }
});
