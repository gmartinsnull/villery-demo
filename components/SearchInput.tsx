import { Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import icons from "../constants/icons";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleTextChange,
  otherStyles,
  ...props
}) => {
  const [showPassowrd, setShowPassword] = useState(false);
  return (
    <View className="flex h-16 w-full flex-row items-center space-x-4 rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
      <TextInput
        className="mt-0.5 flex-1 font-pregular text-base text-white"
        value={value}
        placeholder="Search for a video topic"
        onChangeText={handleTextChange}
        placeholderTextColor="#7B7B8B"
        secureTextEntry={title === "Password" && !showPassowrd}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="h-5 w-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
