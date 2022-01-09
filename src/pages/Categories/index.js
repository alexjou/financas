import React, { useState, useContext } from 'react';
import { SafeAreaView, Keyboard, TouchableWithoutFeedback, Alert, Text, Dimensions } from 'react-native';
import { format } from 'date-fns';
import { useNavigation } from '@react-navigation/native'
import firebase from '../../firebase';
import { AuthContext } from '../../contexts/auth';
import { PieChart } from 'react-native-svg-charts'
import { Circle, G, Line } from 'react-native-svg'
import Icon from 'react-native-vector-icons/Feather';

export default function Categories() {
  const navigation = useNavigation();

  const { user: usuario } = useContext(AuthContext);
  const data = [
    {
      key: 1,
      value: 50,
      svg: { fill: '#600080' },
    },
    {
      key: 2,
      value: 50,
      svg: { fill: '#9900cc' },
    },
    {
      key: 3,
      value: 40,
      arc: { outerRadius: '130%', cornerRadius: 10, },
      svg: { fill: '#c61aff' }
    },
    {
      key: 4,
      value: 95,
      svg: { fill: '#d966ff' }
    },
    {
      key: 5,
      value: 35,
      svg: { fill: '#ecb3ff' }
    }
  ]

  return (
    <>
      <PieChart
        style={{ height: 200 }}
        outerRadius={'70%'}
        innerRadius={10}
        data={data}
      />
    </>
  );
}