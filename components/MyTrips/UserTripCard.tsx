import { View, Text, Image } from "react-native";
import React, { useMemo, useState, useEffect } from "react";
import moment from "moment";
import CustomButton from "../CustomButton";
import { useRouter } from "expo-router";

const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?q=80&w=2071&auto=format&fit=crop";

const UserTripCard = ({ trip }: { trip: any }) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState(DEFAULT_IMAGE_URL);

  const { 
    location, 
    startDate, 
    endDate, 
    placeName, 
    groupSize 
  } = useMemo(() => {
    const tripData = JSON.parse(trip?.tripData || '[]');
    return {
      location: trip?.tripPlan?.trip_plan?.location,
      startDate: tripData?.find((item: any) => item.dates)?.dates?.startDate,
      endDate: tripData?.find((item: any) => item.dates)?.dates?.endDate,
      placeName: trip?.tripPlan?.trip_plan?.location,
      groupSize: trip?.tripPlan?.trip_plan?.group_size?.split(" ")[0]
    };
  }, [trip]);

  useEffect(() => {
    const fetchPlaceImage = async () => {
      try {
        const apiKey = process.env.EXPO_PUBLIC_UNSPLASH_ACCESS_KEY;
        
        if (!apiKey) return;

        const response = await fetch(
          `https://api.unsplash.com/search/photos?query=${encodeURIComponent(placeName)}&client_id=${apiKey}&per_page=1`
        );

        if (!response.ok) return;

        const data = await response.json();
        const fetchedImageUrl = data?.results?.[0]?.urls?.small;
        
        if (fetchedImageUrl) {
          setImageUrl(fetchedImageUrl);
        }
      } catch (error) {
        console.error("Image fetch error:", error);
      }
    };

    fetchPlaceImage();
  }, [placeName]);

  const isPastTrip = moment().isAfter(moment(endDate));

  return (
    <View className="mt-5 flex flex-row gap-3 items-center">
      <View className="w-32 h-32">
        <Image
          source={{ uri: imageUrl }}
          className={`w-full h-full rounded-2xl ${isPastTrip ? "grayscale" : ""}`}
        />
      </View>
      <View className="flex-1">
        <Text
          className={`font-outfit-medium text-lg ${isPastTrip ? "text-gray-500" : ""}`}
          numberOfLines={2}
        >
          {location}
        </Text>
        <Text className="font-outfit text-md text-gray-500 mt-1">
          {moment(startDate).format("DD MMM yyyy")}
        </Text>
        <Text className="font-outfit-medium text-md text-gray-500 mt-1">
          {groupSize}
        </Text>
      </View>
      <View className="flex-1">
        <CustomButton
          title="View Trip"
          onPress={() =>
            router.push({
              pathname: "/trip-details",
              params: {
                tripData: trip.tripData,
                tripPlan: JSON.stringify(trip.tripPlan),
              },
            })
          }
          disabled={isPastTrip}
          className={`mt-2 py-0.5 ${isPastTrip ? "opacity-50" : ""}`}
        />
      </View>
    </View>
  );
};

export default UserTripCard;