import { Stack } from "expo-router";
import React from "react";

const ProductLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Products",
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          headerBackVisible: true,
          title: "Details",
          statusBarHidden: false,
        }}
      />
    </Stack>
  );
};

export default ProductLayout;
