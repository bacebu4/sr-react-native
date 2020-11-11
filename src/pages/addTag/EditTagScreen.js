import React, { useState, useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
  Alert,
} from "react-native";
import { Tag } from "../../Tag";
import { Title } from "../../Title";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../store/UiStore";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";

export const EditTagScreen = observer(() => {
  const [tag, onTag] = useState("");
  const [color, onColor] = useState(0);
  const [initialTag, setInitialTag] = useState({});
  const UiStore = useContext(UiStoreContext);
  const NotesStore = useContext(NotesStoreContext);

  useEffect(() => {
    if (UiStore.showEditTagSheet) {
      const initialTagResults = NotesStore.tags.find(
        (t) => t.tag_id === UiStore.currentTag
      );
      setInitialTag(initialTagResults);
      onTag(initialTagResults.tag_name);
      onColor(initialTagResults.hue);
    }
  }, [UiStore.showEditTagSheet]);

  const handleBack = () => {
    UiStore.setShowEditSheet(false);
  };

  const refreshColor = () => {
    const newColor = Math.floor(Math.random() * 361);
    onColor(newColor);
  };

  const handleSubmit = () => {
    let findResults = NotesStore.tags.find((t) => t.tag_name === tag.trim());
    if (findResults.tag_id === UiStore.currentTag) {
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
      UiStore.setShowEditSheet(false);
    } catch (error) {
      Alert.alert("Error occurred", error.message);
    }
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: 650,
      }}
    >
      <View style={styles.center}>
        <View style={styles.topBar}></View>
      </View>
      {UiStore.showEditTagSheet ? (
        <>
          <>
            <Container mt={16} row border pb={16}>
              <TouchableOpacity onPress={handleBack}>
                <Text style={styles.link}>Cancel</Text>
              </TouchableOpacity>

              <Title type="small" title={"Editing tag"}></Title>

              <TouchableOpacity onPress={handleSubmit}>
                <Text style={styles.link}>Save</Text>
              </TouchableOpacity>
            </Container>

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
        </>
      ) : (
        <>
          <View></View>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  button: {
    marginTop: 74,
    width: 180,
  },
  topBar: {
    marginTop: 24,
    width: 32,
    height: 5,
    backgroundColor: "#dbdbdb",
    borderRadius: 100,
  },
  icon: {
    width: 24,
    height: 24,
  },
  mt: {
    marginTop: 32,
  },
  center: {
    alignItems: "center",
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
  link: {
    color: "#CCA9F9",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 4,
  },
  image: {
    width: 153,
    height: 120,
  },
  text: {
    color: "#B0AFAF",
    marginTop: 16,
  },
});