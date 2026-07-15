import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  Switch,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import styles from "./productstyle";

// Helper: format angka jadi "Rp 25.000"
function formatRupiah(value) {
  const number = Number(String(value).replace(/[^0-9]/g, "")) || 0;
  return "Rp " + number.toLocaleString("id-ID");
}

let nextId = 100;
const genId = () => nextId++;

export default function create({ navigation }) {
  // ===== Informasi Dasar =====
  const [productName, setProductName] = useState("Kopi Gula Aren");
  const [category, setCategory] = useState("Minuman");
  const [price, setPrice] = useState("25000");
  const [stock, setStock] = useState("");

  // ===== Kustomisasi (Add-ons) =====
  const [customEnabled, setCustomEnabled] = useState(true);
  const [groups, setGroups] = useState([
    {
      id: genId(),
      name: "Sugar Level",
      options: [
        { id: genId(), name: "Normal Sugar", price: "0" },
        { id: genId(), name: "Less Sugar", price: "0" },
      ],
    },
    {
      id: genId(),
      name: "Toppings",
      options: [
        { id: genId(), name: "Boba", price: "3000" },
        { id: genId(), name: "Cream Foam", price: "5000" },
      ],
    },
  ]);

  const updateGroupName = (groupId, name) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === groupId ? { ...g, name } : g)),
    );
  };

  const removeGroup = (groupId) => {
    setGroups((prev) => prev.filter((g) => g.id !== groupId));
  };

  const addGroup = () => {
    setGroups((prev) => [
      ...prev,
      {
        id: genId(),
        name: "Grup Baru",
        options: [{ id: genId(), name: "", price: "0" }],
      },
    ]);
  };

  const addOption = (groupId) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: [...g.options, { id: genId(), name: "", price: "0" }],
            }
          : g,
      ),
    );
  };

  const removeOption = (groupId, optionId) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? { ...g, options: g.options.filter((o) => o.id !== optionId) }
          : g,
      ),
    );
  };

  const updateOption = (groupId, optionId, field, value) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === groupId
          ? {
              ...g,
              options: g.options.map((o) =>
                o.id === optionId ? { ...o, [field]: value } : o,
              ),
            }
          : g,
      ),
    );
  };

  const previewPrice = useMemo(() => formatRupiah(price), [price]);

  const handleSave = () => {
    const payload = {
      productName,
      category,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      customEnabled,
      groups,
    };
    // TODO: kirim payload ke API / state management
    console.log("Simpan produk:", payload);
  };

  return (
    <View style={styles.container}>
      {/* Top AppBar */}
      <View style={styles.header}>
        <View style={styles.headerTitleContainer}>
          <TouchableOpacity
            style={styles.headerBackButton}
            onPress={() => navigation?.goBack?.()}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
          >
            <MaterialIcons name="arrow-back" size={24} color="#ffffff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle} numberOfLines={1}>
            Tambah Produk Baru
          </Text>
        </View>
        <Image
          style={styles.profileImage}
          source={{
            uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB7pK_pU3Cj_7aw6-Ql-Xp_bXlVraXYA0rNISOKNZvJ3ttkMjiaVWZNnNr6Wa7UZCE-9ewF1rQkwcdvc-s-8plNAg0MnM7Ur_5P3qTUVL-4GRx8uTzJ2Y3Tj6BsjUbjdKscQI4pOaLQ1kiVHmDfpLELClJWC8F5t4PQzrL1HGNVbmoxmSCgLBZeWIekyFfpt2KYGfO6xF3ntK1US2BcoAp_LH8_VHoUYtX30ePKNEmDf0Y-AW7LsiCPJw",
          }}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Section: Informasi Dasar */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderRow}>
            <View style={styles.sectionHeaderLeft}>
              <MaterialIcons name="inventory" size={18} color="#16524a" />
              <Text style={styles.sectionTitle}>Informasi Dasar</Text>
            </View>
          </View>

          <View style={styles.fieldRow}>
            <View style={styles.fieldWrapperFull}>
              <Text style={styles.label}>Nama Produk</Text>
              <TextInput
                style={styles.input}
                placeholder="Misal: Kopi Gula Aren"
                placeholderTextColor="#9aa19e"
                value={productName}
                onChangeText={setProductName}
              />
            </View>

            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Kategori</Text>
              <View style={styles.selectWrapper}>
                <Picker
                  selectedValue={category}
                  onValueChange={setCategory}
                  style={
                    Platform.OS === "ios" ? undefined : { color: "#1c1b18" }
                  }
                  dropdownIconColor="#404946"
                >
                  <Picker.Item label="Makanan" value="Makanan" />
                  <Picker.Item label="Minuman" value="Minuman" />
                  <Picker.Item label="Snack" value="Snack" />
                </Picker>
              </View>
            </View>

            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Harga Jual</Text>
              <View style={styles.priceInputWrapper}>
                <Text style={styles.currencyPrefix}>Rp</Text>
                <TextInput
                  style={[styles.input, styles.inputWithPrefix]}
                  placeholder="0"
                  placeholderTextColor="#9aa19e"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={(t) => setPrice(t.replace(/[^0-9]/g, ""))}
                />
              </View>
            </View>

            <View style={styles.fieldWrapper}>
              <Text style={styles.label}>Stok Tersedia</Text>
              <TextInput
                style={styles.input}
                placeholder="999"
                placeholderTextColor="#9aa19e"
                keyboardType="numeric"
                value={stock}
                onChangeText={(t) => setStock(t.replace(/[^0-9]/g, ""))}
              />
            </View>
          </View>
        </View>

        {/* Section: Manajemen Kustomisasi (Add-ons) */}
        <View style={styles.section}>
          <View style={styles.toggleRow}>
            <View style={styles.sectionHeaderLeft}>
              <MaterialIcons name="tune" size={18} color="#16524a" />
              <Text style={styles.sectionTitle}>
                Manajemen Kustomisasi (Add-ons)
              </Text>
            </View>
            <Switch
              value={customEnabled}
              onValueChange={setCustomEnabled}
              trackColor={{ false: "#e6e2dd", true: "#16524a" }}
              thumbColor="#ffffff"
            />
          </View>

          {customEnabled && (
            <>
              {groups.map((group) => (
                <View key={group.id} style={styles.groupCard}>
                  <View style={styles.groupHeaderRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.label}>Nama Grup</Text>
                      <TextInput
                        style={styles.groupNameInput}
                        value={group.name}
                        onChangeText={(t) => updateGroupName(group.id, t)}
                      />
                    </View>
                    <TouchableOpacity
                      style={styles.deleteGroupButton}
                      onPress={() => removeGroup(group.id)}
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                    >
                      <MaterialIcons name="delete" size={20} color="#ba1a1a" />
                    </TouchableOpacity>
                  </View>

                  {group.options.map((option) => (
                    <View key={option.id} style={styles.optionRow}>
                      <TextInput
                        style={styles.optionNameInput}
                        placeholder="Nama Opsi"
                        placeholderTextColor="#9aa19e"
                        value={option.name}
                        onChangeText={(t) =>
                          updateOption(group.id, option.id, "name", t)
                        }
                      />
                      <View style={styles.optionPriceWrapper}>
                        <Text style={styles.optionPricePrefix}>+Rp</Text>
                        <TextInput
                          style={styles.optionPriceInput}
                          keyboardType="numeric"
                          value={option.price}
                          onChangeText={(t) =>
                            updateOption(
                              group.id,
                              option.id,
                              "price",
                              t.replace(/[^0-9]/g, ""),
                            )
                          }
                        />
                      </View>
                      <TouchableOpacity
                        style={styles.optionRemoveButton}
                        onPress={() => removeOption(group.id, option.id)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <MaterialIcons name="close" size={16} color="#9aa19e" />
                      </TouchableOpacity>
                    </View>
                  ))}

                  <TouchableOpacity
                    style={styles.addOptionButton}
                    onPress={() => addOption(group.id)}
                  >
                    <MaterialIcons
                      name="add-circle"
                      size={16}
                      color="#16524a"
                    />
                    <Text style={styles.addOptionText}>Tambah Opsi</Text>
                  </TouchableOpacity>
                </View>
              ))}

              <TouchableOpacity
                style={styles.addGroupButton}
                onPress={addGroup}
              >
                <MaterialIcons name="library-add" size={20} color="#16524a" />
                <Text style={styles.addGroupText}>
                  Tambah Grup Kustomisasi Baru
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>

        {/* Product Visualization Card (Preview) */}
        <View style={styles.previewSection}>
          <View style={styles.previewImageWrapper}>
            <Image
              style={styles.previewImage}
              source={{
                uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuB3QILxdEDjGwUhGzIgzM64aCpjvCHMbKj9WnlMBXwmw420hXLL_PNWYaaYu-DhxbHOoyxndM0nnCTUgu33Vr9AoRieobff3VBwAKz7_9zD8Ct12oNPgfS8WtK7GSCUhH4SLE7b3ztb8rtI5_A2g7f4KAGZcRwdteHoYjjTg-HwEh-b3jzzHc5aHsUbep4dp0f4NRcO61EWABSVO7uXLrWF11eED094aHTPL0YFuCw_cPbYIxx4d6sk7A",
              }}
            />
          </View>
          <View style={styles.previewTextWrapper}>
            <Text style={styles.previewLabel}>Pratinjau Tampilan Produk</Text>
            <Text style={styles.previewTitle} numberOfLines={1}>
              {productName || "Nama Produk"}
            </Text>
            <View style={styles.previewMetaRow}>
              <Text style={styles.previewBadge}>{category}</Text>
              <Text style={styles.previewPrice}>{previewPrice}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.saveButton}
          activeOpacity={0.85}
          onPress={handleSave}
        >
          <MaterialIcons name="save" size={20} color="#2d1600" />
          <Text style={styles.saveButtonText}>Simpan Produk</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
