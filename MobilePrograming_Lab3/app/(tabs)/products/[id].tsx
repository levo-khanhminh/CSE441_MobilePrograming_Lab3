import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Card } from "react-native-paper";
import {
  Avatar,
  Button as CustomButton,
  Card as CustomCard,
  Text as CustomText,
} from "react-native-paper";
const Detail = () => {
  const { id } = useLocalSearchParams();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);
  if (!product) return <Text>Loading...</Text>;

  return (
    <View style={styles.container}>
      <Card>
        <Card.Title title="Product Detail" />
        <Card.Content>
          <CustomText style={styles.title} variant="titleLarge">
            {product.title}
          </CustomText>
          {/* <CustomText variant="bodyMedium">
      
                        </CustomText> */}
          <CustomText>Category :{product.category}</CustomText>
          {/* <CustomText>{product.description}</CustomText> */}
          <CustomText>Discount : {product.discountPercentage}</CustomText>
        </Card.Content>
        <Card.Cover source={{ uri: product.images[0] }} />
        <Card.Actions>
          <CustomButton>Cancel</CustomButton>
          <CustomButton>Delete</CustomButton>,
        </Card.Actions>
      </Card>
      {/* <Text style={styles.title}>{product.title}</Text>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text>{product.description}</Text>
      <Text style={{ fontWeight: "bold", marginTop: 10 }}>
        Price: ${product.price}
      </Text> */}
    </View>
  );
};
const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
});
export default Detail;
