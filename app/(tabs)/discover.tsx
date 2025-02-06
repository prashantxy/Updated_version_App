import { View, Text, ScrollView, Linking } from "react-native";
import React from "react";
import CustomButton from "@/components/CustomButton";

// Random places data with coordinates 
const RANDOM_PLACES = [
  { name: "Eiffel Tower, Paris", latitude: 48.8584, longitude: 2.2945 },
  { name: "Statue of Liberty, NYC", latitude: 40.6892, longitude: -74.0445 },
  { name: "Sydney Opera House", latitude: -33.8568, longitude: 151.2153 },
  { name: "Machu Picchu, Peru", latitude: -13.1631, longitude: -72.5450 },
  { name: "Taj Mahal, India", latitude: 27.1751, longitude: 78.0421 },
  { name: "Great Wall of China", latitude: 40.4319, longitude: 116.5704 },
  { name: "Grand Canyon, USA", latitude: 36.1069, longitude: -112.1129 },
  { name: "Colosseum, Rome", latitude: 41.8902, longitude: 12.4922 },
  { name: "Christ the Redeemer, Brazil", latitude: -22.9519, longitude: -43.2105 },
  { name: "Pyramids of Giza, Egypt", latitude: 29.9792, longitude: 31.1342 },
];

const Discover = () => {
  // Function to open Google Maps with the place's coordinates 
  const handleOpenMap = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <ScrollView
      className="flex-1 bg-white"
      contentContainerStyle={{
        padding: 24,
        paddingTop: 80,
        paddingBottom: 20,
      }}
    >
      <Text className="text-3xl font-outfit-bold mb-6">Random Places</Text>

      {/* Render cards for each place */}
      {RANDOM_PLACES.map((place, index) => (
        <View
          key={index}
          className="bg-gray-50 p-4 rounded-xl mb-4 border border-gray-100"
        >
          <Text className="font-outfit-bold text-lg mb-2">{place.name}</Text>
          <CustomButton
            title="View on Map"
            onPress={() => handleOpenMap(place.latitude, place.longitude)}
            className="mt-2"
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Discover;