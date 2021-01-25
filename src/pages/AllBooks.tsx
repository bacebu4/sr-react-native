import React from "react";
import { ActivityIndicator, Text, FlatList } from "react-native";
import { Book } from "../components/Book";
import { Container } from "../components/grid/Container";
import { MainContainer } from "../components/grid/MainContainer";
import { useBooksQuery } from "../generated/graphql";

export const AllBooksScreen: React.FC = () => {
  const [result] = useBooksQuery();
  const { data, fetching, error } = result;

  if (error) {
    return (
      <MainContainer>
        <Container isCentered mt={400}>
          <Text>{error.message}</Text>
        </Container>
      </MainContainer>
    );
  }

  if (fetching) {
    return (
      <MainContainer>
        <Container isCentered mt={400}>
          <ActivityIndicator size="large" />
        </Container>
      </MainContainer>
    );
  }

  if (!data?.books?.length) {
    return (
      <MainContainer>
        <Container isCentered mt={400}>
          <Text>No books</Text>
        </Container>
      </MainContainer>
    );
  }

  return (
    <MainContainer pt={16}>
      <FlatList
        data={data.books}
        columnWrapperStyle={{
          flex: 1,
          flexDirection: "row",
          flexWrap: "wrap",
          paddingHorizontal: 32,
          backgroundColor: "white",
        }}
        numColumns={2}
        keyExtractor={(item) => item!.id}
        renderItem={({ item }) => (
          <Book
            style={{
              marginTop: 16,
              marginBottom: 16,
              marginLeft: 12,
              marginRight: 12,
            }}
            book={item!}
            variant="large"
          />
        )}
      />
    </MainContainer>
  );
};
