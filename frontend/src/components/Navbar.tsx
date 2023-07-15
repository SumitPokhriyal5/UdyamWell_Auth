import React, { useState } from "react";
import {
  Box,
  Flex,
  Button,
  Stack,
  useColorModeValue,
  Image,
  Modal,
} from "@chakra-ui/react";
import Register from "./Register";
import Login from "./Login";
import image from "../assets/logo.png";

const Navbar: React.FC = () => {
  const tkn: string | null = localStorage.getItem("token");
  const token: string = tkn ?? "";

  const [page, setPage] = useState(false);

  // Manage modal useDisclosure
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    openModal();
  };

  return (
    <Box
      boxSizing="border-box"
      background="transparent"
      maxW="98vw"
      m="auto"
      zIndex={2}
      position="sticky"
      top="0px"
    >
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH="60px"
        py={{ base: 2 }}
        pr={{ base: 4 }}
        borderBottom={2}
        borderStyle="solid"
        borderColor={useColorModeValue("gray.200", "gray.900")}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Flex justify={{ base: "center", md: "center" }}>
          <Image src={image} h="50px" w="60px" borderRadius="50%" />
        </Flex>

        {/* Render logout button if token exists */}
        {token && (
          <Button
            bgColor="white"
            color="#4e8cf3"
            variant="outline"
            onClick={handleLogout}
            fontWeight="bold"
          >
            Logout
          </Button>
        )}
        {/* Render sign-in button if token does not exist */}
        {!token && (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify="flex-end"
            direction="row"
            spacing={6}
          >
            <Button
              fontSize="sm"
              fontWeight={400}
              colorScheme="green"
              onClick={openModal}
            >
              Sign In
            </Button>
          </Stack>
        )}
      </Flex>
      {/* Render login modal */}
      <Modal size="4xl" isOpen={modalIsOpen} onClose={closeModal}>
        {page ? (
          <Register setPage={setPage} />
        ) : (
          <Login onClose={closeModal} setPage={setPage} />
        )}
      </Modal>
    </Box>
  );
};

export default Navbar;
