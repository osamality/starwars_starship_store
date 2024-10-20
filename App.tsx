import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import store from './src/store/store';
import TabNavigator from './src/navigation/TabNavigator';
import Toast from 'react-native-toast-message';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <TabNavigator />
          <Toast />
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
