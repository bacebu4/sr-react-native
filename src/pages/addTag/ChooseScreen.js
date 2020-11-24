import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, View, Image, Text } from "react-native";
import { Tag } from "../../Tag";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../store/UiStore";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { TagContainer } from "../../components/grid/TagContainer";
import { NavbarTop } from "../../components/NavbarTop";
import { TagConstructor } from "./TagConstructor";
import { TextGray } from "../../components/TextGray";

export const ChooseScreen = observer(({ handleCancel }) => {
  const UiStore = useContext(UiStoreContext);
  const NotesStore = useContext(NotesStoreContext);
  const [showAddSheet, setShowAddSheet] = useState(true);

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
                  <TextGray mt={16}>No tags created yet</TextGray>
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
  image: {
    width: 153,
    height: 120,
  },
});
