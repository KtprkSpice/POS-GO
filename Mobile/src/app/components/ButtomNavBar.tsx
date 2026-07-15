import { FontAwesome6 } from "@expo/vector-icons";
import { router, useRoutePath } from "expo-router";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function BottomNavBar() {
  const pathname = useRoutePath();

  // Menu list item sesuai dengan kode HTML asal
  const navItems = [
    {
      label: "Produk",
      icon: "box",
      route: "/product",
    },
    {
      label: "POS",
      icon: "cart-shopping",
      route: "/pos",
    },
    {
      label: "Laporan",
      icon: "chart-simple",
      route: "/report",
    },
    {
      label: "Pengaturan",
      icon: "gear",
      route: "/setting",
    },
  ];

  return (
    <View style={styles.navBar}>
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.route);

        return (
          <TouchableOpacity
            key={item.route}
            activeOpacity={0.8}
            style={styles.navItem}
            onPress={() => router.push(item.route)}
          >
            <FontAwesome6
              name={item.icon}
              size={20}
              color={isActive ? "#ffdcc0" : "rgba(255,255,255,0.6)"}
            />

            <Text
              style={[
                styles.navLabel,
                isActive ? styles.activeLabel : styles.inactiveLabel,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: "#003a33",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "rgba(112, 121, 118, 0.1)",
  },
  navItem: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 2,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  activeIcon: {
    opacity: 1,
  },
  inactiveIcon: {
    opacity: 0.6,
  },
  activeLabel: {
    color: "#ffdcc0", // Mengikuti warna secondary-fixed / active pada HTML
  },
  inactiveLabel: {
    color: "rgba(255, 255, 255, 0.6)",
  },
});
