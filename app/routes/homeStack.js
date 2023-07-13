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
import AISummary from '../screens/AI/AISummary'
import AI1Spares from '../screens/AI/AI1/AI1Spares'
import AI2Spares from '../screens/AI/AI2/AI2Spares'
import AI3Spares from '../screens/AI/AI3/AI3Spares'
import AI4Spares from '../screens/AI/AI4/AI4Spares'
import AIFileIn from '../screens/AI/AIFileIn'
import AIFileOut from '../screens/AI/AIFileOut'
import AIQuickAdd from '../screens/AI/AIQuickAdd'

//BCHYDRO Imports
import BCHydroMenu from '../screens/BCHydro/BCHydroMenu'
import BCHydroSummary from '../screens/BCHydro/BCHydroSummary'
import BCHydro1Spares from '../screens/BCHydro/BCHydro1/BCHydro1Spares'
import BCHydro2Spares from '../screens/BCHydro/BCHydro2/BCHydro2Spares'
import BCHydro3Spares from '../screens/BCHydro/BCHydro3/BCHydro3Spares'
import BCHydro4Spares from '../screens/BCHydro/BCHydro4/BCHydro4Spares'
import BCHydroFileIn from '../screens/BCHydro/BCHydroFileIn'
import BCHydroFileOut from '../screens/BCHydro/BCHydroFileOut'
import BCHydroQuickAdd from '../screens/BCHydro/BCHydroQuickAdd'
//SAIT Imports
import SAITMenu from '../screens/SAIT/SAITMenu'
import SAITSummary from '../screens/SAIT/SAITSummary'
import SAIT1Spares from '../screens/SAIT/SAIT1/SAIT1Spares'
import SAIT2Spares from '../screens/SAIT/SAIT2/SAIT2Spares'
import SAIT3Spares from '../screens/SAIT/SAIT3/SAIT3Spares'
import SAIT4Spares from '../screens/SAIT/SAIT4/SAIT4Spares'
import SAITFileIn from '../screens/SAIT/SAITFileIn'
import SAITFileOut from '../screens/SAIT/SAITFileOut'
import SAITQuickAdd from '../screens/SAIT/SAITQuickAdd'





//U3 IMPORTS
import U3ClientMenu from '../screens/U3/U3ClientMenu'
//U3 Telus
import U3TelusSummary from '../screens/U3/U3TELUS/U3TelusS'
import U3BCSpares from '../screens/U3/U3TELUS/U3BCPages/U3BCCSparesSS'
import U3CSpares from '../screens/U3/U3TELUS/U3CentralPages/U3CCSparesSS'
import U3QSpares from '../screens/U3/U3TELUS/U3QCPages/U3QCSparesSS'
import U3ABSpares from '../screens/U3/U3TELUS/U3ABPages/U3ABCSparesSS'
//U3 SAIT
import U3SAITSummary from '../screens/U3/U3SAIT/U3SAITS'
import U3SAIT1Spares from '../screens/U3/U3SAIT/U3SAIT1/U3SAIT1Spares'
import U3SAIT2Spares from '../screens/U3/U3SAIT/U3SAIT2/U3SAIT2Spares'
import U3SAIT3Spares from '../screens/U3/U3SAIT/U3SAIT3/U3SAIT3Spares'
import U3SAIT4Spares from '../screens/U3/U3SAIT/U3SAIT4/U3SAIT4Spares'

import U3BCHydroSummary from '../screens/U3/U3BCHydro/U3BCHydroS'
import U3BCHydro1Spares from '../screens/U3/U3BCHydro/U3BCHydro1/U3BCHydro1Spares'
import U3BCHydro2Spares from '../screens/U3/U3BCHydro/U3BCHydro2/U3BCHydro2Spares'
import U3BCHydro3Spares from '../screens/U3/U3BCHydro/U3BCHydro3/U3BCHydro3Spares'
import U3BCHydro4Spares from '../screens/U3/U3BCHydro/U3BCHydro4/U3BCHydro4Spares'

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
  AISummary: {
    screen:AISummary,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  AI1Spares: {
    screen:AI1Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  AI2Spares: {
    screen:AI2Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  AI3Spares: {
    screen:AI3Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  AI4Spares: {
    screen:AI4Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  AIFileOut: {
    screen:AIFileOut,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  AIFileIn: {
    screen:AIFileIn,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  AIQuickAdd: {
    screen:AIQuickAdd,
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
  BCHydroSummary: {
    screen:BCHydroSummary,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  BCHydro1Spares: {
    screen:BCHydro1Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  BCHydro2Spares: {
    screen:BCHydro2Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  BCHydro3Spares: {
    screen:BCHydro3Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  BCHydro4Spares: {
    screen:BCHydro4Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  BCHydroFileOut: {
    screen:BCHydroFileOut,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  BCHydroFileIn: {
    screen:BCHydroFileIn,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  BCHydroQuickAdd: {
    screen:BCHydroQuickAdd,
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
  SAITSummary: {
    screen:SAITSummary,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  SAIT1Spares: {
    screen:SAIT1Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  SAIT2Spares: {
    screen:SAIT2Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  SAIT3Spares: {
    screen:SAIT3Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  SAIT4Spares: {
    screen:SAIT4Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  SAITFileOut: {
    screen:SAITFileOut,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  SAITFileIn: {
    screen:SAITFileIn,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  SAITQuickAdd: {
    screen:SAITQuickAdd,
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





  U3SAITSummary: {
    screen: U3SAITSummary,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3SAIT1Spares: {
    screen: U3SAIT1Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3SAIT2Spares: {
    screen: U3SAIT2Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3SAIT3Spares: {
    screen: U3SAIT3Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3SAIT4Spares: {
    screen: U3SAIT4Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },

  U3BCHydroSummary: {
    screen: U3BCHydroSummary,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3BCHydro1Spares: {
    screen: U3BCHydro1Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3BCHydro2Spares: {
    screen: U3BCHydro2Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3BCHydro3Spares: {
    screen: U3BCHydro3Spares,
    navigationOptions: ({ navigation }) => ({
      headerStyle: {
        backgroundColor: '#144E87',
        width: '100%',
      },
      headerTitle: () => null,
    }),
    
  },
  U3BCHydro4Spares: {
    screen: U3BCHydro4Spares,
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
