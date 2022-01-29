import React, {useEffect, useState} from 'react';
import {
    ChakraProvider, Flex, Icon,
} from "@chakra-ui/react";
import axios from "axios";
import {InputBox} from "./components/InputBox";
import {currencyName} from "./Currency";
import { ArrowUpDownIcon } from '@chakra-ui/icons'

export const App = ()=>{


    // const API_KEY = 'e7c553b0-7e8b-11ec-8869-1f0494d21d9b';
    const [currency, setCurrency] = useState([])
    const [leftVal, setLeftVal] = useState(1)
    const [rightVal, setRightVal] = useState(0)

    const [leftCurrency, setLeftCurrency] = useState('USD')
    const [rightCurrency, setRightCurrency] = useState('RUB')


    useEffect(()=>{
        let url = `https://freecurrencyapi.net/api/v2/latest?apikey=e7c553b0-7e8b-11ec-8869-1f0494d21d9b`
        axios.get(url)
           .then(response=>{
               let data = response.data.data
               let result = []
               for(let i = 0; i < currencyName.length; i++){
                   if(currencyName[i].cc in data){
                     result[i] ={
                         abbr: currencyName[i].cc,
                         name: currencyName[i].name,
                         val: data[currencyName[i].cc]
                     }
                   }
               }
               result.push({
                   abbr: 'USD',
                   name: 'United States dollar',
                   val: 1
               })
               setCurrency(result)
           })
    },[setCurrency])

    useEffect(()=>{


            let left = 0, right = 0
            Object.keys(currency).map((key,index)=>{
                if(currency[key].abbr === leftCurrency){
                    left = currency[key].val
                }

                if(currency[key].abbr === rightCurrency){
                    right = currency[key].val
                }



            })

            let result = (right/left)*leftVal
            setRightVal(result.toFixed(4))
            // console.log('left',left)
            // console.log('right',right)
            // console.log('res',result)




    },[leftVal,rightVal,leftCurrency,rightCurrency])

    const permutation = ()=>{
        let buffer = rightCurrency
        setRightCurrency(leftCurrency)
        setLeftCurrency(buffer)
    }


    return (
        <ChakraProvider>
            <Flex minW='500px' maxW='1000px' h='100%' m={4} flexWrap='unwrap' flexDirection={['column','column','row']} justifyContent='center' >

                <InputBox
                    val={leftVal}
                    setVal={setLeftVal}
                    currency={leftCurrency}
                    setCurrency={setLeftCurrency}
                    allCurrency ={currency}
                />

                <Flex alignItems='center' justifyContent='center' m={10} >
                    <Icon as={ArrowUpDownIcon} fontSize='60px'  onClick={permutation} />
                </Flex>

                <InputBox
                    val={rightVal}
                    setVal={setRightVal}
                    currency={rightCurrency}
                    setCurrency={setRightCurrency}
                    allCurrency ={currency}
                />

            </Flex>
        </ChakraProvider>
    )
}