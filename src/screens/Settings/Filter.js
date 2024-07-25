import { ScrollView, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import React, { memo, useCallback, useContext, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonPicker from '../../Components/CommonPicker'
import Calendar from "react-native-calendar-range-picker";
import moment from 'moment';
import CustomButton from '../../Components/CustomButton';
import CommonTexts from '../../Components/CommonTexts';

const Filter = ({ item, closeFilter, filterAction, selectedDatas }) => {


    const { width, height } = useWindowDimensions()

    const [selected, setSelected] = useState('Daily Report')

    const [calendarShow, setCalendarShow] = useState(false);
    const [dateList, setDateList] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const calendarAction = useCallback(() => {
        setCalendarShow(!calendarShow)
    })

    const onCaledarChange = useCallback(({ startDate, endDate }) => {
        let dates = getDates(startDate, endDate)
        setStartDate(startDate)
        setEndDate(endDate)
        setDateList(dates)
    }, [])

    function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = moment(startDate);
        var stopDate = moment(stopDate);
        while (currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('DD/MM/YYYY'))
            currentDate = moment(currentDate).add(1, 'days');
        }
        return dateArray;
    }

    const onSubmit = useCallback(() => {
        filterAction(selected === 'Monthly Report' ? endDate ? moment(dateList).format('DD/MM/YYYY') : moment(startDate).format('DD/MM/YYYY') : selected)
    })

    return (
        <View style={styles.filterView}>
            <TouchableOpacity onPress={closeFilter} style={{ alignSelf: 'flex-end', padding: 5, zIndex: 1 }}>
                <Ionicons name={'close-circle'} size={28} color={'#000'} />
            </TouchableOpacity>
            <CommonTexts textAlign={'center'} label={'Filter'} fontSize={22} mt={-30} mb={-5} />
            {item && item?.map((res, i) =>
            (<View style={styles.filters} key={i}>
                <TouchableOpacity
                    onPress={() => setSelected(res?.name)}
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                >
                    <Ionicons name={selected === res?.name ? 'ios-radio-button-on' : 'ios-radio-button-off'} color={'#58D36E'} size={17} />
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={styles.textRegular}>{res?.name}</Text>
                    </View>

                    {res?.month && <Ionicons name={selected === res?.name ? 'chevron-up' : 'chevron-down'} color='#000' size={20} position='absolute' alignSelf='center' right={10} />}

                </TouchableOpacity>
                {selected === res?.name && res?.month &&
                    <>
                        <CommonPicker
                            onPress={calendarAction}
                            bg='#F2F2F2'
                            icon={<Ionicons name='calendar' color='#5261E0' size={30} />}
                            mt={-10}
                        >
                            {startDate ?
                                <View style={{ flexDirection: 'row', paddingLeft: 10 }} justifyContent='space-between' >
                                    {startDate && <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#000' }}>{moment(startDate).format("DD/MM/YYYY")}</Text>}
                                    {endDate && <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: startDate == endDate ? "#fff" : "#000" }} > - </Text>}
                                    {endDate && <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#000' }}>{startDate == endDate ? "" : moment(endDate).format("DD/MM/YYYY")}</Text>}
                                </View> :
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 10, color: '#000', paddingLeft: 10 }}>{'Choose Dates'}</Text>
                            }
                        </CommonPicker>
                        {calendarShow && <View style={{ height: height / 3.5, zIndex: 1, }} >
                            <Calendar
                                    onChange={onCaledarChange}                                    
                                    disabledBeforeToday={true}
                                    style={{
                                        // filters: {},
                                        // monthfilters: {},
                                        // weekfilters:{},
                                        monthNameText: { color: '#057EC1', fontWeight: '700' },
                                        // dayNameText: {},
                                        // dayText: {},
                                        // dayTextColor: '#f7f7f7',
                                        // holidayColor: 'rgba(0,0,0,0.5)',
                                        todayColor: 'blue',
                                        // disabledTextColor: '#Hex',
                                        // selectedDayTextColor: '#Hex',
                                        // selectedDayBackgroundColor: '#Hex',
                                        // selectedBetweenDayTextColor: '#Hex',
                                        // selectedBetweenDayBackgroundTextColor: '#Hex',
                                    }}
                                />
                            {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', }}>
                                <CustomButton bg={'#FF7B7B'} label='Cancel' width={width / 2.3} onPress={() => setCalendarShow(false)} />
                                <CustomButton bg={'#58D36E'} label='Confirm' width={width / 2.3} onPress={() => setCalendarShow(false)} />
                            </View> */}
                        </View>}
                    </>
                }
            </View>)
            )}


            <CustomButton
                onPress={onSubmit}
                label={'Apply'} bg='#58D36E'
                width={width / 3.5}
                alignSelf='center'
                my={10}
            />
        </View>
    )
}

export default Filter

const styles = StyleSheet.create({
    filters: {
        paddingHorizontal: 15,
        borderBottomWidth: 0.5,
        paddingVertical: 10,
        borderColor: "#F3F3F3"
    },
    textRegular: {
        color: '#23233C',
        fontFamily: 'Poppins-Regular',
        fontSize: 15,
        marginLeft: 5
    },
    textExtra: {
        fontFamily: 'Poppins-ExtraBold',
        fontSize: 13,
        color: '#089321',
        marginHorizontal: 2
    },
    filterView: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 15,
        alignSelf: 'center',
        shadowOffset: { height: 1, width: 1 },
        elevation: 1,
        shadowOpacity: 0.2,
        position: 'absolute',
        zIndex: 1,
        top: 70
    },
})
