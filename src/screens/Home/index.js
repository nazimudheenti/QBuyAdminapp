import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useWindowDimensions,
  SafeAreaView,
  RefreshControl,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import UserImageName from './UserImageName';
import CommonOrderCard from '../Orders/CommonOrderCard';
import Toast from 'react-native-toast-message';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import customAxios from '../../CustomeAxios';
import AuthContext from '../../contexts/Auth';
import SelectTab from '../../Components/SelectTab';
import CommonDatePicker from '../../Components/CommonDatePicker';
import moment from 'moment';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';

let isFirstCheck = true;
const Home = ({navigation}) => {
  const [homeData, setHomeData] = useState([]);
  const [orderHistory, setOrderHistory] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [date, setDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);

  const {width, height} = useWindowDimensions();

  const {getProfileDetails} = useContext(AuthContext);

  const selectNewOrders = useCallback(() => {
    setCurrentTab(0);
  }, []);

  const selectOrderHistory = useCallback(() => {
    setCurrentTab(1);
  }, []);

  const {
    data,
    fetchNextPage,
    refetch,
    isFetchingNextPage,
    isLoading,
    remove: infiniteQueryRemove,
  } = useInfiniteQuery({
    queryKey: ['orderslist'],
    enabled: currentTab === 0,
    queryFn: ({pageParam = 1}) =>
      customAxios.get(`admin/order/mobile-list?page=${pageParam}`),
    getNextPageParam: (lastPage, pages) => {
      if (pages?.length > 0) {
        return pages?.length + 1;
      } else {
        return 1;
      }
    },
  });


  const {
    data: historyData,
    fetchNextPage: fetchHistoryNextPage,
    refetch: historyRefetch,
    isFetchingNextPage: historyIsFetchingNextPage,
    isLoading: historyIsLoading,
    // remove: infiniteQueryRemove,
  } = useInfiniteQuery({
    queryKey: ['completedlist'],
    enabled: currentTab === 1,
    queryFn: ({pageParam = 1}) =>
      customAxios.get('admin/order/completed-list?page='+pageParam),
    getNextPageParam: (lastPage, pages) => {
      if (pages?.length > 0) {
        return pages?.length + 1;
      } else {
        return 1;
      }
    },
  });


  useEffect(() => {
    if (data) {
      setHomeData(data?.pages?.map(page => page?.data?.data?.data)?.flat());
    } 
  }, [data]);

  useEffect(() => { 
    if(historyData) {
      setOrderHistory(historyData?.pages?.map(page => page?.data?.data?.data)?.flat())
    }
  }, [historyData])




  const calendarOpen = useCallback(() => {
    setOpenCalendar(true);
  }, []);

  const calendarClose = useCallback(() => {
    setOpenCalendar(false);
  }, []);

  const selectDate = useCallback(date => {
    setOpenCalendar(false);
    setDate(date);
  }, []);

  const EmptyComponent = (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.4,
        gap: 10,
      }}>
      {/* <Image source={require('../../Images/boil.png')} style={{ width: 70, height: 70, opacity: 0.2 }} /> */}
      <Text
        style={{fontFamily: 'Poppins-Bold', fontSize: 15, color: '#00000030'}}>
        No Orders Available
      </Text>
    </View>
  );

  const renderItem = useCallback(
    ({item}) => (
      <CommonOrderCard
        onRefresh={onRefresh}
        key={item?.id}
        item={item}
      />
    ),
    [],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    if(currentTab === 0) {
      await refetch();
    } else {
      await historyRefetch();
    }
    setRefreshing(false);
    // getProfileDetails();
  }, [currentTab]);

  useEffect(() => { 
    setRefreshing(isLoading || historyIsLoading)
  }, [isLoading, historyIsLoading])

  const onRefreshHis = useCallback(() => {
    setRefreshing(true);
    // getOrderHistory(new Date());
    selectDate(new Date());
    // getProfileDetails();
  }, []);

  const ListFooterComponents = memo(() => {
    return (
      <View style={{marginBottom: 150}}>
        {(isFetchingNextPage || historyIsFetchingNextPage) && (
          <ActivityIndicator size="large" color={'green'} />
        )}
      </View>
    );
  });

  const onEndReached = () => {
    if (data?.pages?.length < data?.pages?.[0]?.data?.data?.last_page && currentTab === 0) {
      fetchNextPage();
    } else if (historyData?.pages?.length < historyData?.pages?.[0]?.data?.data?.last_page && currentTab === 1) {
      fetchHistoryNextPage()
    }
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <UserImageName />
        <View
          style={{
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <SelectTab
            label={'New Orders'}
            onPress={selectNewOrders}
            selected={currentTab === 0}
            wid={width / 2.3}
            fontSize={16}
          />
          <SelectTab
            label={'Order History'}
            onPress={selectOrderHistory}
            selected={currentTab === 1}
            wid={width / 2.3}
            fontSize={16}
          />
        </View>
        <View
          style={{
            backgroundColor: '#00000014',
            height: 2,
            marginTop: -1.5,
            marginBottom: 20,
          }}
        />

        <FlatList
          style={{backgroundColor: '#fff', paddingHorizontal: 15}}
          // ListHeaderComponent={
          //   currentTab === 1 && (
          //     <>
          //       <CommonDatePicker
          //         onPress={calendarOpen}
          //         date={date ? date : new Date()}
          //         label={date ? moment(date).format('DD-MM-YYYY') : null}
          //         openCalendar={openCalendar}
          //         onConfirm={selectDate}
          //         onCancel={calendarClose}
          //         mt={5}
          //         clearAction={() => {
          //           selectDate(null);
          //         }}
          //       />
          //       <View style={{height: 30}} />
          //     </>
          //   )
          // }
          onEndReached={onEndReached}
          data={currentTab === 0 ? homeData : orderHistory}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={currentTab === 0 ? onRefresh : onRefreshHis}
            />
          }
          ListEmptyComponent={EmptyComponent}
          ListFooterComponent={ListFooterComponents}
        />
      </SafeAreaView>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  textBold: {
    fontFamily: 'Poppins-Bold',
    color: '#FF4646',
    fontSize: 18,
  },
  textRegular: {
    fontFamily: 'Poppins-Regular',
    color: '#23233C',
    fontSize: 18,
  },
  viewAllText: {
    fontFamily: 'Poppins-Medium',
    color: '#118826',
    fontSize: 11,
  },

  newOrders: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});
