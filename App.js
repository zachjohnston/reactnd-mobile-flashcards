import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { purple, white } from "./utils/colors";
import { Constants } from "expo";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import DeckList from "./components/DeckList";
import AddDeck from "./components/AddDeck";

function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

const Tabs = createBottomTabNavigator({
  Decks: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='cards-outline' size={30} color={tintColor} />
    }
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: Platform.OS === 'ios' 
        ? ({ tintColor }) => <Ionicons name='ios-add-circle-outline' size={30} color={tintColor} />
        : ({ tintColor }) => <Ionicons name='md-add-circle-outline' size={30} color={tintColor} />
    }
  }
}, {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

// Required by React Navigation v3
const MainNavigatorContainer = createAppContainer(Tabs)

export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <CustomStatusBar backgroundColor={purple} barStyle='light-content' />
        <MainNavigatorContainer />
      </View>
    );
  }
}
