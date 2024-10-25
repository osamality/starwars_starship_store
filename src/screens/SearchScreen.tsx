import React, {useEffect, useState} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useSearchStarships} from '../hooks/useStarshipQuery';
import {addToCart} from '../store/actions';
import {Starship} from '../types/starshipTypes';
import {RootState, AppDispatch} from '../store/store';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import StarshipCard from '../components/StarshipCard';
import LoadingComponent from '../components/LoadingComponent';
import ErrorComponent from '../components/ErrorComponent';
import CartIndicator from '../components/CartIndicator';
import Toast from 'react-native-toast-message';

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const {data: searchResults, isLoading, error} = useSearchStarships(query);
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);
  const [quantities, setQuantities] = useState<{[key: string]: number}>({});

  // Set maximum quantity allowed per item
  const MAX_QUANTITY = 5;

  const handleSearch = (text: string) => {
    setQuery(text);
  };

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

  const handleAddToCart = (item: Starship) => {
    const quantity = quantities[item.name];
    if (quantity && quantity > 0) {
      dispatch(addToCart(item, quantity));
      Toast.show({
        type: 'success',
        text1: 'Added to Cart',
        text2: `${quantity} units of ${item.name} added to cart.`,
      });
      setQuantities(prevQuantities => ({...prevQuantities, [item.name]: 0}));
    } else {
      Toast.show({
        type: 'info',
        text1: 'No Quantity Selected',
        text2: `Please select a quantity to add ${item.name} to the cart.`,
      });
    }
  };

  useEffect(() => {
    if (query.length > 0 && query.length <= 2) {
      Toast.show({
        type: 'info',
        text1: 'Search Length',
        text2: `Please type at least 3 characters to initiate search`,
      });
    }
  }, [query]);

  return (
    <View style={styles.container}>
      <Header title="Search" />
      <SearchBar value={query} onChangeText={handleSearch} />
      {isLoading ? (
        <LoadingComponent />
      ) : error ? (
        <ErrorComponent message="Error loading search results" />
      ) : (
        <FlatList
          data={searchResults}
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
      )}
      <CartIndicator cartItemCount={cart.length} />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a', // Dark background for Star Wars theme
  },
  listContent: {
    padding: 20,
  },
});
