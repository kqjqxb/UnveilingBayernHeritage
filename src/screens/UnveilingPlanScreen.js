import React, { useState, useRef } from 'react';
import {
    Text,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Image,
    View,
    Animated,
} from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import citiesData from '../components/citiesData';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import LinearGradient from 'react-native-linear-gradient';
import Clipboard from '@react-native-clipboard/clipboard'; 

const UnveilingPlanScreen = ({ setUnveilingScreenNow }) => {
    const dimensions = Dimensions.get('window');

    const [isUnvPlaceOpened, setUnvPlaceOpened] = useState(false);
    const [isUnvPreviewClosed, setUnvPreviewClosed] = useState(false);
    const [isCitySelected, setCitySelected] = useState(false);
    const [selectedUnvCity, setSelectedUnveilingCity] = useState(null);
    const [selectedUnvPlace, setSelectedUnveilingPlace] = useState(null);
    
    const copiedAlertOpacity = useRef(new Animated.Value(0)).current;

    return (
        <SafeAreaView style={{ width: dimensions.width, height: dimensions.height }}>
            {!isUnvPreviewClosed ? (
                <>
                    <TouchableOpacity
                        activeOpacity={1}
                        style={{
                            width: '91%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            alignSelf: 'center',
                            marginTop: dimensions.height * 0.01,
                        }}
                        onPress={() => {
                            setUnvPreviewClosed(true);
                        }}
                    >
                        <Text style={{
                            fontSize: dimensions.width * 0.05,
                            fontWeight: '700',
                            color: 'white'
                        }}>
                            Plan Your Bayern Trip
                        </Text>
                        <ChevronRightIcon color='white' size={dimensions.height * 0.03} />
                    </TouchableOpacity>
                    <Image
                        source={require('../assets/images/logoImage.png')}
                        style={{
                            width: dimensions.width * 0.3,
                            height: dimensions.width * 0.3,
                            alignSelf: 'center',
                            marginTop: dimensions.height * 0.05,
                        }}
                        resizeMode="contain"
                    />
                    <Text style={{
                        fontSize: dimensions.width * 0.04,
                        color: 'white',
                        textAlign: 'left',
                        paddingHorizontal: dimensions.width * 0.04,
                        marginTop: dimensions.height * 0.04,
                        fontWeight: 500,
                    }}>
                        Select a city, explore its top attractions, and create your personalized itinerary. Save your route and schedule visits for a seamless travel experience!
                    </Text>
                    <Image
                        source={require('../assets/images/planImage.png')}
                        style={{
                            width: dimensions.height * 0.31,
                            height: dimensions.height * 0.25,
                            alignSelf: 'center',
                            marginTop: dimensions.height * 0.05,
                        }}
                        resizeMode="contain"
                    />
                </>
            ) : (
                <>
                    <View style={{
                        width: dimensions.width * 0.91,
                        alignSelf: 'center',
                        marginTop: dimensions.height * 0.01,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={() => {
                                if (isUnvPlaceOpened) {
                                    setUnvPlaceOpened(false);
                                    setSelectedUnveilingPlace(null);
                                } else if (isCitySelected) {
                                    setCitySelected(false);
                                    setSelectedUnveilingCity(null);
                                    setSelectedUnveilingPlace(null);
                                } else setUnvPreviewClosed(false);

                                ReactNativeHapticFeedback.trigger("impactLight", {
                                    enableVibrateFallback: true,
                                    ignoreAndroidSystemSettings: false,
                                });
                            }}
                            style={{
                                alignSelf: 'flex-start',
                            }}
                        >
                            <Image
                                source={require('../assets/icons/unvArrowLeftIcon.png')}
                                style={{
                                    width: dimensions.width * 0.07,
                                    height: dimensions.width * 0.07,
                                    alignSelf: 'center',
                                }}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                        <Text style={{
                            fontSize: dimensions.width * 0.05,
                            fontWeight: '700',
                            color: 'white',
                            textAlign: 'center',
                            marginRight: dimensions.width * 0.1,
                            maxWidth: dimensions.width * 0.6,
                            alignSelf: 'flex-start',
                        }}>
                            {isUnvPlaceOpened
                                ? selectedUnvPlace?.placeName
                                : isCitySelected
                                    ? 'Choose a specific attraction'
                                    : 'Choose a city'}
                        </Text>
                        <View />
                    </View>
                    {!isCitySelected ? (
                        <>
                            <View style={{ marginBottom: dimensions.height * 0.1 }} />
                            {citiesData.map((city, index) => (
                                <TouchableOpacity
                                    key={index}
                                    activeOpacity={0.7}
                                    style={{
                                        height: dimensions.height * 0.08,
                                        justifyContent: 'flex-start',
                                        paddingHorizontal: dimensions.width * 0.02,
                                        borderRadius: dimensions.width * 0.1,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        marginTop: dimensions.height * 0.02,
                                        width: dimensions.width * 0.7,
                                        alignSelf: 'center',
                                    }}
                                    onPress={() => {
                                        setSelectedUnveilingCity(city.cityName);
                                        setCitySelected(true);
                                        ReactNativeHapticFeedback.trigger("impactLight", {
                                            enableVibrateFallback: true,
                                            ignoreAndroidSystemSettings: false,
                                        });
                                    }}
                                >
                                    <LinearGradient
                                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderRadius: dimensions.width * 0.1 }}
                                        colors={['#454545', '#848484']}
                                        start={{ x: 0.5, y: 1 }}
                                        end={{ x: 0.5, y: 0 }}
                                    />
                                    <View>
                                        <Image
                                            source={city.cityImage}
                                            style={{
                                                width: dimensions.height * 0.06,
                                                height: dimensions.height * 0.06,
                                                zIndex: 1,
                                            }}
                                            resizeMode="stretch"
                                        />
                                    </View>
                                    <View style={{
                                        width: dimensions.width * 0.5,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                color: 'white',
                                                textAlign: 'center',
                                                fontSize: dimensions.width * 0.035,
                                                maxWidth: dimensions.width * 0.4,
                                            }}
                                            numberOfLines={2}
                                        >
                                            {city.cityName}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </>
                    ) : (
                        !isUnvPlaceOpened ? (
                            <>
                                <View style={{ marginBottom: dimensions.height * 0.1 }} />
                                {citiesData.find((place) => place.cityName === selectedUnvCity).places.map((place, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={0.7}
                                        style={{
                                            height: dimensions.height * 0.08,
                                            justifyContent: 'flex-start',
                                            paddingHorizontal: dimensions.width * 0.02,
                                            borderRadius: dimensions.width * 0.1,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            marginTop: dimensions.height * 0.02,
                                            width: dimensions.width * 0.7,
                                            alignSelf: 'center',
                                        }}
                                        onPress={() => {
                                            setSelectedUnveilingPlace(place);
                                            setUnvPlaceOpened(true);
                                            ReactNativeHapticFeedback.trigger("impactLight", {
                                                enableVibrateFallback: true,
                                                ignoreAndroidSystemSettings: false,
                                            });
                                        }}
                                    >
                                        <LinearGradient
                                            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderRadius: dimensions.width * 0.1 }}
                                            colors={['#454545', '#848484']}
                                            start={{ x: 0.5, y: 1 }}
                                            end={{ x: 0.5, y: 0 }}
                                        />
                                        <View>
                                            <Image
                                                source={place.placeImage}
                                                style={{
                                                    width: dimensions.height * 0.06,
                                                    height: dimensions.height * 0.06,
                                                    zIndex: 1,
                                                    borderRadius: dimensions.width * 0.1,
                                                }}
                                                resizeMode="stretch"
                                            />
                                        </View>
                                        <View style={{
                                            width: dimensions.width * 0.5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>
                                            <Text
                                                style={{
                                                    color: 'white',
                                                    textAlign: 'center',
                                                    fontSize: dimensions.width * 0.035,
                                                    maxWidth: dimensions.width * 0.4,
                                                }}
                                                numberOfLines={2}
                                            >
                                                {place.placeName}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </>
                        ) : (
                            <>
                                <Image
                                    source={selectedUnvPlace.placeImage}
                                    style={{
                                        width: dimensions.width * 0.91,
                                        height: dimensions.height * 0.25,
                                        alignSelf: 'center',
                                        marginTop: dimensions.height * 0.04,
                                        borderRadius: dimensions.width * 0.1,
                                    }}
                                    resizeMode="stretch"
                                />
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    width: dimensions.width * 0.91,
                                    alignSelf: 'center',
                                    marginTop: dimensions.height * 0.02,
                                }}>
                                    <Text
                                        style={{
                                            color: 'white',
                                            textAlign: 'left',
                                            fontSize: dimensions.width * 0.04,
                                            maxWidth: dimensions.width * 0.8,
                                            fontWeight: '600',
                                        }}
                                    >
                                        📍 Location: {selectedUnvPlace.placeLocation}
                                    </Text>
                                    <TouchableOpacity 
                                        onPress={() => {
                                            Clipboard.setString(selectedUnvPlace.placeLocation);
                                            ReactNativeHapticFeedback.trigger("impactLight", {
                                                enableVibrateFallback: true,
                                                ignoreAndroidSystemSettings: false,
                                            });
                                            Animated.sequence([
                                                Animated.timing(copiedAlertOpacity, {
                                                    toValue: 1,
                                                    duration: 500,
                                                    useNativeDriver: true,
                                                }),
                                                Animated.delay(3000),
                                                Animated.timing(copiedAlertOpacity, {
                                                    toValue: 0,
                                                    duration: 500,
                                                    useNativeDriver: true,
                                                })
                                            ]).start();
                                        }}
                                    >
                                        <Image
                                            source={require('../assets/icons/copyIcon.png')}
                                            style={{
                                                width: dimensions.height * 0.031,
                                                height: dimensions.height * 0.031,
                                                alignSelf: 'flex-start'
                                            }}
                                            resizeMode="stretch"
                                        />
                                    </TouchableOpacity>
                                </View>
                                <Text
                                    style={{
                                        color: 'white',
                                        textAlign: 'left',
                                        fontSize: dimensions.width * 0.04,
                                        maxWidth: dimensions.width * 0.91,
                                        fontWeight: '600',
                                        marginTop: dimensions.height * 0.025,
                                        alignSelf: 'center',
                                    }}
                                >
                                    {selectedUnvPlace.placeDescription}
                                </Text>
                            </>
                        )
                    )}
                </>
            )}

            <Animated.View style={{
                position: 'absolute',
                top: dimensions.height * 0.35,
                right: dimensions.width * 0.07,
                alignSelf: 'center',
                backgroundColor: 'white',
                borderRadius: 10,
                paddingHorizontal: dimensions.width * 0.05,
                paddingVertical: dimensions.height * 0.02,
                opacity: copiedAlertOpacity,
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: dimensions.width * 0.04,
                    textAlign: 'center',
                }}>
                    Address successfully copied
                </Text>
            </Animated.View>
        </SafeAreaView>
    );
};

export default UnveilingPlanScreen;
