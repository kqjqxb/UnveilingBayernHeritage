import React, { useEffect, useState } from 'react';
import { View, Animated, Text, TouchableOpacity, Dimensions, Image, SafeAreaView } from 'react-native';
import unveilingOnData from '../components/unveilingOnData';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const fontInterRegular = 'Inter-18pt-Regular';

const OnboardingOfTheUnveilingScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [unveilingSlideId, setUnveilingSlideId] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const onChange = ({ window }) => {
      setDimensions(window);
    };
    const dimensionListener = Dimensions.addEventListener('change', onChange);
    return () => {
      dimensionListener.remove();
    };
  }, []);

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#04050E',
      }}
    >
      <Image
        source={require('../assets/images/logoImage.png')}
        style={{
          width: dimensions.width * 0.5,
          height: dimensions.width * 0.5,
          alignSelf: 'center',
        }}
        resizeMode="contain"
      />

      <Text style={{
        textTransform: 'uppercase',
        fontSize: dimensions.width * 0.09,
        color: 'white',
        textAlign: 'center',
        paddingHorizontal: dimensions.width * 0.05,
        marginTop: dimensions.height * 0.04,
        fontFamily: fontInterRegular,
        fontWeight: 700,
      }}>
        Unveiling {'\n'}Bayern Heritage
      </Text>

      <View style={{
        width: dimensions.width * 0.85,
        height: dimensions.height * 0.09,
        justifyContent: 'space-between',
        marginTop: dimensions.height * 0.13,
        paddingHorizontal: dimensions.width * 0.02,
        paddingVertical: dimensions.height * 0.01,
        borderRadius: dimensions.width * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
        <LinearGradient
          style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderRadius: dimensions.width * 0.2 }}
          colors={['#454545', '#848484']}
          start={{ x: 0.5, y: 1 }}
          end={{ x: 0.5, y: 0 }}
        />

        <Text
          style={{
            color: 'white',
            textAlign: 'left',
            paddingHorizontal: dimensions.width * 0.03,
            fontSize: dimensions.width * 0.035,
            maxWidth: dimensions.width * 0.8 - dimensions.height * 0.08,
            fontStyle: 'italic',
          }}>
          {unveilingOnData[unveilingSlideId].onveilingOnbButtonText}
        </Text>

        <TouchableOpacity style={{
          width: dimensions.height * 0.07,
          height: dimensions.height * 0.07,
          borderRadius: dimensions.width * 0.5,
          backgroundColor: 'black',
          justifyContent: 'center',
          alignItems: 'center',
        }} onPress={() => {
          if (unveilingSlideId >= unveilingOnData.length - 1) {
            navigation.replace('UnveilingHomeScreen');
          } else {
            setUnveilingSlideId(unveilingSlideId + 1);
          }
        }}>
          <Image 
            source={require('../assets/icons/rightIcon.png')}
            style={{
              width: dimensions.height * 0.03,
              height: dimensions.height * 0.03,
              tintColor: 'white',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingOfTheUnveilingScreen;
