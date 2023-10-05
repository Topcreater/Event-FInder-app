import { Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home'
import CardSection from '../pages/CardSection'
import cardImage from '../../assest/card.png'
import homeImage from '../../assest/home.png'
const Routes = () => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();

    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Homes" component={Home} />
        <Stack.Screen name="Cards" component={CardSection} />
    </Stack.Navigator>
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: true,
                    tabBarActiveTintColor: '#FF7C84',
                    tabBarInactiveTintColor: 'black',
                    headerTitleAlign: 'center',
                    tabBarStyle: {
                        borderTopEndRadius: 15,
                        borderTopStartRadius: 15,
                        height: 73,
                        backgroundColor: 'white',
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
                    component={Home}
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={focused ? homeImage : homeImage}
                                style={{ width: 24, height: 24, }}
                            />
                        ),
                        tabBarLabel: 'Home',
                    }}
                />
                <Tab.Screen
                    name="Card"
                    component={CardSection}
                    options={{
                        headerShown: true,
                        tabBarIcon: ({ focused }) => (
                            <Image
                                source={focused ? cardImage : cardImage}
                                style={{ width: 30, height: 30, }}
                            />
                        ),
                        tabBarLabel: 'Add to Card',
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
export default Routes;