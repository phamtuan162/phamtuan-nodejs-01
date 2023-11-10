import React from "react";
import { IconButton, Box, Flex } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
const Header = ({ colorMode, toggleColorMode }) => {
  return (
    <Box p="16px">
      <Flex justify="end">
        <IconButton
          opacity="0.6"
          bg="transparent"
          icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
        ></IconButton>
      </Flex>
    </Box>
  );
};

export default Header;
