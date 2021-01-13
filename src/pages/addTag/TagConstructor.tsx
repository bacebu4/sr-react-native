import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
  ActivityIndicator,
} from "react-native";
import { Container } from "../../components/grid/Container";
import { useMessage } from "../../hooks/message.hook";
import { NavbarTop } from "../../components/NavbarTop";
import { Tag } from "../../components/Tag";
import { UiStoreContext } from "../../store/UiStore";
import {
  Tag as TagType,
  useAddNewTagMutation,
  useUpdateTagMutation,
  useTagsQuery,
} from "../../generated/graphql";
import { TText } from "../../components/TText";
import { MainContainer } from "../../components/grid/MainContainer";
import { ColorPicker } from "../../components/ColorPicker";
const { v4: uuidv4 } = require("uuid");

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
        (t) => t?.id === UiStore.currentTag
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
      if (findResults?.id === UiStore.currentTag) {
        findResults = undefined;
      }
      try {
        if (tagName.trim() === initialTag?.name && hue === initialTag.hue) {
          throw new Error("You haven't changed the tag");
        }
        if (findResults) {
          throw new Error("This tag name already exists");
        }
        updateTag({ tagId: UiStore.currentTag!, name: tagName, hue });
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
          const tagId = uuidv4();
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
      <Container>
        <NavbarTop
          handleClick={handleBack}
          handleNext={handleSubmit}
          title={editMode ? "Editing tag" : "Creating tag"}
          titleLeft="Cancel"
          titleRight="Save"
          hasNoMargin
        />
      </Container>
      <Container hasBorder mt={16} />
    </>
  );

  if (error) {
    return (
      <MainContainer>
        {Header}
        <Container isCentered mt={400}>
          <TText>{error.message}</TText>
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
        <TextInput
          style={styles.input}
          onChangeText={(text) => onTagName(text)}
          value={tagName}
          autoFocus
          onSubmitEditing={handleSubmit}
        />
        <TouchableOpacity onPress={refreshHue}>
          <Image
            style={{ ...styles.icon, ...styles.mt }}
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

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  mt: {
    marginTop: 32,
  },
  input: {
    height: 40,
    borderRadius: 4,
    color: "#343434",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginTop: 16,
    borderBottomColor: "#dbdbdb",
    borderBottomWidth: 1,
    textAlign: "center",
    width: 150,
  },
});
