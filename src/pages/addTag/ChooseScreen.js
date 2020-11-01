import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { Tag } from "../../Tag";
import { Title } from "../../Title";
import { observer } from "mobx-react-lite";
import { UiStoreContext } from "../../store/UiStore";
import { NotesStoreContext } from "../../store/NotesStore";

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
    UiStore.addRef.current.snapTo(0);
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
    console.log(tag.trim());
    console.log(color);
    console.log(UiStore.currentNote);
    UiStore.addRef.current.snapTo(2);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        height: showAddSheet ? 650 : 650,
      }}
    >
      <View style={styles.center}>
        <View style={styles.topBar}></View>
      </View>

      {!showAddSheet ? (
        <>
          <View style={{ ...styles.container, ...styles.mts, ...styles.title }}>
            <View></View>
            <Title type="small" title={"Choose from existing"}></Title>
            <TouchableOpacity onPress={handleAdd}>
              <Image
                style={styles.icon}
                source={require("../../assets/smallPlus.png")}
              ></Image>
            </TouchableOpacity>
          </View>
          {NotesStore.tags ? (
            <>
              <View style={styles.container}>
                <View style={styles.tagContainer}>
                  {NotesStore.tags.map((tag) => {
                    return (
                      <View style={styles.tag} key={tag.tag_id}>
                        <Tag title={tag.tag_name} hue={tag.hue}></Tag>
                      </View>
                    );
                  })}
                </View>
              </View>
            </>
          ) : (
            <>
              <Text>No tags created yet</Text>
            </>
          )}
        </>
      ) : (
        <>
          <View style={{ ...styles.container, ...styles.mts, ...styles.title }}>
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
          </View>
          <View style={{ ...styles.center, ...styles.mtx }}>
            <Tag hue={color} title={tag}></Tag>
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
          </View>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
  },
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
  mts: {
    marginTop: 16,
  },
  mtx: {
    marginTop: 44,
  },
  mb: {
    marginBottom: 150,
  },
  center: {
    alignItems: "center",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#d7d7d7",
    paddingBottom: 16,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    marginRight: 16,
    marginTop: 24,
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
});
