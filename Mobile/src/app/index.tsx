import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import LoginScreen from "./auth/LoginScreen";

export default function Index() {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
