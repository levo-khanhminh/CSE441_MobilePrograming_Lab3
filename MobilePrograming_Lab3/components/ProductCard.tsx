import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
export interface ProductProps {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  rating: number;
  discountPercentage: number;
  stock: number;
  images: string[];
  brand: string;
}
interface ProductCardProps extends ProductProps {
  onDelete: (id: number) => void;
  onAdd: (product: ProductProps) => void;
  onDetail: (id: number) => void;
}
const ProductCard = ({
  id,
  title,
  price,
  discountPercentage,
  images,
  description,
  brand,
  category,
  rating,
  onDelete,
  onAdd,
  onDetail,
  stock,
}: ProductCardProps) => {
  return (
    <View style={styles.productCardContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: images[0] }} />
      </View>
      <View style={styles.productInfoContainer}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
        <Text style={{ fontSize: 13 }}>{description.substring(0, 25)}</Text>
        <Text style={{ color: "red" }}>Price:{price}</Text>
        <Text style={{ color: "green" }}>
          Discount : {discountPercentage || "Discount"} off
        </Text>
        <Text>Brand:{brand || "Brandname"}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => onDetail(id)}
            style={[styles.button, { backgroundColor: "#00DDFF" }]}
          >
            <Text style={{ color: "white" }}>Detail</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              const newProduct = {
                id: new Date().getMilliseconds(),
                title: title,
                price: price,
                description: description,
                brand: brand,
                images: [images[0]],
                discountPercentage: discountPercentage,
                stock: stock,
                category: category,
                rating: rating,
              };
              onAdd(newProduct);
            }}
            style={[styles.button, { backgroundColor: "#68d388" }]}
          >
            <Text style={{ color: "white" }}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(id)}
            style={[styles.button, { backgroundColor: "#ff1d58" }]}
          >
            <Text style={{ color: "white" }}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ProductCard;

const styles = StyleSheet.create({
  productCardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    borderRadius: 15,
    height: 280,
    padding: 10,
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // Android shadow
    marginTop: 10,
  },
  imageContainer: {
    flex: 1,
    height: "100%",
    justifyContent: "flex-start",
  },
  productInfoContainer: {
    flex: 2,
    marginLeft: 5,
    height: "100%",
  },
  image: {
    borderRadius: 20,
    height: 100,
    backgroundColor: "#f8f8f8",
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
    columnGap: 3,
  },
  button: {
    fontSize: 15,
    padding: 10,
    borderRadius: 5,
  },
});
