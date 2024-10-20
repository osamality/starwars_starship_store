/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import CartScreen from '../screens/CartScreen';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {View, Text, Image, StyleSheet} from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);

  // URLs for icons (you can replace these with your own URLs)
  const icons = {
    home: {
      active: 'https://img.icons8.com/fluency/48/000000/home.png',
      inactive: 'https://img.icons8.com/ios/48/ffffff/home.png',
    },
    search: {
      active: 'https://img.icons8.com/fluency/48/000000/search.png',
      inactive: 'https://img.icons8.com/ios/48/ffffff/search--v1.png',
    },
    cart: {
      active: 'https://img.icons8.com/fluency/48/000000/shopping-cart.png',
      inactive: 'https://img.icons8.com/ios/48/ffffff/shopping-cart--v1.png',
    },
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({focused}) => {
          let iconSource;

          switch (route.name) {
            case 'Home':
              iconSource = focused ? icons.home.active : icons.home.inactive;
              break;
            case 'Search':
              iconSource = focused
                ? icons.search.active
                : icons.search.inactive;
              break;
            case 'Cart':
              iconSource = focused ? icons.cart.active : icons.cart.inactive;
              break;
            default:
              iconSource = icons.home.inactive;
          }

          return (
            <View style={{position: 'relative'}}>
              <Image source={{uri: iconSource}} style={styles.icon} />
              {route.name === 'Cart' && cart.length > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cart.length}</Text>
                </View>
              )}
            </View>
          );
        },
        tabBarActiveTintColor: '#f39c12', // Golden yellow for active items
        tabBarInactiveTintColor: '#ffffff', // White for inactive items
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        tabBarStyle: {
          height: 85,
          paddingTop: 5,
          backgroundColor: '#1a1a1a', // Dark background
          borderTopWidth: 1,
          borderTopColor: '#333333', // Dark border
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: 'Cart',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: '#f39c12', // Golden yellow badge color to match theme
    borderRadius: 8,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#1a1a1a', // Dark text to contrast the yellow badge
    fontSize: 12,
    fontWeight: 'bold',
  },
});
