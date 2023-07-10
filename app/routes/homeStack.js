import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Welcome from '../screens/WelcomeScreen'
import About from '../screens/about'
import Login from '../screens/login'
import ViewScreen from '../screens/view'
import Menu from '../screens/menu'
import Edit from '../screens/quickAdd'
import Delete from '../screens/delete'
import FileIn from '../screens/fileIn'
import FileOut from '../screens/fileOut'
import History from '../screens/history'
import SSF from '../screens/spreadsheet'
import ImageU from '../screens/Imageuploader'
import Summary from '../screens/summary'

//BC Imports

import BCSpares from '../screens/TELUS/BCPages/BCCSparesSS'
import BCWS from '../screens/BCPages/BCWS'

// Central Imports

import CSpares from '../screens/TELUS/CentralPages/CCSparesSS'
import CWS from '../screens/CentralPages/CWS'

// Quebec Imports

import QSpares from '../screens/TELUS/QCPages/QCSparesSS'
import QWS from '../screens/TELUS/QCPages/QWS'

// Alberta Imports
import ABSpares from '../screens/TELUS/ABPages/ABCSparesSS'
import ABWS from '../screens/TELUS/ABPages/ABWS'



//---
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
  ImageU: {
    screen: ImageU,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
 

  //------BC
  BCMenu: {
    screen: BCMenu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  BCSpares: {
    screen: BCSpares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  BCWS: {
    screen: BCWS,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },


  //--------
  //------Central
  CMenu: {
    screen: CMenu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  CSpares: {
    screen: CSpares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  CWS: {
    screen:CWS,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },


  //--------
  //------Alberta
  ABMenu: {
    screen: ABMenu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  ABSpares: {
    screen: ABSpares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  ABWS: {
    screen:ABWS,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },


  //--------
  //------Quebec
  QMenu: {
    screen: QMenu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  QSpares: {
    screen: QSpares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  QWS: {
    screen:QWS,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  

  //Summary
  ELEC: {
    screen: ELEC,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  HVAC: {
    screen: HVAC,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  SummaryM: {
    screen: SummaryM,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  SummaryI: {
    screen: SummaryI,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  //--------

  //--------

  Summary: {
    screen: Summary,
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
