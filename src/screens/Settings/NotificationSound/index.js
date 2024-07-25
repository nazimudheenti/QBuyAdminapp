import { StyleSheet, Text, Image, ScrollView, View, useWindowDimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import ChooseSound from './ChooseSound'
import CustomButton from '../../../Components/CustomButton'
import AuthContext from '../../../contexts/Auth'
import LoaderContext from '../../../contexts/Loader'
import Toast from 'react-native-toast-message'
import Sound from 'react-native-sound'

const NotificationSound = ({ navigation }) => {

    const { width } = useWindowDimensions()
    const Auth = useContext(AuthContext)
    const loading = useContext(LoaderContext)
    const [selected, setSelected] = useState(Auth?.userData?.sound || 'sound1')
    const [playing, setPlaying] = useState(null)
    const data = [
        {
            _id: 'sound1',
            name: 'Sound 1',
            uri: "sound1.mp3"
        },
        // {
        //     _id: 'sound2',
        //     name: 'Sound 2',
        //     uri: "sound2.mp3"
        // },
        // {
        //     _id: 'sound3',
        //     name: 'Sound 3',
        //     uri: "sound3.mp3"
        // },
    ]

    const playSound = async (item) => {
        setPlaying(item)
        let whoosh = new Sound(item?.uri, Sound.MAIN_BUNDLE, (err) => {
            if (err) {
                console.log("err ==>", err);
            } else {
                whoosh.play((success) => {
                    if (success) {
                        setPlaying(null)
                    }
                })
            }
        })
    }

    return (
        <>
            <HeaderWithTitle title={'Notification Sound'} backAction />
            <View style={{ flex: 1, backgroundColor: '#fff', paddingHorizontal: 15, paddingTop: 5 }}>
                {data.map((item) =>
                    <ChooseSound
                        item={item}
                        key={item?._id}
                        selected={selected}
                        playing={playing}
                        setPlaying={() => {
                            playSound(item)
                        }}
                        onPress={() => setSelected(item?._id)}
                    />
                )}
                <CustomButton
                    disabled={Auth?.userData?.sound == selected}
                    loading={loading.loading}
                    label={'Apply'} bg={Auth?.userData?.sound == selected ? "#A9A9A9" : '#58D36E'} mt={50} width={width / 2} alignSelf='center'
                    onPress={() => {
                        loading.setLoading(true)
                        Auth.setPushDetails({ sound: selected })
                        Toast.show({
                            text1: "Notification sound updated successfully",
                        });
                    }}
                />
            </View>

        </>
    )
}

export default NotificationSound

const styles = StyleSheet.create({
    border: {
        height: 4,
        backgroundColor: '#0D4E810D',
        marginVertical: 10
    }
})