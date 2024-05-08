import { View, Text } from "react-native";
import React from "react";

const BoxInfo = ({ value, text, containerStyles, valueStyles }) => {
  return (
    <View className={`${containerStyles}`}>
      <Text className={`font-psemibold text-white text-center ${valueStyles}`}>{value}</Text>
      <Text className="font-pregular text-sm text-gray-100 text-center">{text}</Text>
    </View>
  );
};

export default BoxInfo;
