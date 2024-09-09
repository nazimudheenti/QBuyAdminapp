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
import React, {useState, memo, useCallback, useContext, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../Components/CustomButton';
import CommonModal from '../../Components/CommonModal';

import CommonStatusCard from '../../Components/CommonStatusCard';
import CommonItems from './CommonItems';
import TableHeading from './TableHeading';
import TotalBill from './TotalBill';
import moment from 'moment';
import LoaderContext from '../../contexts/Loader';
import customAxios from '../../CustomeAxios';
import Toast from 'react-native-toast-message';
import isEmpty from 'lodash/isEmpty';
import has from 'lodash/has';
import CommonStoreName from '../../Components/CommonStoreName'
// import reactotron from 'reactotron-react-native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CommonSelectDropdown from '../../Components/CommonSelectDropdown';
import {COLORS} from '../../config/COLORS';

const CommonOrderCard = memo(props => {
  const {item, onRefresh} = props;

  //reactotron.log(item, "FROM HOME")

  const {width} = useWindowDimensions();

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState({visible: false});
  const [show, setShow] = useState(false);
  const [cancelled, setCancelled] = useState(false); // dummy state for loading the page
  const loadingg = useContext(LoaderContext);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal]);

  //reactotron.log(modalVisible, "MODAL")

  const openModal = data => {
    setModalVisible({visible: true, ...data});
  };

  const handleShow = useCallback(() => {
    setShow(!show);
  }, [show]);

  // const returnOrder = async () => {

  //     try {
  //         const returnData = await customAxios.post('vendor/vendor-order-retrived', { order_id: item?._id })

  //         Toast.show({
  //             type: 'success',
  //             text1: 'Order returned successfully'
  //         });

  //         setCancelled(true);
  //     } catch (error) {
  //         Toast.show({
  //             type: 'error',
  //             text1: error?.response?.data?.message || error?.message
  //         });
  //     }
  // }

  const closeModal = useCallback(() => {
    setModalVisible({visible: false});
  }, []);

  const onSubmit = async datas => {
    datas = {
      order_id: item?._id,
      status: modalVisible.statusName,
    };

    loadingg.setLoading(true);

    try {
      //let bundleId = DeviceInfo.getBundleId();
      //const type = bundleId.replace("com.qbuystoreapp.", "")
      const response = await customAxios.post(`admin/order/status`, datas);
      // if (response && has(response, "data.data") && !isEmpty(response.data.data)) {
      //     Toast.show({
      //         text1: response?.data?.message || "Order status changed successfully !!!"
      //     });
      // }
      if (response?.data?.status === 200 || 201) {
        Toast.show({
          text1:
            response?.data?.message || 'Order status changed successfully !!!',
        });
      }
      onRefresh && onRefresh();
      loadingg.setLoading(false);
      closeModal();
    } catch (error) {
      console.log('error', error);
      loadingg.setLoading(false);
      Toast.show({
        type: 'error',
        text1: error,
      });
    }
  };

  // console.log(typeof item?.itemDetails);

  const renderButton = ({status, paymentStatus, item}) => {
    if (
      status === 'cancelled' ||
      paymentStatus === 'cancelled' ||
      status === 'completed'
    ) {
      return;
    }

    return (
      <View>
        <View
          style={{flexDirection: 'row', marginBottom: 15, alignSelf: 'center'}}>
          {showModal ? (
            <CommonSelectDropdown
              closeModal={handleShowModal}
              order_id={item?._id}
              franchise={item?.franchise}
              item={item}
              onRefresh={onRefresh}
            />
          ) : null}

          <CustomButton
            style={{flex: 1}}
            onPress={handleShowModal}
            label={item?.rider_each_order_settlement ? 'REASSIGN' : 'ASSIGN'}
            bg={item?.rider_each_order_settlement ? '#f71c1b' : '#0f02ff'}
            mx={8}
          />
        </View>

        <View
          style={{flexDirection: 'row', marginBottom: 15, alignSelf: 'center'}}>
          {status === 'created' && item?.order_type !== 'pickup' ? (
            <CustomButton
              onPress={() =>
                openModal({
                  title:
                    'Are you sure you want to change the status of the order to Preparing?',
                  bgColor: '#576FD0',
                  status: 2,
                  statusName: 'preparing',
                })
              }
              label={'Preparing'}
              bg="#576FD0"
              ml={8}
              style={{flex: 1}}
            />
          ) : status === 'preparing' ? (
            <View style={{flex: 1}}>
              <CustomButton
                onPress={() =>
                  openModal({
                    title:
                      'Are you sure you want to change the status of the order to Ready?',
                    bgColor: '#C7B63E',
                    status: 3,
                    statusName: 'ready',
                  })
                }
                label={'Ready'}
                bg="#C7B63E"
                mx={8}
              />
            </View>
          ) : status === 'ready' ||
            (status === 'created' && item?.order_type === 'pickup') ? (
            <View style={{flex: 1}}>
              <CustomButton
                style={{flex: 1}}
                onPress={() =>
                  openModal({
                    title:
                      'Are you sure you want to change the status of the order to Picked up?',
                    bgColor: '#C7B63E',
                    status: 4,
                    statusName: 'pickedup',
                  })
                }
                label={'Picked up'}
                bg={'#C7B63E'}
                mx={8}
              />
            </View>
          ) : status === 'pickedup' ? (
            <View style={{flex: 1}}>
              <CustomButton
                style={{flex: 1}}
                onPress={() =>
                  openModal({
                    title:
                      'Are you sure you want to change the status of the order to On the way?',
                    bgColor: '#3ac93f',
                    status: 4,
                    statusName: 'ontheway',
                  })
                }
                label={'On the way'}
                bg={'#3ac93f'}
                mx={8}
              />
            </View>
          ) : status === 'ontheway' ? (
            <View style={{flex: 1}}>
              <CustomButton
                style={{flex: 1}}
                onPress={() =>
                  openModal({
                    title:
                      'Are you sure you want to change the status of the order to On location?',
                    bgColor: '#3ac93f',
                    status: 4,
                    statusName: 'onlocation',
                  })
                }
                label={'On location'}
                bg={'#3ac93f'}
                mx={8}
              />
            </View>
          ) : status === 'onlocation' ? (
            <View style={{flex: 1}}>
              <CustomButton
                style={{flex: 1}}
                onPress={() =>
                  openModal({
                    title:
                      'Are you sure you want to change the status of the order to Completed?',
                    bgColor: '#3ac93f',
                    status: 4,
                    statusName: 'completed',
                  })
                }
                label={'Completed'}
                bg={'#3ac93f'}
                mx={8}
              />
            </View>
          ) : null}

          <CustomButton
            style={{flex: 1}}
            onPress={() =>
              openModal({
                title:
                  'Are you sure you want to change the status of the order to Cancel?',
                bgColor: '#e80528',
                status: 4,
                statusName: 'cancelled',
              })
            }
            label={'Cancel'}
            bg={'#ed5c72'}
            mx={8}
          />
        </View>
      </View>
    );

    // switch (status) {

    //     case "paid":
    //         return (<View style={{ flexDirection: "row" }}>
    //             <CustomButton
    //                 onPress={() => openModal({ title: "Are you sure you want to accept this order?", bgColor: "#576FD0", status: 2 })}
    //                 label={'Accept Order'} bg='#576FD0' ml={8}
    //                 style={{ flex: 1 }}
    //             />
    //             <CustomButton
    //                 style={{ flex: 1 }}
    //                 onPress={() => openModal({ title: "Are you sure you want to cancel this order?", bgColor: "#FF7B7B", status: 6 })}
    //                 label={'Cancel Order'} bg='#FF7B7B' mx={8}
    //             />
    //         </View>)

    //     case "Processing":
    //         return (<CustomButton
    //             onPress={() => openModal({ title: "Are you sure you want to change the status of the order to Ready?", bgColor: "#C7B63E", status: 3 })}
    //             label={'Order Ready'} bg='#C7B63E' mx={8}
    //         />)
    //     case "Out for delivery":
    //         return (<CustomButton
    //             onPress={() => openModal({ title: "Are you sure you want to change the status of the order to Out for delivery?", bgColor: "#58D36E", status: 4 })}
    //             label={'Out for delivery'} bg='#58D36E' mx={8}
    //         />)
    //     // case "On the Way":
    //     //     return (<CustomButton
    //     //         onPress={() => openModal({ title: "Are you sure you want to complete this order?", bgColor: "#58D36E", status: 5 })}
    //     //         label={'Complete Order'} bg='#58D36E' mx={8}
    //     //     />)

    //     // case "Order Cancelled":
    //     //     return !cancelled && (
    //     //         <CustomButton
    //     //             onPress={returnOrder}
    //     //             label={'Accept Return'} bg='#58D36E' mx={8}
    //     //         />
    //     //     )

    //     // case "completed":
    //     //     return (<CustomButton onPress={() => navigation.navigate('Orders', { mode: 'complete' })} label={'Order Completed'} bg='#58D36E' mx={8} />)

    //     case "Cancelled":
    //     case "Delivered":
    //         return (
    //             null
    //             // <CustomButton
    //             //     onPress={() => navigation.navigate('Orders', { mode: 'complete' })}
    //             //     label={'Order Cancelled'} bg='#FF7B7B' mx={8}
    //             // />
    //         )
    //     // case "readyTopickup":
    //     //     return (
    //     //         <CustomButton
    //     //             onPress={null}
    //     //             label={'Ready To PickUp'} bg='#58D36E' mx={8}
    //     //         />
    //     //     )

    //     default:
    //         return
    // }
  };

  const renderStatusLabel = status => {
    switch (status) {
      case 'ready':
        return (
          <CommonStatusCard
            label={status}
            bg="#FFF082"
            labelColor={'#A99500'}
          />
        );
      case 'created':
        return (
          <CommonStatusCard
            label={status}
            bg="#CCF1D3"
            labelColor={'#58D36E'}
          />
        );
      case 'preparing':
        return (
          <CommonStatusCard
            label={status}
            bg="#BCDEFF"
            labelColor={'#2900FF'}
          />
        );
      case 'completed':
        return (
          <CommonStatusCard
            label={status}
            bg="#CEFFBC"
            labelColor={'#1DB145'}
          />
        );
      case 'cancelled':
        return (
          <CommonStatusCard
            label={status}
            bg="#FFBCBC"
            labelColor={'#FF0000'}
          />
        );
      default:
        return (
          <CommonStatusCard
            label={status === 'orderReturn' ? 'Return' : status}
            bg="#FFF082"
            labelColor={'#A99500'}
          />
        );
    }
  };

  //reactotron.log(item, 'check details');

  // if(item?.status === 'completed') {
  //   return
  // }

  return (
    <>
      <View style={{marginBottom: 20, paddingHorizontal: 1}}>
        <Text style={styles.dateText}>
          {moment(item?.created_at).format('DD-MM-YYYY hh:mm A')}
        </Text>
        <View key={item?._id} style={styles.container}>
          <View style={styles.containerHead}>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.orderIdLabel}>{'Order ID : '}</Text>
              <Text style={styles.orderId}>{item?.order_id}</Text>
            </View>
            {item?.order_type === 'pickup' ? (
              <View
                style={{
                  width: 100,
                  backgroundColor: '#BCE5FF',
                  alignItems: 'center',
                  borderRadius: 5,
                  paddingVertical: 3,
                }}>
                <Text
                  style={{
                    fontFamily: 'Poppins-SemiBold',
                    fontSize: 10,
                    color: '#576FD0',
                  }}>
                  Pickup & Drop
                </Text>
              </View>
            ) : (
              renderStatusLabel(item?.status)
            )}
          </View>
          <View style={{paddingLeft: 10, paddingVertical: 10, gap: 5}}>
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#000',
                  fontSize: 13,
                  flex: 3,
                }}>
                Customer Details :{' '}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: '#000',
                  fontSize: 13,
                  flex: 2,
                }}>
                {item?.order_type === 'pickup'
                  ? item?.name === 'null' || !item?.name ? '-' : item?.name
                  : item.shipaddress?.name}
              </Text>

              <TouchableOpacity
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingRight: 20,
                }}
                onPress={handleShow}>
                {show ? (
                  <Ionicons name="chevron-up-circle" size={23} color={'blue'} />
                ) : (
                  <Ionicons
                    name="chevron-down-circle"
                    size={23}
                    color={'blue'}
                  />
                )}
              </TouchableOpacity>
            </View>

            {show && (
              <View
                style={{
                  width: '97%',
                  marginHorizontal: 'auto',
                  backgroundColor: '#F8F8F8',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  gap: 5,
                  borderRadius: 12,
                  marginBottom: 10,
                }}>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.mainLabel}>{'Name : '}</Text>
                  <Text style={[styles.dateText, {fontSize: 12, flex: 2}]}>
                    {item?.order_type === 'pickup'
                      ? item?.name === 'null' || !item?.name ? '-' : item?.name
                      : item.shipaddress?.name}
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.mainLabel}>{'Address : '}</Text>
                  <Text style={[styles.dateText, {fontSize: 12, flex: 2}]}>
                    {item?.order_type === 'pickup'
                      ? item?.shipping_address
                      : item?.shipaddress?.area?.address}
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.mainLabel}>{'Mobile : '}</Text>
                  <Text style={[styles.dateText, {fontSize: 12, flex: 2}]}>
                    {item?.order_type === 'pickup'
                      ? item?.mobile
                      : item?.shipaddress?.mobile}
                  </Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                  <Text style={styles.mainLabel}>{'Delivery Date : '}</Text>
                  <Text style={[styles.dateText, {fontSize: 12, flex: 2}]}>
                    {moment(item?.delivery_date, 'YYYY-MM-DD').format(
                      'DD-MM-YYYY',
                    )}
                  </Text>
                </View>

                {/* <View style={{
                                        width: '100%',
                                        flexDirection: 'row'
                                    }}>
                                        <Text style={styles.mainLabel}>{'Delivery Slot : '}</Text>
                                        <Text style={[styles.dateText, { fontSize: 12, flex: 2 }]}>{item?.delivery_slot?.fromTime} ~ {item?.delivery_slot?.toTime}</Text>
                                    </View> */}
              </View>
            )}

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#000',
                  fontSize: 13,
                }}>
                Payment Status :{' '}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color:
                    item?.payment_status === 'completed' &&
                    item?.payment_type === 'online'
                      ? '#1DB145'
                      : '#E29D1B',
                  fontSize: 13,
                }}>
                {item?.payment_status}
              </Text>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  color: '#000',
                  fontSize: 13,
                }}>
                Payment Type :{' '}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: '#E29D1B',
                  fontSize: 13,
                }}>
                {item?.payment_type}
              </Text>
            </View>
          </View>

 

          { Array.isArray(item?.product_details) && <TableHeading /> }

          {Array.isArray(item?.product_details) &&
            item?.product_details?.map((item, index) => (
              <CommonItems item={item} key={index} />
            ))}

          {/* <TotalBill value={item?.total_amount} label="Item Total" containerStyle={{ marginTop: 0, paddingBottom: 0, paddingTop: 5 }} textStyle={{ fontFamily: 'Poppins-Regular', fontSize: 12, }} /> */}
          {/* <TotalBill value={item?.delivery_charge} label="Delivery Fee" containerStyle={{ marginTop: 0, paddingBottom: 0, paddingTop: 5 }} textStyle={{ fontFamily: 'Poppins-Regular', fontSize: 12, }} /> */}

          {/* {item?.grand_total && <TotalBill value={item?.vendor_order_total_price} />} */}
          <TotalBill value={Number(item?.grand_total).toFixed(2)} />
          {/* {item?.order_status === "ready" ? renderButton("readyTopickup") : renderButton(item?.order_status)} */}
          {item?.orderStatus === 'Delivered'
            ? null
            : renderButton({
                status: item?.status,
                paymentStatus: item?.payment_status,
                item,
                // order: item?.orderStatus,
              })}
        </View>
      </View>

      <CommonModal visible={modalVisible?.visible} onClose={() => closeModal()}>
        <Ionicons
          name={'alert-circle'}
          size={40}
          color={'#FF0000'}
          alignSelf="center"
          marginTop={-10}
        />
        <Text style={styles.lightText}>{modalVisible?.title || ''}</Text>
        <CustomButton
          onPress={onSubmit}
          label={'Confirm'}
          bg={modalVisible?.bgColor || '#58D36E'}
          width={width / 3.5}
          alignSelf="center"
          my={10}
          loading={loadingg?.loading}
        />
      </CommonModal>
    </>
  );
});

export default CommonOrderCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    backgroundColor: '#fff',
    paddingBottom: 10,
    shadowOffset: {height: 1, width: 1},
    elevation: 1,
    shadowOpacity: 0.2,
  },
  containerHead: {
    flexDirection: 'row',
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateText: {
    fontFamily: 'Poppins-SemiBold',
    color: '#23233C',
    fontSize: 11,
    // marginLeft: 1
  },
  orderIdLabel: {
    fontFamily: 'Poppins-Medium',
    color: '#23233C',
    fontSize: 10,
  },
  orderId: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 10,
    color: '#23233C',
  },

  lightText: {
    fontFamily: 'Poppins-Light',
    color: '#000000',
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 30,
  },
  mainLabel: {
    fontSize: 12,
    color: '#555',
    marginRight: 12,
    flex: 1,
    fontFamily: 'Poppins-Medium',
  },
});
