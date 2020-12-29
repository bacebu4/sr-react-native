import React from "react";
// @ts-ignore
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

import { useConfirm } from "../hooks/confirm.hook";

interface Props {
  route: any;
}

export const MoreButton: React.FC<Props> = ({ route }) => {
  const { id, type } = route.params;
  const confirm = useConfirm();
  const navigation = useNavigation();

  const handleDelete = () => {
    switch (type) {
      case "Book":
        confirm(
          () => {
            console.log("id", id);
            // NotesStore.deleteBook(id);
            navigation.navigate("Home");
          },
          "Delete the book?",
          "After deleting this book all its notes will be deleted too."
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
      name="ios-trash"
      size={24}
      color="#CCA9F9"
      style={{ marginRight: 16 }}
    />
  );
};
