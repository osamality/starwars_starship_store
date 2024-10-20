import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../store/store';
import {CartScreenNavigationProp} from '../types/navigationTypes';

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header: React.FC<HeaderProps> = ({title, showBackButton = false}) => {
  const navigation = useNavigation<CartScreenNavigationProp>(); // Type navigation properly
  const cart = useSelector((state: RootState) => state.cart);

  // URLs for new icons fitting the dark theme
  const icons = {
    backButton: 'https://img.icons8.com/ios/30/f39c12/back.png',
    cart: 'https://img.icons8.com/ios/30/f39c12/shopping-cart--v1.png',
  };

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconContainer}>
          <Image source={{uri: icons.backButton}} style={styles.icon} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Cart')}
        style={styles.iconContainer}>
        <Image source={{uri: icons.cart}} style={styles.icon} />
        {cart.length > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cart.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1a1a1a', // Dark background for Star Wars theme
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333', // Dark border to match theme
    height: 70 + (Platform.OS === 'ios' ? 30 : StatusBar.currentHeight || 0),
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight || 10, // Adjust padding for top
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f39c12', // Golden yellow title for a premium look
    flex: 1,
    textAlign: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  badge: {
    position: 'absolute',
    right: -6,
    top: 2,
    backgroundColor: '#f39c12', // Golden yellow badge color to match the theme
    borderRadius: 8,
    width: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#1a1a1a', // Dark text color for contrast against the golden yellow badge
    fontSize: 10,
    fontWeight: 'bold',
  },
});
