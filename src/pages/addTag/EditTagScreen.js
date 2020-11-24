import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { Tag } from "../../Tag";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../store/UiStore";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { useMessage } from "../../hooks/message.hook";
import { NavbarTop } from "../../components/NavbarTop";

export const EditTagScreen = observer(({ handleBack }) => {
  const [tag, onTag] = useState("");
  const [color, onColor] = useState(0);
  const [initialTag, setInitialTag] = useState({});
  const UiStore = useContext(UiStoreContext);
  const NotesStore = useContext(NotesStoreContext);
  const message = useMessage();

  useEffect(() => {
    const initialTagResults = NotesStore.tags.find(
      (t) => t.tag_id === UiStore.currentTag
    );
    setInitialTag(initialTagResults);
    onTag(initialTagResults.tag_name);
    onColor(initialTagResults.hue);
  }, []);

  const refreshColor = () => {
    const newColor = Math.floor(Math.random() * 361);
    onColor(newColor);
  };

  const handleSubmit = () => {
    let findResults = NotesStore.tags.find((t) => t.tag_name === tag.trim());
    if (findResults?.tag_id === UiStore.currentTag) {
      findResults = false;
    }
    try {
      if (tag.trim() === initialTag.tag_name && color === initialTag.hue) {
        throw new Error("You haven't changed the tag");
      }
      if (findResults) {
        throw new Error("This tag name already exists");
      }
      NotesStore.updateTag(UiStore.currentTag, tag.trim(), color);
      onTag("");
      refreshColor();
      handleBack();
    } catch (error) {
      message(error.message);
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
            title="Editing tag"
            titleLeft="Cancel"
            titleRight="Save"
            noMargin
          ></NavbarTop>
        </Container>
        <Container border mt={16}></Container>

        <Container center mt={44}>
          <Container center>
            <Tag hue={color} title={tag}></Tag>
          </Container>
          <TextInput
            style={styles.input}
            onChangeText={(text) => onTag(text)}
            value={tag}
            autoFocus
            onSubmitEditing={handleSubmit}
          />
          <TouchableOpacity onPress={refreshColor}>
            <Image
              style={{ ...styles.icon, ...styles.mt }}
              source={require("../../assets/refresh.png")}
            ></Image>
          </TouchableOpacity>
        </Container>
      </>
    </View>
  );
});

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
