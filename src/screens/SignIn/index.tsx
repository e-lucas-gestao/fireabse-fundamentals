import React, { useState } from 'react';
import auth from '@react-native-firebase/auth'

import { Container, Account, Title, Subtitle } from './styles';
import { ButtonText } from '../../components/ButtonText';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Alert } from 'react-native';


const errorMessageList = {
  'auth/email-already-in-use': [
    'Erro', 'Este-email já esta em uso'
  ],
  'auth/invalid-email': [
    'Erro', 'Formato de e-mail inválido',
  ],
  'auth/weak-password': [
    'A senha deve ter no mínimo 6 digitos', ''
  ],
  'auth/user-not-found': [
    'Usuário ou senha inválidos', 'Verifique os campos e tente novamente'
  ],
  'auth/wrong-password': [
    'Usuário ou senha inválidos', 'Verifique os campos e tente novamente'
  ]
}

export function SignIn() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  async function handleSignInAnonymously(){
    const { user } = await auth().signInAnonymously();
    console.log({user})
  }

  function handleCreateUserAccount(){
    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => Alert.alert('Usuario criado com sucesso'))
    .catch((e) => {
      Alert.alert(errorMessageList[e.code][0], errorMessageList[e.code][1])
    })
  }

  async function handleSignInWithEmailAndPassword(){
    if (!email || !password) return Alert.alert('Campo de e-mail e/ou senha vazios', 'Preencha os campos e tente novamente')
    try{
      const { user } = await auth()
      .signInWithEmailAndPassword(email, password)

      console.log(user)
    } catch(e: any) {
      console.log(e)
      Alert.alert(errorMessageList[e.code][0], errorMessageList[e.code][1])
    }
  }

  function handleForgotPassword(){
    if(!email) return

    auth()
    .sendPasswordResetEmail(email)
    .then(() => Alert.alert('Sucesso!', 'Enviamos um link no seu e-mail para redefiniçaõ de senha'))
    .catch(e => console.log(e))
  }

  return (
    <Container>
      <Title>MyShopping</Title>
      <Subtitle>monte sua lista de compra te ajudar nas compras</Subtitle>

      <Input
        placeholder="e-mail"
        onChangeText={setEmail}
      />

      <Input
        placeholder="senha"
        keyboardType="email-address"
        onChangeText={setPassword}
      />

      <Button title="Entrar" onPress={handleSignInWithEmailAndPassword} />

      <Account>
        <ButtonText title="Recuperar senha" onPress={handleForgotPassword} />
        <ButtonText title="Criar minha conta" onPress={handleCreateUserAccount} />
      </Account>
    </Container>
  );
}