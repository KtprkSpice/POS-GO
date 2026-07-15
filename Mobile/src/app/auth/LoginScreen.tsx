import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAF7F2" />

      <View style={styles.card}>
        {/* Logo */}
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="shopping-bag" size={42} color="#16524A" />
          </View>

          <Text style={styles.title}>RetailOS</Text>

          <Text style={styles.subtitle}>POINT OF SALE SYSTEM</Text>
        </View>

        {/* Welcome */}
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>Selamat Datang</Text>

          <Text style={styles.welcomeDesc}>
            Silakan masuk untuk memulai transaksi
          </Text>
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="mail-outline" size={22} color="#707976" />

            <TextInput
              placeholder="nama@retailos.id"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              placeholderTextColor="#707976"
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Password</Text>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={22} color="#707976" />

            <TextInput
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              style={styles.input}
              placeholderTextColor="#707976"
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <MaterialIcons
                name={showPassword ? "visibility-off" : "visibility"}
                size={22}
                color="#707976"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotButton}>
            <Text style={styles.forgotText}>Lupa Kata Sandi?</Text>
          </TouchableOpacity>
        </View>

        {/* Login */}
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginText}>Masuk</Text>
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLinks}>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Syarat Layanan</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.footerLink}>Kebijakan Privasi</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.version}>v2.4.0 • Support: 1-800-POS-HELP</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const PRIMARY = "#16524A";
const BG = "#FAF7F2";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 24,
    padding: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },

  logoSection: {
    alignItems: "center",
    marginBottom: 30,
  },

  logoContainer: {
    width: 84,
    height: 84,
    borderRadius: 18,
    backgroundColor: "#F7F7F7",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: PRIMARY,
  },

  subtitle: {
    marginTop: 6,
    fontSize: 12,
    letterSpacing: 2,
    color: "#777",
    fontWeight: "600",
  },

  welcome: {
    alignItems: "center",
    marginBottom: 30,
  },

  welcomeTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1C1B18",
  },

  welcomeDesc: {
    marginTop: 6,
    color: "#666",
    fontSize: 15,
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 8,
    fontWeight: "700",
    color: "#1C1B18",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 15,
    height: 58,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: "#1C1B18",
    outlineWidth: 0,
    outlineStyle: "solid",
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },

  forgotText: {
    color: PRIMARY,
    fontWeight: "700",
  },

  loginButton: {
    marginTop: 10,
    height: 58,
    borderRadius: 16,
    backgroundColor: PRIMARY,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },

  loginText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 18,
  },

  footer: {
    marginTop: 35,
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
    paddingTop: 20,
    alignItems: "center",
  },

  footerLinks: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 15,
  },

  footerLink: {
    color: "#666",
    fontSize: 13,
  },

  version: {
    color: "#999",
    fontSize: 12,
  },
});
