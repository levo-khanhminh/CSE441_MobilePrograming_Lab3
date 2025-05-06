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
    // There is a big bug when  A New Product is created with a new Id from this fake API , the id may or may not exist in the list
    // In case  not exists the id of product  from the API,it returns Not Found(404),
    //  So just delete product with given id  from the list  of products after fetching them the API in the Client Side - Not the Server One.
    fetch("https://dummyjson.com/products/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        console.log(res);
        console.log("Delete response : ", res.status);
        if (res.status === 200) {
          console.log("Successfully delete product");
        } else {
          console.log(res.status);
        }
        // Change code here
        setData(data.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleAddProduct(product: ProductProps) {
    console.log(product.id);
    const newProduct = {
      title: product.title,
      price: product.price,
      category: product.category,
      brand: product.category,
      images: product.images,
      discountPercentage: product.discountPercentage,
      rating: product.rating,
      stock: product.stock,
      description: product.description,
    };
    fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then((d) => setData([...data, d]))
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
