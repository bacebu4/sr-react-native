import React, { useContext, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Container } from "./grid/Container";
import { useNavigation } from "@react-navigation/native";
import {
  useLatestTagsQuery,
  useDeleteTagMutation,
  useTagsQuery,
  LatestTagsQuery,
  TagsQuery,
  Maybe,
  Tag as TagType,
} from "../generated/graphql";
import { TagContainer } from "./grid/TagContainer";
import { Tag } from "./Tag";
import * as Haptics from "expo-haptics";
import ActionSheet from "react-native-actionsheet";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../utils/UiStore";
import { TagModal } from "./TagModal";
import { TagConstructor } from "../pages/addTag/TagConstructor";
import { useConfirm } from "../hooks/confirm.hook";
import { FlatList } from "react-native-gesture-handler";

interface Props {
  type?: "latest";
}

export const Tags: React.FC<Props> = observer(({ type }) => {
  const actionTagRef = useRef(null);
  const [result] = type === "latest" ? useLatestTagsQuery() : useTagsQuery();
  let { data, fetching, error } = result;

  let finalData:
    | Maybe<
        {
          __typename?: "Tag" | undefined;
        } & Pick<TagType, "id" | "name" | "hue">
      >[]
    | null
    | undefined;

  if (type === "latest") {
    let tempData = data as LatestTagsQuery;
    finalData = tempData?.latestTags;
  } else {
    let tempData = data as TagsQuery;
    finalData = tempData?.tags;
  }

  const navigation = useNavigation();
  const [tagId, setTagId] = useState<string | null>(null);
  const UiStore = useContext(UiStoreContext);
  const [modalEditTagVisible, setModalEditTagVisible] = useState(false);
  const confirm = useConfirm();
  const [, deleteTag] = useDeleteTagMutation();

  const handleLongAddPress = (tagIdPayload: string) => {
    setTagId(tagIdPayload);
    Haptics.selectionAsync();
    // @ts-ignore
    actionTagRef.current.show();
  };

  const handleEditTag = () => {
    UiStore.setCurrentTagId(tagId!);
    setModalEditTagVisible(true);
  };

  const handleDeleteTag = () => {
    confirm(
      () => {
        if (tagId) {
          deleteTag({ tagId });
        }
      },
      "Delete the tag globally?",
      "Are you sure you want to delete the tag?"
    );
  };

  if (error) {
    return (
      <Container isCentered mt={400}>
        <Text>{error.message}</Text>
      </Container>
    );
  }

  if (fetching) {
    return (
      <Container isCentered mt={400}>
        <ActivityIndicator size="large" />
      </Container>
    );
  }

  // state when no tags at all, user should not be here
  if (!finalData?.length) {
    return <View />;
  }

  return (
    <>
      <TagModal
        modalState={modalEditTagVisible}
        setModalState={setModalEditTagVisible}
      >
        <TagConstructor
          handleBack={() => setModalEditTagVisible(false)}
          editMode
        />
      </TagModal>

      {type === "latest" ? (
        <TagContainer>
          {finalData?.map((item) => (
            <Tag
              hue={item?.hue}
              key={item?.id}
              title={item?.name}
              style={{ marginRight: 16, marginTop: 16 }}
              onLongPress={() => handleLongAddPress(item!.id)}
              onPress={() =>
                navigation.navigate("By", {
                  id: item?.id,
                  name: item?.name,
                  type: "Tag",
                })
              }
            />
          ))}
        </TagContainer>
      ) : (
        <TagContainer>
          <FlatList
            data={finalData}
            keyExtractor={(item) => item!.id}
            renderItem={({ item }) => (
              <Tag
                hue={item?.hue}
                key={item?.id}
                title={item?.name}
                style={{ marginRight: 16, marginTop: 16 }}
                onLongPress={() => handleLongAddPress(item!.id)}
                onPress={() =>
                  navigation.navigate("By", {
                    id: item?.id,
                    name: item?.name,
                    type: "Tag",
                  })
                }
              />
            )}
          />
        </TagContainer>
      )}

      <ActionSheet
        ref={actionTagRef}
        title="What you want to add?"
        options={["Delete", "Edit", "Cancel"]}
        cancelButtonIndex={2}
        onPress={(index) => {
          if (index === 0) {
            handleDeleteTag();
          } else if (index === 1) {
            handleEditTag();
          }
        }}
        destructiveButtonIndex={0}
      />
    </>
  );
});
