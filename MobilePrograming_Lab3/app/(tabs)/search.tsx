import { ProductProps } from "@/components/ProductCard";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from "react-native";
import { Card } from "react-native-paper";
import {
  Avatar,
  Button as CustomButton,
  Card as CustomCard,
  Text as CustomText,
} from "react-native-paper";
1;
const search = () => {
  const [data, setData] = useState<ProductProps[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState("");
  let filePath = "http://dummyjson.com/products";
  //handle Search Product
  function handleSearchProduct() {
    if (search !== "") {
      setLoading("loading");
      fetch(filePath + "/search?q=" + search)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Network response was not ok !!");
          }
        })
        .then((d) => {
          setData(d.products);
          setLoading("loaded");
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search Products</Text>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={setSearch}
          placeholder="Enter product"
        />
        <View style={styles.buttonSearch}>
          <Button onPress={() => handleSearchProduct()} title="Search" />
        </View>
      </View>
      <View>
        {loading === "loading" && (
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "red" }}>
            Searching.....
          </Text>
        )}

        {loading === "loaded" ? (
          <Text style={{ fontSize: 15, fontWeight: "bold" }}>
            Searching results for {`"${search}"`}
          </Text>
        ) : (
          ""
        )}

        <View>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
              <Card>
                <Card.Title title="Product Detail" />
                <Card.Content>
                  <CustomText variant="titleLarge">{item.title}</CustomText>
                  {/* <CustomText variant="bodyMedium">

                  </CustomText> */}
                  <CustomText>{item.category}</CustomText>
                  {/* <CustomText>{item.description}</CustomText> */}
                  <CustomText>{item.discountPercentage}</CustomText>
                </Card.Content>
                <Card.Cover source={{ uri: item.images[0] }} />
                <Card.Actions>
                  <CustomButton>Cancel</CustomButton>
                  <CustomButton>Ok</CustomButton>,
                </Card.Actions>
              </Card>
            )}
            keyExtractor={(item) => String(item.id)}
          />
        </View>
      </View>
    </View>
  );
};

export default search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  searchBarContainer: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    padding: 5,
    height: 50,
    borderRadius: 10,
  },
  buttonSearch: {
    width: 100,
    marginTop: 5,
  },
});
