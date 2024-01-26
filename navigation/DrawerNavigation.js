import React from "react";
import {Dimensions} from "react-native";
import {createAppContainer, createDrawerNavigator} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import LinkScreen from "../screens/LinkScreen";
import SettingsScreen from "../screens/SettingsScreen";
import NotificationsScreen from "../screens/NotificationsScreen";
import ProfileSettingsScreen from "../screens/ProfileSettingsScreen";
import EventsScreen from "../screens/EventsScreen";
import ScanScreen from "../screens/ScanScreen";
import SearchScreen from "../screens/SearchScreen";
import MenuDrawer from "../components/MenuDrawer";
import LoginScreen from "../screens/LoginScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CamaraScreen from "../screens/CamaraScreen";
import WineInfoScreen from "../screens/WineInfoScreen";
import AboutScreen from "../screens/AboutScreen";
import HelpContactsScreen from "../screens/HelpContactsScreen";
import MudarPassScreen from "../screens/MudarPassScreen";
import LoadingScreen from "../screens/LoadingScreen";
import RegisterScreen from "../screens/RegisterScreen";
import RecoverPassword from "../screens/RecoverPassword";
import Followers from "../components/ProfileComponents/profile/Followers";
import Following from "../components/ProfileComponents/profile/Following";
import SearchResults from "../components/SearchComponents/SearchResults";
import MoremoreScreen from "../components/HomeComponents/Moremore"

const WIDTH = Dimensions.get("window").width;

const DrawerConfig = {
    drawerWidth: WIDTH * 0.83,
    contentComponent: ({navigation}) => {
        return <MenuDrawer navigation={navigation}/>;
    }
};

const DrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: LoadingScreen
        },
        Feed: {
            screen: HomeScreen
        },
        Links: {
            screen: LinkScreen
        },
        Settings: {
            screen: SettingsScreen
        },
        Notifications: {
            screen: NotificationsScreen
        },
        ProfileSettings: {
            screen: ProfileSettingsScreen
        },
        Events: {
            screen: EventsScreen
        },
        Scan: {
            screen: ScanScreen
        },
        Search: {
            screen: SearchScreen
        },
        Profile: {
            screen: ProfileScreen
        },
        Camara: {
            screen: CamaraScreen
        },
        WineInfo: {
            screen: WineInfoScreen
        },
        About: {
            screen: AboutScreen
        },
        HelpContacts: {
            screen: HelpContactsScreen
        },
        MudarPass: {
            screen: MudarPassScreen
        },
        Login: {
            screen: LoginScreen
        },
        Register: {
            screen: RegisterScreen
        },
        Followers: {
            screen: Followers
        },
        Following: {
            screen: Following
        },
        SearchResults: {
            screen: SearchResults
        },
        RecoverPassword: {
            screen: RecoverPassword
        },
        MoreComent: {
            screen: MoremoreScreen
        }
    },
    DrawerConfig
);
export default createAppContainer(DrawerNavigator);
