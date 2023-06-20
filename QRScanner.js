import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function QRScanner({
    setTruck,
    setMine,
    setTare,
    setGross,
    setTicket,
    setPo,
    setLocation, 
    navigation
}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    const truckObj = JSON.parse(data)
    setTruck(truckObj.talipay_raw.truck)
    setMine(truckObj.talipay_raw.mine)
    setPo(truckObj.talipay_raw.po)
    setTicket(truckObj.ticket.number)
    setLocation(truckObj.talipay_raw.well)
    if(parseInt(truckObj.talipay_raw.tare_weight) < 100){
        setTare(parseFloat(truckObj.talipay_raw.tare_weight) * 2000)
        setGross(parseFloat(truckObj.talipay_raw.gross_weight) * 2000)
    }else{
        setTare(parseInt(truckObj.talipay_raw.tare_weight))
        setGross(parseInt(truckObj.talipay_raw.gross_weight))
    }
    console.log(JSON.parse(data).talipay_raw.truck)
    setScanned(true);
    navigation.navigate('Truck Form')
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting camera permission...</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera.</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <View style={styles.scanOverlay}>
          <Text style={styles.scanOverlayText}>QR code scanned!</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scanOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanOverlayText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});