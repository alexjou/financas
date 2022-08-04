import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { maskMoney } from '../utils/utils';
import { Container, Tipo, IconView, TipoText, ValorText, DateText, Title } from './styles';

export default function HistoricoList({ data, deleteItem }) {
  return (
    <TouchableWithoutFeedback onLongPress={() => deleteItem(data)}>
      <Container>
        <Title>{data.title}</Title>
        {data.obs !== '' && (
          <DateText>Observação: {data?.obs}</DateText>
        )}


        <DateText>Dia: {data.date}</DateText>
        <ValorText>{maskMoney(data.valor)}</ValorText>
        <Tipo>
          <IconView tipo={data.tipo}>
            <Icon
              name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'}
              color="#FFF"
              size={20} />
            <TipoText> {data.tipo}</TipoText>
          </IconView>
        </Tipo>
      </Container>
    </TouchableWithoutFeedback>
  );
}