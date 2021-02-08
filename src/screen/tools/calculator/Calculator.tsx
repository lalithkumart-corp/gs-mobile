import React, { Component } from 'react';
import { Text, Button, View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
//import DatePicker from 'react-native-datepicker';
import DatePicker from "@react-native-community/datetimepicker";
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import { RadioButton, Switch } from 'react-native-paper';
import _ from 'lodash';
import { calIntValPerMonth, calcInterestPercent, calIntPercentPerMonth } from '../../../components/util';
interface CalculatorState {
    showStartDatePicker: Boolean,
    showToDatePicker: Boolean,
    startDate: Date,
    toDate: Date,
    monDiff: any,
    itemCategory: string,
    principal: string,
    interestPercent: string,
    interestValPerMonth: string,
    calcByInterestAmount: boolean,
    calculatedInterestResult: number,
    interestRatesDb: any,
    calculated: boolean,
    interestMode: string
}
class Calculator extends Component{
    state: CalculatorState
    constructor(props) {
        super(props);
        this.state = {
            showStartDatePicker: false,
            showToDatePicker: false,
            startDate: new Date(),
            toDate: new Date(),
            monDiff: "0",
            itemCategory: "gold",
            principal: "",
            interestPercent: "",
            interestValPerMonth: "",
            calcByInterestAmount: false,
            calculatedInterestResult: 0,
            interestRatesDb: [],
            calculated: false,
            interestMode: 'simple'
        }
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onToggleSwitch = this.onToggleSwitch.bind(this);
        this._calculateInterestAmount = this._calculateInterestAmount.bind(this);
    }

    componentDidMount() {    
        this.fetchInterestRates();
    }

    async fetchInterestRates() {
        try {
            let newState = {...this.state};
            console.log(`CALC.tsx`, this.props.db);
            if(this.props.db && this.props.db.dbRefSet) {
                console.log('CALC.tsx: Making DB call now');
                let res = await this.props.db.dbReference.executeSql(`SELECT * FROM interest_rates`, []);
                for(let i=0; i< res.rows.length; i++) {
                    //console.log('Calculator.tsx ======SQL RECORD NAME = ', res.rows.item(i));
                    newState.interestRatesDb.push(res.rows.item(i));
                }
            } else {
                console.log('CALC.tsx: DB reference not available...');
                setTimeout(() => this.fetchInterestRates(), 1000);
            }
        } catch(e) {
            console.log('DB setup does not have interestRates data.');
        }
    }

    onChangeDate(identifier, event, selDate) {
        if(selDate) {
            let newState = {...this.state};
            switch(identifier) {
                case 'fromDate':
                    newState = {...newState, startDate: selDate, showStartDatePicker: false};
                    break;
                case 'toDate':
                    newState = {...newState, toDate: selDate, showToDatePicker: false};
                    break;
            }
            newState.monDiff = this.calCulateMonthDiff(newState);
            newState.calculated = false;
            this.setState(newState);
        }
    }

    calCulateMonthDiff(thatState) {
        let theState = thatState || this.state;
        let date1 = this.getDateTextFormat(theState.startDate);
        let date2 = this.getDateTextFormat(theState.toDate);

        let y1: any = date1.substring(date1.lastIndexOf('-') + 1);
        let y2: any = date2.substring(date2.lastIndexOf('-') + 1);
    
        let m1: any = date1.substring(date1.indexOf('-') + 1 ,  date1.lastIndexOf('-'));
        let m2: any = date2.substring(date2.indexOf('-') + 1 ,  date2.lastIndexOf('-'));
    
        let d1: any = date1.substring(0,date1.indexOf('-'));
        let d2: any = date2.substring(0,date2.indexOf('-'));
    
        y1 = Number(y1);
        y2 = Number(y2);
        m1 = Number(m1);
        m2 = Number(m2);
        d1 = Number(d1);
        d2 = Number(d2);
    
        let yDiff: any = y2-y1;
        let temp = yDiff*12;
    
        let mDiff = m2-m1;
        temp = temp + mDiff;
    
        if(d2 <= d1 && temp > 0)
            temp = temp-1;
    
        return temp.toString();
    }

    getDateTextFormat(date: Date) {
        return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    }

    onCategoryChange(value) {
        let interestPercent = calcInterestPercent(this.state.principal, this.state.interestRatesDb, value);
        let intValPerMonth = calIntValPerMonth(this.state.principal, interestPercent);
        this.setState({ 
            itemCategory: value, 
            calcByInterestAmount: false, 
            interestPercent: interestPercent.toString(), 
            interestValPerMonth: intValPerMonth.toString(),
            //calculatedInterestResult: 0,
            calculated: false
        });
    }

    onInterestModeChange(value) {
        this.setState({
            interestMode: value,
            calcByInterestAmount: false,
            interestValPerMonth: "0",
            calculated: false
        });
    }

    onChangeMonthDiff(val: string) {
        let vl = val || "";
        this.setState({monDiff: vl});
    }

    onChangePrincipal(val: string) {
        let interestPercent = calcInterestPercent(val, this.state.interestRatesDb, this.state.itemCategory);
        let intValPerMonth = calIntValPerMonth(val, interestPercent);
        this.setState({principal: val, interestPercent: interestPercent.toString(), interestValPerMonth: intValPerMonth.toString(), calculated: false});
    }

    onChangeInterestPercent(val: string) {
        let intValPerMonth = calIntValPerMonth(this.state.principal, val);
        this.setState({interestPercent: val, interestValPerMonth: intValPerMonth.toString(), calculated: false});
    }

    onToggleSwitch(enabled) {
        this.setState({calcByInterestAmount: !this.state.calcByInterestAmount});
    }
   
    onChangeIntAmtMonth(text) {
        let interestPercent = calIntPercentPerMonth(this.state.principal, text);
        this.setState({interestValPerMonth: text, interestPercent: interestPercent.toString(), calculated: false});
    }

    _calculateInterestAmount() {
        let monDiff = parseInt(this.state.monDiff) || 0;
        let interestValPerMonth: number = parseInt(this.state.interestValPerMonth) || 0;
        if(!this.state.calcByInterestAmount)
            interestValPerMonth = this.getInterestValuePerMonth();
        let interestAmt = 0;
        if(this.state.interestMode == 'compound')
            interestAmt = this._calcCompoundInterest();
        else
            interestAmt = monDiff * interestValPerMonth;
        this.setState({calculatedInterestResult: interestAmt, calculated: true});
    }

    _calcCompoundInterest() {
        let compoundIntValue = 0;
        let thePrincipal = parseInt(this.state.principal);
        let monDiff = parseInt(this.state.monDiff);
        let monDiff2 = monDiff;
        if(monDiff > 12) {
            let tempSplits: any = monDiff/12;
            tempSplits = parseInt(tempSplits);
            let splits = [];
            for(let i=0; i < tempSplits; i++) {
                splits.push(12);
                monDiff2 = monDiff2-12;
            }
            splits.push(monDiff2);

            for(let j=0; j< splits.length; j++) {
                thePrincipal += splits[j] * this.getInterestValuePerMonth(thePrincipal);
            }
            compoundIntValue = thePrincipal-parseInt(this.state.principal);

        } else if (monDiff == 0) {
            compoundIntValue = 0;
        } else {
            compoundIntValue = monDiff * this.getInterestValuePerMonth();
        }
        return parseFloat(compoundIntValue.toFixed(3));
    }

    getInterestValuePerMonth = (thePrincipal?) => {
        let amount;
        if(thePrincipal)
            amount = thePrincipal;
        else 
            amount = parseFloat(this.state.principal) || 0;
        let interestPercent = parseFloat(this.state.interestPercent) || 0;
        return (amount*interestPercent)/100;
    }

    // getDisplayTextOfIntPercent = (interestPercent) => {
    //     if(interestPercent)
    //         return parseInt(interestPercent || 0).toFixed(3);
    //     else
    //         return interestPercent;
    // }

    render() {
        return (
            <ScrollView style={{flexGrow: 1}}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                    <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                        {this.state.showStartDatePicker && 
                            <DatePicker 
                                testID="fromDatePicker"
                                timeZoneOffsetInMinutes={0}
                                value={new Date()}
                                mode={"date"}
                                is24Hour={true}
                                display="spinner"
                                onChange={(event, selDate) => this.onChangeDate('fromDate', event, selDate)}
                            />
                        }
                        {this.state.showToDatePicker && 
                            <DatePicker 
                                testID="toDatePicker"
                                value={new Date()}
                                mode={"date"}
                                is24Hour={true}
                                display="calendar"
                                onChange={(event, selDate) => this.onChangeDate('toDate', event, selDate)}
                            />
                        }
                        <View style={{flex: 1/12, flexDirection: 'row', alignItems: 'center', paddingBottom: 5}}> 
                            <RadioButton.Group
                                onValueChange={(value) => this.onCategoryChange(value)}
                                value={this.state.itemCategory}>
                                    <View style={{flex: 1/5, flexDirection: 'row'}}>
                                        <RadioButton value="gold" color="#e9711c"/>
                                        <Text style={{paddingTop: 10}}>Gold</Text>
                                    </View>
                                    <View style={{flex: 1/5, flexDirection: 'row'}}>
                                        <RadioButton value="silver" color="#e9711c"/>
                                        <Text style={{paddingTop: 10}}>Silver</Text>
                                    </View>
                                    <View style={{flex: 1/5, flexDirection: 'row'}}>
                                        <RadioButton value="brass" color="#e9711c"/>
                                        <Text style={{paddingTop: 10}}>Misc</Text>
                                    </View>
                            </RadioButton.Group>
                        </View>
                        <View style={{flex: 1/12, flexDirection: 'row', alignItems: 'center', paddingBottom: 10}}>
                            <RadioButton.Group
                                onValueChange={(value) => this.onInterestModeChange(value)}
                                value={this.state.interestMode}>
                                    <View style={{flex: 1/2, flexDirection: "row", justifyContent: "center"}}>
                                        <RadioButton value="simple" color="#e9711c"/>
                                        <Text style={{paddingTop: 10}}>Simple Interest</Text>
                                    </View>
                                    <View style={{flex: 1/2, flexDirection: "row", justifyContent: "center", paddingRight: 20}}>
                                        <RadioButton value="compound" color="#e9711c"/>
                                        <Text style={{paddingTop: 10}}>Compound Interest</Text>
                                    </View>
                            </RadioButton.Group>
                        </View>
                        <View style={{flex: 1/12, flexDirection: 'row', alignItems: "center", paddingBottom: 10}}>
                            <Text style={{flex: 2, textAlign: 'right', paddingRight: 15}}>From:</Text>
                            <View style={{flex: 8, paddingRight: 15}}>
                                <FontistoIcon.Button 
                                    name="date"
                                    onPress={() => this.setState({showStartDatePicker: !this.state.showStartDatePicker})}
                                    backgroundColor="#007398"
                                >
                                    <Text style={{color: "white"}}>{this.getDateTextFormat(this.state.startDate)}</Text>
                                </FontistoIcon.Button>
                            </View>
                        </View>
                        <View style={{flex: 1/12, flexDirection: 'row', alignItems: "center"}}>
                            <Text style={{flex: 2, textAlign: 'right', paddingRight: 15}}>To:</Text>
                            <View style={{flex: 8, paddingRight: 15}}>
                                <FontistoIcon.Button 
                                    name="date"
                                    onPress={() => this.setState({showToDatePicker: !this.state.showToDatePicker})}
                                    backgroundColor="#007398"
                                >
                                    <Text style={{color: "white"}}>{this.getDateTextFormat(this.state.toDate)}</Text>
                                </FontistoIcon.Button>
                            </View>
                        </View>

                        <View style={{flex: 1/12, flexDirection: 'row', alignItems: "center", marginTop: 10}}>
                            <Text style={{flex: 2, textAlign: 'right', paddingRight: 15}}>Mon: </Text>
                            <View style={{flex: 8, paddingRight: 15}}>
                                <TextInput 
                                    value={this.state.monDiff}
                                    // keyboardType="numeric"
                                    // onChangeText={(text) => this.onChangeMonthDiff(text)}
                                    editable={false}
                                    style={{fontSize: 20}}
                                />
                            </View>
                        </View>

                        <View style={{flex: 1/12, flexDirection: 'row', alignItems: "center", marginTop: 10, marginBottom: 5}}>
                            <Text style={{flex: 1/6, textAlign: 'right', paddingRight: 1, paddingLeft: 15}}>Amount: </Text>
                            <View style={{flex: 5/6, paddingLeft: 10, flexDirection: 'row'}}>
                                <TextInput 
                                    value={this.state.principal}
                                    keyboardType="numeric"
                                    onChangeText={(text) => this.onChangePrincipal(text)}
                                    style={{fontSize: 20, borderColor: "lightgrey", borderBottomWidth: 1, paddingBottom: 0, paddingTop: 0, width: 70}}
                                    placeholder="0.00"
                                />
                            </View>
                        </View>

                        <View style={{flex: 1/12, flexDirection: 'row', alignItems: "center", paddingTop: 20}}>
                            <View style={{flex: 3/12, flexDirection: 'row', justifyContent: "flex-end"}}>
                                <View style={{flex: 5/6, paddingLeft: 1}}>
                                    <TextInput 
                                        value={this.state.interestPercent}
                                        keyboardType="numeric"
                                        onChangeText={(text) => this.onChangeInterestPercent(text)}
                                        editable={!this.state.calcByInterestAmount}
                                        style={{borderColor: "lightgrey", borderBottomWidth: 1, paddingTop: 0, paddingBottom: 0, fontSize: 20}}
                                        placeholder="0"
                                    />
                                </View>
                                <Text style={{flex: 1/6, textAlign: 'right', paddingRight: 15, marginTop: 7}}>%</Text>
                            </View>
                            <View style={{flex: 2/12, alignItems: "flex-end"}}>
                                <Switch
                                    value={this.state.calcByInterestAmount}
                                    onValueChange={this.onToggleSwitch}
                                    accessibilityStates={[]}
                                    style={{width: 50, borderWidth: 10}}
                                    disabled={this.state.interestMode=="compound"?true:false}
                                />
                            </View>
                            <View style={{flex: 7/12, paddingLeft: 1, flexDirection: "row"}}>
                                <Text style={{flex: 1/6, textAlign: 'right', marginTop: 7, fontSize: 15, paddingRight: 10, paddingLeft: 7}}>Rs:</Text>
                                <TextInput 
                                    value={this.state.interestValPerMonth}
                                    keyboardType="numeric"
                                    onChangeText={(text) => this.onChangeIntAmtMonth(text)}
                                    style={{borderColor: "lightgrey", borderBottomWidth: 1, paddingTop: 0, paddingBottom: 0, flex: 4/6, fontSize: 20}}
                                    editable={this.state.calcByInterestAmount}
                                    placeholder="0.00"
                                />
                                <Text style={{flex: 2/6, textAlign: 'left', marginTop: 12, fontSize: 11, paddingLeft: 5}}>/mon</Text>
                            </View>
                        </View>

                        <View style={{marginTop: 40}}>
                            <SimpleLineIcon.Button name="refresh" onPress={this._calculateInterestAmount} backgroundColor= "#007398">
                                <Text style={{color: "white"}}>Calculate</Text>
                            </SimpleLineIcon.Button>
                        </View>
                        
                        <View style={{flex: 1/12, flexDirection: "row", alignSelf: "flex-start", paddingLeft: 10, paddingBottom: 5, marginTop: 40}}>
                            <Text>Result:</Text>
                        </View>
                        <View style={[styles.resultContainer, {borderColor: (this.state.calculated?"#e9711c": "grey"), marginBottom: 15}]}>
                            <Text style={[styles.resultContainerText, {color: (this.state.calculated?"#e9711c": "grey")}]}>
                                {this.state.calculatedInterestResult}
                            </Text>
                            <Text style={[styles.resultContainerText, {color: (this.state.calculated?"#e9711c": "grey")}]}>
                                {this.state.calculatedInterestResult + parseInt(this.state.principal || 0)}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

let styles = StyleSheet.create({
    resultContainer: {
        flex: 4/12,
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        flexDirection: "row",
        height: 100,
        alignSelf: "stretch",
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
        borderColor: "#e9711c"
    },
    resultContainerText: {
        flex: 1,
        color: "#e9711c",
        fontSize: 25,
        fontWeight: "900",
        textAlign: "center"
    }
})
const mapStateToProps = state => ({
    db: state.db,
    auth: state.auth
});
  

export default connect(mapStateToProps, {})(Calculator)