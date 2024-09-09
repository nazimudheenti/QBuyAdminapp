import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  Modal,
} from 'react-native';
import React, {useState, memo, useCallback, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonItems from '../screens/Orders/CommonItems';
import TableHeading from '../screens/Orders/TableHeading';
// import CommonStoreDetails from './CommonStoreDetails'
// import CustomButton from '../../Components/CustomButton'

const CommonStoreName = memo(
  ({item, currentTab, orderPicked, orderReturned, status, cusStatus}) => {
    const [showItems, setShowItems] = useState(false);
    const [data, setData] = useState([])

    const openDropdown = useCallback(() => {
      setShowItems(!showItems);
    });

    // useEffect(() => { 
    //     let cards = []
    //     item?.product_details?.forEach(({ productdata }) => {
    //         if(!cards.find(({ _id }) => productdata?.store?._id === _id)) {
    //             cards?.push(productdata?.store)
    //         }
    //     });

    //     setData(cards)
    // }, [item])


    return (
      <View style={styles.container}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 10,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../Images/store.png')}
              alt="img"
            />
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: '#23233C',
                fontSize: 12,
                marginLeft: 5,
              }}>
              {item?.product_details?.productdata?.store?.name}
            </Text>
          </View>
          <View>
            <TouchableOpacity onPress={openDropdown}>
              <Ionicons
                name={showItems ? 'chevron-up-circle' : 'chevron-down-circle'}
                size={22}
                color={'blue'}
              />
            </TouchableOpacity>
          </View>
        </View>

        {showItems && (
          <>
            {Array.isArray(item?.product_details) && <TableHeading />}

            {Array.isArray(item?.product_details) &&
              item?.product_details?.map((item, index) => (
                <CommonItems item={item} key={index} />
              ))}
          </>
        )}
      </View>
    );
  },
);

export default CommonStoreName;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F4',
    width: '100%',
    paddingBottom: 10,
  },
  header: {
    borderRadius: 20,
    width: 15,
    height: 15,
    backgroundColor: '#576FD0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  total: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: '#2EA10C',
    marginLeft: 5,
    marginRight: 10,
  },
  type: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#BC0E0E',
    backgroundColor: '#FFEDED',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
  },
});
