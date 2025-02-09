import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import db from "./firebaseConnection";
import { deleteDoc, doc } from "firebase/firestore";

export default function Users({data, handleEdit}){

  async function handleDeleteItem(){
    const docRef = doc(db, "users", data.id)
    await deleteDoc(docRef);    
  }

  function handleEditUser(){
    handleEdit(data)
  }

  return (
    <View style={styles.container} >
      <Text style={styles.text} >ID: {data.id}</Text>
      <Text style={styles.text} >Nome: {data.nome}</Text>
      <Text style={styles.text} >Age: {data.idade}</Text>
      <Text style={styles.text} >Position:  {data.cargo}</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleDeleteItem} >
        <Text style={styles.buttonText} > Delete user </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonEdit} onPress={handleEditUser} >
        <Text style={styles.buttonText} > Edit user </Text>
      </TouchableOpacity>
     

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "gray",
    padding: 8,
    borderRadius: 4, 
    marginLeft: 14,
    marginBottom: 14,
    marginRight: 14
  },
  text: {
    fontSize: 20,
    marginBottom: 5,    
  },
  button:{
    backgroundColor: "red",
    borderRadius: 4,
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 14,
    marginRight: 14,
  },
  buttonText:{
    color: "white",    
    textAlign: "center",
  },
  buttonEdit:{
    backgroundColor: "#000",
    borderRadius: 4,
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 14,
    marginRight: 14,
  }
})