import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

// Define the type for your Bottom Tab Navigator
export type RootTabParamList = {
    Home: undefined;
    Search: undefined;
    Cart: undefined;
};

// Define type for navigation props
export type CartScreenNavigationProp = BottomTabNavigationProp<RootTabParamList, 'Cart'>;

// Define type for route props (if needed)
export type CartScreenRouteProp = RouteProp<RootTabParamList, 'Cart'>;
