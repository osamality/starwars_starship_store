import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {CartScreenNavigationProp} from '../types/navigationTypes';

interface CartIndicatorProps {
  cartItemCount: number;
}

const CartIndicator: React.FC<CartIndicatorProps> = ({cartItemCount}) => {
  const navigation = useNavigation<CartScreenNavigationProp>(); // Type navigation properly

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Cart')}>
      <Text style={styles.cartText}>View Cart ({cartItemCount} items)</Text>
    </TouchableOpacity>
  );
};

export default CartIndicator;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    backgroundColor: '#f39c12', // Golden yellow for the button
    paddingVertical: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  cartText: {
    color: '#1a1a1a', // Dark text to contrast against the golden yellow
    fontSize: 16,
    fontWeight: 'bold',
  },
});
