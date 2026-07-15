import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
} from "react-native";
import BottomNavBar from "../components/ButtomNavBar";
import { router } from "expo-router";
import styles from "./productstyle";
import { Feather } from "@expo/vector-icons";

// Data Mocking untuk Produk
const bestSellers = [
  {
    id: "1",
    name: "Kopi Gula Aren",
    sales: "124 Terjual",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCJt1ebWjC3cDEDH5LZsW7E4iaQPQaOMrdaxMA4SbGLyEHwz5PrzqnrhHcio_s_u8IXqzmK6YOvFdyNqTsjOvp8f446OTLEDeG2iVG-iPQQXkmhxVXRQR4lHT4fLnitCnK9tizNpcoJeVVCoa6iNkT-qdBEOh74632RfxjDIWAZ_SU_dE21CeD4sc4tt4a1YIEOyI9swImOWAY_78BEnnqql7S8LBpmhKD5rnSb-aJd07s4g8-R2QmcMQ",
  },
  {
    id: "2",
    name: "Cinnamon Roll",
    sales: "98 Terjual",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMqRKXVdGVDIpSL2qXibIgmomm-ozIciWOE-kfHOQsAPKgDLwKnTzgyx0yuMf-dzxoylan7K25JsErFHraGaWvXXH4jOVGeCODR89o0Gsj4txXsCiAStPTM3Y6fp_xdQO93K7XmAOuYbQTbGBeUVNPAD7Os5m6bXy7nKv1nusCT9_v_5MLaNSonGhrcd06j-J5TimFpObiIpNB01z9VAzF8yQXJL9r6YpcaoYeyV0bZxuyTl-lCUhe-w",
  },
  {
    id: "3",
    name: "Matcha Latte",
    sales: "85 Terjual",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDh6sTGqjMKcx9gOyxs8F6ftPZ-wtYHBa9A-4yugJ99WXImXosdyyDh-qXtixJN1w9IuQzhatUoV-qKYQdEmBKUKI20MG74rRb-aKuh9YcKCADvgxjMy9yUirU1p6hemJ3D3QGrL_C2UL_uJKOr3OFgr43wPvShthC7999_oDftba9wEJcxCYLJLHHbTb8gvT2YWiqyHXPx3L9p8W4zuzxQh9zCekUfTJbUzrkg4jPYLb7g6kcxVKhNSQ",
  },
];

const allProducts = [
  {
    id: "1",
    name: "Avocado Toast Special",
    category: "Food",
    stock: 15,
    price: "Rp 45.000",
    available: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBp_7xqwk_3h3mI-IT-crf_E9IA4Ue3vhjM6ttZZ3lTz3EWdTjd8erV4TkG0ixNJcr6vdDb2tbSs-m-fl8JorLxXapX5xdbLax1L7DSoQNwU6-5uiGNSOjcNSGkJQQl5N2fKTTmkoSZLR4CslcPx-ATFr-wUrT6BUGqhz9z0L59xfoul9iLipO0lOQuxD_ZVSkJupk035zdSDeNW99TwpaWwj7U3_r0bMxXNKaBs2LY-DeheTRLrAu5gQ",
  },
  {
    id: "2",
    name: "Espresso Double Shot",
    category: "Drink",
    stock: 50,
    price: "Rp 22.000",
    available: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCqunKaDjrCtfqvUN2xMGESaFZXPX7T8c2L-dWRqF_FYcpi-4mf1-r5G4VMTux7m-Mc4f99DsIHOt2bbLGtcwyyIsJwoIPrbo7mE8w-AzlXkHfw0jmbsl0PjrqAmey2wwdZHbgp9a8xJ5Y-pewoDnktIFI_-yXd2l07wVjItNcbIXyxqQ-1uPphTP3B0sKmhwtxc8JbedrNW-GsrVCPXzwZRl9ubTpru4huTn_yeII5kHngydvR_e6XdA",
  },
  {
    id: "3",
    name: "Choco Brownies",
    category: "Food",
    stock: 0,
    price: "Rp 18.000",
    available: false,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAx2R7XhQry8YmhXYy46sqX1HJ2zQSkZ_JfQYPZ_Q0KK30ldpCllFctfxNb-UQjxKQvZ9ZykhEIqW1cFxd_cx5cpxbwJBgPL-MxnwriFo7gkQqFix84xtC7gX3TYNzXUQa-h6QCGx9JA9L0EaoNiuovcqHYFB_LZJXp0PSXruWofzc9JcQjKspbzAwxHuKGFD8sma3LhUgpxZvzrhj1Gv_41i78WwLiTINL3G09izbGstDoUmndlk3oVw",
  },
  {
    id: "4",
    name: "Strawberry Iced Tea",
    category: "Drink",
    stock: 24,
    price: "Rp 28.000",
    available: true,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsMpm_gYo4olrzs9o8R6SrZDyB9XMVWyz5Os8kq2yDRFteMBpOSTejMhDr2w4-ZX6hB4-Cg3F7XLgiKbR7QAcSOfb_KSKNlpN53RlfvBrPjthfe8Fx9zaqO7iXhjDmZdd8cF1l7WPkNHMV4uKe8O550Wi35dEU34xkgP-PcQ_A-cSK8Fj4asmRkAVvcl3-GA4UoWtmo2wSyXBOh6ufktSrUpR2iN7zUrORiMk6y7jn7zn837-WF74NcQ",
  },
];

export default function index() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#003a33" />

      {/* Header / TopAppBar */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.iconText}>🏪</Text>
          <Text style={styles.headerTitle}>Daftar Produk</Text>
        </View>
        <Image
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7qMnt-g4iIqwCTIjXSGOK-WJ-RgUs_F093rH5en0YDoB5Cn04NxVpKpEaFO7qB42SUylkovGlilSOWgBGdv6lrY5pbieL5JjXEStqUPu3b2Tk63CBKBe8MN-TDvWorLf3tQu6cIM9NlPymFugaEJlRRWPLVa5PcQZukcuoi37BbFRZJCxr_fhLdobew2r1K6Ps_wEX4uL0QyHn6ZBaBJwDwsFiULyAHBrA_9YiYnKYSq8Lbl-5o7VlA",
          }}
          style={styles.profileImage}
        />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Search & Filter Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchInputWrapper}>
            <Feather name="search" size={24} color="black" />
            <TextInput
              placeholder="Cari nama produk..."
              placeholderTextColor="#707976"
              style={styles.searchInput}
            />
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Feather name="filter" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Section: Produk Terlaris */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Produk Terlaris</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>Lihat Semua ❯</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.horizontalScroll}
          >
            {bestSellers.map((item) => (
              <View key={item.id} style={styles.bestSellerCard}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.bestSellerImage}
                />
                <Text numberOfLines={1} style={styles.cardTitle}>
                  {item.name}
                </Text>
                <View style={styles.salesWrapper}>
                  <Text style={styles.trendingIcon}>📈</Text>
                  <Text style={styles.salesText}>{item.sales}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Section: Semua Produk */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Semua Produk</Text>
            <Text style={styles.itemCountText}>42 Item</Text>
          </View>

          {allProducts.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.7}
              style={[
                styles.productListItem,
                !item.available && { opacity: 0.7 },
              ]}
            >
              <Image
                source={{ uri: item.image }}
                style={[
                  styles.productImage,
                  !item.available && { tintColor: "gray" },
                ]} // Simulates grayscale fallback
              />
              <View style={styles.productDetails}>
                <View style={styles.productDetailsTop}>
                  <View style={styles.titleBadgeRow}>
                    <Text style={styles.productName}>{item.name}</Text>
                    <View
                      style={[
                        styles.badge,
                        item.category === "Food"
                          ? styles.badgeFood
                          : styles.badgeDrink,
                      ]}
                    >
                      <Text style={styles.badgeText}>{item.category}</Text>
                    </View>
                  </View>
                  <Text style={styles.stockText}>Stok: {item.stock} porsi</Text>
                </View>

                <View style={styles.productDetailsBottom}>
                  <Text style={styles.priceText}>{item.price}</Text>
                  <View
                    style={[
                      styles.statusTag,
                      item.available
                        ? styles.statusAvailable
                        : styles.statusEmpty,
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        item.available
                          ? styles.statusTextAvailable
                          : styles.statusTextEmpty,
                      ]}
                    >
                      {item.available ? "TERSEDIA" : "HABIS"}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* FAB: Tambah Produk */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.fab}
        onPress={() => router.push("/product/create")}
      >
        <Text style={styles.fabIcon}>+</Text>
        <Text style={styles.fabText}>Tambah Produk</Text>
      </TouchableOpacity>

      {/* Komponen Navigasi Bawah */}
      <BottomNavBar />
    </SafeAreaView>
  );
}
