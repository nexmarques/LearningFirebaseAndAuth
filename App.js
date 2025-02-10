import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { auth } from "./src/firebaseConnection";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import UserForm from "./src/userForm";

export default function App() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser({
          email: user.email,
          uid: user.uid
        })
        return;
      }
      setAuthUser(false)
    })
  }, [])

  async function handleCreateUser() {
    const user = await createUserWithEmailAndPassword(auth, email, password)

  }

  async function handleLogin() {
    const user = await signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        setAuthUser({
          email: user.user.email,
          uid: user.user.uid
        })
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-credential') {
          Alert.alert('The password is invalid')
        }
        if (error.code === 'auth/missing-password') {
          Alert.alert('You must enter a password')
        }
      })
  }

  async function handleLogout() {
    await signOut(auth)
      .then(() => {
        setAuthUser(null)
      })
      .catch((error) => {
        Alert.alert('Error logging out', error)
      });
  }

  if (authUser) {
    return (
      <UserForm />
    )
  }

  return (
    <View style={styles.container} >

      <Text style={styles.label} >Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        placeholder="Enter your email"
        onChangeText={(email) => setEmail(email)}
      />

      <Text style={styles.label} >Password:</Text>
      <TextInput
        style={styles.input}
        value={password}
        placeholder="Enter your password"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={false}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} >
        <Text style={styles.buttonText} >Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateUser} >
        <Text style={styles.buttonText} >Create account</Text>
      </TouchableOpacity>

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 35
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    width: '90%',
    borderRadius: 15,
    marginBottom: 10,
  },
  label: {
    color: '#000',
    fontSize: 16,
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10
  },
  button: {
    backgroundColor: '#4CAF50',
    width: '90%',
    borderRadius: 15,
    padding: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
  }
});