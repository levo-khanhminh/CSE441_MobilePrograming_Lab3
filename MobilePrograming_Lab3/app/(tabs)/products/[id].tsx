import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

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
      <Text style={styles.title}>{product.title}</Text>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <Text>{product.description}</Text>
      <Text style={{ fontWeight: "bold", marginTop: 10 }}>
        Price: ${product.price}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  image: { width: "100%", height: 200, borderRadius: 10, marginBottom: 10 },
});
export default Detail;
