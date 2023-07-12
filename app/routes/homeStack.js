import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Welcome from '../screens/WelcomeScreen'
import About from '../screens/cleartime'
import Login from '../screens/login'
import ViewScreen from '../screens/view'
import Edit from '../screens/TELUS/quickAdd'
import History from '../screens/history'
import ClientMenu from '../screens/clientMenu'


//TELUS IMPORTS
import TelusMenu from '../screens/TELUS/menu'
//BC Imports
import BCSpares from '../screens/TELUS/BCPages/BCCSparesSS'
import BCWS from '../screens/TELUS/BCPages/BCWS'
// Central Imports
import CSpares from '../screens/TELUS/CentralPages/CCSparesSS'
import CWS from '../screens//TELUS/CentralPages/CWS'
// Quebec Imports
import QSpares from '../screens/TELUS/QCPages/QCSparesSS'
import QWS from '../screens/TELUS/QCPages/QWS'
// Alberta Imports
import ABSpares from '../screens/TELUS/ABPages/ABCSparesSS'
import ABWS from '../screens/TELUS/ABPages/ABWS'

import Summary from '../screens/TELUS/summary'
import FileIn from '../screens/TELUS/fileIn'
import FileOut from '../screens/TELUS/fileOut'
//---

//AI Imports
import AIMenu from '../screens/AI/AIMenu'

//BCHYDRO Imports
import BCHydroMenu from '../screens/BCHydro/BCHydroMenu'

//SAIT Imports
import SAITMenu from '../screens/SAIT/SAITMenu'





//U3 IMPORTS
import U3ClientMenu from '../screens/U3/U3ClientMenu'
//U3 Telus
import U3TelusSummary from '../screens/U3/U3TELUS/U3TelusS'
import U3BCSpares from '../screens/U3/U3TELUS/U3BCPages/U3BCCSparesSS'
import U3CSpares from '../screens/U3/U3TELUS/U3ABPages/U3ABCSparesSS'
import U3QSpares from '../screens/U3/U3TELUS/U3CentralPages/U3CCSparesSS'
import U3ABSpares from '../screens/U3/U3TELUS/U3QCPages/U3QCSparesSS'
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
  TelusMenu: {
    screen: TelusMenu,
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
  
 

  //------BC
 
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

  //--------

  //AI --------------

  AIMenu: {
    screen:AIMenu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  //END OF AI---------------

  //BCHYDRO --------------

  BCHydroMenu: {
    screen:BCHydroMenu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  //END OF BCHydro---------------

  //SAIT --------------

  SAITMenu: {
    screen:SAITMenu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  //END OF SAIT---------------

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
  ClientMenu: {
    screen: ClientMenu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },




  //U3 Stuff

  U3ClientMenu: {
    screen: U3ClientMenu,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  U3TelusSummary: {
    screen: U3TelusSummary,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3BCSpares: {
    screen: U3BCSpares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3CSpares: {
    screen: U3CSpares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3ABSpares: {
    screen: U3ABSpares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3QSpares: {
    screen: U3QSpares,
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
