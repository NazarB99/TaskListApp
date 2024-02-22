import {
  StackNavigationProp,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {MainScreen} from '../screens/MainScreen';
import {DetailsScreen} from '../screens/DetailsScreen';
import {TaskFormScreen} from '../screens/TaskFormScreen';
import {Header} from './components/Header';
import {RouteProp, useRoute} from '@react-navigation/native';

type RootStackParamList = {
  Main: undefined;
  Details: undefined | {itemId: string};
  TaskForm: undefined | {itemId: string};
};

export type MainStackNavigationType = StackNavigationProp<RootStackParamList>;

export function useTypedRoute<Screen extends keyof RootStackParamList>() {
  // This will automatically infer the route type based on `Screen`
  const route = useRoute<RouteProp<RootStackParamList, Screen>>();
  return route;
}

const Stack = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{header: () => <Header title="Task List" />}}
        component={MainScreen}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
      <Stack.Screen name="TaskForm" component={TaskFormScreen} />
    </Stack.Navigator>
  );
};
