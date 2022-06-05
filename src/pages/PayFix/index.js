import React, { useState, useContext } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'
import firebase from '../../firebase';
import { AuthContext } from '../../contexts/auth';

import { TextInputMask } from 'react-native-masked-text';

import Header from '../../components/Header';
import Picker from '../../components/Picker';
import { Background, Container, Input, Logo, SubmitButton, SubmitText, Containers, TabsContainer, TabItem, TabText } from './styles';

import Icon from "react-native-vector-icons/MaterialIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function PayFix({ translateY }) {
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [obs, setObs] = useState('');
  const [valor, setValor] = useState('');
  const [moeda, setMoeda] = useState('');
  const [tipo, setTipo] = useState(null);
  const { user: usuario } = useContext(AuthContext);

  function handleSubmit() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(moeda)) || tipo === null || title === '') {
      alert('Preencha todos os campos.');
      return;
    }
    handleAdd();
  }

  async function handleAdd() {
    let uid = usuario.uid;

    let key = await (await firebase.database().ref('historico').child(uid).push()).key;
    await firebase.database().ref('historico').child(uid).child(key).set({
      title,
      obs,
      tipo,
      valor: parseFloat(moeda),
      date: format(new Date(), 'dd/MM/yyyy')
    })
      .catch((error) => {
        console.log(error);
        return;
      });
    setTitle('');
    setTipo('');
    setObs('');
    //Atualizar o saldo
    let user = firebase.database().ref('users').child(uid);
    await user.once('value').then((snapshot) => {
      let saldo = parseFloat(snapshot.val().saldo);
      tipo === 'despesa' ? saldo -= parseFloat(moeda) : saldo += parseFloat(moeda);
      user.child('saldo').set(saldo);
    }).catch((error) => {
      console.log(error);
      return;
    });
    Keyboard.dismiss();
    setValor('');
    navigation.navigate('Home');
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Background>
        <Container
          behavior={Platform.OS === 'ios' ? 'padding' : ''}
          enabled
        >
          <Header />
          <SafeAreaView style={{ alignItems: 'center' }}>
            {/* <Logo source={require('../../../assets/Logo.png')} />
            <Input
              placeholder="Titulo"
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
              value={title}
              onChangeText={(text) => setTitle(text)}
            />

            <TextInputMask
              style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                height: 50,
                width: '90%',
                marginTop: 20,
                fontSize: 17,
                paddingLeft: 8,

              }}
              placeholder="Valor desejado"
              keyboardType="numeric"
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
              type={'money'}
              value={valor}
              onChangeText={text => {
                setValor(text);
                text = text.replace('R$', '');
                text = text.replace('.', '');
                text = text.replace(',', '.');
                setMoeda(Number(text));
              }}
            />

            <Input
              placeholder="Observação"
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
              value={obs}
              onChangeText={(text) => setObs(text)}
            />

            <Picker onChange={setTipo} tipo={tipo} />

            <SubmitButton onPress={handleSubmit}>
              <SubmitText>Registrar</SubmitText>
            </SubmitButton> */}
            <SubmitText>Em Construção!</SubmitText>
          </SafeAreaView>
        </Container>
      </Background>
    </TouchableWithoutFeedback>
  );
}