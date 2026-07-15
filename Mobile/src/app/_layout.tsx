import { Drawer } from "expo-router/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    // GestureHandlerRootView wajib membungkus Drawer agar swipe/geser layar berfungsi
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        {/* Halaman Utama (index.tsx) */}
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Home",
            title: "Halaman Utama",
            headerShown: false,
          }}
        />

        {/* Halaman Login kamu (auth/LoginScreen.tsx) */}
        <Drawer.Screen
          name="auth/LoginScreen"
          options={{
            drawerLabel: "Login",
            title: "Masuk Ke Akun",
            // Kita sembunyikan header bawaan drawer khusus untuk halaman login
            headerShown: false,
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
