import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Starship} from '../types/starshipTypes';

interface OrderSummaryProps {
  cart: {
    item: Starship;
    quantity: number;
  }[];
}

const CONVERSION_RATE = 10000; // 10,000 space credits = 1 AED

const OrderSummary: React.FC<OrderSummaryProps> = ({cart}) => {
  const subtotal = cart.reduce((sum, cartItem) => {
    const costInCredits = parseFloat(cartItem.item.cost_in_credits);
    if (!isNaN(costInCredits)) {
      const costInAed = costInCredits / CONVERSION_RATE;
      return sum + costInAed * cartItem.quantity;
    }
    return sum;
  }, 0);

  const tax = subtotal * 0.05; // Assume a tax rate of 5%
  const total = subtotal + tax;

  return (
    <View style={styles.summaryContainer}>
      <Text style={styles.summaryItem}>
        Subtotal: {subtotal.toFixed(2)} AED
      </Text>
      <Text style={styles.summaryItem}>Tax (5%): {tax.toFixed(2)} AED</Text>
      <Text style={styles.summaryTotal}>Total: {total.toFixed(2)} AED</Text>
      <Text style={styles.conversionNote}>
        Note: Costs are converted from Space Credits (1 AED = 10,000 Space
        Credits)
      </Text>
    </View>
  );
};

export default OrderSummary;

const styles = StyleSheet.create({
  summaryContainer: {
    padding: 20,
    backgroundColor: '#1c1c1e',
    borderRadius: 8,
    marginBottom: 15,
  },
  summaryItem: {
    fontSize: 16,
    color: '#f1f1f1',
    marginBottom: 5,
  },
  summaryTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f39c12',
    marginTop: 10,
  },
  conversionNote: {
    fontSize: 14,
    marginTop: 10,
    color: '#c5c5c5',
  },
});
