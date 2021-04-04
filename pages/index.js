import {
  Button,
  Flex,
  Heading,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Input,
  InputGroup,
  InputLeftElement,
  HStack,
  VStack,
  IconButton,
} from '@chakra-ui/react';
import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { HeartIconOutlined } from '@/styles/icons';
import axios from 'axios';

export default function Index({ categories, products }) {
  return (
    <Flex flexDir="column" justifyContent="flex-start" w="full" bg="gray.50">
      <HStack
        alignItems="center"
        w="full"
        px="8"
        py="4"
        w="75%"
        margin="auto"
        spacing={4}
      >
        <Heading as="h1" size="md">
          FastCommerce
        </Heading>
        <Flex w="full">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              borderRadius="0"
              borderColor="gray.300"
              borderStyle="solid"
              borderRightWidth="1px"
            >
              Categories
            </MenuButton>
            <MenuList>
              {categories.map((category) => (
                <MenuItem key={category.id}>{category.name}</MenuItem>
              ))}
            </MenuList>
          </Menu>
          <InputGroup>
            <InputLeftElement children={<SearchIcon />} />
            <Input
              variant="filled"
              placeholder="Rechercher des articles"
              w="full"
              borderRadius="0"
            />
          </InputGroup>
        </Flex>

        <Flex>
          <Button colorScheme="red" size="sm">
            Connexion
          </Button>
        </Flex>
      </HStack>
      <Flex
        alignItems="center"
        bg='url("https://images.unsplash.com/photo-1516575150278-77136aed6920?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
        bgSize="cover"
        bgPos="center"
        w="100%"
        h="500px"
      >
        <Flex w="900px" justifyContent="center">
          <VStack
            flexDirection="column"
            justifyContent="center"
            alignItems="flex-start"
            w="500px"
            bg="white"
            height="200px"
            borderRadius="15px"
            py="6"
            px="4"
            spacing={4}
          >
            <Heading as="h2" size="lg">
              Interessé par un article ?
            </Heading>
            <Button colorScheme="red">Inscrit toi</Button>
          </VStack>
        </Flex>
      </Flex>
      <HStack spacing={4} p="4">
        {products.map((product) => (
          <Flex
            key={product.id}
            flexDir="column"
            w="256px"
            h="500px"
            bg="white"
            borderRadius="15px"
            cursor="pointer"
          >
            <Flex
              alignItems="center"
              bg={`url("${product.imgs[0].url}")`}
              bgSize="cover"
              bgPos="center"
              w="full"
              h="400px"
              position="relative"
              borderTopRadius="15px"
            >
              <IconButton
                position="absolute"
                top="2"
                right="4"
                bg="white"
                size="sm"
              >
                <HeartIconOutlined />
              </IconButton>
            </Flex>
            <Flex flexDir="column" p="2">
              <Flex flexDir="column" mb="4">
                <Text>{product.marque}</Text>
                <Text>{product.categorie}</Text>
                <Text>{product.name}</Text>
              </Flex>
              <HStack spacing={2} alignItems="center">
                {product.price_final && (
                  <Text fontWeight="bold">{product.price_final} €</Text>
                )}
                <Text
                  fontWeight={product.price_final ? 'light' : 'bold'}
                  fontSize={product.price_final ? 'sm' : 'md'}
                  textDecoration={!!product.price_final && 'line-through'}
                >
                  {product.price} €
                </Text>
              </HStack>
            </Flex>
          </Flex>
        ))}
      </HStack>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  const categories = await axios.get('http://localhost:3000/api/categories');
  const products = await axios.get('http://localhost:3000/api/products');


  console.log('PRODUCTS : ', products);

  return {
    props: {
      categories: categories.data.data,
      products: products.data.data,
    },
  };
}
