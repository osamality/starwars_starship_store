import React, {useState} from 'react';
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

const SearchScreen: React.FC = () => {
  const [query, setQuery] = useState('');
  const {data: searchResults, isLoading, error} = useSearchStarships(query);
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart);

  const handleSearch = (text: string) => {
    setQuery(text);
  };

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
              quantity={0}
              onIncrease={() => {}}
              onDecrease={() => {}}
              onAddToCart={() => dispatch(addToCart(item))}
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
