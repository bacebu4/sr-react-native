import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  GestureResponderEvent,
} from "react-native";
import { Container } from "../../components/grid/Container";
import { useMessage } from "../../hooks/message.hook";
import { NavbarTop } from "../../components/NavbarTop";
import { Tag } from "../../components/Tag";
import {
  Tag as TagType,
  useAddNewTagMutation,
  useTagsQuery,
} from "../../generated/graphql";
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
  const [tagName, onTagName] = useState("");
  const [hue, onHue] = useState(0);
  const [initialTag, setInitialTag] = useState<TagType | null>(null);
  const message = useMessage();
  const [result] = useTagsQuery();
  const { data, fetching, error } = result;
  const [, addNewTag] = useAddNewTagMutation();

  useEffect(() => {
    if (editMode) {
      // const initialTagResults = NotesStore.tags.find(
      //   (t) => t.tag_id === UiStore.currentTag
      // );
      // setInitialTag(initialTagResults);
      // onTagName(initialTagResults.tag_name);
      // onColor(initialTagResults.hue);
    } else {
      onTagName("");
      refreshHue();
    }
  }, []);

  const refreshHue = () => {
    const newColor = Math.floor(Math.random() * 361);
    onHue(newColor);
  };

  const handleSubmit = () => {
    if (editMode) {
      // let findResults = NotesStore.tags.find(
      //   (t) => t.tag_name === tagName.trim()
      // );
      // if (findResults?.tag_id === UiStore.currentTag) {
      //   findResults = false;
      // }
      // try {
      //   if (
      //     tagName.trim() === initialTag.tag_name &&
      //     color === initialTag.hue
      //   ) {
      //     throw new Error("You haven't changed the tag");
      //   }
      //   if (findResults) {
      //     throw new Error("This tag name already exists");
      //   }
      //   // NotesStore.updateTag(UiStore.currentTag, tagName.trim(), color);
      //   onTagName("");
      //   refreshColor();
      //   handleBack();
      // } catch (error) {
      //   message(error.message);
      // }
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

  return (
    <View
      style={{
        backgroundColor: "white",
        height: 650,
      }}
    >
      <>
        <Container>
          <NavbarTop
            handleClick={handleBack}
            handleNext={handleSubmit}
            title={editMode ? "Editing tag" : "Creating tag"}
            titleLeft="Cancel"
            titleRight="Save"
            hasNoMargin
          ></NavbarTop>
        </Container>
        <Container hasBorder mt={16}></Container>

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
            ></Image>
          </TouchableOpacity>
        </Container>
      </>
    </View>
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
