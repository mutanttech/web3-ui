import React from "react";
import { Table, Tr, Th, Td, Text, useColorModeValue } from "@chakra-ui/react";
import {
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableFooter,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  tableContainer: {
    borderRadius: 15,
    margin: "10px 10px",
    marginLeft: "5rem",
    marginTop: "3rem",
    maxWidth: 1000,
  },
  status: {
    fontWeight: "bold",
    fontSize: "0.75rem",
    borderRadius: 8,
    padding: "3px 10px",
    display: "inline-block",
  },
}));

const TokenTable = ({ data }) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(15);

  const TextColorModeTable = useColorModeValue("black", "gray.200");
  const TextColorModeTable1 = useColorModeValue("black", "gray.400");
  const TableBgColor = useColorModeValue("white", "#243036");
  const borderColor = useColorModeValue("gray.100", "gray.500");
  const TableHeadBgColor = useColorModeValue("gray.300", "#303E46");
  const BoxBgColor = useColorModeValue("gray.200", "#243036");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatCash = (n) => {
    if (n < 1e3) return n;
    if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1);
    if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1);
    if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1);
    if (n >= 1e12) return +(n / 1e12).toFixed(1);
  };

  console.log(data);

  return (
    <>
      <TableContainer component={Paper} className={classes.tableContainer}>
        <Table
          shadow="xl"
          rounded="md "
          borderRadius="lg"
          borderWidth={1}
          borderColor={borderColor}
          className={classes.table}
          aria-label="simple table"
          bg={TableBgColor}
        >
          <TableHead>
            <TableRow>
              <Th bg={TableHeadBgColor}>
                <Text
                  letterSpacing={1}
                  fontSize="xs"
                  fontWeight="semibold"
                  decoration="lightblue"
                  textTransform="uppercase"
                  color={TextColorModeTable1}
                >
                  NAME
                </Text>
              </Th>
              <Th bg={TableHeadBgColor}>
                <Text
                  letterSpacing={1}
                  fontSize="xs"
                  fontWeight="semibold"
                  decoration="lightblue"
                  textTransform="uppercase"
                  color={TextColorModeTable1}
                >
                  SYMBOL
                </Text>
              </Th>
              <Th bg={TableHeadBgColor}>
                <Text
                  letterSpacing={1}
                  fontSize="xs"
                  fontWeight="semibold"
                  decoration="lightblue"
                  textTransform="uppercase"
                  color={TextColorModeTable1}
                >
                  LIQUIDITY
                </Text>
              </Th>
              <Th bg={TableHeadBgColor}>
                <Text
                  letterSpacing={1}
                  fontSize="xs"
                  fontWeight="semibold"
                  decoration="lightblue"
                  textTransform="uppercase"
                  color={TextColorModeTable1}
                >
                  VOLUME(24H)
                </Text>
              </Th>
              <Th bg={TableHeadBgColor}>
                <Text
                  letterSpacing={1}
                  fontSize="xs"
                  fontWeight="semibold"
                  decoration="lightblue"
                  textTransform="uppercase"
                  color={TextColorModeTable1}
                >
                  PRICE
                </Text>
              </Th>
              <Th bg={TableHeadBgColor}>
                <Text
                  letterSpacing={1}
                  fontSize="xs"
                  fontWeight="semibold"
                  decoration="lightblue"
                  textTransform="uppercase"
                  color={TextColorModeTable1}
                >
                  SWAP(24H)
                </Text>
              </Th>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <Tr key={item.chain_id}>
                  <Td bg={BoxBgColor} color={TextColorModeTable}>
                    {item.contract_name}
                  </Td>
                  <Td bg={BoxBgColor} color={TextColorModeTable}>
                    {item.contract_ticker_symbol}
                  </Td>
                  <Td bg={BoxBgColor} color={TextColorModeTable}>
                    $
                    {item.total_liquidity_quote
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Td>
                  <Td bg={BoxBgColor} color={TextColorModeTable}>
                    $
                    {item.total_volume_24h_quote
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Td>
                  <Td bg={BoxBgColor} color={TextColorModeTable}>
                    $
                    {item.quote_rate
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </Td>
                  <Td bg={BoxBgColor} color={TextColorModeTable}>
                    {item.swap_count_24h}
                  </Td>
                </Tr>
              ))}
          </TableBody>
          <TableFooter>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              bg={useColorModeValue("white", "gray.800")}
            />
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default TokenTable;
