import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Keyboard, Alert } from "react-native";
import { db, auth } from "./firebaseConnection";
import { addDoc, doc, collection,  onSnapshot, updateDoc } from 'firebase/firestore';
import Users from "./users";
import { signOut } from "firebase/auth";

export default function UserForm() {

  const [name, setNome] = useState('');
  const [age, setAge] = useState('');
  const [position, setPosition] = useState('');
  const [showForm, setShowForm] = useState(true);
  const [users, setUsers] = useState([])
  const [isEditing, setIsEditing] = useState('');

  useEffect(() => {

    async function loadUsers() {
      const userRef = collection(db, 'users')
      onSnapshot(userRef, (snapshot) => {
        let list = [];
        snapshot.forEach((field) => {
          list.push({
            id: field.id,
            nome: field.data()?.nome,
            idade: field.data()?.idade,
            cargo: field.data()?.cargo
          })
        })
        setUsers(list)
      })
    }
    loadUsers()
  }, [])

  async function handleRegister() {
    if (name === '' || age === '' || position === '') {
      return Alert.alert('Attention', 'Fill in all fields!')
    }
    await addDoc(collection(db, "users"), {
      nome: name,
      idade: age,
      cargo: position
    })
    setNome('');
    setAge('');
    setPosition('');
    Keyboard.dismiss()
  }

  function handleToggle() {
    setShowForm(!showForm);
  }

  async function editUser(data) {
    setNome(data.nome);
    setAge(data.idade);
    setPosition(data.cargo);
    setIsEditing(data.id);
  }

  async function handleEditUser(){
    const docRef = doc(db, 'users', isEditing)
    await updateDoc(docRef, {
      nome: name,
      idade: age,
      cargo: position
    })
    setNome('')
    setAge('')
    setPosition('')
    setIsEditing('')
    Keyboard.dismiss()
  }

  async function handleLogout(){
    await signOut(auth)
  }

  return (
    <View style={styles.container} >
      {showForm && (
        <View style={{ width: '100%', alignItems: 'center' }} >
          <Text style={styles.label} >Nome:  </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            onChangeText={(name) => setNome(name)}
            value={name}
          />
          <Text style={styles.label} >Age: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            onChangeText={(age) => setAge(age)}
            value={age}
          />
          <Text style={styles.label} >Position: </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your position in company"
            onChangeText={(position) => setPosition(position)}
            value={position}
          />

          {isEditing !== ''? (
            <TouchableOpacity style={styles.button} onPress={handleEditUser} >
              <Text style={styles.buttonText} >Edit data</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleRegister} >
              <Text style={styles.buttonText} >Add user</Text>
            </TouchableOpacity>
          )
          }
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleToggle} >
        <Text style={styles.buttonText} > {showForm ? 'Hide form' : 'Show form'} </Text>
      </TouchableOpacity>


      <Text style={{ marginTop: 14, color: '#000', fontSize: 20 }} > Users: </Text>
      <FlatList
        styles={styles.list}
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Users data={item} handleEdit={(item) => editUser(item)} />}
      />

      <TouchableOpacity onPress={handleLogout} style={styles.buttonLogout}>
        <Text style={styles.buttonText} >Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff',
    marginTop: 40,
    alignItems: 'center',   
  },
  button: {
    backgroundColor: '#000',
    width: '90%',
    height: 45,
    borderRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '90%',
    borderRadius: 15,
    marginBottom: 10
  },
  label: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center'
  },
  buttonLogout:{
    backgroundColor: 'red',
    width: '90%',
    height: 45,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }  
})