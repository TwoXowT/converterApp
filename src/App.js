import React, {useEffect, useState} from 'react';
import {
    ChakraProvider, Flex, Icon,
} from "@chakra-ui/react";
import axios from "axios";
import {InputBox} from "./components/InputBox";
import {currencyName} from "./Currency";
import {ChevronLeftIcon, ChevronRightIcon} from '@chakra-ui/icons'

export const App = ()=>{

    const [currency, setCurrency] = useState([])
    const [leftVal, setLeftVal] = useState(1)
    const [rightVal, setRightVal] = useState(0)

    const [leftCurrency, setLeftCurrency] = useState('USD')
    const [rightCurrency, setRightCurrency] = useState('RUB')


    useEffect(()=>{
        let url = `https://api.currencyapi.com/v3/latest?apikey=e7c553b0-7e8b-11ec-8869-1f0494d21d9b`
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

               setCurrency(result)
           })
    },[setCurrency])

    useEffect(()=>{


            let left = 0, right = 0
            Object.keys(currency).map((key)=>{
                if(currency[key].abbr === leftCurrency){
                    left = currency[key].val.value
                }

                if(currency[key].abbr === rightCurrency){
                    right = currency[key].val.value
                }



            })

            let result = (right/left)*leftVal
            setRightVal(result.toFixed(4))


    },[leftVal,rightVal,leftCurrency,rightCurrency])

    const permutation = ()=>{
        let buffer = rightCurrency
        setRightCurrency(leftCurrency)
        setLeftCurrency(buffer)
    }


    return (
        <ChakraProvider>

                <Flex
                    w='100%'
                    h='100%'
                    mx='auto'
                    flexWrap='unwrap'
                    flexDirection={['column','column','row']}
                    justifyContent='center'
                    alignItems='center'
                >

                    <InputBox
                        val={leftVal}
                        setVal={setLeftVal}
                        currency={leftCurrency}
                        setCurrency={setLeftCurrency}
                        allCurrency ={currency}
                    />

                    <Flex
                        // alignItems='center'
                          // justifyContent='center'
                          h='100%'
                          m={1} >
                        <Icon as={ChevronLeftIcon}
                              fontSize='50px'
                              onClick={permutation} />
                        <Icon as={ChevronRightIcon}
                              fontSize='50px'
                              onClick={permutation} />

                    </Flex>

                    <InputBox
                        val={rightVal}
                        setVal={setRightVal}
                        currency={rightCurrency}
                        setCurrency={setRightCurrency}
                        allCurrency={currency}
                    />

                </Flex>


        </ChakraProvider>
    )
}