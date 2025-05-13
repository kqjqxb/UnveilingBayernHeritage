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
import SweetSettingsScreen from './SweetSettingsScreen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BayernLandmarksScreen from './BayernLandmarksScreen';
import SweetSavedScreen from './SweetSavedScreen';
import SweetMyRewardsScreen from './SweetMyRewardsScreen';
import ReactNativeHapticFeedback from "react-native-haptic-feedback";
import sweetTasksData from '../components/sweetTasksData';
import sweetRewards from '../components/sweetRewards';

const unvBottomButtons = [
  {
    id: 2,
    sweetScPage: 'Settings',
    sweetScPageImg: require('../assets/icons/homeBottomUnvIcons/unvDefenderIcon.png'),
  },
  {
    id: 4,
    sweetScPage: 'Saved',
    sweetScPageImg: require('../assets/icons/homeBottomUnvIcons/unvFestivalsIcon.png'),
  },
  {
    id: 1,
    sweetScPage: 'Home',
    sweetScPageImg: require('../assets/icons/homeBottomUnvIcons/unvHomeIcon.png'),
  },
  {
    id: 5,
    sweetScPage: 'Bayern landmarks',
    sweetScPageImg: require('../assets/icons/homeBottomUnvIcons/unvPlanTripIcon.png'),
  },
  {
    id: 3,
    sweetScPage: 'My rewards',
    sweetScPageImg: require('../assets/icons/homeBottomUnvIcons/unvLandmarksIcon.png'),
  },
]

const levels = [
  {
    id: 1,
    name: 'Level 1',
    image: require('../assets/images/levels/level1.png'),
  },
  {
    id: 2,
    name: 'Level 2',
    image: require('../assets/images/levels/level2.png'),
  },
  {
    id: 3,
    name: 'Level 3',
    image: require('../assets/images/levels/level3.png'),
  },
  {
    id: 4,
    name: 'Level 4',
    image: require('../assets/images/levels/level4.png'),
  },
  {
    id: 5,
    name: 'Level 5',
    image: require('../assets/images/levels/level5.png'),
  },
]

const UnveilingHomeScreen = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [choosedSweetScreen, setChoosedSweetScreen] = useState('Home');

  const [isSweetMusicOn, setSweetMusicOn] = useState(true);
  const [isSweetNotificationsOn, setSweetNotificationsOn] = useState(true);
  const [isSweetVibrOn, setSweetVibrOn] = useState(true);

  const [isTasksVisible, setIsTasksVisible] = useState(false);
  const [userRewards, setUserRewards] = useState([]);
  const [notAvailableRewards, setNotAvailableRewards] = useState([]);
  const [currentReward, setCurrentReward] = useState(null);
  const [levelPoints, setLevelPoints] = useState(0);

  const [sweetTasks, setSweetTasks] = useState(null);
  const [isSweetTaskAvailable, setIsSweetTaskAvailable] = useState(true);
  const [sweetFavTasks, setSweetFavTasks] = useState([]);

  const [lastCompletedTaskTime, setLastCompletedTaskTime] = useState(null);

  useEffect(() => {
    const loadFavTasks = async () => {
      try {
        const storedFav = await AsyncStorage.getItem('sweetFavTasks');
        if (storedFav) {
          setSweetFavTasks(JSON.parse(storedFav));
        }
      } catch (error) {
        console.error('Error loading sweetFavTasks:', error);
      }
    };
    loadFavTasks();
  }, [choosedSweetScreen]);

  useEffect(() => {
    const loadLastTaskTime = async () => {
      try {
        const storedTime = await AsyncStorage.getItem('lastCompletedTaskTime');
        if (storedTime) {
          setLastCompletedTaskTime(JSON.parse(storedTime));
        }
      } catch (error) {
        console.error('Error loading lastCompletedTaskTime:', error);
      }
    };
    loadLastTaskTime();
  }, []);

  useEffect(() => {
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const msUntilMidnight = nextMidnight.getTime() - now.getTime();
    const timer = setTimeout(() => {
      setLastCompletedTaskTime(null);
    }, msUntilMidnight);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const loadUserRewards = async () => {
      try {
        const storedUserRewards = await AsyncStorage.getItem('userRewards');

        if (storedUserRewards !== null) {
          setUserRewards(JSON.parse(storedUserRewards));
        } else {
          await AsyncStorage.setItem('userRewards', JSON.stringify([]));
          setUserRewards([]);
        }

        const storedAwailableRewards = await AsyncStorage.getItem('notAvailableRewards');

        if (storedAwailableRewards !== null) {
          setNotAvailableRewards(JSON.parse(storedAwailableRewards));
        } else {
          await AsyncStorage.setItem('notAvailableRewards', JSON.stringify([]));
          setNotAvailableRewards([]);
        }

        const storedCurrentReward = await AsyncStorage.getItem('currentReward');
        if (storedCurrentReward !== null) {
          setCurrentReward(JSON.parse(storedCurrentReward));
        }

        const storedLevelPoints = await AsyncStorage.getItem('levelPoints');
        if (storedLevelPoints !== null) {
          setLevelPoints(JSON.parse(storedLevelPoints));
        }
      } catch (error) {
        console.error('Error loading userRewards:', error);
      }
    };
    loadUserRewards();
  }, []);

  useEffect(() => {
    const loadCurrentChallenge = async () => {
      try {
        const storedChallenge = await AsyncStorage.getItem('sweetTasks');
        if (storedChallenge) {
          setSweetTasks(JSON.parse(storedChallenge));
        }
      } catch (error) {
        console.error('Error loading sweetTasks:', error);
      }
    };

    loadCurrentChallenge();

  }, [choosedSweetScreen]);

  const updateTaskStatus = async (index) => {
    if (typeof isSweetVibrOn !== 'undefined' && isSweetVibrOn) {
      ReactNativeHapticFeedback.trigger("impactLight", {
        enableVibrateFallback: true,
        ignoreAndroidSystemSettings: false,
      });
    }

    const updatedSweetTasks = [...sweetTasks.tasks];

    if (updatedSweetTasks[index].status === 'in progress') {
      updatedSweetTasks[index].status = 'done';
      updatedSweetTasks[index].endTime = new Date().toISOString();
    }
    else if (updatedSweetTasks[index].status === 'pending') {
      updatedSweetTasks[index].status = 'in progress';
      updatedSweetTasks[index].startTime = new Date().toISOString();
    }

    const updatedThisSweetTask = {
      ...sweetTasks,
      tasks: updatedSweetTasks,
    };

    setSweetTasks(updatedThisSweetTask);
    await saveThisSweetTask(updatedThisSweetTask);

    if (updatedSweetTasks.every(swTask => swTask.status === 'done')) {
      const updatedLevelPoints = levelPoints + 1;
      setLevelPoints(updatedLevelPoints);
      await AsyncStorage.setItem('levelPoints', JSON.stringify(updatedLevelPoints));
      generateSweetReward();
      setIsTasksVisible(false);
      try {
        const updatedSweetTasksHere = {
          tasks: updatedSweetTasks,
          allCompletedDate: new Date().toISOString(),
        };
        await AsyncStorage.setItem('sweetTasks', JSON.stringify(updatedSweetTasksHere));
      } catch (error) {
        console.error('Error saving to sweetTasks:', error);
      }
    }
  };

  const checkTaskAvailable = (completedTimeStr) => {
    if (!completedTimeStr) return true;
    const completedTime = new Date(completedTimeStr);
    const nextAvailable = new Date(
      completedTime.getFullYear(),
      completedTime.getMonth(),
      completedTime.getDate() + 1,
      0, 0, 0
    );
    return new Date() >= nextAvailable;
  };

  useEffect(() => {
    setIsSweetTaskAvailable(checkTaskAvailable(lastCompletedTaskTime));
  }, [lastCompletedTaskTime]);

  const generateSweetReward = async () => {
    let candidateRewards = sweetRewards.filter(reward => {
      return !notAvailableRewards.some(avReward => avReward.id === reward.id);
    });

    if (candidateRewards.length === 0) {
      candidateRewards = [...sweetRewards];
    }

    if (notAvailableRewards.length >= 20) {
      try {
        await AsyncStorage.setItem('notAvailableRewards', JSON.stringify([]));
        setNotAvailableRewards([]);
      } catch (error) {
        console.error('Error clearing notAvailableRewards:', error);
      }
    }

    const newReward = candidateRewards[Math.floor(Math.random() * candidateRewards.length)];

    const updatedRewards = [...notAvailableRewards, newReward];
    setNotAvailableRewards(updatedRewards);

    const newUserNewReward = {
      ...newReward,
      receivedDate: new Date().toISOString()
    }
    const updatedUserRewards = [...userRewards, newUserNewReward];
    setUserRewards(updatedUserRewards);
    await AsyncStorage.setItem('userRewards', JSON.stringify(updatedUserRewards));

    setCurrentReward(newReward);
    await AsyncStorage.setItem('currentReward', JSON.stringify(newReward));

    try {
      await AsyncStorage.setItem('notAvailableRewards', JSON.stringify(updatedRewards));
    } catch (error) {
      console.error('Error saving notAvailableRewards:', error);
    }
  };

  const saveThisSweetTask = async (swTask) => {
    try {
      await AsyncStorage.setItem('sweetTasks', JSON.stringify(swTask));
    } catch (error) {
      console.error('Error saving sweetTasks:', error);
    }
  };

  const generateSweetTasks = async () => {
    const availableTasks = [...sweetTasksData];
    for (let i = availableTasks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [availableTasks[i], availableTasks[j]] = [availableTasks[j], availableTasks[i]];
    }
    const selectedTasks = availableTasks.slice(0, 3).map(task => ({
      ...task,
      status: 'pending'
    }));
    const data = { tasks: selectedTasks, allCompletedDate: null };
    try {
      await AsyncStorage.setItem('sweetTasks', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving sweetTasks:', error);
    }
    setSweetTasks(data);
    return data;
  }

  const styles = unveilingMainStyles(dimensions);


  useEffect(() => {
    const loadSweetSetsOfApp = async () => {
      try {
        const sweetMusicFromStorage = await AsyncStorage.getItem('isSweetMusicOn');

        const sweetVibrationFromStorage = await AsyncStorage.getItem('isSweetVibrationOn');

        const sweetNotificationsFromStorage = await AsyncStorage.getItem('isSweetNotificationsOn');

        if (sweetMusicFromStorage !== null) {
          setSweetMusicOn(JSON.parse(sweetMusicFromStorage));
        }

        if (sweetVibrationFromStorage !== null) {
          setSweetVibrOn(JSON.parse(sweetVibrationFromStorage));
        }

        if (sweetNotificationsFromStorage !== null) {
          setSweetNotificationsOn(JSON.parse(sweetNotificationsFromStorage));
        }
      } catch (error) {
        console.error('Error loading sweet setts of the app', error);
      }
    };

    loadSweetSetsOfApp();
  }, [])

  const getLevelInfo = (levelPoints) => {
    if (levelPoints < 1) {
      return { level: levels[0], start: 0, end: 10, progress: 0 };
    } else if (levelPoints <= 10) {
      return { level: levels[0], start: 1, end: 10, progress: levelPoints / 10 };
    } else if (levelPoints <= 20) {
      return { level: levels[1], start: 11, end: 20, progress: (levelPoints - 10) / 10 };
    } else if (levelPoints <= 30) {
      return { level: levels[2], start: 21, end: 30, progress: (levelPoints - 20) / 10 };
    } else if (levelPoints <= 40) {
      return { level: levels[3], start: 31, end: 40, progress: (levelPoints - 30) / 10 };
    } else if (levelPoints < 50) {
      return { level: levels[4], start: 41, end: 50, progress: (levelPoints - 40) / 10 };
    } else {
      return { level: levels[4], start: 41, end: 50, progress: 1 };
    }
  };

  const levelInfo = getLevelInfo(levelPoints);

  const isToday = (dateStr) => {
    if (!dateStr) return false;
    const date = new Date(dateStr);
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  return (
    <View style={{
      flex: 1,
      width: dimensions.width,
      height: dimensions.height,
      backgroundColor: '#04050E',
    }}>
      {choosedSweetScreen === 'Home' ? (
        <SafeAreaView style={{
          flex: 1,
          alignItems: 'center',
          marginTop: Platform.OS === 'android' ? dimensions.height * 0.03 : 0,
        }}>
          

        </SafeAreaView>
      ) : choosedSweetScreen === 'Settings' ? (
        <SweetSettingsScreen setChoosedSweetScreen={setChoosedSweetScreen}

          isSweetMusicOn={isSweetMusicOn}
          setSweetMusicOn={setSweetMusicOn}
          isSweetNotificationsOn={isSweetNotificationsOn}
          setSweetNotificationsOn={setSweetNotificationsOn}
          isSweetVibrOn={isSweetVibrOn}
          setSweetVibrOn={setSweetVibrOn}
        />
      ) : choosedSweetScreen === 'Bayern landmarks' ? (
        <BayernLandmarksScreen setChoosedSweetScreen={setChoosedSweetScreen} levelPoints={levelPoints} />
      ) : choosedSweetScreen === 'Saved' ? (
        <SweetSavedScreen setChoosedSweetScreen={setChoosedSweetScreen} sweetFavTasks={sweetFavTasks} setSweetFavTasks={setSweetFavTasks} />
      ) : choosedSweetScreen === 'My rewards' ? (
        <SweetMyRewardsScreen setChoosedSweetScreen={setChoosedSweetScreen} userRewards={userRewards} />
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
        {unvBottomButtons.map((sweetBtEdge, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              setChoosedSweetScreen(sweetBtEdge.sweetScPage);
            }}
            style={{
              borderColor: '#DAA1C1',
              alignItems: 'center',
              borderRadius: dimensions.width * 0.031,
              justifyContent: 'center',
            }}>
            <Image
              source={sweetBtEdge.sweetScPageImg}
              style={{
                height: dimensions.height * 0.035,
                opacity: choosedSweetScreen === sweetBtEdge.sweetScPage ? 1 : 0.4,
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
