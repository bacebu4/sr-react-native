import React, { useRef, useState } from "react";
import { View, StyleSheet, Text, Share } from "react-native";
import ActionSheet from "react-native-actionsheet";
import { Maybe, Note } from "src/generated/graphql";
import { useConfirm } from "../hooks/confirm.hook";
import { useMessage } from "../hooks/message.hook";
import { EditTextModal } from "./EditTextModal";
import { useDeleteNoteMutation } from "../generated/graphql";
import { useUpdateNoteMutation } from "../generated/graphql";
import { useTranslation } from "react-i18next";
import { BaseImage } from "./BaseImage";
import { BLACK_COLOR, GRAY_COLOR } from "../utils/colors";

declare module "react-native-actionsheet" {
  interface Props {
    options: (string | React.ReactNode)[];
    onPress: (index: number) => void;
    title?: string;
    message?: string;
    tintColor?: string;
    cancelButtonIndex?: number;
    destructiveButtonIndex?: number;
    styles?: object;
  }

  class ActionSheet extends React.Component<Props> {
    public show: () => void;
  }
}

interface Props {
  note: Maybe<
    { __typename?: "Note" | undefined } & Pick<
      Note,
      "title" | "text" | "id" | "author" | "deleted"
    >
  >;
  dense?: boolean;
}

export const Card: React.FC<Props> = ({ note, dense = false }) => {
  const actionSheetRef = useRef<ActionSheet | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [, deleteNote] = useDeleteNoteMutation();
  const [, updateNote] = useUpdateNoteMutation();
  const [text, onText] = useState(note?.text);
  const confirm = useConfirm();
  const message = useMessage();
  const { t } = useTranslation();

  const showActionSheet = () => {
    actionSheetRef!.current!.show();
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: note!.text.replace(/\&nbsp;/g, " "),
      });
    } catch (error) {
      message(error.message);
    }
  };

  const onDelete = async () => {
    confirm(
      () => {
        deleteNote({
          noteId: note!.id,
        });
        note!.deleted = true;
      },
      "Delete highlight",
      "Are you sure you want to delete this highlight?"
    );
  };

  const onEdit = () => {
    setModalVisible(true);
  };

  const handleSave = () => {
    setModalVisible(false);
    updateNote({
      noteId: note!.id,
      text: text!,
    });
  };

  return (
    <>
      <EditTextModal
        modalState={modalVisible}
        setModalState={setModalVisible}
        title="Edit note"
        text={text}
        onText={onText}
        handleSave={handleSave}
      ></EditTextModal>

      <View style={{ ...styles.wrapper, opacity: note?.deleted ? 0.3 : 1 }}>
        {dense ? (
          <></>
        ) : (
          <>
            <View style={styles.header}>
              <BaseImage
                br={5}
                w={48}
                h={60}
                source={require("../assets/cover.png")}
              />
              <View style={styles.info}>
                <View>
                  <Text style={styles.title}>{note?.title}</Text>
                </View>
                <View>
                  <Text style={styles.author}>{note?.author}</Text>
                </View>
              </View>
              <View style={styles.more}>
                <BaseImage
                  w={24}
                  h={22.2}
                  onPress={() => showActionSheet()}
                  disabled={note?.deleted ?? undefined}
                  source={require("../assets/dots.png")}
                />
              </View>
            </View>
          </>
        )}
        <View style={{ marginTop: dense ? 0 : 16 }}>
          <Text style={styles.noteText}>
            {/* TODO how safe it is? */}
            {note?.text.replace(/\&nbsp;/g, " ")}
          </Text>
        </View>
        <ActionSheet
          ref={actionSheetRef}
          options={[t("Delete"), t("Edit"), t("Share"), t("Cancel")]}
          cancelButtonIndex={3}
          destructiveButtonIndex={0}
          onPress={(index) => {
            if (index === 2) {
              onShare();
            } else if (index === 0) {
              onDelete();
            } else if (index === 1) {
              onEdit();
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
    shadowColor: GRAY_COLOR,
    //@ts-ignore
    shadowOffset: { height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  info: {
    marginLeft: 16,
    flexDirection: "column",
    marginRight: 64,
  },
  more: {
    marginLeft: "auto",
  },
  title: {
    fontSize: 22,
    color: BLACK_COLOR,
    fontWeight: "bold",
    fontFamily: "Cochin",
    lineHeight: 22,
  },
  author: {
    fontSize: 18,
    fontFamily: "Cochin",
    color: GRAY_COLOR,
    marginTop: 0,
  },
  noteText: {
    textAlign: "justify",
    fontSize: 17,
    color: BLACK_COLOR,
    fontFamily: "Cochin",
  },
  menu: {
    marginLeft: 32,
  },
});
