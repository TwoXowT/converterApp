import React from 'react'
import {
    Box,
    Input,
    InputGroup,
    Select,
} from "@chakra-ui/react";



export const InputBox = (payload)=>{

    const handleChangeVal = (e)=>{
        payload.setVal(e.target.value)
    }

    const handleChangeCurrency = (e)=>{
        payload.setCurrency(e.target.value)
    }

    const items = payload.allCurrency.map((currency,index)=>{
        return <option  value={currency.abbr} key={index}>{currency.abbr} - {currency.name} </option>
    })

    return(
        <Box  h='250px' borderWidth='2px' borderRadius='lg'>
            <Select p={4} fontSize='20px' onChange={handleChangeCurrency} value={payload.currency}   variant='flushed' placeholder='Select currency' size='lg'>
                {items}
            </Select>
            <InputGroup textDecoration='none'>
                <Input p={4}  variant='unstyled' placeholder='Currency value' fontSize='40px' size='lg' value={payload.val} onChange={handleChangeVal} />
            </InputGroup>

        </Box>
    )
}