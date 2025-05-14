import React, { useState } from 'react';
import {
    Text,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Image
} from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

const UnveilingCastleDefenderScreen = ({ setUnveilingScreenNow }) => {
    const dimensions = Dimensions.get('window');
    const [isCastleDefenderStarted, setCastleDefenderStarted] = useState(false);

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
                <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => {
                        setCastleDefenderStarted(false);
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

                    <Image
                        source={require('../assets/images/gameCastleImage.png')}
                        style={{
                            width: dimensions.width,
                            height: dimensions.height * 0.16,
                            alignSelf: 'center',
                            position: 'absolute',
                            bottom: dimensions.height * 0.2,
                        }}
                        resizeMode="stretch"
                    />
                </>
            )}


        </SafeAreaView>
    );
};

export default UnveilingCastleDefenderScreen;
