import React, { useState } from "react";
import {
  ModalContent,
  ModalOverlay,
  Box,
  Heading,
  Text,
  Image,
  FormControl,
  Input,
  Button,
  Stack,
  useToast,
} from "@chakra-ui/react";
import "../scss/login.scss";
import logo from '../assets/logo.png';
import axios from "axios";
import OtpPage from "./Otp";

interface ForgotPasswordProps {
  setForgotPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ setForgotPage }) => {
  // State variables
  const [load, setLoad] = useState(false); // Loading state
  const [email, setEmail] = useState(""); // Email input value
  const [otpComp, setOtpComp] = useState(false); // OTP component state

  const toast = useToast(); // Toast notification

  const handleForgotPass = async (): Promise<void> => {
    setLoad(true); // Start loading
    try {
      // Send OTP request to the server
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/sendOtp`, {
        email,
      });
      setLoad(false); // Stop loading
      localStorage.setItem("otpDetails", JSON.stringify(res.data)); // Store OTP details
      toast({
        position: 'top',
        title: 'Email Sent Successful',
        description: "Password reset OTP sent! Please check your email for further instructions.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        onCloseComplete: () => setOtpComp(true),
      });
    } catch (err:any) {
      setLoad(false); // Stop loading
      if (err.response.data === "Email is not registered") {
        toast({
          position: 'top',
          title: 'Wrong Email',
          description: "Sorry, we couldn't find an account associated with that email.",
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  return otpComp ? (
    <OtpPage setForgotPage={setForgotPage} setOtpComp={setOtpComp} />
  ) : (
    <>
      <ModalOverlay />
      <ModalContent>
        <Box className="container">
          <Box className="left_col">
            <Box display={"flex"} flexDirection="column" gap={"10px"}>
              <Heading>Reset your Password</Heading>
              <Text color={"#d7d8dc"} fontWeight="500">
                Unlock your account with a new password
              </Text>
            </Box>
            <Box display="grid" alignItems={"end"} justifyContent={"center"}>
              <Image src={logo}></Image>
            </Box>
          </Box>

          {/* right side */}
          <Box className="right_col">
            <Box
              display={"flex"}
              flexDirection="column"
              justifyContent="space-between"
              gap="20px"
              p={"20px 40px"}
            >
              <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
                Forgot your password?
              </Heading>
              <Text
                fontSize={{ base: "sm", sm: "md" }}
                // color={useColorModeValue("gray.800", "gray.400")}
              >
                You&apos;ll get an email with a reset OTP
              </Text>
              <FormControl id="email">
                <Input
                  placeholder="your-email@example.com"
                  _placeholder={{ color: "gray.500" }}
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Stack spacing={6}>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  isLoading={load}
                  loadingText="Sending OTP..."
                  onClick={handleForgotPass}
                >
                  Send OTP
                </Button>
              </Stack>
              <Box color={"blue.500"} display={"flex"} gap={1} justifyContent="center" cursor={'pointer'}>
                <Text onClick={() => setForgotPage(false)} _hover={{ textDecoration: "underline" }}>
                  Click here to login
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </ModalContent>
      {/* <ModalCloseButton /> */}
    </>
  );
};

export default ForgotPassword;
