import React, { useState } from "react";
import {
  View,
  Image,
  GestureResponderEvent,
  Text,
  ActivityIndicator,
} from "react-native";
import { Container } from "../../components/grid/Container";
import { TagContainer } from "../../components/grid/TagContainer";
import { NavbarTop } from "../../components/NavbarTop";
import { TagConstructor } from "./TagConstructor";
import { TextGray } from "../../components/TextGray";
import { Tag } from "../../components/Tag";
import { MainContainer } from "../../components/grid/MainContainer";
import {
  Note,
  useTagsQuery,
  Maybe,
  useAddExistingTagMutation,
} from "../../generated/graphql";

interface Props {
  handleCancel: (event: GestureResponderEvent) => void;
  note: Maybe<Note>;
}

export const ChooseScreen: React.FC<Props> = ({ handleCancel, note }) => {
  const [showAddSheet, setShowAddSheet] = useState(true);
  const [, addExistingTag] = useAddExistingTagMutation();
  const [result] = useTagsQuery();
  const { data, fetching, error } = result;

  const handleShowCreate = () => {
    setShowAddSheet(false);
  };

  const handleBack = () => {
    setShowAddSheet(true);
  };

  const handleSubmitFromExisting = (tagId: string) => {
    addExistingTag({ noteId: note!.id, tagId });
    // @ts-ignore
    handleCancel();
  };

  const Header: React.FC = () => {
    return (
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
              />
            </Container>
            <Container hasBorder mt={16} />
          </>
        ) : (
          <View />
        )}
      </>
    );
  };

  if (error) {
    return (
      <MainContainer>
        <Header />
        <Container isCentered mt={400}>
          <Text>{error.message}</Text>
        </Container>
      </MainContainer>
    );
  }

  if (fetching) {
    return (
      <MainContainer>
        <Header />
        <Container isCentered mt={400}>
          <ActivityIndicator size="large" />
        </Container>
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Header />
      {showAddSheet ? (
        <>
          {data?.tags?.length ? (
            <>
              <Container>
                <TagContainer>
                  {/* TODO getter for note tags */}
                  {/* @ts-ignore */}
                  {data!.tags.map((tag) => {
                    const findResults = note?.tags?.find(
                      (t) => t?.id === tag?.id
                    );

                    if (!findResults) {
                      return (
                        <Tag
                          title={tag?.name}
                          hue={tag?.hue}
                          key={tag?.id}
                          style={{ marginRight: 16, marginTop: 24 }}
                          onPress={() => handleSubmitFromExisting(tag!.id)}
                        />
                      );
                    }
                  })}
                </TagContainer>
              </Container>
            </>
          ) : (
            // empty state
            <Container isCentered mt={44}>
              <Image
                style={{
                  width: 153,
                  height: 120,
                }}
                source={require("../../assets/empty_tags.png")}
              />
              <TextGray mt={16}>No tags created yet</TextGray>
            </Container>
          )}
        </>
      ) : (
        // adding new tag
        <TagConstructor
          handleBack={handleBack}
          handleClose={handleCancel}
          noteId={note?.id}
        />
      )}
    </MainContainer>
  );
};
