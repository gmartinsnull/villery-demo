import { Image, View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState } from "react";
import icons from "../constants/icons";

const FormField = ({
  title,
  value,
  placeholder,
  handleTextChange,
  otherStyles,
  ...props
}) => {
  const [showPassowrd, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="font-pmedium text-base text-gray-100">{title}</Text>
      <View className="flex h-16 w-full flex-row items-center rounded-2xl border-2 border-black-200 bg-black-100 px-4 focus:border-secondary">
        <TextInput
          className="flex-1 font-psemibold text-base text-white"
          value={value}
          placeholder={placeholder}
          onChangeText={handleTextChange}
          placeholderTextColor="#7B7B8B"
          secureTextEntry={title === "Password" && !showPassowrd}
          {...props}
        />
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassowrd)}>
            <Image
              source={!showPassowrd ? icons.eye : icons.eyeHide}
              className="h-6 w-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
