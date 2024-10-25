import React, {useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useStarships} from '../hooks/useStarshipQuery';
import {addStarshipsToCart} from '../store/actions';
import {Starship} from '../types/starshipTypes';
import {RootState} from '../store/store';
import Header from '../components/Header';
import StarshipCard from '../components/StarshipCard';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';
import CartIndicator from '../components/CartIndicator';
import Toast from 'react-native-toast-message';

const HomeScreen: React.FC = () => {
  const {data: starships, isLoading, error} = useStarships();
  const cart = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  // Set maximum quantity allowed per item
  const MAX_QUANTITY = 5;

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return <ErrorComponent message="Error loading starships" />;
  }

  const handleIncreaseQuantity = (name: string) => {
    setQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[name] || 0;
      if (currentQuantity < MAX_QUANTITY) {
        return {...prevQuantities, [name]: currentQuantity + 1};
      } else {
        Toast.show({
          type: 'info',
          text1: 'Max Quantity Reached',
          text2: `You can only add up to ${MAX_QUANTITY} units of ${name}`,
        });
        return prevQuantities;
      }
    });
  };

  // Decrease Quantity
  const handleDecreaseQuantity = (name: string) => {
    setQuantities(prevQuantities => {
      const currentQuantity = prevQuantities[name] || 0;
      if (currentQuantity > 0) {
        return {...prevQuantities, [name]: currentQuantity - 1};
      }
      return prevQuantities;
    });
  };

  // Add to Cart
  const handleAddToCart = (item: Starship) => {
    const quantity = quantities[item.name]; // Get the quantity for the specific item

    if (quantity && quantity > 0) {
      // Dispatch the action with the correct payload (item and quantity)
      dispatch(addStarshipsToCart(item, quantity));
      Toast.show({
        type: 'success',
        text1: 'Added to Cart',
        text2: `${quantity} units of ${item.name} added to cart.`,
      });

      // Reset the quantity for the item after adding to the cart
      setQuantities(prevQuantities => ({...prevQuantities, [item.name]: 0}));
    } else {
      Toast.show({
        type: 'info',
        text1: 'No Quantity Selected',
        text2: `Please select a quantity to add ${item.name} to the cart.`,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Home" />
      <FlatList
        data={starships}
        keyExtractor={item => item.name}
        renderItem={({item}) => (
          <StarshipCard
            starship={item}
            quantity={quantities[item.name] || 0}
            onIncrease={() => handleIncreaseQuantity(item.name)}
            onDecrease={() => handleDecreaseQuantity(item.name)}
            onAddToCart={() => handleAddToCart(item)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      <CartIndicator cartItemCount={cart.length} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Dark background for Star Wars theme
  },
  listContent: {
    padding: 20,
  },
});
