import { 
    SafeAreaView, 
    TextInput, 
    Text, 
    StyleSheet, 
    View, 
    Button, 
    TouchableWithoutFeedback, 
    Keyboard,
    Alert
 } from 'react-native'

export default function TruckForm({
    setTruck,
    setMine,
    setTare,
    setGross,
    setTicket,
    setPo,
    setLocation,
    truck,
    mine,
    tare,
    gross,
    ticket,
    po,
    location,
    sites,
    navigation,
    handleAddSand,
    setScanned
}){

    const handleTruckLoad = () => {
        if(!sites.find(site => site.location.toUpperCase() === location.toUpperCase())){
            setScanned(false)
            Alert.alert('Site has not been created yet')
        }else{
            const formData = {
                truck, 
                mine,
                ticket_number: ticket,  
                tare_weight: parseInt(tare), 
                gross_weight: parseInt(gross), 
                ship_to: location, 
                po: po, 
                site_id: sites.find(site => site.location.toUpperCase() === location.toUpperCase()).id
            }
            fetch(`http://track-my-sand.herokuapp.com/api/trucks`, {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }).then(resp => {
                if(resp.ok){
                    resp.json().then(truck => {
                        handleAddSand(truck)
                        // setScanned(false)
                        navigation.navigate('QR Scanner')
                    })
                    setTruck('')
                    setMine('')
                    setTare("")
                    setGross("")
                    setTicket('')
                    setLocation('')
                    setPo('')
                }else{
                    resp.json().then(err => {
                        // setScanned(false)
                        Alert.alert(`${err.errors.map(error => `${error}`)}`)
                    })
                }
                setScanned(false)
            })
        }
    }


    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SafeAreaView style={styles.inner}>
                <Text style={styles.text}>Truck #</Text>
                <TextInput
                placeholder="Well" 
                style={styles.textInput} 
                editable={true} 
                value={truck}
                onChangeText={text => setTruck(text)}
                />
                <Text style={styles.text}>Mine</Text>
                <TextInput
                placeholder="Well" 
                style={styles.textInput} 
                editable={true} 
                value={mine}
                onChangeText={text => setMine(text)}
                />
                <Text style={styles.text}>Ticket #</Text>
                <TextInput
                placeholder="Well" 
                style={styles.textInput} 
                editable={true} 
                value={ticket}
                onChangeText={text => setTicket(text)}
                />
                <Text style={styles.text}>Tare Weight(pounds)</Text>
                <TextInput
                placeholder="Tare Weight" 
                style={styles.textInput} 
                editable={true} 
                value={`${tare}`}
                onChangeText={text => setTare(text)}
                />
                <Text style={styles.text}>Gross Weight(pounds)</Text>
                <TextInput
                placeholder="Gross Weight" 
                style={styles.textInput} 
                editable={true} 
                value={`${gross}`}
                onChangeText={text => setGross(text)}
                />
                <Text style={styles.text}>Shipped To</Text>
                <TextInput
                    placeholder="Well" 
                    style={styles.textInput} 
                    editable={true} 
                    value={location}
                    onChangeText={text => setLocation(text)}
                />
                <Text style={styles.text}>PO #</Text>
                <TextInput
                placeholder="PO #" 
                style={styles.textInput} 
                editable={true}
                value={po} 
                onChangeText={text => setPo(text)} 
                />
                <View style={styles.btnContainer}>
                    <Button title="Submit" color="white"  fontWeight="bold" onPress={() => handleTruckLoad()} />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
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
  text: {
    color: 'white',
    fontWeight: "bold"
  },
  inner: {
    padding: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(45, 45, 45)',
  },
  btnContainer: {
    backgroundColor: 'royalblue',
    width: 100,
    borderRadius: 20,
    marginTop: 12,
    alignItems: 'center',
  },
})