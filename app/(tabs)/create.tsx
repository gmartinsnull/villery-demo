import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "../../components/FormField";
import { ResizeMode, Video } from "expo-av";
import icons from "../../constants/icons";
import CustomButton from "../../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createVideo } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === "image"
        ? ImagePicker.MediaTypeOptions.Images
        : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({ ...form, thumbnail: result.assets[0] });
      }
      if (selectType === "video") {
        setForm({ ...form, video: result.assets[0] });
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document picked", JSON.stringify(result, null, 2));
      }, 100);
    }
  };

  const submit = async () => {
    if (!form.prompt || !form.video || !form.thumbnail || !form.title) {
      return Alert.alert("Please fill out all fields");
    }
    setUploading(true);

    try {
      await createVideo({
        ...form,
        userId: user.$id,
      });

      Alert.alert("Success", "Post uploaded successfully");
      router.push("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });
      setUploading(false);
    }
  };

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView className="my-6 px-4">
        <View>
          <Text className="font-psemibold text-2xl text-white">
            Upload Video
          </Text>
        </View>
        <FormField
          title="Video title"
          value={form.title}
          placeholder={"Give your video a catchy title..."}
          handleTextChange={(e) => setForm({ ...form, title: e })}
          otherStyles="mt-10"
        />

        <View className="mt-7 space-y-2">
          <Text className="font-pmedium text-base text-gray-100">
            Upload Video
          </Text>
          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="h-64 w-full rounded-2xl"
                resizeMode={ResizeMode.COVER}
                useNativeControls
                isLooping
              />
            ) : (
              <View className="h-40 w-full items-center justify-center rounded-2xl bg-black-100">
                <View className="h-14 w-14 items-center justify-center border border-dashed border-secondary-100">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="h-1/2 w-1/2"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="font-pmedium text-base text-gray-100">
            Thumbnail Image
          </Text>
          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                className="h-64 w-full rounded-2xl"
                resizeMode="cover"
              />
            ) : (
              <View className="h-16 w-full flex-row items-center justify-center space-x-2 rounded-2xl border-2 border-black-200 bg-black-100">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="h-5 w-5"
                />
                <Text className="font-pmedium text-sm text-gray-100">
                  Choose a file
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="AI prompt"
          value={form.prompt}
          placeholder="The promtp you use to create this video"
          handleTextChange={(e) => setForm({ ...form, prompt: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-7"
          isLoading={uploading}
          textStyles={undefined}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
