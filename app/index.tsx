import { StyleSheet, TextInput, FlatList } from "react-native";
import { ShoppingListItem } from "../components/ShoppingListItem";
import { theme } from "../theme";
import { useState } from "react";

type ShoppingListItemType = {
  id: string;
  name: string;
};

const initialList: ShoppingListItemType[] = [
  { id: "1", name: "Coffee" },
  { id: "2", name: "Tea" },
  { id: "3", name: "Milk" },
];

export default function App() {
  const [shoppingList, setShoppingList] =
    useState<ShoppingListItemType[]>(initialList);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value) {
      const newShoppingList = [
        {
          id: `${new Date().toISOString()}${Math.floor(Math.random() * 10)}`,
          name: value,
        },
        ...shoppingList,
      ];
      setShoppingList(newShoppingList);
      setValue("");
    }
  };

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      ListHeaderComponent={() => (
        <TextInput
          value={value}
          onChangeText={setValue}
          style={styles.textInput}
          returnKeyType="done"
          onSubmitEditing={handleSubmit}
        />
      )}
      stickyHeaderIndices={[0]}
      data={shoppingList}
      renderItem={({ item }) => {
        return <ShoppingListItem name={item.name} />;
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 12,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  textInput: {
    borderWidth: 2,
    borderColor: theme.colorLightGrey,
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 12,
    fontSize: 18,
    borderRadius: 50,
    backgroundColor: theme.colorWhite,
  },
});
