import React from "react";
import { Box, Button, Flex, Link, } from "@chakra-ui/react";

import "./style.css";

const NavBar = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts[0]);

    async function connectAccount() {
        if (!window.ethereum) {
            alert("Please install an Ethereum wallet extension like MetaMask to connect your account.");
            return;
        }

        try {
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setAccounts(accounts);
        } catch (error) {
            console.error("Error connecting to Ethereum account:", error);
            // Display or handle the error as desired
        }
    }



    return (
        <Flex justify="space-between" allign="center" padding="30px">
            {/* left side, social media icons*/}
            <Flex justify="space-around" width="20%" padding="0 75px">
                {/*  <Link href="https://www.facebook.com">
                <Image src= {Facebook} boxSize="42px" margin="0 15px"/>
            </Link>
            <Link href="https://www.gmail.com">
                <Image src= {Email} boxSize="42px" margin="0 15px"/>
            </Link>*/}
                <Link
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                    id="twitter"
                    href="https://twitter.com/NFTcollection11"
                    color="gold"
                    position="absolute"
                    top="20px"
                    fontSize="25px"
                    fontFamily="elevon, sans-serif"
                    right="740px"
                >

                    Twitter</Link>
            </Flex>
            {/* right side, connect and section*/}
            <Flex>
                <Link
                    target="_blank"
                    style={{ textDecoration: 'none' }}
                    id="ether"
                    href="https://etherscan.io/address/0x76b4ef74ac768cd9acc235ad2e3e5fb327836b73#writeContract"
                    color="gold"
                    position="absolute"
                    top="20px"
                    fontSize="25px"
                    fontFamily="elevon, sans-serif"
                    right="350px"
                >Etherscan</Link>

                <Link
                    target="_blank"
                    id="opensea"
                    style={{ textDecoration: 'none' }}
                    href="https://opensea.io/collection/greedisgoods"
                    color="gold"
                    position="absolute"
                    top="20px"
                    fontSize="25px"
                    right="550px"
                    fontFamily="elevon, sans-serif"
                >OpenSea</Link>
                {/* Connect*/}
                {isConnected ? (
                    <Box
                        color="rgba(241, 239, 124, 0.3)"
                        fontFamily="elevon, sans-serif"
                        position="absolute"
                        top="30px"
                        right="30px"
                    >Connected</Box>
                ) : (
                    <Button
                        id="btn1"
                        backgroundColor="rgba(241, 239, 124, 0.3)"
                        borderRadius="5px"
                        boxShadow="0px 2px 2px 1px #0F0F0F"
                        color="white"
                        cursor="pointer"
                        fontFamily="elevon, sans-serif"
                        fontSize="30px"
                        padding="15px"
                        margin="0 15px"
                        width="200px"
                        height="80px"
                        position="absolute"
                        top="20px"
                        right="30px"
                        onClick={connectAccount}>Connect</Button>
                )}
            </Flex>
        </Flex>
    );
};

export default NavBar;
