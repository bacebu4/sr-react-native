import React, { useContext, useRef, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { Container } from "./grid/Container";
import { useNavigation } from "@react-navigation/native";
import { Title } from "./Title";
import { useTranslation } from "react-i18next";
import { useLatestTagsQuery, useDeleteTagMutation } from "../generated/graphql";
import { TagContainer } from "./grid/TagContainer";
import { Tag } from "./Tag";
import * as Haptics from "expo-haptics";
import ActionSheet from "react-native-actionsheet";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../store/UiStore";
import { TagModal } from "./TagModal";
// @ts-ignore
import { TagConstructor } from "../pages/addTag/TagConstructor";
import { useConfirm } from "../hooks/confirm.hook";
import { SeeAll } from "./SeeAll";

export const LatestTags: React.FC = observer(() => {
  const actionTagRef = useRef(null);
  const [result] = useLatestTagsQuery();
  const { data, fetching, error } = result;
  const navigation = useNavigation();
  const { t } = useTranslation();
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

  return (
    <>
      <TagModal
        modalState={modalEditTagVisible}
        setModalState={setModalEditTagVisible}
      >
        <TagConstructor
          handleBack={() => setModalEditTagVisible(false)}
          editMode
        ></TagConstructor>
      </TagModal>

      <Container mt={44}>
        <Title title={t("View by tags")}></Title>

        <TagContainer>
          {data?.latestTags?.map((tag) => (
            <Tag
              hue={tag?.hue}
              key={tag?.id}
              title={tag?.name}
              style={{ marginRight: 16, marginTop: 16 }}
              onLongPress={() => handleLongAddPress(tag!.id)}
              onPress={() =>
                navigation.navigate("By", {
                  id: tag?.id,
                  name: tag?.name,
                  type: "Tag",
                })
              }
            />
          ))}
        </TagContainer>
      </Container>
      <Container mt={16} hasBorder />
      <Container mt={16} mb={96}>
        <SeeAll onPress={() => navigation.navigate("AllTags")} />
      </Container>

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
