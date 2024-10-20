import React from 'react';
import {View, FlatList, StyleSheet, Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store/store';
import {emptyCart, setPaymentMethod} from '../store/actions';
import {PAYMENT_METHODS, ORDER_PLACED_MESSAGE} from '../utils/constants';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import PaymentMethodSelector from '../components/PaymentMethodSelector';
import OrderSummary from '../components/OrderSummary';
import Touch from '../components/Touch';
import Toast from 'react-native-toast-message';

const CartScreen: React.FC = () => {
  const cart = useSelector((state: RootState) => state.cart);
  const paymentMethod = useSelector((state: RootState) => state.paymentMethod);
  const dispatch = useDispatch<AppDispatch>();

  const handlePlaceOrder = () => {
    if (cart.length > 0) {
      dispatch(emptyCart());
      Toast.show({
        type: 'success',
        text1: 'Order Placed',
        text2: ORDER_PLACED_MESSAGE,
      });
    } else {
      Toast.show({
        type: 'error',
        text1: 'Cart is Empty',
        text2: 'Please add items to the cart before placing an order.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Cart" />
      <FlatList
        data={cart}
        keyExtractor={item => item.item.name}
        renderItem={({item}) => <CartItem starship={item} />}
        contentContainerStyle={styles.listContent}
      />
      <PaymentMethodSelector
        currentMethod={paymentMethod}
        onChangeMethod={() =>
          dispatch(
            setPaymentMethod(
              paymentMethod === PAYMENT_METHODS[0]
                ? PAYMENT_METHODS[1]
                : PAYMENT_METHODS[0],
            ),
          )
        }
      />
      <OrderSummary cart={cart} />
      <View style={styles.buttonContainer}>
        <Touch
          title="Place Order"
          onPress={handlePlaceOrder}
          style={styles.placeOrderButton}
          textStyle={styles.placeOrderButtonText}
        />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Dark background for Star Wars theme
  },
  listContent: {
    padding: 20,
  },
  buttonContainer: {
    padding: 20,
    backgroundColor: '#1a1a1a',
  },
  placeOrderButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  placeOrderButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
