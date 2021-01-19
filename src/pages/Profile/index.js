import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header'

import { AuthContext } from '../../contexts/auth';

import { Container, Name, NewLink, NewText, Logout, LogoutText } from './styles';

export default function Profile() {
  const navigation = useNavigation();
  const { user, signOut } = useContext(AuthContext);

  return (
    <Container>
      <Header />
      <Name>
        {user && user.name}
      </Name>
      <NewLink onPress={() => navigation.navigate('Registrar')}>
        <NewText>Registar gastos</NewText>
      </NewLink>

      <Logout onPress={() => signOut()}>
        <LogoutText>Sair</LogoutText>
      </Logout>
    </Container>
  );
}