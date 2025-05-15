import React, { useEffect, useRef, useState } from 'react';
import {
    Text,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Animated,
    View,
    Modal
} from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';

const layer = [
    {
        image: require('../assets/images/layerImage.png'),
        type: 'coin',
    },
];

const UnveilingCastleDefenderScreen = ({ setUnveilingScreenNow }) => {
    const dimensions = Dimensions.get('window');
    const [isCastleDefenderStarted, setCastleDefenderStarted] = useState(false);
    const [platformWidth, setPlatformWidth] = useState(dimensions.width * 0.4);

    const [castleDefenderModalVisible, setCastleDefenderModalVisible] = useState(false);
    const [layerCount, setLayerCount] = useState(0);

    const [layerplatformXHorPos] = useState(new Animated.Value(0));

    const [layersOfFall, setLayersOfFall] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            if(platformWidth > dimensions.width * 0.14) {
                setPlatformWidth((prev) => prev - dimensions.width * 0.003);
            }
        }, 1000)
    }, [castleDefenderModalVisible, platformWidth])

    const castleDefenderCollis = (item) => {
        const platWidth = platformWidth;

        const platformMargin = 0;

        const leftPlatformSpace = layerplatformXHorPos._value - platformMargin - dimensions.width * 0.05;

        const rightPlatformSpace = layerplatformXHorPos._value + platWidth + dimensions.width * 0.05;

        const centerPlatformSpace = item.x - dimensions.width * 0.23;

        return centerPlatformSpace >= leftPlatformSpace && centerPlatformSpace <= rightPlatformSpace;
    };

    const rightPlatformHold = () => {
        const platWidth = dimensions.height * 0.19;
        const newX = Math.min(dimensions.width * 0.8 - platWidth, layerplatformXHorPos._value + dimensions.width * 0.2);
        Animated.spring(layerplatformXHorPos, {
            toValue: newX,
            useNativeDriver: true,
        }).start();
    };

    const leftPlatformHold = () => {
        const newX = Math.max(0 - dimensions.width * 0.4, layerplatformXHorPos._value - dimensions.width * 0.2);
        Animated.spring(layerplatformXHorPos, {
            toValue: newX,
            useNativeDriver: true,
        }).start();
    };

    

    const layersRef = useRef(null);

    const layerCounterIdentif = useRef(0);

    const dropCastleLayersDefender = () => {
        let randomCastleDefLayer = layer[Math.floor(Math.random() * layer.length)];

        let castleSafetyPlatf = 10;

        while (layersRef.current && layersRef.current.type === randomCastleDefLayer.type && castleSafetyPlatf > 0) {
            randomCastleDefLayer = layer[Math.floor(Math.random() * layer.length)];
            castleSafetyPlatf--;
        }
        layersRef.current = randomCastleDefLayer;

        const randX = Math.random() * (dimensions.width - 40);

        layerCounterIdentif.current += 1;

        const layerUniqID = `${Date.now()}-${layerCounterIdentif.current}`;

        const newLayerItemObj = {
            id: layerUniqID,
            x: randX,
            y: new Animated.Value(-50),
            caught: false,
            ...randomCastleDefLayer,
        };

        setLayersOfFall((prev) => [...prev, newLayerItemObj]);

        const defaultCollisionOfThePlatform = dimensions.height * 0.35;

        const listCastleDefender = newLayerItemObj.y.addListener(({ value }) => {

            if (value > dimensions.height * 0.45) {
                newLayerItemObj.y.removeListener(listCastleDefender);
                return;
            }

            if (!newLayerItemObj.caught && value >= dimensions.height * 0.4 && !newLayerItemObj.notCaughtLogged) {
                console.log(`Item ${newLayerItemObj.id} not caught at level ${dimensions.height * 0.4}`);
                newLayerItemObj.notCaughtLogged = true;

                setCastleDefenderModalVisible(true);
            }

            if (!newLayerItemObj.caught && value >= defaultCollisionOfThePlatform && value <= dimensions.height * 0.95) {
                if (castleDefenderCollis(newLayerItemObj)) {
                    newLayerItemObj.caught = true;

                    setLayersOfFall((prev) => prev.filter((f) => f.id !== newLayerItemObj.id));
                    newLayerItemObj.y.removeListener(listCastleDefender);

                    setLayerCount((prev) => prev + 1);
                }
            }
        });

        Animated.timing(newLayerItemObj.y, {
            toValue: dimensions.height + 50,
            duration: 3000,
            useNativeDriver: true,
        }).start(() => {

            newLayerItemObj.y.removeListener(listCastleDefender);

            setTimeout(() => {
                setLayersOfFall((prev) => prev.filter((f) => f.id !== newLayerItemObj.id));
            }, 0);
        });
    };

    useEffect(() => {
        let timerId = null;
        if (!castleDefenderModalVisible && isCastleDefenderStarted) {
            timerId = setInterval(() => {
                if (!castleDefenderModalVisible && isCastleDefenderStarted) {
                    dropCastleLayersDefender();
                }
            }, 1300);
        }
        return () => {
            if (timerId) clearInterval(timerId);
        };
    }, [castleDefenderModalVisible, isCastleDefenderStarted]);

    return (
        <SafeAreaView style={{ width: dimensions.width, height: dimensions.height }}>
            {!isCastleDefenderStarted ? (
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
                        setCastleDefenderStarted(true);
                    }}
                >
                    <Text style={{
                        fontSize: dimensions.width * 0.05,
                        fontWeight: '700',
                        color: 'white'
                    }}>
                        Castle Defender
                    </Text>

                    <ChevronRightIcon color='white' size={dimensions.height * 0.03} />
                </TouchableOpacity>
            ) : (
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '91%',
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.01,
                }}>
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={() => {
                            setCastleDefenderStarted(false);
                            setLayersOfFall([]);
                            setLayerCount(0);
                            setPlatformWidth(dimensions.width * 0.4);
                            setCastleDefenderModalVisible(false);
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
                                alignSelf: 'flex-start',
                                marginTop: dimensions.height * 0.01,
                                marginLeft: dimensions.width * 0.04,
                            }}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'flex-end',
                    }}>
                        <Image
                            source={require('../assets/images/layerImage.png')}
                            style={{
                                width: dimensions.width * 0.07,
                                height: dimensions.width * 0.07,
                                marginRight: dimensions.width * 0.02,
                            }}
                            resizeMode="contain"
                        />

                        <Text style={{
                            fontSize: dimensions.width * 0.07,
                            color: 'white',
                            textAlign: 'left',
                            paddingHorizontal: dimensions.width * 0.02,
                            fontWeight: 600,
                        }}>
                           {layerCount}
                        </Text>
                    </View>
                </View>
            )}

            {!isCastleDefenderStarted ? (
                <>
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
                        Protect your castle from falling stones by controlling the platform. Catch the stones and earn points!
                    </Text>

                    <Image
                        source={require('../assets/images/castleDefenderImage.png')}
                        style={{
                            width: dimensions.height * 0.31,
                            height: dimensions.height * 0.31,
                            alignSelf: 'center',
                            marginTop: dimensions.height * 0.07,
                        }}
                        resizeMode="contain"
                    />
                </>
            ) : (
                <>
                    <View
                        style={{
                            width: dimensions.width,
                            height: dimensions.height * 0.88,
                            alignSelf: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {layersOfFall.map((item) => (
                            <Animated.View
                                key={item.id}
                                style={{
                                    position: 'absolute',
                                    left: item.x,
                                    transform: [{ translateY: item.y }],
                                }}
                            >
                                <Image
                                    source={item.image}
                                    style={{
                                        height: dimensions.width * 0.12,
                                        resizeMode: 'contain',
                                        width: dimensions.width * 0.12,
                                    }}
                                />
                            </Animated.View>
                        ))}

                        <Animated.View
                            style={{
                                position: 'absolute',
                                bottom: dimensions.height * 0.43,
                                transform: [{ translateX: layerplatformXHorPos }],
                                width: platformWidth,
                                height: dimensions.height * 0.035,

                            }}
                        >
                            <LinearGradient
                                style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderRadius: dimensions.width * 0.3 }}
                                colors={['#454545', '#848484']}
                                start={{ x: 0.5, y: 1 }}
                                end={{ x: 0.5, y: 0 }}
                            />
                        </Animated.View>

                        <View style={{
                            flexDirection: 'row',
                            alignSelf: 'center',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: dimensions.width * 0.45,
                            bottom: dimensions.height * 0.12,
                            position: 'absolute',
                        }}>
                            <TouchableOpacity onPress={leftPlatformHold}>
                                <Image
                                    source={require('../assets/images/leftUnvButton.png')}
                                    style={{
                                        width: dimensions.height * 0.09,
                                        height: dimensions.height * 0.09,
                                    }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>

                            <TouchableOpacity onPress={rightPlatformHold}>
                                <Image
                                    source={require('../assets/images/rightUnvButton.png')}
                                    style={{
                                        width: dimensions.height * 0.09,
                                        height: dimensions.height * 0.09,
                                    }}
                                    resizeMode="contain"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Image
                        source={require('../assets/images/gameCastleImage.png')}
                        style={{
                            width: dimensions.width,
                            height: dimensions.height * 0.16,
                            alignSelf: 'center',
                            position: 'absolute',
                            bottom: dimensions.height * 0.25,
                        }}
                        resizeMode="stretch"
                    />
                </>
            )}


            <Modal
                animationType="fade"
                onRequestClose={() => {
                    setCastleDefenderModalVisible(false);
                }}
                transparent={true}
                visible={castleDefenderModalVisible}
            >
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <SafeAreaView style={{
                        alignItems: 'center',
                        alignSelf: 'center',
                        marginBottom: dimensions.height * 0.01,
                        justifyContent: 'center',
                        width: dimensions.width * 0.9,
                        paddingVertical: dimensions.height * 0.04,
                    }}>
                        <LinearGradient
                            style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderRadius: dimensions.width * 0.1 }}
                            colors={['#848484', '#454545']}
                            start={{ x: 0.5, y: 1 }}
                            end={{ x: 0.5, y: 0 }}
                        />


                        <Text style={{
                            fontSize: dimensions.width * 0.05,
                            color: 'white',
                            textAlign: 'center',
                            paddingHorizontal: dimensions.width * 0.07,
                            marginTop: dimensions.height * 0.04,
                            fontWeight: 700,
                        }}>
                            Protect your castle from falling stones by controlling the platform. Catch the stones and earn points!
                        </Text>

                        <Image
                            source={require('../assets/images/castleDefenderImage.png')}
                            style={{
                                width: dimensions.height * 0.2,
                                height: dimensions.height * 0.2,
                                alignSelf: 'center',
                                marginTop: dimensions.height * 0.03,
                            }}
                            resizeMode="contain"
                        />

                        {['Try again', 'Go back'].map((modalButton, index) => (
                            <TouchableOpacity
                                key={index}
                                activeOpacity={0.7}
                                style={{
                                    height: dimensions.height * 0.07,
                                    justifyContent: 'center',
                                    borderRadius: dimensions.width * 0.1,
                                    alignItems: 'center',
                                    marginTop: dimensions.height * 0.03,
                                    width: dimensions.width * 0.5,
                                }}
                                onPress={() => {
                                    if (modalButton === 'Try again') {
                                        setCastleDefenderModalVisible(false);
                                        setCastleDefenderStarted(true);
                                        setLayersOfFall([]);
                                        setLayerCount(0);
                                    } else {
                                        setCastleDefenderModalVisible(false);
                                        setUnveilingScreenNow('Home');
                                    }

                                    setPlatformWidth(dimensions.width * 0.4);
                                }}
                            >
                                <LinearGradient
                                    style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderRadius: dimensions.width * 0.16 }}
                                    colors={['#454545', '#848484']}
                                    start={{ x: 0.5, y: 1 }}
                                    end={{ x: 0.5, y: 0 }}
                                />

                                <Text
                                    style={{
                                        color: 'white',
                                        textAlign: 'left',
                                        fontSize: dimensions.width * 0.045,
                                    }}
                                    numberOfLines={2}
                                >
                                    {modalButton}
                                </Text>
                            </TouchableOpacity>
                        ))}

                        <View style={{ marginBottom: dimensions.height * 0.04 }} />
                    </SafeAreaView>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

export default UnveilingCastleDefenderScreen;
