import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Switch } from 'react-native';
import menu from './composants/menu.json';

export default function App() {
  let [selected, setSelected] = useState(menu);

  let selectedDishes = menu.filter(function (e){
    return e.isSelected;
  });
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style = {styles.title}>
          <Text style = {styles.text}>DeliveCROUS</Text>
          <StatusBar style="auto" />
        </View>
        {/* <View style={styles.cart}></View> */}
        <View style={styles.menu}>
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
                    if (elmnt.isSelected == e.isSelected){
                      e.isSelected = !e.isSelected;
                      return e;
                    }
                    return e;
                  });
                  setSelected(newSelection);
                }}
              />
            )
          })}
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#dff1f1'
  },
  title: {
    backgroundColor: '#d0f1f0',
    flexDirection: 'row',
    justifyContent: 'center',
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
    color: '#665555'
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
    fontSize: 15,
    color: "blue"
  }
});