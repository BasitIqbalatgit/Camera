import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Assignment from './Pages/Assignment02/Assignment02';
// import TakePicture from './Pages/Assignment02/TakePicture';
// import ViewPicture from './Pages/Assignment02/ViewPicture';

import TakePicture from './src/screens/TakePicture';
import ViewPicture from './src/screens/ViewPicture';
import Home from './src/screens/Home';
const stack = createNativeStackNavigator();

export default function App() {


  return (
    <NavigationContainer>
      <stack.Navigator initialRouteName='Home' screenOptions={{
        headerShown:false
      }}>
        <stack.Screen name='Home' component={Home}/>
        <stack.Screen name='TakePicture' component={TakePicture}/>
        <stack.Screen name='ViewPicture' component={ViewPicture} />
      </stack.Navigator>
    </NavigationContainer>
  );
};