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

//BC Imports
import BCMenu from '../screens/BCPages/BCMenu'
import BCSpares from '../screens/BCPages/BCCSparesSS'
import BCWS from '../screens/BCPages/BCWS'
import BCRemove from '../screens/BCPages/BCRemove'
import BCDates from '../screens/BCPages/BCDates'
import BCMaintenance from '../screens/BCPages/BCMaintenance'
import TPO from '../screens/BCPages/TestpageOut'
import TPI from '../screens/BCPages/TestPageIn'
import TPS from '../screens/BCPages/LLLLL'

//

// Central Imports
import CMenu from '../screens/CentralPages/CMenu'
import CSpares from '../screens/CentralPages/CCSparesSS'
import CWS from '../screens/CentralPages/CWS'
import CRemove from '../screens/CentralPages/CRemove'
import CDates from '../screens/CentralPages/CDates'
import CMaintenance from '../screens/CentralPages/CMaintenance'
//
//
// Quebec Imports
import QMenu from '../screens/QCPages/QMenu'
import QSpares from '../screens/QCPages/QCSparesSS'
import QWS from '../screens/QCPages/QWS'
import QRemove from '../screens/QCPages/QRemove'
import QDates from '../screens/QCPages/QDates'
import QMaintenance from '../screens/QCPages/QMaintenance'
//

// Alberta Imports
import ABMenu from '../screens/ABPages/ABMenu'
import ABSpares from '../screens/ABPages/ABCSparesSS'
import ABWS from '../screens/ABPages/ABWS'
import ABRemove from '../screens/ABPages/ABRemove'
import ABDates from '../screens/ABPages/ABDates'
import ABMaintenance from '../screens/ABPages/ABMaintenance'
//




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
  BCRemove: {
    screen: BCRemove,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  BCDates: {
    screen: BCDates,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  BCMaintenance: {
    screen: BCMaintenance,
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
  CRemove: {
    screen: CRemove,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  CDates: {
    screen: CDates,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  CMaintenance: {
    screen: CMaintenance,
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
  ABRemove: {
    screen: ABRemove,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  ABDates: {
    screen: ABDates,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  ABMaintenance: {
    screen: ABMaintenance,
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
  QRemove: {
    screen: QRemove,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  QDates: {
    screen: QDates,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  QMaintenance: {
    screen: QMaintenance,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  TPO: {
    screen: TPO,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  TPI: {
    screen: TPI,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  TPS: {
    screen: TPS,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  //--------
};


const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);
