import React, { useState, useRef } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import ActionSheet from "react-native-actionsheet";
import {
  Comment as CommentType,
  Maybe,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} from "../generated/graphql";
import { useConfirm } from "../hooks/confirm.hook";
import { EditTextModal } from "./EditTextModal";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";

interface Props {
  comment: Maybe<CommentType>;
  disabled?: boolean;
}

export const Comment: React.FC<Props> = ({ comment, disabled = false }) => {
  const actionSheetRef = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [textToModal, setTextToModal] = useState(comment?.text);
  const [, updateComment] = useUpdateCommentMutation();
  const [, deleteComment] = useDeleteCommentMutation();
  const confirm = useConfirm();
  const { t } = useTranslation();

  const showActionSheet = () => {
    // @ts-ignore
    actionSheetRef!.current.show();
  };

  const onEdit = () => {
    setModalVisible(true);
  };

  const onDelete = () => {
    console.log("c.id", comment!.id);
    console.log("n.id", comment!.noteId);
    confirm(
      () => {
        deleteComment({ commentId: comment!.id, noteId: comment!.noteId });
      },
      "Delete comment",
      "Are you sure you want to delete this comment?"
    );
  };

  const handleSave = () => {
    setModalVisible(false);
    if (textToModal) {
      updateComment({ commentId: comment!.id, text: textToModal });
    }
  };

  return (
    <>
      <EditTextModal
        modalState={modalVisible}
        setModalState={setModalVisible}
        title="Edit comment"
        text={textToModal}
        onText={setTextToModal}
        handleSave={handleSave}
      ></EditTextModal>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View>
            <Text style={styles.date}>
              {format(Number(comment!.createdAt), "yyyy-MM-dd")}
            </Text>
          </View>
          <View style={styles.more}>
            <TouchableOpacity onPress={showActionSheet} disabled={disabled}>
              <Image
                style={{ width: 24, height: 22.2 }}
                source={require("../assets/dots.png")}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.note}>
          <Text style={styles.noteText}>{comment?.text}</Text>
        </View>
        <ActionSheet
          ref={actionSheetRef}
          options={[t("Delete"), t("Edit"), t("Сancel")]}
          cancelButtonIndex={2}
          destructiveButtonIndex={0}
          onPress={(index) => {
            /* do something */
            if (index === 1) {
              onEdit();
            } else if (index === 0) {
              onDelete();
            }
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 32,
    backgroundColor: "white",
    paddingLeft: 32,
    paddingRight: 32,
    paddingBottom: 40,
    borderRadius: 20,
    elevation: 10,
    shadowColor: "#B0AFAF",
    // @ts-ignore
    shadowOffset: { height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  date: {
    fontFamily: "Cochin-Bold",
    color: "#B0AFAF",
  },
  more: {
    marginLeft: "auto",
    marginTop: 4,
  },
  noteText: {
    textAlign: "justify",
    fontSize: 17,
    color: "#343434",
    fontFamily: "Cochin",
  },
  note: {
    marginTop: 16,
  },
});
