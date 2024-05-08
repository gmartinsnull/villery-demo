import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { useGlobalContext } from "../../context/GlobalProvider";
import {
  bookmarkVideo,
  getSavedVideos,
  getUserPosts,
} from "../../lib/appwrite";
import useAppWrite from "../../lib/useAppWrite";
import { useState } from "react";

const Bookmark = () => {
  const { user } = useGlobalContext();
  const { data: posts, refetch } = useAppWrite(() => getSavedVideos(user.$id));
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  const unsaveVideo = async (videoId: string) => {
    try {
      await bookmarkVideo(videoId, true);

      onRefresh();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView className="h-full border-2 bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            video={item}
            handleBookbark={() => unsaveVideo(item.$id)}
          />
        )}
        ListHeaderComponent={() => (
          <View className="my-6 space-y-6 px-4">
            <View className="mb-6 flex-row items-start justify-between">
              <View>
                <Text className="font-pmedium text-2xl text-white">
                  Saved Videos
                </Text>
              </View>
            </View>
            <SearchInput initialQuery={undefined} />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Save your favorite videos on home screen"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
