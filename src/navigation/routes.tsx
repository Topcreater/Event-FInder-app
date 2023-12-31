import { Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home'
import FavrtEvents from '../pages/FavrtEvents'
import cardImage from '../assest/favrot.png'
import cardImageHover from '../assest/love.png'
import homeImage from '../assest/icon.png'
import homeImageHover from '../assest/replace.png'
import EventDetails from '../pages/EventDetails';
const Routes = () => {
    const Tab = createBottomTabNavigator();
    const HomeStack = createNativeStackNavigator();

    function HomeStackScreen() {
        return (
            <HomeStack.Navigator initialRouteName="Homes" >
                <HomeStack.Screen name="Homes" component={Home} options={{
                    headerShown: false
                }} />
                <HomeStack.Screen name="Cards" component={FavrtEvents} />
                <HomeStack.Screen name="EventDetails" component={EventDetails} options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#00A550',
                    },
                    headerTintColor: 'white',
                    headerTitleAlign: 'center'

                }} />
            </HomeStack.Navigator>
        );
    }
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: '#00A550',
                    tabBarInactiveTintColor: 'black',
                    tabBarStyle: {
                        height: 73,
                        backgroundColor: 'white',
                        alignItems: 'center',

                    },
                    tabBarItemStyle: {
                        marginTop: 11
                    },
                    tabBarLabelStyle: {
                        fontSize: 12,
                        fontWeight: 'bold',
                        marginBottom: 10,

                    },
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeStackScreen}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={focused ? homeImageHover : homeImage}
                                style={{ width: 30, height: 30, }}
                            />
                        ),
                        tabBarLabel: 'Search Events',

                    }}
                />
                <Tab.Screen
                    name="Favourites Events"
                    component={FavrtEvents}
                    options={{
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: '#2AE384',
                        },
                        headerTintColor: 'white',
                        headerTitleAlign: 'center',
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={focused ? cardImageHover : cardImage}
                                style={{ width: 30, height: 30, }}
                            />
                        ),
                        tabBarLabel: 'Favourite',
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
export default Routes;