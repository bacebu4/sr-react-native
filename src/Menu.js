import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ActionSheetCustom as ActionSheet } from "react-native-actionsheet";

export class Menu extends React.Component {
  showActionSheet = () => {
    this.ActionSheet.show();
  };
  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this.showActionSheet}>...</Text>
        <ActionSheet
          style={styles}
          ref={(o) => (this.ActionSheet = o)}
          title={"Which one do you like ?"}
          options={["Apple", "Banana", "cancel"]}
          cancelButtonIndex={2}
          destructiveButtonIndex={1}
          onPress={(index) => {
            /* do something */
          }}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginLeft: 32,
    marginRight: 32,
    paddingLeft: 32,
    paddingRight: 32,
  },
});
