import React from 'react';
import {
    View,
    Text,
    Dimensions,
    SafeAreaView,
    StyleSheet,
    TouchableOpacity,
    Share,
    Image
} from 'react-native';
import { ChevronRightIcon } from 'react-native-heroicons/solid';

const fontMontserratRegular = 'Montserrat-Regular';

const BayernLandmarksScreen = ({ setChoosedSweetScreen }) => {
    const dimensions = Dimensions.get('window');
    const styles = unveilingMainStyles(dimensions);

    return (
        <SafeAreaView style={{ width: dimensions.width, height: dimensions.height }}>
            <TouchableOpacity
                activeOpacity={1}
                style={{
                    width: '91%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                }}
                onPress={() => {
                    setChoosedSweetScreen('Home');
                }}
            >
                <Text style={{
                    fontSize: dimensions.width * 0.05,
                    fontWeight: '700',
                    color: 'white'
                }}>
                    Bayern landmarks
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
                Discover fascinating details about Bayern landmarks, historical events, and architectural secrets, unveiling new aspects of the region’s castles, palaces, and monasteries.
            </Text>

            <Image
                source={require('../assets/images/landmarkImage.png')}
                style={{
                    width: dimensions.height * 0.34,
                    height: dimensions.height * 0.34,
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.05,
                }}
                resizeMode="contain"
            />

        </SafeAreaView>
    );
};

const unveilingMainStyles = (dimensions) => StyleSheet.create({
    header: {
        width: '90%',
        height: dimensions.height * 0.07,
        backgroundColor: '#5C2E45',
        borderRadius: dimensions.width * 0.04,
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingHorizontal: dimensions.width * 0.05,
        alignSelf: 'center',
    },
    montserratText: {
        color: 'white',
        textAlign: 'center',
        alignSelf: 'center',
        fontFamily: fontMontserratRegular,
    },
});

export default BayernLandmarksScreen;
