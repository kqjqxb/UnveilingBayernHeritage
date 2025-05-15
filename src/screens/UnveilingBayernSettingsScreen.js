import React, { useState, useEffect } from 'react';
import {
    Text,
    Dimensions,
    SafeAreaView,
    TouchableOpacity,
    Image,
    View,
    Switch,
    ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UnveilingBayernSettingsScreen = ({ setUnveilingScreenNow }) => {
    const dimensions = Dimensions.get('window');
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    useEffect(() => {
        const loadNotificationSetting = async () => {
            try {
                const storedValue = await AsyncStorage.getItem('notificationsEnabled');
                if (storedValue !== null) {
                    setNotificationsEnabled(storedValue === 'true');
                }
            } catch (error) {
                console.error('Error loading notifications setting', error);
            }
        };
        loadNotificationSetting();
    }, []);

    const toggleNotifications = async () => {
        const newValue = !notificationsEnabled;
        setNotificationsEnabled(newValue);
        try {
            await AsyncStorage.setItem('notificationsEnabled', newValue.toString());
        } catch (error) {
            console.error('Error saving notifications setting', error);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#04050E' }}>
            <ScrollView contentContainerStyle={{ padding: dimensions.width * 0.05 }}>
                <View style={{ alignItems: 'center', marginBottom: dimensions.height * 0.03, marginTop: dimensions.height * 0.13 }}>
                    <Text style={{
                        color: 'white',
                        fontSize: dimensions.width * 0.07,
                        fontWeight: '700'
                    }}>
                        Settings
                    </Text>
                </View>

                <View style={{
                    marginBottom: dimensions.height * 0.02,
                    paddingHorizontal: dimensions.width * 0.05,
                    paddingVertical: dimensions.height * 0.04,
                }}>
                    <LinearGradient
                        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, borderRadius: dimensions.width * 0.1 }}
                        colors={['#454545', '#848484']}
                        start={{ x: 0.5, y: 1 }}
                        end={{ x: 0.5, y: 0 }}
                    />
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <Text style={styles.settingText(dimensions)}>
                            Notifications
                        </Text>
                        <Switch
                            value={notificationsEnabled}
                            onValueChange={toggleNotifications}
                            thumbColor={notificationsEnabled ? 'white' : '#f4f3f4'}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                        />
                    </View>
                    
                    <Text style={[styles.settingText(dimensions), {
                        marginTop: dimensions.height * 0.03,
                        fontStyle: 'italic',
                        fontWeight: '400',
                    }]}>
                        Vibration is always on for our special fitures!
                    </Text>
                </View>

                <View style={{ alignItems: 'center', marginTop: dimensions.height * 0.05 }}>
                    <Image
                        source={require('../assets/images/logoImage.png')}
                        style={{
                            width: dimensions.width * 0.3,
                            height: dimensions.width * 0.3,
                        }}
                        resizeMode="contain"
                    />
                </View>
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = {
    settingText: (dimensions) => ({
        color: 'white',
        fontSize: dimensions.width * 0.05,
        fontWeight: '600',
    }),
};

export default UnveilingBayernSettingsScreen;