import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Switch, TouchableOpacity } from 'react-native';
import menu from './composants/menu.json';

export default function App() {
  let [dishes, setDishes] = useState(menu);
  let [screen, setScreen] = useState('main'); //'main', 'cart' or 'dish'

  let selectedDishes = menu.filter(function (e){
    return e.isSelected;
  });

  if (screen == 'cart'){
    return(
      <ScrollView style={styles.container}>
        <TouchableOpacity style = {styles.navBarCart}
          onPress = {function (){
            setScreen('menu');
          }}
        >
          <Text style = {styles.navTextCart}>🍔 Menu</Text>
        </TouchableOpacity>
      </ScrollView>
    )
  }

  return (
    <ScrollView style={styles.container}>
        <View style = {styles.navBarMain}>
          <TouchableOpacity style = {styles.cartImage}
          onPress = {function (){
            setScreen('cart');
          }}
          >
            <Cart/>
          </TouchableOpacity>
          <View>
            <StatusBar style="auto" />
          </View>
        </View>
        <View style={styles.menu}>
          <Text style = {styles.Selection}>Votre sélection</Text>
          {selectedDishes.length > 0 ? (selectedDishes.map(function (d){
            return <Text style = {styles.selectionPlats}>{d.platNom}</Text>;
          })
          ) : (
            <Text style = {styles.selectionPlats}>Aucun plat sélectionné...</Text>
          )}
          {menu.map(function (elmnt, index){
            return(
              <Menu
                isLast = {index == menu.length-1}
                isSelected = {elmnt.isSelected}
                platNom = {elmnt.platNom}
                platPrix = {elmnt.platPrix}
                platImage = {elmnt.platImage}
                platDesc = {elmnt.platDesc}
                onSelect = {function (){
                  let newSelection = menu.map(function(e){
                    if (elmnt.platNom == e.platNom){
                      e.isSelected = !e.isSelected;
                      return e;
                    }
                    return e;
                  });
                  setDishes(newSelection);
                }}
              />
            )
          })}
        </View>
    </ScrollView>
  );
}

function Menu(props){
  return(
      <View style={[styles.menuContainer, props.isLast ? {borderWidth: 0} : {}]}>
          <Image style={styles.menuImage} source={{uri: props.platImage}}></Image>
          <View style={styles.menuInfo}>
              <Switch
                style = {{alignContent: 'flex-end'}}
                value = {props.selected}
                onValueChange = {props.onSelect}
              />
              <Text style={styles.menuNom}>{props.platNom}</Text>
              <Text style={styles.menuPrix}>{props.platPrix + "€"}</Text>
              <Text style={styles.menuDesc}>{props.platDesc}</Text>
          </View>
      </View>
  );
}

function Cart(props){
  return(
    <View style={styles.cartCard}>
      <Image 
        style = {styles.cartImage}
        source = {{uri: "https://thumbs.dreamstime.com/b/shopping-cart-icon-vector-logo-137282150.jpg"}}>
      </Image>
      <Text style = {styles.text}>DeliveCROUS</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#dff1f1'
  },
  title: {
    backgroundColor: '#9cb1b5',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    padding: 40,
    borderRadius: 2,
    borderWidth: 5,
    borderBottomWidth: 0,
    borderColor: "#55adad"
  },
  text: {
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Baskerville',
    fontSize: 30,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: '#665555',
    paddingLeft: 50
  },
  menu: {
    borderWidth: 5,
    borderTopWidth: 3,
    borderColor: '#55adad'
  },
  menuContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
    marginBottom: 5,
    borderBottomWidth: 2,
    borderColor: "#55adad"
  },
  menuImage: {
    resizeMode: 'contain',
    height: 200,
    width: 200
  },
  menuInfo: {

  },
  selectionPlats: {
    paddingLeft: 5,
    fontSize: 15,
    color: 'black',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#55adad'
  },
  Selection: {
    margin: 3,
    paddingLeft: '33%',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#665555',
    borderRadius: 3,
    borderWidth: 2,
    borderColor: '#55adad'
  },
  navBarMain: {
    backgroundColor: '#9cb1b5',
    padding: '5%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'baseline'
  },
  navTextMain: {
    fontSize: 30,
    fontFamily: 'Baskerville',
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#665555',
  },
  navBarCart: {
    padding: '5%',
    backgroundColor: '#9cb1b5',
    alignItems: 'baseline'
  },
  navTextCart: {
    fontSize: 30,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: '#665555',
    paddingLeft: '1%'
  },
  cartImage: {
    resizeMode: 'contain',
    width: 30,
    height: 30
  },
  cartCard: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline'
  }
});