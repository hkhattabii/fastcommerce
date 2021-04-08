import {
  Button,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  List,
  ListIcon,
  ListItem,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Image,
  Th,
  Thead,
  Tr,
  Select,
  Spinner,
} from "@chakra-ui/react";
import { ClotheIcon } from "@/styles/icons";
import axios from "axios";
import { DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import { useState } from "react";
import useSWR, { mutate } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Admin({ products }) {
  const [product, setProduct] = useState(products[0]);
  const { data: categories, error: errCategories } = useSWR(
    "/api/categories",
    fetcher,
    {initialData: {data: []}}
  );
  const { data: brands, error: errBrands } = useSWR("/api/brands", fetcher, {initialData: {data: []}});

  return (
    <Flex poisition="relative" w="100%" m="auto">
      <Flex
        flexDir="column"
        w="400px"
        position="sticky"
        h="100vh"
        top="0"
        bottom="0"
        left="0"
        py="4"
        px="2"
        borderStyle="solid"
        borderColor="gray.100"
        borderRightWidth="1px"
      >
        <Heading as="h1" fontSize="lg" textAlign="center" mb="32px">
          FastCommerce <br />
          Admin
        </Heading>
        <List>
          <ListItem
            alignItems="center"
            p="2"
            borderRadius="8"
            _hover={{ bg: "gray.100" }}
          >
            <ListIcon as={ClotheIcon} color="gray.500" fontSize="2xl" />
            <Text as="span" fontWeight="medium">
              Produits
            </Text>
          </ListItem>
        </List>
      </Flex>
      <Flex
        flexDir="column"
        w="full"
        mx="auto"
        alignItems="flex-start"
        px="2"
        py="4"
      >
        <Input placeholder="Rechercher" w="full" mb="4" />
        <Button
          bg="gray.900"
          color="white"
          mb="32px"
          _hover={{ bg: "gray.600" }}
        >
          Ajouter
        </Button>
        <Table w="full">
          <Thead w="full">
            <Tr w="100%">
              <Th isNumeric>Id</Th>
              <Th>Nom</Th>
              <Th>Prix</Th>
              <Th>Catégorie</Th>
              <Th>Marque</Th>
              <Th>Genre</Th>
              <Th>Promotion</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody w="full">
            {products.map((product) => (
              <Tr key={product.id} w="100%">
                <Td w="5%">{product.id}</Td>
                <Td w="20%">{product.name}</Td>
                <Td>{product.price}</Td>
                <Td>{product.categorie}</Td>
                <Td>{product.marque}</Td>
                <Td>{product.genre}</Td>
                <Td>{product.reduction}</Td>
                <Td as={HStack} spacing={2}>
                  <IconButton variant="ghost">
                    <InfoIcon color="blue.500" />
                  </IconButton>
                  <IconButton variant="ghost">
                    <DeleteIcon color="red.500" />
                  </IconButton>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Flex>
      <Flex
        flexDir="column"
        alignItems="flex-start"
        w="500px"
        position="sticky"
        h="100vh"
        top="0"
        bottom="0"
        right="0"
        py="4"
        px="2"
        borderStyle="solid"
        borderColor="gray.100"
        borderLeftWidth="1px"
      >
        {product && (
          <Flex flexDir="column" alignSelf="center" mt="32px">
            <Text fontWeight="bold" mb="6">
              {product.name}
            </Text>
            <Image w="200px" h="300px" src={product.imgs[0].url} mb="8" />
            <Input placeholder="prix" />
            <Select
              onFocus={() => {
                mutate();
              }}
            >
              {categories.data.map((category) => {
                return (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                );
              })}
            </Select>
            <Select>
              {brands.data.map((brand) => {
                return (
                  <option key={brand.id} value={brand.name}>
                    {brand.name}
                  </option>
                );
              })}
            </Select>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
}

export async function getServerSideProps() {
  const products = await axios.get("http://localhost:3000/api/products");

  return {
    props: {
      products: products.data.data,
    },
  };
}
