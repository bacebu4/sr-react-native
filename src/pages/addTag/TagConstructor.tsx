import React, { useState, useEffect, useContext } from "react";
import {
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import { Container } from "../../components/grid/Container";
import { useMessage } from "../../hooks/message.hook";
import { NavbarTop } from "../../components/NavbarTop";
import { Tag } from "../../components/Tag";
import { UiStoreContext } from "../../utils/UiStore";
import {
  Tag as TagType,
  useAddNewTagMutation,
  useUpdateTagMutation,
  useTagsQuery,
} from "../../generated/graphql";
import { MainContainer } from "../../components/grid/MainContainer";
import { ColorPicker } from "../../components/ColorPicker";
import { StrippedInput } from "../../components/StrippedInput";
import { BaseImage } from "../../components/BaseImage";
import { BaseText } from "../../components/BaseText";
import { uuidExpo } from "../../utils/uuidExpo";

interface Props {
  handleBack: ((event: GestureResponderEvent) => void) | undefined;
  editMode?: boolean;
  handleClose?: ((event: GestureResponderEvent) => void) | undefined;
  noteId?: string;
}

export const TagConstructor: React.FC<Props> = ({
  handleBack,
  editMode = false,
  handleClose,
  noteId,
}) => {
  const UiStore = useContext(UiStoreContext);
  const [tagName, onTagName] = useState("");
  const [hue, onHue] = useState(0);
  const [initialTag, setInitialTag] = useState<TagType | null>(null);
  const message = useMessage();
  const [result] = useTagsQuery();
  const { data, fetching, error } = result;
  const [, addNewTag] = useAddNewTagMutation();
  const [, updateTag] = useUpdateTagMutation();

  useEffect(() => {
    if (editMode) {
      const initialTagResults = data?.tags?.find(
        (t) => t?.id === UiStore.currentTagId
      );
      if (initialTagResults) {
        setInitialTag(initialTagResults);
        onTagName(initialTagResults.name);
        onHue(initialTagResults.hue);
      }
    } else {
      onTagName("");
      refreshHue();
    }
  }, [fetching]);

  const refreshHue = () => {
    const newColor = Math.floor(Math.random() * 361);
    onHue(newColor);
  };

  const handleSubmit = () => {
    if (editMode) {
      let findResults = data?.tags?.find((t) => t?.name === tagName.trim());
      if (findResults?.id === UiStore.currentTagId) {
        findResults = undefined;
      }
      try {
        if (tagName.trim() === initialTag?.name && hue === initialTag.hue) {
          throw new Error("You haven't changed the tag");
        }
        if (findResults) {
          throw new Error("This tag name already exists");
        }
        updateTag({ tagId: UiStore.currentTagId!, name: tagName, hue });
        onTagName("");
        refreshHue();
        // @ts-ignore
        handleBack();
      } catch (error) {
        message(error.message);
      }
    } else {
      const findResults = data?.tags?.find((t) => t?.name === tagName.trim());
      try {
        if (findResults) {
          throw new Error("This tag name already exists");
        }
        if (noteId) {
          const tagId = uuidExpo();
          addNewTag({ noteId, tagId, name: tagName, hue });
          onTagName("");
          refreshHue();
          // @ts-ignore
          handleClose();
        }
      } catch (error) {
        message(error.message);
      }
    }
  };

  const Header = (
    <>
      <NavbarTop
        handleClick={handleBack}
        handleNext={handleSubmit}
        title={editMode ? "Editing tag" : "Creating tag"}
        titleLeft="Cancel"
        titleRight="Save"
        hasNoMargin
      />
      <Container hasBorder mt={16} />
    </>
  );

  if (error) {
    return (
      <MainContainer>
        {Header}
        <Container isCentered mt={400}>
          <BaseText color="gray" fz={14}>
            {error.message}
          </BaseText>
        </Container>
      </MainContainer>
    );
  }

  if (fetching) {
    return (
      <MainContainer>
        {Header}
        <Container isCentered mt={400}>
          <ActivityIndicator size="large" />
        </Container>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      {Header}

      <Container isCentered mt={44}>
        <Container isCentered>
          <Tag hue={hue} title={tagName} />
        </Container>

        <StrippedInput
          mt={16}
          onChangeText={(text) => onTagName(text)}
          value={tagName}
          autoFocus
          onSubmitEditing={handleSubmit}
        />

        <TouchableOpacity onPress={refreshHue}>
          <BaseImage
            onPress={refreshHue}
            w={24}
            h={24}
            mt={32}
            source={require("../../assets/refresh.png")}
          />
        </TouchableOpacity>
      </Container>

      <Container mt={32} isCentered>
        <ColorPicker onHue={onHue} selectedHue={hue} />
      </Container>
    </MainContainer>
  );
};
