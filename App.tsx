import { CameraView,useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function App() {

  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  
const handleBarcodeScanned = ({ data }: {data: string }) => {
    setScanned(true); 
    alert(`luettu! Sisältö: ${data}`);
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} barcodeScannerSettings={{
        barcodeTypes: ["ean13"], 
      }}
      //onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}/>
      />
      <View style={styles.buttonContainer}>
        {scanned && (
          <TouchableOpacity 
            style={[styles.button, styles.button]} 
            onPress={() => setScanned(false)}
          >
            <Text style={styles.text}>Lue uusi koodi</Text>
          </TouchableOpacity>
        )}
      
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 64,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    width: '100%',
    paddingHorizontal: 64,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});

