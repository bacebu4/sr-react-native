// @ts-ignore
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  useDeleteBookMutation,
  useDeleteTagMutation,
} from "../generated/graphql";
import { useConfirm } from "../hooks/confirm.hook";
import { PURPLE_COLOR } from "../utils/colors";
import { LoadingOverlay } from "./LoadingOverlay";

interface Props {
  route: any;
}

export const MoreButton: React.FC<Props> = ({ route }) => {
  const { id, type } = route.params;
  const confirm = useConfirm();
  const navigation = useNavigation();
  const [, deleteTag] = useDeleteTagMutation();
  const [
    { fetching: deleteBookFetching },
    deleteBook,
  ] = useDeleteBookMutation();

  const handleDelete = () => {
    switch (type) {
      case "Book":
        confirm(
          async () => {
            await deleteBook({ bookId: id });
            navigation.navigate("Home");
          },
          "Delete the book?",
          "After deleting this book all its notes will be deleted too."
        );
        break;

      default:
        confirm(() => {
          deleteTag({ tagId: id });
          navigation.navigate("Home");
        }, `Delete the ${type}?`);
        break;
    }
  };

  return (
    <>
      <LoadingOverlay visible={deleteBookFetching} />
      <Ionicons
        onPress={handleDelete}
        name="ios-trash"
        size={24}
        color={PURPLE_COLOR}
        style={{ marginRight: 16 }}
      />
    </>
  );
};
