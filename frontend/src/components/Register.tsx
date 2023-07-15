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
  Link,
  Checkbox,
  useToast,
  RadioGroup,
  Radio,
} from "@chakra-ui/react";

import "../scss/register.scss";
import logo from "../assets/logo.png";

// import { Link as RouteLink } from "react-router-dom";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useState, useEffect } from "react";

import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
const EMAIL_REGEX = /^[\w]+@([\w-]+\.)+[\w-]{3}$/g;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const NUM_REGEX = /^\d{10}$/;

const Register: React.FC<{
  setPage: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setPage }) => {
  const [load, setLoad] = useState<boolean>(false);

  const toast = useToast();

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [validName, setValidName] = useState<boolean>(false);
  const [nameFocus, setNameFocus] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [validEmail, setValidEmail] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);

  const [contactNum, setContactNum] = useState<string>("");
  const [validNum, setValidNum] = useState<boolean>(false);
  const [numFocus, setNumFocus] = useState<boolean>(false);

  const [pwd, setPwd] = useState<string>("");
  const [validPwd, setValidPwd] = useState<boolean>(false);
  const [pwdFocus, setPwdFocus] = useState<boolean>(false);

  const [matchPwd, setMatchPwd] = useState<string>("");
  const [validMatch, setValidMatch] = useState<boolean>(false);
  const [matchFocus, setMatchFocus] = useState<boolean>(false);

  useEffect(() => {
    setValidName(name.length >= 3 && name.length <= 20);
  }, [name]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    const result = NUM_REGEX.test(contactNum);
    setValidNum(result);
  }, [contactNum]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  const handleSubmit = async () => {
    setLoad(true);
    try {
      // logic for register api
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/users/register`, {
        name,
        email,
        password: pwd,
        contact_number: contactNum,
      });
      setLoad(false);
      toast({
        position: "top",
        title: "Sign Up Successful.",
        description: "Congratulations! You've successfully signed up.",
        status: "success",
        duration: 9000,
        isClosable: true,
        onCloseComplete: () => setPage(false),
      });
    } catch (error: any) {
      setLoad(false);
      toast({
        position: "top",
        title: "Something Went Wrong",
        description: error?.response?.data?.message || error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <ModalOverlay />
      <ModalContent>
        <Box className="container">
          <Box
            className="left_col"
            display="flex"
            flexDirection="column"
            alignItems="center"
          >
            <Box display="flex" flexDirection="column" gap={3}>
              <Heading>Looks like you're new here!</Heading>
              <Text color="#d7d8dc" fontWeight="500">
                Sign up with your email address to get started
              </Text>
            </Box>
            <Box display="grid" alignItems={"end"} justifyContent={"center"}>
              <Image src={logo} />
            </Box>
          </Box>

          {/* user name */}
          <Box className="right_col">
            <Box p="20px 40px">
              <FormControl id="user">
                <FormLabel display="flex" alignItems="center">
                  Name
                  <FaCheck className={validName ? "valid" : "hide"} />
                  <ImCross
                    className={validName || !name ? "hide" : "invalid"}
                  />
                </FormLabel>
                <Input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Sumit Pokhriyal"
                  onBlur={() => setNameFocus(true)}
                />
                <Text
                  className={
                    nameFocus && !validName ? "instructions" : "offscreen"
                  }
                  display="flex"
                  alignItems="center"
                >
                  <BsFillExclamationTriangleFill />
                  User name allowed from 3-20 characters.
                </Text>
              </FormControl>
              {/* email */}
              <FormControl id="email">
                <FormLabel display="flex" alignItems="center">
                  Email
                  <FaCheck className={validEmail ? "valid" : "hide"} />
                  <ImCross
                    className={validEmail || !email ? "hide" : "invalid"}
                  />
                </FormLabel>
                <Input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                  onBlur={() => setEmailFocus(true)}
                  required
                />
                <Text
                  className={
                    emailFocus && !validEmail ? "instructions" : "offscreen"
                  }
                  display="flex"
                  alignItems="center"
                >
                  <BsFillExclamationTriangleFill />
                  The email address format is invalid.
                </Text>
              </FormControl>
              {/* contact number */}
              <FormControl id="contact_number">
                <FormLabel display="flex" alignItems="center">
                  Contact Number
                  <FaCheck className={validNum ? "valid" : "hide"} />
                  <ImCross
                    className={validNum || !contactNum ? "hide" : "invalid"}
                  />
                </FormLabel>
                <Input
                  type="number"
                  name="contact_number"
                  value={contactNum}
                  onChange={(e) => setContactNum(e.target.value)}
                  placeholder="Enter your contact number"
                  onBlur={() => setNumFocus(true)}
                />
                <Text
                  className={
                    numFocus && !validNum ? "instructions" : "offscreen"
                  }
                  display="flex"
                  alignItems="center"
                >
                  <BsFillExclamationTriangleFill />
                  Invalid contact number. Please enter a 10-digit number.
                </Text>
              </FormControl>
              {/* password */}
              <FormControl id="password">
                <FormLabel display="flex" alignItems="center">
                  Password
                  <FaCheck className={validPwd ? "valid" : "hide"} />
                  <ImCross className={validPwd || !pwd ? "hide" : "invalid"} />
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    name="pass"
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    onBlur={() => setPwdFocus(true)}
                    required
                  />

                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text
                  className={
                    pwdFocus && !validPwd ? "instructions" : "offscreen"
                  }
                  display="flex"
                  alignItems="start"
                >
                  <BsFillExclamationTriangleFill />
                  8 to 24 characters.
                  <br />
                  Must include uppercase and lowercase letters, a number and a
                  special character.
                  <br />
                  Allowed special characters: ! @ # $ %
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel display="flex" alignItems="center">
                  Confirm Password
                  <FaCheck
                    className={validMatch && matchPwd ? "valid" : "hide"}
                  />
                  <ImCross
                    className={validMatch || !matchPwd ? "hide" : "invalid"}
                  />
                </FormLabel>
                <InputGroup>
                  <Input
                    type={showConfirmPwd ? "text" : "password"}
                    placeholder="Enter your password"
                    name="pass"
                    value={matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    onBlur={() => setMatchFocus(true)}
                    required
                  />
                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setShowConfirmPwd((showConfirmPwd) => !showConfirmPwd)
                      }
                    >
                      {showConfirmPwd ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text
                  className={
                    matchFocus && !validMatch ? "instructions" : "offscreen"
                  }
                  display="flex"
                  alignItems="center"
                >
                  <BsFillExclamationTriangleFill />
                  Password does not match the confirm password.
                </Text>
              </FormControl>

              <Stack mt="10px" spacing={3}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align="start"
                  justify="start"
                >
                  <Checkbox onChange={() => setIsChecked(!isChecked)}>
                    I accept
                  </Checkbox>
                  <Link color="blue.500">Terms of Service</Link>
                </Stack>
                <Box>
                  <Button
                    isDisabled={
                      !validName ||
                      !validEmail ||
                      !validPwd ||
                      !validMatch ||
                      !isChecked
                    }
                    onClick={handleSubmit}
                    isLoading={load}
                    loadingText="Submitting"
                    w="100%"
                    colorScheme="green"
                    variant="solid"
                  >
                    Sign Up
                  </Button>
                </Box>
                <Box
                  color="blue.500"
                  display="flex"
                  gap={1}
                  justifyContent="center"
                >
                  <Text color="black">Existing User?</Text>
                  <Text
                    _hover={{ textDecoration: "underline" }}
                    onClick={() => setPage(false)}
                  >
                    Log in
                  </Text>
                </Box>
              </Stack>
            </Box>
          </Box>
        </Box>
      </ModalContent>
    </>
  );
};

export default Register;
