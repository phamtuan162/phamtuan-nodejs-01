import React from "react";
import { Divider, Box, Heading } from "@chakra-ui/react";
const Body = () => {
  const commonHeadingStyles = {
    fontSize: "4xl",
    lineHeight: "1.2",
    fontWeight: "700",
  };
  return (
    <Box p="16px">
      <Divider
        orientation="vertical"
        pos="fixed"
        top="0px"
        left="0px"
        h="8px"
        bg="#319795"
        w={`${(6 / 8) * 100}%`}
      />
      <Heading as="h2" {...commonHeadingStyles} color="#319795">
        Chào mừng bạn đến với trò chơi đoán số!
      </Heading>
      <Heading as="h2" {...commonHeadingStyles} color="#2c7a7b">
        Còn 8/8 lần
      </Heading>
      <Heading as="h2" {...commonHeadingStyles} color="#2c7a7b">
        Bạn cần tìm kiếm một số từ 1 đến 99
      </Heading>
    </Box>
  );
};

export default Body;
