import axios from 'axios';
import React, { useState } from 'react';
import { ActivityIndicator, Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const API_KEY = 'Your_API_key'; // Replace with your OpenWeather key

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!city) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://corsproxy.io/?https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null);
    }
    setLoading(false);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌤️ Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />}

      {weather && (
        <View style={styles.weatherContainer}>
          <Text style={styles.city}>{weather.name}</Text>
          <Image
            source={{
              uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`,
            }}
            style={styles.icon}
          />
          <Text style={styles.temp}>{weather.main.temp}°C</Text>
          <Text style={styles.description}>{weather.weather[0].description}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#3b82f6',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  weatherContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  temp: {
    fontSize: 50,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  description: {
    fontSize: 20,
    textTransform: 'capitalize',
  },
  icon: {
    width: 100,
    height: 100,
  },
});
