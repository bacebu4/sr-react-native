import React, { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { useConfirm } from "../hooks/confirm.hook";
import { observer } from "mobx-react-lite";
import { NotesStoreContext } from "../store/NotesStore";

export const MoreButton = observer(({ route }) => {
  const NotesStore = useContext(NotesStoreContext);
  const { id, type } = route.params;
  const confirm = useConfirm();
  const navigation = useNavigation();

  const handleDelete = () => {
    switch (type) {
      case "book":
        confirm(
          () => {
            console.log("id", id);
            NotesStore.deleteBook(id);
            navigation.navigate("Home");
          },
          `Delete the book?`,
          "After deleting this book all notes associated with it will be deleted too"
        );
        break;

      default:
        confirm(() => {
          console.log("id", id);
          navigation.navigate("Home");
        }, `Delete the ${type}?`);
        break;
    }
  };

  return (
    <Ionicons
      onPress={handleDelete}
      name="trash-outline"
      size={24}
      color="#CCA9F9"
    />
  );
});
