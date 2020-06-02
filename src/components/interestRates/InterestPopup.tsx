import React, { Component } from "react";
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-community/picker';
import { textInputFormat } from '../util';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

interface PropTypes {
    modalContent: {
        rate_of_interest: number | null,
        range_from: number | null,
        range_to: number | null,
        type: string,
        id: number | null
    },
    interestPopupMode: string,
    editingContentIndex: number | null,
    handleClose: Function,
    validateEdits: Function,
    onUpdate: Function,
    onDelete: Function,
    createNewInterestEntry: Function
}
export default class EditInterestCard extends Component<PropTypes, {}> {
    state: any;
    constructor(props) {
        super(props);
        this.state = {
            rate_of_interest: (this.props.modalContent?this.props.modalContent.rate_of_interest:'') || '',
            range_from: (this.props.modalContent?this.props.modalContent.range_from:'') || '',
            range_to: (this.props.modalContent?this.props.modalContent.range_to:'') || '',
            type: (this.props.modalContent?this.props.modalContent.type:'gold') || 'gold',
            rowId: (this.props.modalContent?this.props.modalContent.id:''),
            editingContentIndex: this.props.editingContentIndex,
            interestPopupMode: this.props.interestPopupMode
        }
        this.closeModal = this.closeModal.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    onChangeEditDialog(identifier, text) {
        this.setState({[identifier]: text});
    }

    onChangeCategoryType(text) {
        this.setState({type: text});
    }

    closeModal() {
        this.props.handleClose();
    }

    create() {
        let params = {
            rate_of_interest: this.state.rate_of_interest,
            range_from: this.state.range_from,
            range_to: this.state.range_to,
            type: this.state.type
        };
        debugger;
        let result = this.props.validateEdits(params, null);
        if(result)
            this.props.createNewInterestEntry(params);
        else
            alert('Amount range is not valid. This range occurs inbetween other interest range');
    }

    update() {
        let params = {
            rate_of_interest: this.state.rate_of_interest,
            range_from: this.state.range_from,
            range_to: this.state.range_to,
            type: this.state.type
        };
        let result = this.props.validateEdits(params, this.state.rowId);
        if(result)
            this.props.onUpdate(params, this.state.rowId);
        else
            alert('Amount range is not valid. This range occurs inbetween other interest range');
    }

    delete() {
        this.props.onDelete(this.state.rowId);
        //this.props.handleClose();
    }

    render() {
        return (
            <View style={{flex: 1}}>
                {this.props.interestPopupMode == "edit" ?
                    <Text style={{flex: 1.5/12, fontSize: 20, borderBottomWidth: 1, borderBottomColor: "lightgrey"}}> EDIT / DELETE </Text>
                    :
                    <Text style={{flex: 1.5/12, fontSize: 20, borderBottomWidth: 1, borderBottomColor: "lightgrey"}}> CREATE </Text>
                }
                <View style={{flex: 2/12, flexDirection: "row", paddingTop: 15 }}>
                    <Text style={{width: 150, paddingTop: 10}}> Rate Of Interest % </Text>
                    <TextInput 
                        value={textInputFormat(this.state.rate_of_interest)}
                        keyboardType="numeric"
                        onChangeText={(text) => this.onChangeEditDialog('rate_of_interest', text)}
                        style={{fontSize: 20, borderColor: "lightgrey", borderWidth: 1, borderRadius: 5, paddingBottom: 5, paddingTop: 5, width: 50, height: 30}}
                        placeholder="0"
                    />
                    {/* <Text style={{textTransform: "capitalize", width: 100, color: `${this.state.type}`, fontSize: 20, right: 0, position: "absolute", paddingTop: 15, textAlign: "right" }}>{this.state.type}</Text> */}
                    <Picker
                        selectedValue={this.state.type}
                        style={{ height: 50, width: 105, position: "absolute", right: 0, paddingRight: 0 }}
                        onValueChange={(itemValue, itemIndex) => this.onChangeCategoryType(itemValue)}
                        enabled={this.props.interestPopupMode=="edit"?false:true}
                    >
                        <Picker.Item label="Gold" color={"gold"} value="gold" />
                        <Picker.Item label="Silver" color={"silver"} value="silver" />
                        <Picker.Item label="Brass" color={"#b78e0a"} value="brass" />
                    </Picker>
                </View>
                <View style={{flex: 2/12, flexDirection: "row"}}>
                        <Text style={{width: 150, paddingTop: 10}}> Amount From </Text>
                        <TextInput 
                            value={textInputFormat(this.state.range_from)}
                            keyboardType="numeric"
                            onChangeText={(text) => this.onChangeEditDialog('range_from', text)}
                            style={{fontSize: 20, borderColor: "lightgrey", borderWidth: 1, borderRadius: 5, paddingBottom: 5, paddingTop: 5, width: 100, height: 30}}
                            placeholder="0"
                        />
                </View>
                <View style={{flex: 2/12, flexDirection: "row"}}>
                    <Text style={{width: 150, paddingTop: 10}}> Till Amount </Text>
                        <TextInput 
                            value={textInputFormat(this.state.range_to)}
                            keyboardType="numeric"
                            onChangeText={(text) => this.onChangeEditDialog('range_to', text)}
                            style={{fontSize: 20, borderColor: "lightgrey", borderWidth: 1, borderRadius: 5, paddingBottom: 5, paddingTop: 5, width: 100, height: 30}}
                            placeholder="0"
                        />
                </View>
                {this.state.interestPopupMode == "edit" ?
                    <View style={{flex: 3/12, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between",}}>
                            <View style={{flex: 2/6, marginRight: 10}}>
                                <AntDesignIcon.Button name="delete" backgroundColor="brown"  onPress={this.delete}>
                                    <Text style={{color: "white"}}>Delete</Text>
                                </AntDesignIcon.Button>
                            </View>
                            <View style={{flex: 2/6, marginRight: 10}}>
                                <MaterialIcons.Button name="update" onPress={this.update}>
                                    <Text style={{color: "white"}}>Update</Text>
                                </MaterialIcons.Button>
                            </View>
                    </View>
                    :
                    <View style={{flex: 3/12, flexDirection: "row", alignItems: "flex-end", justifyContent: "flex-end",}}>
                        <View style={{flex: 2/6, width: 100, marginRight: 10, alignSelf: "flex-end"}}>
                            <MaterialIcons.Button name="create" onPress={this.create}>
                                <Text style={{color: "white"}}>Create</Text>
                            </MaterialIcons.Button>
                        </View>
                    </View>
                }
                {/* <MaterialIcons name="clear" style={{position: "absolute", right: 10}} onPress={this.closeModal} size={20}></MaterialIcons> */}
                <TouchableOpacity style={{position: "absolute", right: 10}} onPress={this.closeModal}><MaterialIcons name="clear" size={20}></MaterialIcons></TouchableOpacity>
            </View>
        )
    }
}