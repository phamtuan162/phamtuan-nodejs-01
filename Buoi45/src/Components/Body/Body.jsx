import React from "react";
import { Divider, Box, Heading } from "@chakra-ui/react";
import MAX_TIME from "../../config/config.js";
import { useSelector } from "../../core/useSelector.js";
import ResultTable from "../ResultTable/ResultTable.jsx";
import Form from "../Form/Form.jsx";
const Body = () => {
  const { state, dispatch } = useSelector();
  const { data, turn, timeCurrent } = state;
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
        w={`${(timeCurrent / MAX_TIME) * 100}%`}
      />
      <Heading as="h2" {...commonHeadingStyles} color="primary.500">
        Chào mừng bạn đến với trò chơi đoán số!
      </Heading>
      <Heading as="h2" {...commonHeadingStyles} color="primary.600">
        Còn {timeCurrent}/{MAX_TIME} lần
      </Heading>
      <Heading as="h2" {...commonHeadingStyles} color="primary.600">
        Bạn cần tìm kiếm một số từ 1 đến 99
      </Heading>
      <Form />
      <ResultTable />
    </Box>
  );
};

export default Body;
