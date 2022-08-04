import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, Keyboard, TouchableOpacity, Alert, View, Text, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'
import firebase from '../../firebase';
import { AuthContext } from '../../contexts/auth';

import { TextInputMask } from 'react-native-masked-text';

import Header from '../../components/Header';
import Picker from '../../components/Picker';
import { Background, Container, Input, Logo, SubmitButton, SubmitText, Containers, TabsContainer, TabItem, TabText, DoubleComponent, PasteButton } from './styles';

import Icon from "react-native-vector-icons/MaterialIcons";
import DatePicker from '../../components/DatePicker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { maskMoney } from '../../components/utils/utils';
import * as Clipboard from 'expo-clipboard';

LocaleConfig.locales['pt'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
  dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui.', 'Sex', 'Sab'],
  today: "Hoje"
};
LocaleConfig.defaultLocale = 'pt';

export default function PayFix({ translateY }) {
  const { user: usuario } = useContext(AuthContext);
  const uid = usuario.uid;
  const navigation = useNavigation();

  const [title, setTitle] = useState('');
  const [obs, setObs] = useState('');
  const [cod, setCod] = useState('');
  const [valor, setValor] = useState('');
  const [moeda, setMoeda] = useState('');
  const [show, setShow] = useState(false);
  const [newDate, setNewDate] = useState(new Date());
  const [despesas, setDespesas] = useState([]);
  const [update, setUpdate] = useState(false);

  function handleSubmit() {
    Keyboard.dismiss();
    if (isNaN(parseFloat(moeda)) || title === '') {
      alert('Preencha todos os campos.');
      return;
    }
    handleAdd();
  }

  async function handleAdd() {
    let key = await (await firebase.database().ref('despesas').child(uid).push()).key;
    await firebase.database().ref('despesas').child(uid).child(key).set({
      title,
      cod,
      obs,
      valor: parseFloat(moeda),
      date: format(newDate, 'dd/MM/yyyy'),
      createdAt: format(new Date(), 'dd/MM/yyyy')
    })
      .catch((error) => {
        console.log(error);
        return;
      });
    setTitle('');
    setObs('');
    setValor('');
    Keyboard.dismiss();
    setUpdate(!update)
    // navigation.navigate('Home');
  }

  function handleShowPicker() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
  };

  useEffect(() => {
    async function loadList() {
      await firebase.database().ref('despesas').child(uid)
        .on('value', (snapshot) => {
          setDespesas([]);
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              title: childItem.val().title,
              obs: childItem.val().obs,
              cod: childItem.val().cod,
              valor: childItem.val().valor,
              date: childItem.val().date,
            };
            setDespesas(oldArray => [...oldArray, list]);

          })
        })
    }

    loadList();
  }, [update]);

  function handleDelete(data) {
    Alert.alert(
      'Atenção',
      `Você deseja excluir ${data.title}, do tipo ${data.tipo} - Valor: ${maskMoney(data.valor)}`,
      [
        {
          text: 'Cancelar',
          style: 'cancel'
        },
        {
          text: 'Continuar',
          onPress: () => handleDeleteSuccess(data)
        }
      ]
    )
  };

  async function handleDeleteSuccess(data) {
    await firebase.database().ref('despesas')
      .child(uid).child(data.key).remove()
      .then()
      .catch((error) => {
        console.log(error);
        return;
      });
    setUpdate(!update)
  };

  return (
    <Background>
      <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}
        enabled
      >
        <Header />
        <View style={{ alignItems: 'center' }}>

          <SubmitText>Despesas Fixas</SubmitText>

          {despesas && (
            <ScrollView horizontal style={{ flexDirection: 'row', marginTop: 20 }}>
              {despesas?.map((item, index) => (
                <TouchableOpacity
                  onPress={async () => item.cod ? await Clipboard.setStringAsync(item.cod) : null} key={index} style={{
                    width: 150, height: 100,
                    backgroundColor: item.cod ? '#169' : '#fff', borderRadius: 20,
                    padding: 5, margin: 5, alignItems: 'center'
                  }}
                  onLongPress={() => handleDelete(item)}
                >
                  <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                  <Text>Dia {item.date}</Text>
                  <Text>{maskMoney(item.valor)}</Text>
                  <Text numberOfLines={1}>asfhodfhgasdhgpajshbdglçjkahsçdkgjbhaçsdkljgbaç~lskjdbgç~laksbdgçlaksbdglç~kashdglkçasbdçkljgbasçkljdbfgkajsd</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>)}
          < Input
            placeholder="Titulo"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <DoubleComponent>
            <TextInputMask
              style={{
                backgroundColor: 'rgba(255,255,255,0.9)',
                height: 50,
                width: '50%',
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
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 20, marginLeft: 10 }}>
              <TouchableOpacity onPress={() => setShow(true)}>
                <Icon name="event" color="#FFF" size={40} />
              </TouchableOpacity>
              <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>{newDate && format(newDate, 'dd/MM/yyyy')}</Text>
            </View>
          </DoubleComponent>

          <Input
            placeholder="Observação"
            returnKeyType="next"
            onSubmitEditing={() => Keyboard.dismiss()}
            value={obs}
            onChangeText={(text) => setObs(text)}
          />
          <DoubleComponent>
            <Input
              placeholder="Código de pagamento"
              returnKeyType="next"
              onSubmitEditing={() => Keyboard.dismiss()}
              value={cod}
              onChangeText={(text) => setCod(text)}
            />
            <PasteButton onPress={async () => setCod(await Clipboard.getStringAsync())}>
              <Text>Colar</Text>
            </PasteButton>
          </DoubleComponent>

          <SubmitButton onPress={handleSubmit}>
            <SubmitText>Registrar Despesa</SubmitText>
          </SubmitButton>
        </View>
        {show && (
          <DatePicker
            onClose={handleClose}
            date={newDate}
            onChange={onChange}
          />
        )}

      </Container>
    </Background>
  );
}