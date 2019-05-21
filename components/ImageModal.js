import React from "react";
import ImageViewer from "react-native-image-view";

export default ({ modalVisible, toggleModal, url }) => {
  return (
    <ImageViewer
      glideAlways
      animationType="fade"
      images={[
        {
          source: {
            uri: url
          }
        }
      ]}
      isVisible={modalVisible}
      onClose={toggleModal}
    />
  );
};
