import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
type ErrorProps = {
  title: string;
  description: string;
  price: string;
  discount: string;
  rating: string;
  stock: string;
  brand: string;
  category: string;
  imageUrl: string;
};
const ProductAddForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  useEffect(() => {
    const newErrors = {
      title: isNull(title, "title"),
      description:
        isNull(description, "description") ||
        isGreaterThanGivenLength(description, 50),
      price: isNull(price, "price") || isNumber(price, "price"),
      discount: isNull(discount, "discount"),
      rating: isNull(rating, "rating") || isNumber(rating, "rating"),
      stock: isNull(stock, "stock") || isNumber(stock, "stock"),
      brand: isNull(brand, "brand"),
      category: isNull(category, "category"),
      imageUrl:
        isNull(imageUrl, "imageUrl") ||
        imageUrl.includes("https") ||
        imageUrl.includes("http")
          ? ""
          : "Image Url must include the http or https protocol",
    };
    const hasErrors = Object.values(newErrors).some((err) => err);
    if (hasErrors) {
      setErrors(newErrors);
    }
  }, [
    title,
    description,
    price,
    discount,
    rating,
    stock,
    brand,
    category,
    imageUrl,
  ]);

  //Validators :
  function isNull(input: string, fieldName: string) {
    return !input ? `${fieldName} is required` : "";
  }
  function isNumber(input: string, fieldName: string) {
    return isNaN(Number(input)) ? `${fieldName} must be number` : "";
  }
  function isGreaterThanGivenLength(input: string, length: number) {
    return input.length < length ? ` Length cannot be less than ${length}` : "";
  }
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    price: "",
    discount: "",
    rating: "",
    stock: "",
    brand: "",
    category: "",
    imageUrl: "",
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Product</Text>
      <View style={styles.form}>
        <View style={styles.formItems}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            value={title}
            onChangeText={setTitle}
            style={styles.textInput}
            placeholder="Enter title..."
          />
          {errors.title && <Text style={styles.error}>{errors.title}</Text>}
        </View>
        <View style={styles.formItems}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={styles.textInput}
            placeholder="Enter description..."
          />
          {errors.description && (
            <Text style={styles.error}>{errors.description}</Text>
          )}
        </View>
        <View
          style={{
            // flex: 1,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              value={price}
              onChangeText={setPrice}
              style={[styles.textInput, { width: "80%" }]}
              placeholder="Enter price..."
            />
            {errors.price && <Text style={styles.error}>{errors.price}</Text>}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Discount</Text>
            <TextInput
              value={discount}
              onChangeText={setDiscount}
              style={[styles.textInput, { width: "100%" }]}
              placeholder="Enter discount..."
            />
            {errors.discount && (
              <Text style={styles.error}>{errors.discount}</Text>
            )}
          </View>
        </View>
        <View
          style={{
            // flex: 1,
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Rating</Text>
            <TextInput
              value={rating}
              onChangeText={setRating}
              style={[styles.textInput, { width: "40%" }]}
              placeholder="Enter price..."
            />
            {errors.rating && <Text style={styles.error}>{errors.rating}</Text>}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.label}>Stock</Text>
            <TextInput
              value={stock}
              onChangeText={setStock}
              style={[styles.textInput, { width: "100%" }]}
              placeholder="Enter stock..."
            />
            {errors.stock && <Text style={styles.error}>{errors.stock}</Text>}
          </View>
        </View>
        <View style={styles.formItems}>
          <Text style={styles.label}>Brand</Text>
          <TextInput
            value={brand}
            onChangeText={setBrand}
            style={styles.textInput}
            placeholder="Enter brand..."
          />
          {errors.brand && <Text style={styles.error}>{errors.brand}</Text>}
        </View>
        <View style={styles.formItems}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            value={category}
            onChangeText={setCategory}
            style={styles.textInput}
            placeholder="Enter category..."
          />
          {errors.category && (
            <Text style={styles.error}>{errors.category}</Text>
          )}
        </View>
        <View style={styles.formItems}>
          <Text style={styles.label}>Image URLS</Text>
          <TextInput
            value={imageUrl}
            onChangeText={setImageUrl}
            style={styles.textInput}
            placeholder="Enter image url..."
          />
          {errors.imageUrl && (
            <Text style={styles.error}>{errors.imageUrl}</Text>
          )}
        </View>
        <View>
          <Button title="Add" color="#111" />
        </View>
      </View>
    </View>
  );
};

export default ProductAddForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  form: {},
  formItems: {
    marginVertical: 5,
    width: "100%",
    rowGap: 10,
  },
  label: {
    fontSize: 10,
    fontWeight: "bold",
    width: "100%",
  },
  textInput: {
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  error: {
    fontSize: 10,
    fontWeight: "bold",
    color: "red",
  },
});
