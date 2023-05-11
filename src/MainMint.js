import { useState } from 'react';
import { ethers, BigNumber } from 'ethers';
import GreedIsGood from "./GreedIsGood.json";
import { Button, Flex, Input, Text } from "@chakra-ui/react";
import "./style.css";





const GreedIsGoodAddress = "0x76B4EF74ac768CD9aCC235Ad2e3E5Fb327836B73"


const MainMint = ({ accounts, setAccounts }) => {
    const [mintAmount, setMintAmount] = useState(1);
    const isConnected = Boolean(accounts[0]);


    async function handleMint() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(
                GreedIsGoodAddress,
                GreedIsGood.abi,
                signer
            );
            try {
                const response = await contract.mint(BigNumber.from(mintAmount), {
                    value: ethers.utils.parseEther((0.004 * mintAmount).toString()),
                });
                console.log("response: ", response);

            } catch (err) {
                console.log("error: ", err)
            }
        }
    }

    const handleDecrement = () => {
        if (mintAmount <= 1) return;
        setMintAmount(mintAmount - 1);
    }

    const handleIncrement = () => {
        if (mintAmount > 3) return;
        setMintAmount(mintAmount + 1);
    };

    return (
        <Flex justify="center" allign="center" >
                {isConnected ? (
                    <div>
                        <Flex justify="center" allign="center">
                            <Button
                                id='btn4'
                                backgroundColor="rgba(241, 239, 124, 0.3)"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="elevon, sans-serif"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleDecrement}>-</Button>

                            <Input
                                readOnly
                                fontSize="30px"
                                fontFamily="elevon, sans-serif"
                                width="100px"
                                height="40px"
                                textAlign="center"
                                paddingLeft="19px"
                                marginTop="10px"
                                type="number"
                                value={mintAmount} />
                            <Button
                                id='btn3'
                                backgroundColor="rgba(241, 239, 124, 0.3)"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="elevon, sans-serif"
                                padding="15px"
                                marginTop="10px"
                                onClick={handleIncrement}>+</Button>

                        </Flex>
                        <Text color="white" fontSize="25px" margin="20px" >Price:0.004ETH! </Text>
                        <Button
                            id='btn2'
                            backgroundColor="rgba(241, 239, 124, 0.3)"
                            borderRadius="5px"
                            boxShadow="0px 2px 2px 1px #0F0F0F"
                            color="black"
                            cursor="pointer"
                            fontFamily="elevon, sans-serif"
                            padding="20px"
                            marginTop="20px"
                            width="200px"
                            fontSize="30px"
                            onClick={handleMint}>Mint Now</Button>

                    </div>
                ) : (
                    <Text
                        marginTop="70px"
                        fontSize="30px"
                        letterSpacing="-5.5%"
                        fontFamily="elevon, sans-serif"
                        textShadow="0 3px #000000"
                        color= "white"
                        >You must be connected to Mint</Text>
                )}
            
        </Flex>
    );
};

export default MainMint;