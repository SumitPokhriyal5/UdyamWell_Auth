import { useState } from "react";
import {
  ModalContent,
  ModalOverlay,
  Box,
  Heading,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
  Button,
  Stack,
  InputRightElement,
  InputGroup,
  Center,
  useToast,
} from "@chakra-ui/react";
import axios from 'axios';
import { FcGoogle } from "react-icons/fc";
import "../scss/login.scss";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import logo from '../assets/logo.png';
import ForgotPassword from "./ForgotPassword";

const Login = ({ setPage, onClose }: { setPage: React.Dispatch<React.SetStateAction<boolean>>, onClose: () => void }) => {
  const [load, setLoad] = useState(false);

  const toast = useToast();
  const [forgotPage, setForgotPage] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");


  const handleLogin: () => Promise<void> = async () => {
    setLoad(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/login`, {
        email,
        password: pwd
      });
      console.log(res.data)
      setLoad(false);
      localStorage.setItem('token', JSON.stringify(res.data.token));
      toast({
        position: "top",
        title: "Login Successful.",
        description: "Congratulations! You've successfully logged in.",
        status: "success",
        duration: 9000,
        isClosable: true,
        onCloseComplete: onClose,
      });
    } catch (e: any) {
      console.log(e)
      setLoad(false)
      if (e.response?.data === "Incorrect password") {
        toast({
          position: "top",
          title: "Wrong Password",
          description: "Incorrect Password. Please try again or click on Forgot Password to reset it",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      } else if (e.response?.data === "User not found") {
        toast({
          position: "top",
          title: "Wrong Email",
          description: "Sorry, we couldn't find an account associated with that email.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
      else {
        toast({
          position: "top",
          title: "Something Went Wrong",
          description: "Please fill in your email and password correctly.",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    }
  };

  const signInWithGoogle = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setLoad(true);
  };

  return forgotPage ? (
    <ForgotPassword setForgotPage={setForgotPage} />
  ) : (
    <>
      <ModalOverlay />
      <ModalContent>
        <Box className="container">
          <Box className="left_col">
            <Box display={"flex"} flexDirection="column" gap={"10px"}>
              <Heading>Login</Heading>
              <Text color={"#d7d8dc"} fontWeight="500">
                Get access to your Orders, WishList and Recommendations
              </Text>
            </Box>
            <Box display="grid" alignItems={"end"} justifyContent={"center"}>
              <Image src={logo} />
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
              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    placeholder="Enter your password"
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Box
                  mt="10px"
                  color={"blue.500"}
                  onClick={() => setForgotPage(true)}
                  cursor="pointer"
                >
                  <Text _hover={{ textDecoration: "underline" }}>Forgot your Password?</Text>
                </Box>
              </FormControl>
              <Stack spacing={6}>
                <Box>
                  <Button
                    w={"100%"}
                    onClick={handleLogin}
                    isLoading={load}
                    loadingText="Logging in..."
                    colorScheme={"green"}
                    variant={"solid"}
                  >
                    Login
                  </Button>
                </Box>
              </Stack>
              <Center>or</Center>
              <Center>
                <Button
                  w={"full"}
                  maxW={"md"}
                  variant={"outline"}
                  leftIcon={<FcGoogle />}
                  onClick={signInWithGoogle}
                >
                  <Center>
                    <Text>Sign in with Google</Text>
                  </Center>
                </Button>
              </Center>
              <Box
                mt={"60px"}
                color={"blue.500"}
                display={["grid", "grid", "flex"]}
                gap={1}
                justifyContent="center"
              >
                <Text color={'black'}>New to Fashion Gallery?</Text>
                  <Text onClick={() => setPage(true)} _hover={{ textDecoration: "underline" }}>Create an account</Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </ModalContent>
      {/* <ModalCloseButton /> */}
    </>
  );
};

export default Login;
