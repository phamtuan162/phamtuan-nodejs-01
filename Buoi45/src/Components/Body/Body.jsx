import React from "react";
import { Divider, Box, Heading } from "@chakra-ui/react";
import MAX_TIME from "../../config/config.js";
const Body = () => {
  const commonHeadingStyles = {
    fontSize: "4xl",
    lineHeight: "1.2",
    fontWeight: "bold",
  };

  return (
    <Box p="16px">
      <Divider
        orientation="vertical"
        pos="fixed"
        top="0px"
        left="0px"
        h="8px"
        bg="primary.500"
        w={`${(6 / MAX_TIME) * 100}%`}
      />
      <Heading as="h2" {...commonHeadingStyles} color="primary.500">
        Chào mừng bạn đến với trò chơi đoán số!
      </Heading>
      <Heading as="h2" {...commonHeadingStyles} color="primary.600">
        Còn 8/{MAX_TIME} lần
      </Heading>
      <Heading as="h2" {...commonHeadingStyles} color="primary.600">
        Bạn cần tìm kiếm một số từ 1 đến 99
      </Heading>
    </Box>
  );
};

export default Body;
