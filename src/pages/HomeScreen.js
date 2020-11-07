import React, { useContext } from "react";
import {
  ScrollView,
  RefreshControl,
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { Card } from "../Card";
import { Navbar } from "../Navbar";
import { MainButton } from "../MainButton";
import Animated from "react-native-reanimated";
import { Title } from "../Title";
import { Carousel } from "../Carousel";
import { SeeAll } from "../SeeAll";
import { Tag } from "../Tag";
import { UiStoreContext } from "../store/UiStore";
import { NotesStoreContext } from "../store/NotesStore";
import { observer } from "mobx-react-lite";
import { MainContainer } from "../components/grid/MainContainer";
import { Container } from "../components/grid/Container";
import { TagContainer } from "../components/grid/TagContainer";

export const HomeScreen = observer(({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    NotesStore.fetchHighlights().then(() => setRefreshing(false));
  }, []);

  const UiStore = useContext(UiStoreContext);
  const NotesStore = useContext(NotesStoreContext);

  return (
    <MainContainer>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Container>
          <Navbar
            title="Book stash"
            handleClick={() => UiStore.settingsRef.current.snapTo(0)}
          ></Navbar>
        </Container>

        <Container mt={32}>
          {NotesStore.highlights.length ? (
            <>
              <Card note={NotesStore.highlights[0]} />

              <Container mt={32} center>
                <MainButton
                  clickAction={() => navigation.navigate("Review")}
                ></MainButton>
              </Container>
            </>
          ) : (
            <>
              <Container mt={32} center>
                <Image
                  style={styles.image}
                  source={require("../assets/empty_main.png")}
                ></Image>

                <Text style={styles.text}>No highlights added yet</Text>

                <Container mt={32}>
                  <MainButton
                    clickAction={() => navigation.navigate("Review")}
                    title="Learn how to add"
                  ></MainButton>
                </Container>
              </Container>
            </>
          )}
        </Container>

        {/* Latest reads */}
        {NotesStore.latestBooks.length ? (
          <>
            <Container mt={32}>
              <Title title="Latest reads"></Title>
            </Container>

            <Carousel></Carousel>

            <Container mt={16} border></Container>

            <Container mt={16}>
              <SeeAll></SeeAll>
            </Container>
          </>
        ) : (
          <>
            <View></View>
          </>
        )}

        {/* Review by tags */}
        {NotesStore.tags.length ? (
          <>
            <Container mt={44}>
              <Title title="Review by tags"></Title>

              <TagContainer>
                {NotesStore.tags.map((tag) => (
                  <Tag
                    hue={tag.hue}
                    key={tag.tag_id}
                    title={tag.tag_name}
                    style={{ marginRight: 16, marginTop: 16 }}
                  ></Tag>
                ))}
              </TagContainer>
            </Container>

            <Container mt={16} border></Container>

            <Container mt={16} mb={150}>
              <SeeAll></SeeAll>
            </Container>
          </>
        ) : (
          <>
            <View></View>
          </>
        )}
      </ScrollView>
    </MainContainer>
  );
});

const styles = StyleSheet.create({
  image: {
    width: 186,
    height: 173,
  },
  text: {
    color: "#B0AFAF",
    marginTop: 32,
  },
});
