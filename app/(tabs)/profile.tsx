import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import { getUserPosts, signOut } from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import BoxInfo from "../../components/BoxInfo";
import icons from "../../constants/icons";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLoggedIn } = useGlobalContext();
  const { data: posts } = useAppWrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLoggedIn(false);
    router.replace("/sign-in");
  };

  return (
    <SafeAreaView className="h-full border-2 bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="justify-centerpx-4 mb-12 mt-6 w-full items-center px-4">
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={logout}
              className="mb-10 w-full items-end"
            >
              <Image
                source={icons.logout}
                className="h-6 w-6"
                resizeMode="contain"
              />
            </TouchableOpacity>
            <View className="h-16 w-16 items-center justify-center rounded-lg border border-secondary-100">
              <Image
                source={{ uri: user?.avatar }}
                className="h-[90%] w-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>
            <BoxInfo
              value={user?.name}
              containerStyles="mt-5"
              valueStyles="text-lg"
              text={undefined}
            />
            <View className="mt-5 flex-row">
              <BoxInfo
                value={posts.length || 0}
                text="Posts"
                containerStyles="mr-10"
                valueStyles="text-xl"
              />
              <BoxInfo
                value="1.2"
                text="Followers"
                containerStyles=""
                valueStyles="text-xl"
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
