import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

interface PaymentMethodSelectorProps {
  currentMethod: string;
  onChangeMethod: () => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  currentMethod,
  onChangeMethod,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.methodText}>Payment Method: {currentMethod}</Text>
      <TouchableOpacity onPress={onChangeMethod} style={styles.changeButton}>
        <Text style={styles.changeButtonText}>Change</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentMethodSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#2c1d1d',
    borderRadius: 8,
    marginBottom: 15,
  },
  methodText: {
    fontSize: 16,
    color: '#f1f1f1',
  },
  changeButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f39c12',
    borderRadius: 5,
  },
  changeButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
