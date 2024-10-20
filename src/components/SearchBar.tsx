import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({value, onChangeText}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search Starships..."
        placeholderTextColor="#8e8e93"
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#333333',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 15,
  },
  input: {
    height: 40,
    paddingHorizontal: 10,
    color: '#ffffff', // White text color
    backgroundColor: '#1a1a1a', // Dark background for the text input
    borderRadius: 5,
  },
});
