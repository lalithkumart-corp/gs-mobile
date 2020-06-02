// Modal.js
import React from 'react';
import {
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
  View,
} from 'react-native';
import t from 'prop-types';


class MyModal extends React.Component {
  static propTypes = {
    children: t.node.isRequired,
    visible: t.bool.isRequired,
    dismiss: t.func.isRequired,
    transparent: t.bool,
    animationType: t.string,
    theStyle: t.any
  };

  static defaultProps = {
    animationType: 'none',
    transparent: true,
  };

  render() {
    const { props } = this;
    return (
      <View>
        <Modal
          visible={props.visible}
          transparent={props.transparent}
          onRequestClose={props.dismiss}
          animationType={props.animationType}
        >
        <TouchableWithoutFeedback onPress={props.dismiss}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={[styles.modalContent, props.modalContentStyles]}>
          {props.children}
        </View>
        </Modal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    backgroundColor: "white",

    justifyContent: 'center',
    margin: '5%',
    
    shadowColor: "#000",
    shadowOffset: {
        width: 5,
        height: 11,
    },
    shadowOpacity: 0.50,
    shadowRadius: 12.35,
    elevation: 19,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    //backgroundColor: 'rgba(0,0,0,0.5)'
  },
});


export default MyModal;