import { StyleSheet, Text, ScrollView, Switch, View, useWindowDimensions, Image, TouchableOpacity, Platform, TextInput, Pressable, Keyboard, Modal } from 'react-native'
import React, { useState, useEffect, useCallback, useContext } from 'react'
import HeaderWithTitle from '../../../Components/HeaderWithTitle'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons'
import CommonInput from '../../../Components/CommonInput';
import CommonSelectDropdown from '../../../Components/CommonSelectDropdown';
import CustomButton from '../../../Components/CustomButton';
import AuthContext from '../../../contexts/Auth';
import isEmpty from 'lodash/isEmpty';
import isNull from 'lodash/isNull';
import has from 'lodash/has';
import customAxios from '../../../CustomeAxios';
import Toast from 'react-native-toast-message';
import { IMG_URL, mode } from '../../../config/constants';
import LoaderContext from '../../../contexts/Loader';
import CommonSquareButton from '../../../Components/CommonSquareButton';
import ImageGrid from '@baronha/react-native-image-grid';

import { openPicker } from '@baronha/react-native-multiple-image-picker';
// import reactotron from 'reactotron-react-native';
import CommonModal from '../../../Components/CommonModal';

const CustomTextInput = ({ label = "", error, onChangeText, value, keyboardType = "default", editable = true }) => {
    return <View style={{ flex: 1 }}>
        <Text style={{
            fontFamily: 'Poppins-Regular',
            color: '#23233C',
            fontSize: 11,
            marginLeft: 5,
        }}>{label}</Text>
        <View style={{
            backgroundColor: '#F2F2F2',
            borderRadius: 7,
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 2,
            marginLeft: 1,
            shadowOffset: { width: 1, height: 5 },
        }}>
            <TextInput style={{ flex: 1, height: 45 }}
                onChangeText={onChangeText} value={value}
                keyboardType={keyboardType}
                editable={editable}
                color='#23233C'
            />
        </View>
        <Text style={{
            fontFamily: 'Poppins-Regular',
            color: 'red',
            fontSize: 9,
            marginLeft: 5,
            position: "absolute",
            bottom: -15
        }}>{error}</Text>
    </View>
}

const CustomOptionInput = ({ onChangeText, value, err, editable }) => {

    const [data, setData] = useState(value || "")
    const [error, setErrorFn] = useState(err || "")

    useEffect(() => {
        setErrorFn(err)
    }, [err])


    return <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{
            backgroundColor: '#F2F2F2',
            borderRadius: 7,
            shadowOpacity: 0.1,
            shadowRadius: 5,
            elevation: 2,
            marginLeft: 1,
            shadowOffset: { width: 1, height: 5 },
            flex: 1,
        }}>
            <TextInput style={{ flex: 1, height: 45 }}
                onChangeText={(v) => {
                    setData(v)
                    setErrorFn("")
                }} value={data}
                editable={editable}
                color='#23233C'
            />
            <Text style={{
                fontFamily: 'Poppins-Regular',
                color: 'red',
                fontSize: 9,
                marginLeft: 5,
                position: "absolute",
                bottom: -15
            }}>{error}</Text>
        </View>
        <CommonSquareButton ml={10} iconName={"add-circle-outline"}
            disabled={!editable}
            onPress={() => {
                if (!isEmpty(data)) {
                    onChangeText(data)
                    setData("")
                } else {
                    setErrorFn("Please enter an option value")
                }
            }}
        />
    </View>
}


const AddNewProduct = ({ navigation, route }) => {
    const { width, height } = useWindowDimensions();
    const { vendorCategoryList = [], userData } = useContext(AuthContext)
    const { setLoading, loading } = useContext(LoaderContext)
    const item = route?.params?.item || {}

    // reactotron.log(item, "ITEM!23")

    const disabled = /* true// */item?.approval_status ? !(item?.approval_status == "pending") : false
    const [filePath, setFilePath] = useState(null);
    const [filePathMultiple, setFilePathMultiple] = useState(null);
    const [variant, setVariant] = useState(!isEmpty(item?.variants) || false);
    const [attributess, setAttributess] = useState(item?.attributes || []);
    const [error, setErrorFn] = useState({});
    const [options, setOptions] = useState(item?.variants || []);
    const [images, setImages] = useState([]);

    const setFormData = (field, value) => {
        setAttributess([...value]);
        setErrorFn({})
    }

    // reactotron.log(options, "filePathMultiple!23")


    const schema = yup.object({
        variant: yup.boolean(),
        name: yup.string().required('Product name is required'),
        price: yup.number()
            .typeError('Price must be a number')
            .nullable(true)
            .positive('Price must be a number')
            .when("variant", {
                is: false,
                then: () => yup.string().required("Price is required")
            }),
        category: yup.object({
            _id: yup.string().required("Category is required"),
            name: yup.string().required("Category is required")
        }),
        product_image: yup.object().required("Product Image is required")
    }).required();

    const { control, handleSubmit, formState: { errors }, setValue, clearErrors, getValues, reset, setError } = useForm({
        resolver: yupResolver(schema),
    });

    // reactotron.log(errors, "ERR")

    useEffect(() => {
        if (!isEmpty(item)) {
            let newData = {
                name: item.name,
                category: item?.category,
                description: item?.description,

            }
            if (item?.seller_price) {
                newData.price = item?.seller_price
            }
            if (item?.image) {
                newData.image = item?.image
            }
        
                newData.variant = item?.variant
            
            if (item.product_image) {
                newData.product_image = {
                    fileName: item?.product_image,
                    uri: IMG_URL + item?.product_image,
                    type: `image/${item?.product_image.split(".")[1]}`
                }
            }
            setFilePath({ uri: IMG_URL + item?.product_image })

            if ((item?.image && !item?.image.includes('null'))) {
                const multiple = item?.image && item?.image?.map((res) => ({
                    uri: IMG_URL + res
                })

                )
                setFilePathMultiple(multiple)
            } else {
                setFilePathMultiple([])
            }

    // reactotron.log({newData},'NEW DATATA')
             

            reset(newData)
        }
    }, [])

    const imageGalleryLaunch = useCallback(() => {
        let options = {
            title: "Select Images/Videos",
            mediaType: "photo",
            selectionLimit: 1,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },

        };
        launchImageLibrary(options, (res) => {

            if (res.didCancel) {
                // console.log('User cancelled image picker');
            } else if (res.error) {
                setFilePath(null)
                //setError("product_image", null)
            } else if (res.customButton) {
                // console.log('User tapped custom button: ', res.customButton);
                // alert(res.customButton);
            } else {
                // const source = { uri: res.uri };
                setFilePath(res?.assets[0])
                setValue("product_image", res?.assets[0])
                clearErrors()
            }
        });
    }, [])


    const imageGalleryLaunchMultiple = useCallback(() => {
        let options = {
            title: "Select Images/Videos",
            mediaType: "photo",
            selectionLimit: 6,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },

        };
        launchImageLibrary(options, (res) => {

            if (res.didCancel) {
                // console.log('User cancelled image picker');
            } else if (res.error) {
                setFilePathMultiple(null)
            } else if (res.customButton) {
                // console.log('User tapped custom button: ', res.customButton);
                // alert(res.customButton);
            } else {
                // const source = { uri: res.uri };

                setFilePathMultiple(res?.assets)
                MultipleImageSubmit(res?.assets)
                // setValue("image", res?.assets[0])
                clearErrors()
            }
        });
    }, [])

    const MultipleImageSubmit = async (imagesArray) => {
        try {
            let body = new FormData()
            imagesArray.forEach((data, index) => {
                body.append(`image[${index}]`, {
                    uri: data.uri,
                    type: data.type,
                    name: data.fileName,
                });
            });
            const response = await customAxios.post(`vendor/product/multipleupload`, body, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            setValue('image', response?.data?.data)
            setImages(response?.data?.data)

        } catch (err) {

        }
    }



    const onSubmit = async (data) => {
// reactotron.log({data},'DATATAT')
        Keyboard.dismiss()

        //console.log("data ==>", data);
        setLoading(true)
        try {
            let body = new FormData()
            body.append("type", userData?.type)
            body.append("store", JSON.stringify(userData?.store))
            body.append("franchisee", JSON.stringify(userData?.franchisee))
            body.append("name", data.name)
            body.append("description", data.description)
            body.append("category", JSON.stringify(data.category))
            body.append("product_image", {
                uri: data?.product_image?.uri,
                type: data?.product_image?.type,
                name: data?.product_image?.fileName,
            })

            body.append('image', images?.length > 0 ? data?.image : null)


            if (item?._id) {
                body.append("id", item?._id)
            }

            body.append("variant", data?.variant ?  data?.variant : false)
            if (data?.variant) {
                const valid = validateData()
                if (valid) {
                    //setLoading(false)
                    // return false
                    // console.log("attributess", JSON.stringify(attributess), "variants", JSON.stringify(options));
                    body.append("attributess", JSON.stringify(attributess))
                    body.append("variants", JSON.stringify(options))

                } else {
                    setLoading(false)
                    return false
                }
            } else {
                if (!data?.price || isNull(data?.price)) {
                    setError("price", { message: "Price is required" })
                    setLoading(false)
                    return false
                } else {
                    body.append("price", data.price)
                }
            }

            // return false
            const response = await customAxios.post(`vendor/newproduct/${item?._id ? 'update' : 'create'}`, body, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            })
            if (response?.data) {
                Toast.show({
                    text1: response?.data?.message
                });
                setTimeout(() => {
                    navigation.goBack()
                }, 500);
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)

            Toast.show({
                type: 'error',
                text1: error
            });
        }
    }


    const validateData = () => {
        let error = {}
        attributess.map((attribute, index) => {
            if (isEmpty(attribute?.name)) {
                error.attribute = error.attribute || { [index]: { name: "" } }
                error.attribute[index] = { name: "Please enter attribute name" }
            }
            if (isEmpty(attribute?.options)) {
                error.attribute = error.attribute || { [index]: { options: "" } }
                error.attribute[index]["options"] = /* { options: */ "Please enter attribute options" //}
            }
        })
        options.map(({ seller_price }, index) => {
            if (!seller_price || isNull(seller_price)) {
                error.options = error.options || {}
                error.options[index] = "Please enter attribute price"
            }
        })

        setErrorFn(error)
        return isEmpty(error)
    }

    const addAttribute = () => {
        let error = {}
        attributess?.map((attribute, index) => {
            if (isEmpty(attribute?.name)) {
                error.attribute = {}
                error.attribute[index] = "Please enter attribute name"
            }
        })
        if (isEmpty(error)) {
            setFormData("attributess", [...attributess, { name: "", options: [], variant: true }])
        } else {
            setErrorFn(error)
        }
    }

    const removeAttribute = (index) => {

        let error = {}
        if (attributess?.length == 1) {
            error.attribute = {}
            error.attribute[0] = "Unable to remove attribute"
        }
        if (isEmpty(error)) {
            let tmp = attributess.filter((attribute, i) => i !== index)
            setFormData("attributess", tmp)
        } else {
            setErrorFn(error)
        }
    }

    useEffect(() => {
        if (attributess.length > 0) {
            let tmp = renderOptions(attributess?.map(({ options }) => options))

            if (!isEmpty(item?.variants)) {
                tmp.map((variant, i) => {
                    tmp[i] = { ...item?.variants[i], ...variant }
                })
            }

            setOptions(tmp)
        }
    }, [attributess])

    const renderOptions = (arr) => {
        let n = arr.length;
        let indices = new Array(n);
        let attributs = []
        let combinationList = []
        for (let i = 0; i < n; i++)
            indices[i] = 0;
        while (true) {
            for (let i = 0; i < n; i++)
                attributs.push(arr[i][indices[i]])
            combinationList.push({ attributs: attributs || [], title: attributs?.join("-") })
            let next = n - 1;
            while (next >= 0 && (indices[next] + 1 >= arr[next].length))
                next--;
            if (next < 0) return combinationList;
            indices[next]++;
            for (let i = next + 1; i < n; i++)
                indices[i] = 0;
            attributs = []
        }
    };

    const DeleteImages = (images) => {
        const filter = filePathMultiple.filter((res) => res?.fileName !== images.fileName);
        MultipleImageSubmit(filter)
        setFilePathMultiple(filter)
    }

    const [modalVisible, setModalVisible] = useState({ visible: false });
    const [selectedImage, setSelectedImage] = useState(null)

    const openModal = (index) => {
        setSelectedImage(filePathMultiple[index])
        setModalVisible({ visible: true })
    }

    const closeModal = useCallback(() => {
        setModalVisible({ visible: false })
        setSelectedImage(null)
    }, [])



    return (
        <>
            <HeaderWithTitle title={isEmpty(item) ? 'Add New Product' : `${item?.approval_status === "pending" ? "Edit" : "View"} Product`} backAction />
            <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: '#fff', flex: 1, paddingHorizontal: 15 }} keyboardShouldPersistTaps="always">

                <TouchableOpacity
                    disabled={disabled}
                    onPress={imageGalleryLaunch}
                    style={styles.imageContainer}
                >
                    {filePath ? <Image
                        style={{ width: '100%', height: 200, borderRadius: 20 }}
                        alignSelf='center'
                        source={{ uri: filePath?.uri }} alt='img'
                    /> :
                        <View style={{ marginTop: 50 }}>
                            <TouchableOpacity
                                onPress={imageGalleryLaunch}
                                style={styles.openCam}
                            >
                                <Ionicons name='ios-cloud-upload' color='#58D36E' size={45} />
                                <Text style={{ fontFamily: 'Poppins-Regular', fontSize: 11, color: '#707070', }}>Upload Image</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </TouchableOpacity>
                {errors.product_image && <Text style={{ color: "#FF0000", fontSize: 11, fontFamily: "Poppins-Regular", marginTop: 2 }}>{errors.product_image.message}</Text>}
                <View>

                    {item?.approval_status === "pending" || isEmpty(item) ? (<TouchableOpacity onPress={imageGalleryLaunchMultiple} style={{ display: 'flex', justifyContent: 'center', width: width / 2, height: 35, alignItems: 'center', backgroundColor: '#58D36E', marginVertical: 5, borderRadius: 8 }}>
                        <Text style={{ color: '#fff', letterSpacing: .5 }}>Upload Additional Images</Text>
                    </TouchableOpacity>) : null}
                    <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: 5, marginTop: 5 }}>
                        {filePathMultiple?.length > 0 && filePathMultiple?.map((filpath, index) => (
                            <View >
                                <TouchableOpacity key={index} onPress={() => openModal(index)}>
                                    <Image
                                        style={{ width: 60, height: 60, borderRadius: 20, }}
                                        alignSelf='center'
                                        source={{ uri: filpath?.uri }} alt='img'
                                    />
                                </TouchableOpacity>

                                {item?.approval_status === "pending" || isEmpty(item) ? (<TouchableOpacity style={{ position: 'absolute', right: -2, top: -10 }} onPress={() => DeleteImages(filpath)}>
                                    <Ionicons name='close-circle' color='red' size={25} />
                                </TouchableOpacity>) : null}
                            </View>

                        ))}
                        <Modal style={{backgroundColor: "#000"}} transparent={true} animationType="slide" visible={modalVisible?.visible} >
                            <View style={{ marginTop:height/3, backgroundColor: "red", alignSelf: "center", justifyContent: "center", width: 350, height:250, borderRadius: 20 }}>
                                <TouchableOpacity onPress={closeModal} style={{ alignSelf: 'flex-end', padding: 10, zIndex: 1, position: "absolute", top: -5 }}>
                                    <Ionicons name={'close-circle'} size={28} color={'#000'} />
                                </TouchableOpacity>
                                {selectedImage && <Image
                                    style={{ width: '100%', height: '100%', borderRadius: 20, resizeMode: "cover" }}
                                    source={selectedImage} alt='img'
                                />}
                            </View>
                        </Modal>

                    </View>



                </View>
                {!isEmpty(errors?.image?.fileName) && <Text style={styles.errorText}>{errors?.image?.fileName?.message || ""}</Text>}
                <CommonInput
                    control={control}
                    error={errors.name}
                    fieldName="name"
                    backgroundColor='#F2F2F2'
                    topLabel={'Product Name'}
                    top={15}
                    editable={!disabled}
                />
                <CommonSelectDropdown
                    error={errors.category?._id}
                    topLabel={'Category'}
                    data={userData?.category_id}
                    value={getValues("category")}
                    backgroundColor='#F2F2F2'
                    mt={15}
                    labelField="name"
                    valueField="name"
                    onChange={value => {

                        delete value?._index
                        setValue("category", { _id: value.id, name: value?.name })
                        clearErrors()
                    }}
                    disable={disabled}
                />
                <View style={{ justifyContent: "space-between", flexDirection: "row", marginVertical: 20 }}>
                    <Text style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#23233C',
                        fontSize: 12,
                        marginLeft: 5,
                    }}>Product Attributes</Text>
                    <Switch
                        disabled={disabled}
                        trackColor={{ false: '#f0c9c9', true: '#c7f2cf' }}
                        thumbColor={variant ? '#58D36E' : '#D35858'}
                        ios_backgroundColor="#f0c9c9"
                        onValueChange={(value) => {
                            setVariant(value)
                            setValue("variant", value)
                        }}
                        value={variant}
                        style={{ transform: [{ scaleX: .8 }, { scaleY: .8 }] }}
                    />
                </View>
                {variant ? <View style={{}}>
                    {
                        (attributess?.length > 0 ? attributess : [{ name: "", options: [], variant: true }])?.map((item, index) => {
                            return <View style={{ borderWidth: 1, borderColor: "#58D36E", borderStyle: "dashed", borderRadius: 5, padding: 5, marginBottom: 10 }}>
                                <View style={{ flexDirection: "row", alignItems: "flex-end", marginBottom: 10 }}>
                                    <CustomTextInput label="Attribute Name"
                                        error={error?.attribute?.[index]?.name}
                                        value={item?.name || ""}
                                        onChangeText={(name) => {
                                            let tmp = attributess
                                            tmp[index] = { ...item, name }
                                            setFormData("attributess", tmp)
                                        }}
                                        editable={!disabled}
                                    />
                                </View>
                                <View style={{ borderWidth: 0, marginLeft: 15 }}>
                                    <Text style={{
                                        fontFamily: 'Poppins-Regular',
                                        color: '#23233C',
                                        fontSize: 12,
                                        marginLeft: 5,
                                    }}>Product Attributes options</Text>
                                    {!disabled && <CustomOptionInput label="Options Name"
                                        //value={item?.name || ""}
                                        err={error?.attribute?.[index]?.options}
                                        onChangeText={(name) => {
                                            let tmp = attributess
                                            tmp[index].options.push(name)
                                            setFormData("attributess", tmp)
                                        }}
                                        editable={!disabled}
                                    />}
                                    <View style={{ flexWrap: "wrap", flexDirection: "row", marginBottom: 5 }}>
                                        {
                                            item?.options?.length > 0 && item?.options?.map((option, i) => <View style={{ flexDirection: "row", backgroundColor: "#F2F2F2", marginTop: disabled ? 10 : 15, marginRight: 5, borderRadius: 20 }}>
                                                <Text style={{
                                                    fontFamily: 'Poppins-Regular',
                                                    color: '#23233C',
                                                    fontSize: 12,
                                                    margin: 5,
                                                    marginHorizontal: 10
                                                }}>{option}</Text>
                                                {!disabled && <Pressable
                                                    disabled={disabled}
                                                    onPress={() => {
                                                        let tmp = attributess
                                                        //tmp[index].options = []
                                                        tmp[index].options = item?.options?.filter(op => op != option)
                                                        setFormData("attributess", tmp)
                                                    }} style={{ paddingRight: 5, justifyContent: "center" }}>
                                                    <Ionicons name={"close-circle-outline"} color='red' size={15} marginLeft={2} />
                                                </Pressable>}
                                            </View>)
                                        }
                                    </View>
                                </View>
                                {!disabled && <View style={{ flexDirection: "row", margin: 10 }}>
                                    {attributess?.length > 1 && <CustomButton
                                        style={{ flex: 1, marginRight: 10 }}
                                        label={"Remove"}
                                        bg="#FF4B4B"
                                        onPress={() => {
                                            removeAttribute(index)
                                        }}
                                        disabled={disabled}
                                    />}
                                    {attributess?.length == (index + 1) && <CustomButton
                                        bg="#58D36E"
                                        style={{ flex: 1 }}
                                        label={"Add New Attribute"}
                                        onPress={() => {
                                            addAttribute()
                                        }}
                                        disabled={disabled}
                                    />}
                                </View>}
                            </View>
                        })
                    }
                    <Text style={{
                        fontFamily: 'Poppins-Regular',
                        color: '#23233C',
                        fontSize: 12,
                        marginLeft: 5,
                        marginTop: 5
                    }}>Product Attributes Options Prices</Text>
                    {
                        options?.map((item, index) => {
                            return <View style={{ paddingLeft: 10, paddingVertical: 5 }}>
                                <CustomTextInput
                                    label={`Selling price for ${item?.attributs?.join("-")}`}
                                    value={item?.seller_price || ""}
                                    keyboardType='number-pad'
                                    onChangeText={(seller_price) => {
                                        let tmp = options
                                        tmp[index] = { ...tmp[index], seller_price }
                                        setOptions([...tmp])
                                    }}
                                    error={error?.options?.[index]}
                                    editable={!disabled}
                                />
                            </View>
                        })
                    }
                </View> :
                    <CommonInput
                        editable={!disabled}
                        control={control}
                        error={errors.price}
                        fieldName="price"
                        backgroundColor='#F2F2F2'
                        topLabel={'Price'}
                        top={15}
                        rightIcon={<Text style={{ fontFamily: 'Poppins-ExtraBold', fontSize: 30, color: '#58D36E' }}>₹</Text>}
                    />}

                <CommonInput
                    control={control}
                    error={errors.description}
                    fieldName="description"
                    backgroundColor='#F2F2F2'
                    topLabel={'Description'}
                    top={15}
                    editable={!disabled}
                />
                {!disabled && <CustomButton label={'Submit'} bg='#58D36E' mt={25} onPress={handleSubmit(onSubmit, (err) => {

                })}
                    loading={loading}
                    disabled={loading}
                />}
                <View style={{ marginBottom: 150 }} />
            </ScrollView >
            {/* {submitted && <View style={[StyleSheet.absoluteFillObject, { backgroundColor: "red" }]}></View>} */}
        </>
    )
}

export default AddNewProduct

const styles = StyleSheet.create({
    textBold: {
        fontFamily: 'Poppins-Bold',
        color: '#FF4646',
        fontSize: 15,
        textAlign: 'center',
        marginTop: 10
    },
    imageContainer: {
        borderRadius: 20,
        marginTop: 20,
        width: '100%',
        alignSelf: 'center',
        backgroundColor: '#F2F2F2',
        height: 200,
    },
    openCam: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10
    },
    closeBtn: {
        position: 'absolute',
        backgroundColor: "#FF4B4B",
        borderRadius: 40,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        right: -12,
        zIndex: 1,
        top: -15
    },
    unableSubmit: {
        fontFamily: 'Poppins-Light',
        color: '#8D8D8D',
        textAlign: 'center',
        fontSize: 11,
        marginTop: 40
    },
    logo: {
        width: 100,
        height: 150,
        alignSelf: 'center',
    },
    errorText: {
        fontFamily: 'Poppins-Regular',
        color: 'red',
        fontSize: 11,
    }
})