import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { Tag } from "../../Tag";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../store/UiStore";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { TagContainer } from "../../components/grid/TagContainer";
import { useMessage } from "../../hooks/message.hook";
import { NavbarTop } from "../../components/NavbarTop";
import { TagConstructor } from "./TagConstructor";

export const ChooseScreen = observer(({ handleCancel }) => {
  const [tag, onTag] = useState("");
  const [color, onColor] = useState(0);
  const UiStore = useContext(UiStoreContext);
  const NotesStore = useContext(NotesStoreContext);
  const [showAddSheet, setShowAddSheet] = useState(true);
  const message = useMessage();

  useEffect(() => {
    refreshColor();
  }, []);

  const handleShowCreate = () => {
    setShowAddSheet(false);
  };

  const handleBack = () => {
    setShowAddSheet(true);
  };

  const refreshColor = () => {
    const newColor = Math.floor(Math.random() * 361);
    onColor(newColor);
  };

  const handleSubmitFromExisting = (id) => {
    NotesStore.addExistingTag(UiStore.currentNote, id);
    handleCancel();
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: 650,
      }}
    >
      <>
        {showAddSheet ? (
          <>
            <Container>
              <NavbarTop
                handleClick={handleCancel}
                handleNext={handleShowCreate}
                title="Choose from existing"
                titleLeft="Cancel"
                titleRight="Create"
                noMargin
              ></NavbarTop>
            </Container>
            <Container border mt={16}></Container>

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
          <TagConstructor
            handleBack={handleBack}
            handleClose={handleCancel}
          ></TagConstructor>
        )}
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
  image: {
    width: 153,
    height: 120,
  },
  text: {
    color: "#B0AFAF",
    marginTop: 16,
  },
});
