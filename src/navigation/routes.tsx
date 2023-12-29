import { Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home'
import CardSection from '../pages/CardSection'
import cardImage from '../assest/favrot.png'
import cardImageHover from '../assest/love.png'
import homeImage from '../assest/loupe.png'
import homeImageHover from '../assest/search.png'

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
                <HomeStack.Screen name="Cards" component={CardSection} />
                <HomeStack.Screen name="EventDetails" component={EventDetails} options={{
                    headerShown: true
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
                    tabBarActiveTintColor: '#FF7C84',
                    tabBarInactiveTintColor: 'black',
                    tabBarStyle: {
                        borderTopEndRadius: 15,
                        borderTopStartRadius: 15,
                        height: 73,
                        backgroundColor: '#00A550',
                        alignItems: 'center',
                    },
                    tabBarItemStyle: {
                        marginTop: 11
                    },
                    tabBarLabelStyle: {

                        marginBottom: 10,
                        color: 'black'
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
                    name="Card"
                    component={CardSection}
                    options={{
                        headerShown: true,
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