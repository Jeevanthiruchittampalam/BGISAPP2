import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Welcome from '../screens/WelcomeScreen'
import About from '../screens/about'
import Login from '../screens/login'
import ViewScreen from '../screens/view'
import Menu from '../screens/menu'
import Edit from '../screens/edit'
import Delete from '../screens/delete'
import FileIn from '../screens/fileIn'
import FileOut from '../screens/fileOut'
import History from '../screens/history'
import SSF from '../screens/spreadsheet'


const screens = {
  Welcome: {
    screen: Welcome,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
      },
      headerTitle: () => null,
    }),
  },
  About: {
    screen: About,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
      },
      headerTitle: () => null,
    }),
  },
  Login: {
    screen: Login,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
      },
      headerTitle: () => null,
    }),
  },
  ViewScreen: {
    screen: ViewScreen,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
      },
      headerTitle: () => null,
    }),
  },
  Menu: {
    screen: Menu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
      },
      headerTitle: () => null,
    }),
  },
  Edit: {
    screen: Edit,
    navigationOptions: ({navigation}) => ({
      headerStyle: {
        backgroundColor: '#144E87',
      },
      headerTitle: () => null,
    }),
  },
  Delete: {
    screen: Delete,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
      },
      headerTitle: () => null,
    }),
    
  },
  FileIn: {
    screen: FileIn,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
      },
      headerTitle: () => null,
    }),
    
  },
  FileOut: {
    screen: FileOut,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
      },
      headerTitle: () => null,
    }),
    
  },
  History: {
    screen: History,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
      },
      headerTitle: () => null,
    }),
    
  },
  SSF: {
    screen: SSF,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
};


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
