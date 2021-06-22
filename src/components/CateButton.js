import React from 'react';
import { Pressable, Text } from 'react-native'
import { styled } from 'styled-components/native'

const Button = styled.Pressable

export default CateButton = ({ cate }) => {

  const category = (cate) => {
    if(cate == "전체보기"){
        setCateState(state)
    }else{
        setCateState(state.filter((d)=>{
            return d.category == cate
        }))
    }
  }

  return (
    <TouchableOpacity
    style={styles.middleButtonAll}
    onPress={() => onPress( cate ?? true)}>
      <Text style={styles.middleButtonTextAll}>
        { cate }
      </Text>
    </TouchableOpacity>
  )
}