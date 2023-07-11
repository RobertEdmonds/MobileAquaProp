// import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView } from 'react-native';
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
  const [ sites, setSites ] = useState([])
  const [ truck, setTruck ] = useState('')
  const [ mine, setMine ] = useState('')
  const [ tare, setTare ] = useState('')
  const [ gross, setGross ] = useState('')
  const [ ticket, setTicket ] = useState('')
  const [ po, setPo ] = useState('')
  const [location, setLocation] = useState('')
  const [scanned, setScanned] = useState(false)

  function handleLogout() {
    fetch("http://track-my-sand.herokuapp.com/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
        setCompanyUser(null)
      }
    });
  } 

  const handleAddSand = (load) => {
    const updatedSite = sites.filter(site => {
      if(site.id === load.site_id){
        site.total_on_site += load.total
        site.total_delivered += load.total
        return site
      }else{
        return site
      }
    })
    setSites(updatedSite)
  }

  if(user){
    return(
      <SafeAreaView style={styles.safe}>
        <NavigationContainer>
            <StatusBar
            backgroundColor="rgb(45, 45, 45)" 
            barStyle="default"
            />
            <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" style={styles.view}>
              {(props) => <Authenticate {...props} handleLogout={handleLogout} sites={sites} setSites={setSites}/>}
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
                setScanned={setScanned}
                scanned={scanned}
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
                sites={sites}
                handleAddSand={handleAddSand}
                setScanned={setScanned}
              />}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    )
  }else if(companyUser){
    return(
      <SafeAreaView style={styles.safe}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" style={styles.view}>
              {(props) => <CompanyView {...props} handleLogout={handleLogout} companyUser={companyUser}/>}
            </Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    )
  }else if(user === null && companyUser === null){
    return(
      <SafeAreaView style={styles.safe}>
        <NavigationContainer>
          <View style={styles.container}>
            <Login setUser={setUser} setCompanyUser={setCompanyUser}/>
          </View>
        </NavigationContainer>
      </SafeAreaView>
    )
  }
  return (
    <SafeAreaView style={styles.safe}>
    <StatusBar
        backgroundColor="rgb(45, 45, 45)" 
        barStyle="default"
      />
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* {user === null && companyUser === null && ( */}
          <Stack.Screen name="Login" options={{headerShow: false}}>
            {(props) => <Login {...props} setUser={setUser} setCompanyUser={setCompanyUser}/>}
          </Stack.Screen>
        {/* )} */}
        <Stack.Screen name="Home" style={styles.view}>
          {(props) => <Authenticate {...props} handleLogout={handleLogout} sites={sites} setSites={setSites}/>}
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
            setScanned={setScanned}
            scanned={scanned}
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
            sites={sites}
            handleAddSand={handleAddSand}
            setScanned={setScanned}
          />}
        </Stack.Screen>
        {companyUser && (
          <Stack.Screen name="Company Home" style={styles.view}>
          {(props) => <CompanyView {...props} handleLogout={handleLogout} companyUser={companyUser}/>}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    {/* {companyUser &&  (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" style={styles.view}>
          {(props) => <CompanyView {...props} handleLogout={handleLogout} companyUser={companyUser}/>}
        </Stack.Screen>
      </Stack.Navigator>
    )} */}
    {/* {user === null && companyUser === null && (
        <View style={styles.container}>
          <Login setUser={setUser} setCompanyUser={setCompanyUser}/>
        </View>
    )} */}
    </NavigationContainer>
    </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  safe:{
    flex: 1,
    backgroundColor: "rgb(45, 45, 45)"
  },
  container: {
    flex: 1,
    backgroundColor: 'rgb(45, 45, 45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  view: {
    backgroundColor: 'rgb(45, 45, 45)',
    marginBottom: 16
  },
});
