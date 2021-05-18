import * as React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Settings} from '../modules/Settings';
import {RepoList} from '../modules/repoList';
import {BookMarked} from '../modules/bookmarked';
import {IssueList} from '../modules/issues';
import {UserDetail} from '../modules/userDetail';

const Tab = createBottomTabNavigator();
const DashboardStack = createStackNavigator();

function DashboardStackScreen({}) {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="RepoList" component={RepoList} />

      <DashboardStack.Screen name="IssueList" component={IssueList} />
      <DashboardStack.Screen name="UserDetail" component={UserDetail} />
    </DashboardStack.Navigator>
  );
}

const BookMarkStack = createStackNavigator();

function BookmarkStackScreen(props) {
  console.log(`app-navigator BookmarkStackScreen: ${JSON.stringify(props)}`);

  return (
    <BookMarkStack.Navigator>
      <BookMarkStack.Screen name="BookMarked" component={BookMarked} />
    </BookMarkStack.Navigator>
  );
}

const SettingsStack = createStackNavigator();

function SettingsStackScreen(props) {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={Settings} />
    </SettingsStack.Navigator>
  );
}

function AppTabs(props) {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      tabBarOptions={{
        activeTintColor: '#e91e63',
      }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardStackScreen}
        options={{
          tabBarLabel: 'Repo',
        }}
      />

      <Tab.Screen
        name="Bookmark"
        component={BookmarkStackScreen}
        options={{
          tabBarLabel: 'Bookmark',
        }}
      />

      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
    </Tab.Navigator>
  );
}

const AppNavigator = props => {
  return <AppTabs data={props} />;
};

export default AppNavigator;
