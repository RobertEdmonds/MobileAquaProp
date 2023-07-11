import React, {useState, useEffect} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Image,
  Text,
  Platform,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  Alert,
  SafeAreaView
} from 'react-native';

export default function Login({setUser, setCompanyUser, navigation}){
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ nav, setNav ] = useState(false)
    const [ companyNav, setCompanyNav ] = useState(false)
    
    function handleSubmit() {
        const dataForm = {
          username,
          password,
        };
        setNav(false)
        fetch("http://track-my-sand.herokuapp.com/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataForm),
        }).then((r) => {
          if (r.ok) {
            r.json().then((user) => {
              if(user.hasOwnProperty('email')){
                setCompanyUser(user)
                setCompanyNav(true)
              }else{
                    setUser(user);
                    setNav(true)
                }
              })
            setUsername("");
            setPassword("");
          } else {
            r.json().then((err) => {
                Alert.alert(`${err.errors.map(error => `${error}`)}`)
            });
          }
        });
      }

      useEffect(() => {
        if(nav){
          navigation.navigate('Home')
          setNav(false)
        }else if(companyNav){
          navigation.navigate("Company Home")
          setCompanyNav(false)
        }
      },[nav, companyNav])

  return (
    <SafeAreaView style={styles.safe_container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
            <Image source={require('./assets/APLogin.png')} style={styles.login_image}/>
          <TextInput placeholder="Username" 
            style={styles.textInput} 
            editable={true} 
            onChangeText={text => setUsername(text)}/>
          <TextInput placeholder="Password" 
            style={styles.textInput} 
            onChangeText={setPassword}
            secureTextEntry={true}
            editable={true}/>
          <View style={styles.btnContainer}>
            <Button title="Login" color="white"  fontWeight="bold" onPress={() => handleSubmit()} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe_container: {
    flex: 1,
    backgroundColor: 'rgb(45, 45, 45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  login_image:{
    width: '100%',
    height: "20%",
    objectFit: "fill",
},
  inner: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
        height: 40,
        width: 320,
        margin: 12,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: 'white',
        backgroundColor: "white",
        padding: 10,
  },
  btnContainer: {
    backgroundColor: 'royalblue',
    width: 100,
    borderRadius: 20,
    marginTop: 12,
    alignItems: 'center',
  },
});
