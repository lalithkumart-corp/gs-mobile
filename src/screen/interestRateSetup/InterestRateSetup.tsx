import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import { ScrollView } from "react-native-gesture-handler";
import _ from 'lodash';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyPopup from '../../components/popup/MyPopup';
import InterestPopup from '../../components/interestRates/InterestPopup';
interface MyState {
    interestRatesDb: any,
    showInterestPopup: boolean,
    interestPopupMode: string,
    editingIndex: null | number,
    editModalContent: any,
    editingContentIndex: any
}
class InterestRateSetup extends Component {
    state: MyState;
    constructor(props) {
        super(props);
        this.state = {
            interestRatesDb: [],
            showInterestPopup: false,
            interestPopupMode: "",
            editingIndex: null,
            editModalContent: {},
            editingContentIndex: null
        }
        this.closeEditModal = this.closeEditModal.bind(this);
        this.createEntry = this.createEntry.bind(this);
        this.validateEdits = this.validateEdits.bind(this);
        this.updateEntry = this.updateEntry.bind(this);
        this.deleteEntry = this.deleteEntry.bind(this);
    }

    componentDidMount() {
        this.fetchInterestRates();
    }

    async fetchInterestRates() {
        try {
            let res = await this.props.db.dbReference.executeSql(`SELECT * FROM interest_rates`, []);
            let interestRatesDb = [];
            for(let i=0; i< res.rows.length; i++) {
                console.log('Calculator.tsx ======SQL RECORD NAME = ', res.rows.item(i));
                interestRatesDb.push(res.rows.item(i));
            }
            this.setState({interestRatesDb: interestRatesDb});
        } catch(e) {
            alert('DB setup does not have interestRates data.');
        }
    }
    onAddIconPress(categ) {
        this.setState({interestPopupMode: "create", showInterestPopup: true});
    }
    onPressInterestRate(category, index, rowId) {
        this.setState({interestPopupMode: "edit", showInterestPopup: true, editingIndex: index, editModalContent: this.state.interestRatesDb[index], editingContentIndex: index});
    }

    closeEditModal() {
        this.setState({interestPopupMode: "", showInterestPopup: false, editModalContent: null, editingContentIndex: null });
    }

    validateEdits(updatedValues, rowId) {
        let correctRange = true;
        _.each(this.state.interestRatesDb, (anObj, key) => {
            if(  (typeof rowId == null || rowId !== anObj.id) &&  anObj.type == updatedValues.type) {
                if(updatedValues.range_from > anObj.range_from) {
                    if(updatedValues.range_from < anObj.range_to)
                        correctRange = false;
                }

                if(updatedValues.range_to > anObj.range_from) {
                    if(updatedValues.range_to < anObj.range_to) {
                        correctRange = false;
                    }
                }
            }
        });
        return correctRange;
    }

    async createEntry(params) {
        console.log('IRS.tsx', params);
        let theSQL = `INSERT INTO interest_rates (range_from, range_to, rate_of_interest, type) VALUES (${params.range_from}, ${params.range_to}, ${params.rate_of_interest}, "${params.type}")`;
        debugger;
        console.log(`InterestRateSetup.tsx: Create SQL: ${theSQL}`);
        let rr = await this.props.db.dbReference.executeSql(theSQL);
        this.fetchInterestRates();
        this.closeEditModal();
    }

    async updateEntry(params, index) {
        let theSQL = `UPDATE interest_rates SET range_to=${params.range_to}, range_from=${params.range_from}, rate_of_interest=${params.rate_of_interest} WHERE id=${index}`;
        console.log('IRS.TSX UPDATE SQL: ', theSQL);
        let rr = await this.props.db.dbReference.executeSql(theSQL);
        this.fetchInterestRates();
        this.closeEditModal();

    }

    async deleteEntry(index) {
        let theSQL = `DELETE FROM interest_rates WHERE id=${index}`;
        console.log('IRS.TSX UPDATE SQL: ', theSQL);
        let rr = await this.props.db.dbReference.executeSql(theSQL);
        this.fetchInterestRates();
        this.closeEditModal();
    }

    getTable() {
        let theDOM = [];
        let goldList = [];
        let silverList = [];
        let brassList = [];
        _.each(this.state.interestRatesDb, (anObj, index) => {
            if(anObj.type == "gold") {
                goldList.push(
                    <TouchableOpacity style={[styles.listItems, {backgroundColor: "gold"}]} key={index} onPress={()=> this.onPressInterestRate('gold', index, anObj.id)}>
                        <Text style={styles.interestPercent}> {anObj.rate_of_interest}</Text>
                        <Text style={styles.rangeFromAmt}> {anObj.range_from}</Text>
                        <Text style={styles.connector}> - </Text>
                        <Text style={styles.rangeToAmt}> {anObj.range_to}</Text>
                    </TouchableOpacity>
                )
            } else if (anObj.type == "silver") {
                silverList.push(
                    <TouchableOpacity style={[styles.listItems, {backgroundColor: "silver"}]} key={index} onPress={()=> this.onPressInterestRate('silver', index, anObj.id)}>
                        <Text style={styles.interestPercent}> {anObj.rate_of_interest}</Text>
                        <Text style={styles.rangeFromAmt}> {anObj.range_from}</Text>
                        <Text style={styles.connector}> - </Text>
                        <Text style={styles.rangeToAmt}> {anObj.range_to}</Text>
                    </TouchableOpacity>
                )
            } else {
                brassList.push(
                    <TouchableOpacity style={[styles.listItems, {backgroundColor: "#b78e0a"}]}  key={index} onPress={()=> this.onPressInterestRate('brass', index, anObj.id)}>
                        <Text style={styles.interestPercent}> {anObj.rate_of_interest}</Text>
                        <Text style={styles.rangeFromAmt}> {anObj.range_from}</Text>
                        <Text style={styles.connector}> - </Text>
                        <Text style={styles.rangeToAmt}> {anObj.range_to}</Text>
                    </TouchableOpacity>
                )
            }
        });
        theDOM.push(
            <View style={[styles.listHeader, {flexDirection: 'row'}]} key={"gold-list-header"}>
                <Text style={{fontSize: 25, fontWeight: "bold", flex: 1.6/10}}>Gold</Text>
                <MaterialIcons name="add-circle-outline" color= "#007398" style={{flex: 1/10, paddingTop: 2}} size={25} onPress={()=>this.onAddIconPress('gold')}></MaterialIcons>
            </View>
        )
        theDOM.push(goldList);
        theDOM.push(
            <View style={[styles.listHeader, {flexDirection: 'row'}]} key={"silver-list-header"}>
                <Text style={{fontSize: 25, fontWeight: "bold", flex: 2/10}}>Silver</Text>
                <MaterialIcons name="add-circle-outline" color= "#007398" style={{flex: 1/10, paddingTop: 2}} size={25} onPress={()=>this.onAddIconPress('silver')}></MaterialIcons>
            </View>
        )
        theDOM.push(silverList);
        theDOM.push(
            <View style={[styles.listHeader, {flexDirection: 'row'}]} key={"brass-list-header"}>
                <Text style={{fontSize: 25, fontWeight: "bold", flex: 2/10}}>Brass</Text>
                <MaterialIcons name="add-circle-outline" color= "#007398" style={{flex: 1/10, paddingTop: 2}} size={25} onPress={()=>this.onAddIconPress('brass')}></MaterialIcons>
            </View>
        )
        theDOM.push(brassList);
        return theDOM;
    }

    render() {
        return (
            <ScrollView>
                <View style={{marginTop: 5}}>
                    {this.getTable()}
                    <MyPopup
                        visible={this.state.showInterestPopup}
                        dismiss={this.closeEditModal}
                        animationType={"slide"}
                        modalContentStyles={{
                            justifyContent: "flex-end",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            margin: 0,
                            padding: 10,
                            position: 'absolute',
                            height: 300}}
>
                        <InterestPopup 
                            modalContent={this.state.editModalContent} 
                            interestPopupMode={this.state.interestPopupMode}
                            handleClose={this.closeEditModal} 
                            editingContentIndex={this.state.editingContentIndex}
                            validateEdits={this.validateEdits} 
                            onUpdate={this.updateEntry}
                            onDelete={this.deleteEntry}
                            createNewInterestEntry={this.createEntry}
                            >

                        </InterestPopup>
                    </MyPopup>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = state => ({
    db: state.db,
    auth: state.auth
});
  

export default connect(mapStateToProps, {})(InterestRateSetup)


let styles = StyleSheet.create({
    listHeader: {
        flex: 1,
        marginTop: 30,
        paddingBottom: 10,
        paddingLeft: 10
    },
    listItems: {
        flex: 1,
        flexDirection: "row",
        height: 50,
        borderBottomWidth: 2,
        borderColor: "white",
        marginRight: 10,
        marginLeft: 10
    },
    interestPercent: {
        flex: 2/4,
        padding: 10,
        fontSize: 20
    },
    rangeFromAmt: {
        flex: 0.8/4,
        padding: 10
    },
    connector: {
        flex: 0.4/4,
        padding: 10
    },
    rangeToAmt: {
        flex: 0.8/4,
        padding: 10
    }
})