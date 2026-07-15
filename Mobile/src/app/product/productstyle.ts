import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // ===== Reused from the original screen =====
  container: {
    flex: 1,
    backgroundColor: "#fdf9f3",
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120, // ruang untuk bottom action bar
  },
  header: {
    height: 56,
    backgroundColor: "#16524a", // primary-container
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  headerTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  headerBackButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    flexShrink: 1,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  // ===== Form sections =====
  section: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(28, 27, 24, 0.1)",
    padding: 16,
    marginBottom: 24,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e6e2dd",
  },
  sectionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: 0.5,
    color: "#16524a",
    textTransform: "uppercase",
  },

  // Basic info fields
  fieldRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -8,
  },
  fieldWrapper: {
    width: "50%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  fieldWrapperFull: {
    width: "100%",
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: "500",
    color: "#404946",
    marginBottom: 4,
  },
  input: {
    height: 48,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "rgba(28, 27, 24, 0.15)",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#1c1b18",
  },
  selectWrapper: {
    height: 48,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "rgba(28, 27, 24, 0.15)",
    borderRadius: 8,
    justifyContent: "center",
    overflow: "hidden",
  },
  priceInputWrapper: {
    position: "relative",
    justifyContent: "center",
  },
  currencyPrefix: {
    position: "absolute",
    left: 16,
    fontSize: 14,
    fontWeight: "700",
    color: "#404946",
    zIndex: 1,
  },
  inputWithPrefix: {
    paddingLeft: 44,
  },

  // Toggle row (customization section)
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f8f3ed",
    marginHorizontal: -16,
    marginTop: -16,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  toggleLabel: {
    fontSize: 12,
    color: "#404946",
    marginLeft: 8,
  },

  // Customization group card
  groupCard: {
    borderWidth: 1,
    borderColor: "#ece7e2",
    borderRadius: 8,
    padding: 16,
    backgroundColor: "#ffffff",
    marginBottom: 16,
  },
  groupHeaderRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  groupNameInput: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1c1b18",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(28, 27, 24, 0.1)",
    paddingVertical: 6,
    flex: 1,
    marginRight: 12,
  },
  deleteGroupButton: {
    padding: 8,
    borderRadius: 999,
  },

  // Option row inside a group
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#f8f3ed",
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "rgba(28, 27, 24, 0.1)",
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginBottom: 8,
  },
  optionNameInput: {
    flex: 1,
    fontSize: 16,
    color: "#1c1b18",
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  optionPriceWrapper: {
    width: 110,
    position: "relative",
    justifyContent: "center",
  },
  optionPricePrefix: {
    position: "absolute",
    left: 6,
    fontSize: 12,
    color: "#404946",
    zIndex: 1,
  },
  optionPriceInput: {
    fontSize: 14,
    color: "#1c1b18",
    textAlign: "right",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(28, 27, 24, 0.1)",
    paddingVertical: 4,
    paddingLeft: 34,
    paddingRight: 6,
  },
  optionRemoveButton: {
    padding: 4,
  },

  addOptionButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  addOptionText: {
    color: "#16524a",
    fontWeight: "700",
    fontSize: 13,
  },

  addGroupButton: {
    width: "100%",
    paddingVertical: 16,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(22, 82, 74, 0.3)",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  addGroupText: {
    color: "#16524a",
    fontWeight: "700",
    fontSize: 15,
  },

  // Preview card
  previewSection: {
    backgroundColor: "rgba(230, 226, 221, 0.3)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "rgba(28, 27, 24, 0.05)",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  previewImageWrapper: {
    width: 96,
    height: 96,
    borderRadius: 8,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  previewImagePlaceholder: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f2ede8",
  },
  previewTextWrapper: {
    flex: 1,
  },
  previewLabel: {
    fontSize: 12,
    color: "#707976",
    marginBottom: 4,
  },
  previewTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1c1b18",
  },
  previewMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 4,
  },
  previewBadge: {
    backgroundColor: "rgba(253, 157, 51, 0.2)",
    color: "#693a00",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 11,
    fontWeight: "700",
    overflow: "hidden",
  },
  previewPrice: {
    color: "#404946",
    fontWeight: "700",
  },

  // Bottom action bar
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#ece7e2",
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 28, // aman untuk home indicator
  },
  saveButton: {
    height: 56,
    backgroundColor: "#fd9d33",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  saveButtonText: {
    color: "#2d1600",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});

export default styles;
