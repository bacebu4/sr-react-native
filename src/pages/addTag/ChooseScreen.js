import React from "react";
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
import { TagContainer } from "../../components/grid/TagContainer";

export const ChooseScreen = observer(() => {
  const [tag, onTag] = React.useState("");
  const [color, onColor] = React.useState(0);
  const [showAddSheet, setShowAddSheet] = React.useState(false);
  const UiStore = React.useContext(UiStoreContext);
  const NotesStore = React.useContext(NotesStoreContext);

  React.useEffect(() => {
    refreshColor();
  }, []);

  React.useEffect(() => {
    setShowAddSheet(UiStore.showAddSheet);
  }, [UiStore.showAddSheet]);

  const handleAdd = () => {
    UiStore.setShowAddSheet(true);
    setTimeout(() => {
      UiStore.addRef.current.snapTo(0);
    }, 50);
  };

  const handleBack = () => {
    UiStore.setShowAddSheet(false);
    UiStore.addRef.current.snapTo(1);
  };

  const refreshColor = () => {
    const newColor = Math.floor(Math.random() * 361);
    onColor(newColor);
  };

  const handleSubmit = () => {
    const findResults = NotesStore.tags.find((t) => t.tag_name === tag.trim());
    try {
      if (findResults) {
        throw new Error("This tag name already exists");
      }
      NotesStore.addNewTag(UiStore.currentNote, tag.trim(), color);
      onTag("");
      refreshColor();
      UiStore.addRef.current.snapTo(2);
    } catch (error) {
      Alert.alert("Error occurred", error.message);
    }
  };

  const handleSubmitFromExisting = (id) => {
    NotesStore.addExistingTag(UiStore.currentNote, id);
    UiStore.addRef.current.snapTo(2);
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
      {UiStore.showChooseSheet ? (
        <>
          {!showAddSheet ? (
            <>
              <Container mt={16} row border pb={16}>
                <View></View>
                <Title type="small" title={"Choose from existing"}></Title>
                <TouchableOpacity onPress={handleAdd}>
                  <Image
                    style={styles.icon}
                    source={require("../../assets/smallPlus.png")}
                  ></Image>
                </TouchableOpacity>
              </Container>

              {NotesStore.tags.length ? (
                <>
                  <Container>
                    <TagContainer>
                      {NotesStore.tags.map((tag) => {
                        const findResults = NotesStore?.highlights[
                          UiStore?.currentNote
                        ]?.tags.find((t) => t.tag_id === tag.tag_id);

                        if (!findResults) {
                          return (
                            <Tag
                              title={tag.tag_name}
                              hue={tag.hue}
                              key={tag.tag_id}
                              style={{ marginRight: 16, marginTop: 24 }}
                              clickAction={() =>
                                handleSubmitFromExisting(tag.tag_id)
                              }
                            ></Tag>
                          );
                        }

                        return <View key={tag.tag_id}></View>;
                      })}
                    </TagContainer>
                  </Container>
                </>
              ) : (
                // empty state
                <>
                  <Container center mt={44}>
                    <Image
                      style={styles.image}
                      source={require("../../assets/empty_tags.png")}
                    ></Image>
                    <Text style={styles.text}>No tags created yet</Text>
                  </Container>
                </>
              )}
            </>
          ) : (
            // adding new tag
            <>
              <Container mt={16} row border pb={16}>
                <TouchableOpacity onPress={handleBack}>
                  <Image
                    style={styles.icon}
                    source={require("../../assets/left.png")}
                  ></Image>
                </TouchableOpacity>
                <Title type="small" title={"New tag"}></Title>
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
                />
                <TouchableOpacity onPress={refreshColor}>
                  <Image
                    style={{ ...styles.icon, ...styles.mt }}
                    source={require("../../assets/refresh.png")}
                  ></Image>
                </TouchableOpacity>
              </Container>
            </>
          )}
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
