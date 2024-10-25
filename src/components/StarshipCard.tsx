import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {Starship} from '../types/starshipTypes';

interface StarshipCardProps {
  starship: Starship;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onAddToCart: () => void;
}

const StarshipCard: React.FC<StarshipCardProps> = ({
  starship,
  quantity,
  onIncrease,
  onDecrease,
  onAddToCart,
}) => {
  return (
    <View style={styles.card}>
      <Image
        source={{uri: `https://picsum.photos/seed/${starship.name}/200`}}
        style={styles.thumbnail}
      />
      <View style={styles.cardContent}>
        <Text style={styles.starshipName}>
          {starship?.name ? starship.name : 'name not Availble'}
        </Text>
        <Text style={styles.starshipCost}>
          Cost: {(parseFloat(starship.cost_in_credits) / 10000).toFixed(2)} AED
        </Text>
        <View style={styles.quantityControl}>
          <TouchableOpacity
            disabled={
              starship?.cost_in_credits === undefined ||
              starship?.cost_in_credits === null ||
              Number.isNaN(parseFloat(starship.cost_in_credits))
            }
            style={styles.quantityButton}
            onPress={onDecrease}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity
            disabled={
              starship?.cost_in_credits === undefined ||
              starship?.cost_in_credits === null ||
              Number.isNaN(parseFloat(starship.cost_in_credits))
            }
            style={styles.quantityButton}
            onPress={onIncrease}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.addToCartButton,
            (starship?.cost_in_credits === undefined ||
              starship?.cost_in_credits === null ||
              Number.isNaN(parseFloat(starship.cost_in_credits)) ||
              quantity === 0) &&
              styles.disabledButton,
          ]}
          onPress={onAddToCart}
          disabled={
            starship?.cost_in_credits === undefined ||
            starship?.cost_in_credits === null ||
            Number.isNaN(parseFloat(starship.cost_in_credits)) ||
            quantity === 0
              ? true
              : false
          }>
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StarshipCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#2c2c2e', // Dark card background
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  cardContent: {
    flex: 1,
    marginLeft: 15,
  },
  starshipName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12', // Golden yellow for emphasis
    marginBottom: 5,
  },
  starshipCost: {
    fontSize: 16,
    color: '#e1e1e1', // Light text for cost details
    marginBottom: 10,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
  },
  quantityButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 10,
    color: '#ffffff', // Light text color for quantity
  },
  addToCartButton: {
    backgroundColor: '#f39c12', // Golden yellow for the button
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#1a1a1a', // Dark text color to contrast with golden yellow
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#8e8e93', // Grey color for disabled state
  },
});
