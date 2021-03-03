import React, { useMemo, useState } from "react";
import { GestureResponderEvent, Text, ActivityIndicator } from "react-native";
import { Container } from "../../components/grid/Container";
import { TagContainer } from "../../components/grid/TagContainer";
import { NavbarTop } from "../../components/NavbarTop";
import { TagConstructor } from "./TagConstructor";
import { Tag } from "../../components/Tag";
import { MainContainer } from "../../components/grid/MainContainer";
import { BaseImage } from "../../components/BaseImage";
import { BaseText } from "../../components/BaseText";
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
  const [showCreateTag, setShowCreateTag] = useState(false);
  const [, addExistingTag] = useAddExistingTagMutation();
  const [result] = useTagsQuery();
  const { data, fetching, error } = result;

  const handleShowCreate = () => {
    setShowCreateTag(true);
  };

  const handleBack = () => {
    setShowCreateTag(false);
  };

  const handleSubmitFromExisting = (tagId: string) => {
    addExistingTag({ noteId: note!.id, tagId });
    // @ts-ignore
    handleCancel();
  };

  const availableTags = useMemo(() => {
    return data?.tags?.filter((tag) => {
      const findResults = note?.tags?.find((t) => t?.id === tag?.id);

      if (!findResults) {
        return true;
      }
      return false;
    });
  }, [data, note]);

  const Header = (
    <>
      <NavbarTop
        handleClick={handleCancel}
        handleNext={handleShowCreate}
        title="Choose from existing"
        titleLeft="Cancel"
        titleRight="Create"
        hasNoMargin
      />
      <Container hasBorder mt={16} />
    </>
  );

  if (showCreateTag) {
    return (
      <MainContainer>
        <TagConstructor
          handleBack={handleBack}
          handleClose={handleCancel}
          noteId={note?.id}
        />
      </MainContainer>
    );
  }

  if (error) {
    return (
      <MainContainer>
        {Header}
        <Container isCentered mt={400}>
          <Text>{error.message}</Text>
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
      {availableTags?.length ? (
        <Container>
          <TagContainer>
            {availableTags.map((tag) => {
              return (
                <Tag
                  title={tag?.name}
                  hue={tag?.hue}
                  key={tag?.id}
                  style={{ marginRight: 16, marginTop: 24 }}
                  onPress={() => handleSubmitFromExisting(tag!.id)}
                />
              );
            })}
          </TagContainer>
        </Container>
      ) : (
        // empty state
        <Container isCentered mt={44}>
          <BaseImage
            w={153}
            h={120}
            source={require("../../assets/empty_tags.png")}
          />
          <BaseText color="gray" fz={14} mt={16} isCentered>
            No tags to choose from
          </BaseText>
          <BaseText mt={16} isSerif isBold fz={18} onPress={handleShowCreate}>
            Create a new one?
          </BaseText>
        </Container>
      )}
    </MainContainer>
  );
};
