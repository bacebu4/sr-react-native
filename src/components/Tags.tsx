import { useNavigation } from "@react-navigation/native";
import * as Haptics from "expo-haptics";
import { observer } from "mobx-react-lite";
import React, { useContext, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, FlatList, VirtualizedList } from "react-native";
import ActionSheet from "react-native-actionsheet";
import {
  Maybe,
  Tag as TagType,
  useDeleteTagMutation,
} from "../generated/graphql";
import { useConfirm } from "../hooks/confirm.hook";
import { TagConstructor } from "../pages/addTag/TagConstructor";
import { UiStoreContext } from "../utils/UiStore";
import { Container } from "./grid/Container";
import { Tag } from "./Tag";
import { TagModal } from "./TagModal";

interface Props {
  tags:
    | Maybe<
        Maybe<
          {
            __typename?: "Tag" | undefined;
          } & Pick<TagType, "id" | "name" | "hue">
        >[]
      >
    | undefined;
}

export const Tags: React.FC<Props> = observer(({ tags }) => {
  const actionTagRef = useRef(null);
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

  // state when no tags at all, user should not be here
  if (!tags?.length) {
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

      <Container hasNoMargin style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {tags.map((item) => {
          return (
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
          );
        })}
      </Container>

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
