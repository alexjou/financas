import React, { useContext, useState, useEffect } from 'react';
import { Alert, TouchableOpacity, Platform } from 'react-native';
import firebase from '../../firebase';
import { format, isPast } from 'date-fns';

import { AuthContext } from '../../contexts/auth';
import Header from '../../components/Header';
import HistoricoList from '../../components/HistoricoList';

import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '../../components/DatePicker';


import { Background, Container, Area, Name, Saldo, Title, List } from './styles';
import { maskMoney } from '../../components/utils/utils';

export default function Home() {
  const [historico, setHistorico] = useState([]);
  const [saldo, setSaldo] = useState(0);

  const { user } = useContext(AuthContext);
  const uid = user && user.uid;

  const [newDate, setNewDate] = useState(new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    async function loadList() {
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });

      await firebase.database().ref('historico').child(uid)
        // .orderByChild('date').equalTo(format(newDate, 'dd/MM/yyyy')).limitToLast(10)
        .on('value', (snapshot) => {
          setHistorico([]);
          snapshot.forEach((childItem) => {
            let list = {
              key: childItem.key,
              title: childItem.val().title,
              obs: childItem.val().obs,
              tipo: childItem.val().tipo,
              valor: childItem.val().valor,
              date: childItem.val().date,
            };

            setHistorico(oldArray => [...oldArray, list]);

          })
        })
    }

    loadList();
  }, [newDate]);

  function handleDelete(data) {

    //Se a data do registro já passou de hoje.

    // if (isPast(new Date(data.date))) {
    //   alert('Você não pode excluir um registro antigo!')
    //   return;
    // }

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
    await firebase.database().ref('historico')
      .child(uid).child(data.key).remove()
      .then(async () => {
        let saldoAtual = saldo;
        data.tipo === 'despesa' ? saldoAtual += parseFloat(data.valor)
          :
          saldoAtual -= parseFloat(data.valor);
        await firebase.database().ref('users')
          .child(uid).child('saldo').set(saldoAtual);
      })
      .catch((error) => {
        console.log(error);
        return;
      })
  };

  function handleShowPicker() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  const onChange = (date) => {
    setShow(Platform.OS === 'ios');
    setNewDate(date);
  }

  return (
    <Background>
      <Header />
      <Container>
        <Name>
          {/* {user && user.name} */}
          Saldo
          </Name>
        <Saldo>{maskMoney(saldo)}</Saldo>
      </Container>
      <Area>
        {/* <TouchableOpacity onPress={handleShowPicker}>
          <Icon name="event" color="#FFF" size={30} />
        </TouchableOpacity> */}
        <Title>Últimas movimentações</Title>
      </Area>

      <List
        showsVerticalScrollIndicator={false}
        data={historico}
        keyExtractor={item => item.key}
        renderItem={({ item }) => (<HistoricoList data={item} deleteItem={handleDelete} />)}
      />

      {show && (
        <DatePicker
          onClose={handleClose}
          date={newDate}
          onChange={onChange}
        />
      )}
    </Background>
  );
}