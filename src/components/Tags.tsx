import React, { useContext, useRef, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { Container } from "./grid/Container";
import { useNavigation } from "@react-navigation/native";
import { useDeleteTagMutation, useTagsQuery } from "../generated/graphql";
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
import { useTranslation } from "react-i18next";

interface Props {
  type?: "latest";
}

export const Tags: React.FC<Props> = observer(({ type }) => {
  const actionTagRef = useRef(null);
  const [result] = useTagsQuery({ variables: { type } });
  const { data, fetching, error } = result;
  const { t } = useTranslation();
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
      t("Delete the tag globally?"),
      t("Are you sure you want to delete the tag?")
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
  if (!data?.tags?.length) {
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
          {data?.tags?.map((item) => (
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
        <FlatList
          data={data?.tags}
          columnWrapperStyle={{
            flexDirection: "row",
            flexWrap: "wrap",
          }}
          numColumns={10}
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
      )}

      <ActionSheet
        ref={actionTagRef}
        title={t("Choose the action")}
        options={[t("Delete"), t("Edit"), t("Cancel")]}
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
