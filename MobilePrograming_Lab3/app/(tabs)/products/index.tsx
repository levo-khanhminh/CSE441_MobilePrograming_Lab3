import ProductCard, { ProductProps } from "@/components/ProductCard";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const ProductList = () => {
  const router = useRouter();
  const [data, setData] = useState<ProductProps[]>([]);
  useEffect(() => {
    fetch("https://dummyjson.com/products/")
      .then((res) => res.json())
      .then((data) => {
        setData(data.products);
      })
      .catch((err) => console.log(err));
  }, []);
  function handleDeleteProduct(id: number) {
    fetch("https://dummyjson.com/products/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          console.log("Successfully delete product");
          setData(data.filter((item) => item.id !== id));
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddProduct(product: ProductProps) {
    console.log(product.id);
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => {
        if (res.status === 201) {
          console.log("Successfullt add product");
          setData([...data, product]);
        } else {
          console.log(res.status);
        }
      })
      .catch((err) => console.log(err));
  }
  function handleDisplayProductDetail(id: number) {
    router.navigate(`/products/${id}`);
  }
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {/* <Text style={styles.bigTitle}>ProductList</Text> */}
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data}
          renderItem={({ item }) => (
            <ProductCard
              onDelete={handleDeleteProduct}
              onAdd={handleAddProduct}
              onDetail={handleDisplayProductDetail}
              id={item.id}
              rating={item.rating}
              title={item.title}
              category={item.category}
              price={item.price}
              stock={item.stock}
              discountPercentage={item.discountPercentage}
              images={item.images}
              description={item.description}
              brand={item.brand}
            />
          )}
          keyExtractor={(item) => String(item.id)}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  bigTitle: {
    fontSize: 20,
    fontWeight: "bold",
    backgroundColor: "black",
    color: "white",
    padding: 15,
    width: "100%",
    borderRadius: 10,
  },
});
