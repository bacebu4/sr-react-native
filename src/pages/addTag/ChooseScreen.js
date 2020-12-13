import React, { useState, useContext } from "react";
import { StyleSheet, View, Image } from "react-native";
import { Tag } from "../../Tag";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../../store/NotesStore";
import { Container } from "../../components/grid/Container";
import { TagContainer } from "../../components/grid/TagContainer";
import { NavbarTop } from "../../components/NavbarTop";
import { TagConstructor } from "./TagConstructor";
import { TextGray } from "../../components/TextGray";

export const ChooseScreen = observer(({ handleCancel, note }) => {
  const NotesStore = useContext(NotesStoreContext);
  const [showAddSheet, setShowAddSheet] = useState(true);

  const handleShowCreate = () => {
    setShowAddSheet(false);
  };

  const handleBack = () => {
    setShowAddSheet(true);
  };

  const handleSubmitFromExisting = (id) => {
    NotesStore.addExistingTag(note.note_id, id);
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
                hasNoMargin
              ></NavbarTop>
            </Container>
            <Container hasBorder mt={16}></Container>

            {NotesStore.tags.length ? (
              <>
                <Container>
                  <TagContainer>
                    {/* TODO getter for note tags */}
                    {NotesStore.tags.map((tag) => {
                      const findResults = note.tags.find(
                        (t) => t.tag_id === tag.tag_id
                      );

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
                    })}
                  </TagContainer>
                </Container>
              </>
            ) : (
              // empty state
              <>
                <Container isCentered mt={44}>
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
