import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Platform,
  Text,
  StyleSheet,
  ScrollView,
  Share,
} from 'react-native';

import UnveilingBayernLandmarksScreen from './UnveilingBayernLandmarksScreen';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import { ChevronRightIcon } from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';

import castlesData from '../components/castlesData';
import residencesData from '../components/residencesData';
import churchesData from '../components/churchesData';
import UnveilingPlanScreen from './UnveilingPlanScreen';
import UnveilingBayernSettingsScreen from './UnveilingBayernSettingsScreen';
import UnveilingCastleDefenderScreen from './UnveilingCastleDefenderScreen';

const unvBottomButtons = [
  {
    id: 2,
    custleDefenderScreenNT: 'Castle Defender',
    custleDefenderImage: require('../assets/icons/homeBottomUnvIcons/unvDefenderIcon.png'),
  },
  {
    id: 4,
    custleDefenderScreenNT: 'Plan Bayern Trip',
    custleDefenderImage: require('../assets/icons/homeBottomUnvIcons/unvFestivalsIcon.png'),
  },
  {
    id: 1,
    custleDefenderScreenNT: 'Home',
    custleDefenderImage: require('../assets/icons/homeBottomUnvIcons/unvHomeIcon.png'),
  },
  {
    id: 5,
    custleDefenderScreenNT: 'Bayern landmarks',
    custleDefenderImage: require('../assets/icons/homeBottomUnvIcons/unvLandmarksIcon.png'),
  },
  {
    id: 3,
    custleDefenderScreenNT: 'Unveiling Settings',
    custleDefenderImage: require('../assets/icons/homeBottomUnvIcons/unvPlanTripIcon.png'),
  },
]

const UnveilingHomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [unveilingScreenNow, setUnveilingScreenNow] = useState('Home');
  const [isFullScreenImage, setIsFullScreenImage] = useState(false);
  const [selectedBuildingsCategory, setSelectedBuildingsCategory] = useState('Castles and Fortresses');

  const getDataByCategory = (category) => {
    switch (category) {
      case 'Castles and Fortresses':
        return castlesData;
      case 'Churches and Monasteries':
        return churchesData;
      case 'Palaces and Residences':
        return residencesData;
      default:
        return castlesData;
    }
  }

  const unveilingBuildingsData = getDataByCategory(selectedBuildingsCategory);

  const [selectedUnveilingBuilding, setSelectedUnveilingBuilding] = useState(unveilingBuildingsData[0]);

  useEffect(() => {
    setSelectedUnveilingBuilding(unveilingBuildingsData[0]);
  }, [selectedBuildingsCategory]);

  const styles = unveilingMainStyles(dimensions);

  return (
    <View style={{
      flex: 1,
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: '#04050E',
    }}>
      {unveilingScreenNow === 'Home' ? (
        <SafeAreaView style={{
          flex: 1,
          alignItems: 'center',
          // marginTop: Platform.OS === 'android' ? dimensions.height * 0.03 : 0,
        }}>
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
              setUnveilingScreenNow('Home');
            }}
          >
            <Text style={{
              fontSize: dimensions.width * 0.05,
              fontWeight: '700',
              color: 'white'
            }}>
              {selectedBuildingsCategory}
            </Text>

            <TouchableOpacity onPress={() => {
              setSelectedBuildingsCategory(selectedBuildingsCategory === 'Castles and Fortresses' ? 'Churches and Monasteries' : selectedBuildingsCategory === 'Churches and Monasteries' ? 'Palaces and Residences' : 'Castles and Fortresses');
            }}>
              <ChevronRightIcon color='white' size={dimensions.height * 0.03} />
            </TouchableOpacity>
          </TouchableOpacity>

          <View style={{
            height: dimensions.height * 0.14,
          }}>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{
              alignSelf: 'center',
              marginTop: dimensions.height * 0.03
            }}
            >
              {unveilingBuildingsData.map((building, index) => (
                <TouchableOpacity
                  key={index}
                  activeOpacity={0.7}
                  style={{
                    height: dimensions.height * 0.08,
                    justifyContent: 'space-between',
                    paddingHorizontal: dimensions.width * 0.02,
                    borderRadius: dimensions.width * 0.1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: dimensions.width * 0.05,
                  }}
                  onPress={() => {
                    setSelectedUnveilingBuilding(building);
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
                      source={building.buildingImage}
                      style={{
                        width: dimensions.height * 0.06,
                        height: dimensions.height * 0.06,
                        borderRadius: dimensions.width * 0.1,
                        zIndex: 1,
                      }}
                      resizeMode="cover"
                    />

                    <Image
                      source={selectedUnveilingBuilding === building
                        ? require('../assets/icons/selectedBuildingIcon.png')
                        : require('../assets/icons/notSelectedBuildingIcon.png')
                      }
                      style={{
                        width: dimensions.height * 0.03,
                        height: dimensions.height * 0.03,
                        zIndex: 2,
                        position: 'absolute',
                        right: -dimensions.width * 0.013,
                        bottom: -dimensions.height * 0.004,
                      }}
                      resizeMode="cover"
                    />
                  </View>

                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'left',
                      paddingLeft: dimensions.width * 0.03,
                      fontSize: dimensions.width * 0.035,
                      maxWidth: dimensions.width * 0.4,
                    }}
                    numberOfLines={2}
                  >
                    {building.buildingName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <View
            style={{
              width: dimensions.width * 0.91,
              height: dimensions.height * 0.55,
              borderRadius: dimensions.width * 0.1,
              overflow: 'hidden', 
              position: 'relative',
            }}
          >
            <Image
              source={selectedUnveilingBuilding?.buildingImage}
              style={{
                width: dimensions.width * 0.91,
                height: dimensions.height * 0.55,
                borderRadius: dimensions.width * 0.1,
                position: 'absolute',
                zIndex: 0,
                transform: isFullScreenImage ? [{ scale: 1.1 }] : [{ scale: 1 }],
              }}
              resizeMode="cover"
            />



            <TouchableOpacity style={{
              position: 'absolute',
              top: dimensions.height * 0.03,
              right: dimensions.width * 0.07,
            }}
              onPress={() => {
                setIsFullScreenImage(!isFullScreenImage);
                ReactNativeHapticFeedback.trigger("impactLight", {
                  enableVibrateFallback: true,
                  ignoreAndroidSystemSettings: false,
                });
              }}
            >
              <Image
                source={!isFullScreenImage
                  ? require('../assets/icons/toFullIcon.png')
                  : require('../assets/icons/toSmallIcon.png')
                }
                style={{
                  width: dimensions.height * 0.04,
                  height: dimensions.height * 0.04,
                  zIndex: 1,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>

            {!isFullScreenImage && (
              <View style={{
                width: dimensions.width * 0.85,
                paddingHorizontal: dimensions.width * 0.04,
                paddingVertical: dimensions.height * 0.03,
                borderRadius: dimensions.width * 0.05,
                backgroundColor: 'black',
                alignSelf: 'center',
                position: 'absolute',
                bottom: dimensions.height * 0.02,
              }}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'left',
                    fontSize: dimensions.width * 0.0555,
                    fontWeight: '700',
                  }}
                >
                  {selectedUnveilingBuilding?.buildingName}
                </Text>

                <Text
                  style={{
                    color: 'white',
                    textAlign: 'left',
                    fontSize: dimensions.width * 0.04,
                    fontWeight: '700',

                    marginTop: dimensions.height * 0.01,
                  }}
                >
                  📖 Description:
                </Text>

                <Text
                  style={{
                    color: 'white',
                    textAlign: 'left',
                    fontSize: dimensions.width * 0.034,
                    fontWeight: '400',

                    marginTop: dimensions.height * 0.01,
                    fontStyle: 'italic',
                  }}
                >
                  {selectedUnveilingBuilding?.buildingDescription}
                </Text>

                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignSelf: 'flex-start',
                }}>
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'left',
                      fontSize: dimensions.width * 0.04,
                      fontWeight: '700',

                      marginTop: dimensions.height * 0.01,
                    }}
                  >
                    📍 Location: {' '}
                  </Text>

                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'left',
                      fontSize: dimensions.width * 0.034,
                      fontWeight: '400',

                      marginTop: dimensions.height * 0.01,
                      fontStyle: 'italic',
                    }}
                  >
                    {selectedUnveilingBuilding?.buildingLocation}
                  </Text>
                </View>
              </View>
            )}
          </View>


        </SafeAreaView>
      ) : unveilingScreenNow === 'Castle Defender' ? (
        <UnveilingCastleDefenderScreen setUnveilingScreenNow={setUnveilingScreenNow} />
      ) : unveilingScreenNow === 'Bayern landmarks' ? (
        <UnveilingBayernLandmarksScreen setUnveilingScreenNow={setUnveilingScreenNow} />
      ) : unveilingScreenNow === 'Plan Bayern Trip' ? (
        <UnveilingPlanScreen setUnveilingScreenNow={setUnveilingScreenNow} />
      ) : unveilingScreenNow === 'Unveiling Settings' ? (
        <UnveilingBayernSettingsScreen setUnveilingScreenNow={setUnveilingScreenNow} />
      ) : null}

      <View style={{
        paddingHorizontal: dimensions.width * 0.05,
        position: 'absolute',
        bottom: '3%',
        height: dimensions.width * 0.18,
        width: '95%',
        justifyContent: 'space-between',
        borderWidth: dimensions.width * 0.002,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: dimensions.width * 0.035,
      }}>
        {unvBottomButtons.map((custleDefenderButtonForPages, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setUnveilingScreenNow(custleDefenderButtonForPages.custleDefenderScreenNT);
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={custleDefenderButtonForPages.custleDefenderImage}
              style={{
                height: dimensions.height * 0.035,
                opacity: unveilingScreenNow === custleDefenderButtonForPages.custleDefenderScreenNT ? 1 : 0.4,
                width: dimensions.height * 0.035,
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const unveilingMainStyles = (dimensions) => StyleSheet.create({
});

export default UnveilingHomeScreen;
