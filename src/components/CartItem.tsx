import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Starship} from '../types/starshipTypes';
import Touch from './Touch';
import {useDispatch} from 'react-redux';
import {addToCart, removeFromCart} from '../store/actions';
import {AppDispatch} from '../store/store';
import {AED_TO_SPACE_CREDITS} from '../utils/constants';

interface CartItemProps {
  starship: {
    item: Starship;
    quantity: number;
  };
}

const CartItem: React.FC<CartItemProps> = ({starship}) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveItem = () => {
    dispatch(removeFromCart(starship.item));
  };

  const handleIncreaseQuantity = () => {
    dispatch(addToCart(starship.item));
  };

  // Calculate cost in AED based on space credits
  const costInAed =
    parseFloat(starship.item.cost_in_credits) / AED_TO_SPACE_CREDITS;

  return (
    <View style={styles.cartItem}>
      <Image
        source={{uri: `https://picsum.photos/seed/${starship.item.name}/100`}}
        style={styles.thumbnail}
      />
      <View style={styles.cartDetails}>
        <Text style={styles.starshipName}>{starship.item.name}</Text>
        <Text style={styles.starshipCost}>
          {costInAed.toFixed(2)} AED ({starship.item.cost_in_credits} Space
          Credits)
        </Text>
      </View>
      <View style={styles.controls}>
        <Touch
          title="-"
          onPress={handleRemoveItem}
          style={styles.quantityButton}
          textStyle={styles.quantityButtonText}
        />
        <Text style={styles.quantityText}>{starship.quantity}</Text>
        <Touch
          title="+"
          onPress={handleIncreaseQuantity}
          style={styles.quantityButton}
          textStyle={styles.quantityButtonText}
        />
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 15,
  },
  cartDetails: {
    flex: 2,
    marginRight: 15,
  },
  starshipName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f1f1',
  },
  starshipCost: {
    fontSize: 14,
    color: '#c5c5c5',
    marginTop: 5,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#3a3a3c',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 50,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: '#f1f1f1',
    fontSize: 20,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f1f1',
    marginHorizontal: 10,
  },
});
