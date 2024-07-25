import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';
import customAxios from '../CustomeAxios';
import Toast from 'react-native-toast-message';
import CommonModal from './CommonModal';

const DropdownComponent = ({
  order_id,
  closeModal,
  onRefresh,
  franchise,
  item,
}) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    if (item?.rider_each_order_settlement) {
      setValue(item?.rider_each_order_settlement?.rider_id);
    }
    getRiderList();
  }, [item]);

  const getRiderList = useCallback(async () => {
    try {
      const response = await customAxios.get(
        `admin/onboarding/riders/` + franchise,
      );
      if (response?.data?.data) {
        setLabels(
          response?.data?.data?.map(
            ({email = false, mobile = false, name = false, _id}) => ({
              label: `${name || ''} ${email || ''} ${mobile || ''}`,
              value: _id,
            }),
          ),
        );
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
    // setRiderList()
  }, []);

  const assignRider = useCallback(async () => {
    try {
      setLoading(true);

      const response = await customAxios.post(`admin/shipment/assign-riders`, {
        order_id,
        rider_id: value,
        franchise_id: franchise,
      });

      if (response?.data) {
        onRefresh();
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error,
      });
    } finally {
      closeModal();
    }
  }, [value, order_id]);

  return (
    <CommonModal onClose={closeModal} text={'Assign Rider'}>
      <View
        style={{
          alignItems: 'center',
          paddingHorizontal: 10,
          marginVertical: 10,
        }}>
        <View style={styles.container}>
          <Dropdown
            style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={labels}
            maxHeight={200}
            renderItem={({label}) => {
              const [name, email, mobile] = label?.split(' ');

              return (
                <View
                  style={{
                    padding: 15,
                  }}>
                  {name?.length > 0 && (
                    <Text
                      style={{
                        fontWeight: '700',
                        fontSize: 13,
                        color: '#000',
                      }}>
                      {name}
                    </Text>
                  )}
                  {email?.length > 0 && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#777',
                      }}>
                      {email}
                    </Text>
                  )}
                  {mobile?.length > 0 && (
                    <Text
                      style={{
                        fontSize: 10,
                        color: '#777',
                      }}>
                      {mobile}
                    </Text>
                  )}
                </View>
              );
            }}
            labelField={'label'}
            valueField="value"
            iconColor="#fff"
            placeholder={!isFocus ? 'Select a rider' : '...'}
            searchPlaceholder="Search..."
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
            renderRightIcon={() => (
              <Ionicons
                name={isFocus ? 'chevron-up-circle' : 'chevron-down-circle'}
                size={25}
                color={'#98c258'}
              />
            )}
          />
        </View>

        <TouchableOpacity
          disabled={!value}
          style={{
            backgroundColor: value ? '#98c258' : '#7a7d75',
            alignItems: 'center',
            justifyContent: 'center',
            height: 43,
            width: 83,
            marginTop: 20,
            borderRadius: 4,
          }}
          onPress={loading ? null : assignRider}>
          {loading ? (
            <ActivityIndicator animating color={'#fff'} />
          ) : (
            <Text
              style={{
                fontWeight: '700',
                color: '#fff',
              }}>
              ASSIGN
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </CommonModal>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 13,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
