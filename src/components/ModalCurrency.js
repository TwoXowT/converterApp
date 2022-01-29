import React from "react";
import {
    Box,
    Button, Flex, HStack, MenuItem,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";

export const ModalCurrency = (currency)=>{
    const { isOpen, onOpen, onClose } = useDisclosure()

    const items = currency.currency.map((currency,index)=>{
        return  <Box key={index}> {currency.abbr} - {currency.name} </Box>
    })

    return(
        <div>
            <Button onClick={onOpen}>Open Modal</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex>

                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}