import React, { useContext, useEffect, useState, useRef } from 'react';
import { View, Dimensions, Animated, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { loadUserData } from '../redux/userSlice';
import { UserContext } from '../context/UserContext';

const fontInterRegular = 'Inter-18pt-Regular';

const UnvelingLoadingPage = () => {
  const dispatch = useDispatch();
  const { setUser } = useContext(UserContext);
  
  const navigation = useNavigation();
  
  const [isAppWasOpened, setAppWasOpened] = useState(false);
  const [isLoadingUnveilingBefore, setLoadingUnveilingBefore] = useState(false);
  
  const dimensions = Dimensions.get('window');
  const styles = unveilingStyles(dimensions);

  const opacityValues = [
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
    useRef(new Animated.Value(0)).current,
  ];

  const textString = "Unveiling \nBayern Heritage";
  const letters = textString.split('');
  const letterOpacityValues = useRef(letters.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(500, opacityValues.map(animValue =>
      Animated.timing(animValue, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      })
    )).start();
  }, [opacityValues]);

  useEffect(() => {
    const sweetLoadUser = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const isSweetOnbWas = await AsyncStorage.getItem('isSweetOnbWas');
        const sweetStoredUser = await AsyncStorage.getItem(storageKey);

        if (sweetStoredUser) {
          setUser(JSON.parse(sweetStoredUser));
          setAppWasOpened(false);
        } else if (isSweetOnbWas) {
          setAppWasOpened(false);
        } else {
          setAppWasOpened(true);
          await AsyncStorage.setItem('isSweetOnbWas', 'true');
        }
      } catch (error) {
        console.error('Loading math user has problem', error);
      } finally {
        setLoadingUnveilingBefore(true);
      }
    };

    sweetLoadUser();
  }, [setUser]);

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    if (isLoadingUnveilingBefore) {
      const sweetTimer = setTimeout(() => {
        const destination = isAppWasOpened ? 'OnbOfTheUnveiling' : 'OnbOfTheUnveiling';
        navigation.replace(destination);
      }, 5555);
      return () => clearTimeout(sweetTimer);
    }
  }, [isLoadingUnveilingBefore, isAppWasOpened, navigation]);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.stagger(100, letterOpacityValues.map(animValue =>
        Animated.timing(animValue, {
          toValue: 1,
          duration: 50,
          useNativeDriver: true,
        })
      )).start();
    }, 2500); 
    return () => clearTimeout(timer);
  }, [letterOpacityValues]);

  return (
    <SafeAreaView
      style={{
        alignItems: 'center',
        height: '100%',
        backgroundColor: '#04050E',
        width: '100%',
        alignSelf: 'center',
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          width: dimensions.width * 0.7,
          height: dimensions.height * 0.25,
        }}
      >
        <Animated.Image
          source={require('../assets/images/loadingCircles/upCircle.png')}
          style={[styles.images, {
            alignSelf: 'center',
            opacity: opacityValues[0],
            top: 0,
            zIndex: 3,
          }]}
          resizeMode='contain'
        />

        <Animated.Image
          source={require('../assets/images/loadingCircles/rightCircle.png')}
          style={[styles.images, {
            opacity: opacityValues[1],
            top: dimensions.height * 0.05,
            right: dimensions.width * 0.12,
            zIndex: 2,
          }]}
          resizeMode='contain'
        />

        <Animated.Image
          source={require('../assets/images/loadingCircles/upCircle.png')}
          style={[styles.images, {
            opacity: opacityValues[2],
            alignSelf: 'center',
            top: dimensions.height * 0.111,
            zIndex: 1,
          }]}
          resizeMode='contain'
        />

        <Animated.Image
          source={require('../assets/images/loadingCircles/rightCircle.png')}
          style={[styles.images, {
            opacity: opacityValues[3],
            top: dimensions.height * 0.05,
            left: dimensions.width * 0.12,
            zIndex: 4,
          }]}
          resizeMode='contain'
        />
      </View>

      <Animated.Text
        style={{
          fontFamily: fontInterRegular,
          fontSize: dimensions.width * 0.09,
          color: 'white',
          textAlign: 'center',
          marginTop: dimensions.height * 0.04,
          paddingHorizontal: dimensions.width * 0.05,
          fontWeight: '700',
          textTransform: 'uppercase',
        }}
      >
        {letters.map((letter, index) => (
          <Animated.Text
            key={index}
            style={{ opacity: letterOpacityValues[index] }}
          >
            {letter}
          </Animated.Text>
        ))}
      </Animated.Text>
    </SafeAreaView>
  );
};

const unveilingStyles = (dimensions) => StyleSheet.create({
  images: {
    width: dimensions.height * 0.1,
    height: dimensions.height * 0.1,
    position: 'absolute',
  }
});

export default UnvelingLoadingPage;