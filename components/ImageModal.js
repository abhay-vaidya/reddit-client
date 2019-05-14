import React from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Button, Icon } from "react-native-elements";
import FullWidthImage from "./FullWidthImage";

export default ({ modalVisible, toggleModal, url }) => {
  return (
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.imageModal}>
        <View>
          <Button
            icon={<Icon name="close" size={30} color="white" />}
            type="clear"
            onPress={toggleModal}
            buttonStyle={styles.closeButton}
          />
        </View>
        <View>
          <FullWidthImage source={{ uri: url }} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  imageModal: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.9)"
  },
  closeButton: {
    marginBottom: 20,
    alignSelf: "flex-end"
  }
});
