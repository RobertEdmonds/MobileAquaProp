import { useState } from 'react'
import { SafeAreaView, TextInput, Text, StyleSheet } from 'react-native'

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
    location
}){
    const [ error, setError ] = useState([])
    const [ success, setSuccess ] = useState(false)

    return(
        <SafeAreaView>
            <Text>Truck #</Text>
            <TextInput
             placeholder="Well" 
             style={styles.textInput} 
             editable={true} 
             value={truck}
             onChangeText={text => setTruck(text)}
            />
            <Text>Mine</Text>
            <TextInput
             placeholder="Well" 
             style={styles.textInput} 
             editable={true} 
             value={mine}
             onChangeText={text => setMine(text)}
            />
            <Text>Ticket #</Text>
            <TextInput
             placeholder="Well" 
             style={styles.textInput} 
             editable={true} 
             value={ticket}
             onChangeText={text => setTicket(text)}
            />
            <Text>Tare Weight(pounds)</Text>
            <TextInput
             placeholder="Tare Weight" 
             style={styles.textInput} 
             editable={true} 
             value={`${tare}`}
             onChangeText={text => setTare(text)}
            />
            <Text>Gross Weight(pounds)</Text>
            <TextInput
             placeholder="Gross Weight" 
             style={styles.textInput} 
             editable={true} 
             value={`${gross}`}
             onChangeText={text => setGross(text)}
            />
            <Text>Shipped To</Text>
            <TextInput
                placeholder="Well" 
                style={styles.textInput} 
                editable={true} 
                value={location}
                onChangeText={text => setLocation(text)}
            />
            <Text>PO #</Text>
            <TextInput
               placeholder="PO #" 
               style={styles.textInput} 
               editable={true}
               value={po} 
               onChangeText={text => setPo(text)} 
            />
        </SafeAreaView>
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
})