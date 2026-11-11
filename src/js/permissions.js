// 權限定義
// prettier-ignore
export const PERMISSIONS = {
  // Hero 區權限
  HERO_READ: "hero:read",
  HERO_CREATE: "hero:create",
  HERO_UPDATE: "hero:update",
  HERO_DELETE: "hero:delete",

  // 表格區塊權限 (關鍵時程)
  SCHEDULE_READ: "schedule:read",
  SCHEDULE_CREATE: "schedule:create",
  SCHEDULE_UPDATE: "schedule:update",
  SCHEDULE_DELETE: "schedule:delete",

  // 卡片區塊權限 (系統特點)
  FEATURES_READ: "features:read",
  FEATURES_CREATE: "features:create",
  FEATURES_UPDATE: "features:update",
  FEATURES_DELETE: "features:delete",

  // Main 區權限 (Q&A 查詢與管理)
  FAQ_READ: "faq:read",
  FAQ_CREATE: "faq:create",
  FAQ_UPDATE: "faq:update",
  FAQ_DELETE: "faq:delete",

  // Users 權限
  USERS_READ: "users:read",
  USERS_CREATE: "users:create",
  USERS_UPDATE: "users:update",
  USERS_DELETE: "users:delete",

  // 全部權限
  ALL: "*",
}
// 角色定義
// prettier-ignore
export const ROLES = {
  super_admin: {
    name: "Super Admin",
    description: "最高權限，可管理所有內容和帳號",
    permissions: [PERMISSIONS.ALL],
  },
  admin: {
    name: "Admin",
    description: "一般管理員，可管理內容但無法刪除帳號",
    //
    permissions: [
      PERMISSIONS.HERO_READ,
      PERMISSIONS.HERO_CREATE,
      PERMISSIONS.HERO_UPDATE,
      PERMISSIONS.HERO_DELETE,
      //------
      PERMISSIONS.SCHEDULE_READ,
      // PERMISSIONS.SCHEDULE_CREATE,
      PERMISSIONS.SCHEDULE_UPDATE,
      PERMISSIONS.SCHEDULE_DELETE,
      //------
      PERMISSIONS.FEATURES_READ,
      PERMISSIONS.FEATURES_CREATE,
      PERMISSIONS.FEATURES_UPDATE,
      PERMISSIONS.FEATURES_DELETE,
      //------
      PERMISSIONS.FAQ_READ,
      PERMISSIONS.FAQ_CREATE,
      PERMISSIONS.FAQ_UPDATE,
      PERMISSIONS.FAQ_DELETE,
      //------
      PERMISSIONS.USERS_READ,
      PERMISSIONS.USERS_CREATE,
      PERMISSIONS.USERS_UPDATE,
      // PERMISSIONS.USERS_DELETE,
    ],
  },
  developer: {
    name: "Developer",
    description: "開發者，只能檢視 3 個區塊的內容",
    permissions: [
      PERMISSIONS.HERO_READ,
      PERMISSIONS.HERO_CREATE,
      PERMISSIONS.SCHEDULE_READ,
      PERMISSIONS.SCHEDULE_CREATE,
      PERMISSIONS.SCHEDULE_UPDATE,
      PERMISSIONS.SCHEDULE_DELETE,
      PERMISSIONS.FAQ_READ,
      PERMISSIONS.FAQ_CREATE,
    ],
  },
  viewer: {
    name: "Viewer",
    description: "檢視者，只能檢視 2 個區塊的內容",
    permissions: [
      PERMISSIONS.HERO_READ,
      PERMISSIONS.HERO_CREATE,
      PERMISSIONS.FAQ_READ,
      PERMISSIONS.FAQ_CREATE,
    ],
  },
  default: {
    name: "Default",
    description: "未登入使用者，只能檢視 1 個區塊的內容",
    permissions: [
      PERMISSIONS.HERO_READ,
      PERMISSIONS.HERO_CREATE],
  },
}
// 使用者帳號資訊 (模擬資料)
// prettier-ignore
export const userCredentialsJSON = [
  { role: "super_admin", name: "超級管理員", email: "super@cra.com", password: "123" },
  { role: "admin", name: "管理員", email: "admin@cra.com", password: "123" },
  { role: "developer", name: "開發者", email: "dev@cra.com", password: "123" },
  { role: "viewer", name: "檢視者", email: "viewer@cra.com", password: "123" },
  { role: "default", name: "未登入", email: "", password: "" },
]
// ===================
// ... 權限控制 ...
// ===================
const STORAGE_KEY = "CRA-role";
let currentRoleKey = localStorage.getItem(STORAGE_KEY) || "default";
// 取得身分
function getCurrentRoleKey() {
  // "admin"、"editor" 或 "default"
  return currentRoleKey;
}
// 更新身分
function setCurrentRoleKey(roleKey) {
  if (!ROLES[roleKey]) return false;

  currentRoleKey = roleKey;

  // prettier-ignore
  if (roleKey === "default") {
    localStorage.removeItem(STORAGE_KEY);
  }
  else {
    localStorage.setItem(STORAGE_KEY, roleKey);
  }

  return true;
}
// 取得使用者資訊
function getCurrentUser() {
  if (currentRoleKey === "default") return null;
  return userCredentialsJSON.find((u) => u.role === currentRoleKey) || null;
}
// 檢查權限
function hasPermission(permission, targetRoleKey = currentRoleKey) {
  // 第二參數可選平常用不到,測試的時候才會需要 測試角色
  // 假如外層傳 hasPermission("features:read", "admin")
  const roleConfig = ROLES[targetRoleKey] || ROLES.default;
  // 如果是最高權限角色，直接回傳 true
  if (roleConfig.permissions.includes(PERMISSIONS.ALL)) return true;

  // 檢查權限"features:read" 如果有就回傳 true，沒有就回傳 false
  return roleConfig.permissions.includes(permission);
}
// 檢查身分
function hasRole(roleName, targetRoleKey = currentRoleKey) {
  // 第二參數可選平常用不到,測試的時候才會需要 測試角色
  // hasRole("admin")
  return targetRoleKey === roleName;
}
// Composable
export function useAdminAuth() {
  return {
    getCurrentRoleKey,
    setCurrentRoleKey,
    getCurrentUser,
    // 這邊再多封裝一層，是隱藏內部的 targetRoleKey 參數，
    // 讓外部使用者不需要知道這個參數
    hasPermission: (permission) => hasPermission(permission),
    hasRole: (roleName) => hasRole(roleName),
  };
}
import i18next from "../locales/index.js";
export function updateUIByPermission() {
  const permissionElements = document.querySelectorAll("[data-permission]");

  permissionElements.forEach((el) => {
    const requiredPermissionKey = el.getAttribute("data-permission");
    const permissionValue = PERMISSIONS[requiredPermissionKey] || requiredPermissionKey;

    if (!permissionValue) return;

    const allowed = hasPermission(permissionValue);
    const isReadPermission =
      requiredPermissionKey.includes("READ") || permissionValue.endsWith(":read");

    if (isReadPermission) {
      el.style.display = allowed ? "" : "none";
    } else {
      if (allowed) {
        el.removeAttribute("disabled");
        el.removeAttribute("aria-disabled");
        el.classList.remove(
          "is-disabled",
          "opacity-50",
          "cursor-not-allowed",
          "pointer-events-none",
        );
      } else {
        if (["BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(el.tagName)) {
          el.setAttribute("disabled", "true");
        } else {
          el.setAttribute("aria-disabled", "true");
        }
        el.classList.add("is-disabled", "opacity-50", "cursor-not-allowed", "pointer-events-none");
      }
    }
  });

  // ==========================================
  // ✅ 獨立切換「登入按鈕」與「已登入身分區塊」
  // ==========================================
  const authBtn = document.getElementById("authBtn");
  const loggedUserSection = document.getElementById("loggedUserSection");
  const roleTextSpan = document.getElementById("currentRoleText");
  const roleIcon = document.getElementById("roleIcon");

  const dropdownRoleName = document.getElementById("dropdownRoleName");
  const dropdownUserEmail = document.getElementById("dropdownUserEmail");

  const isLogged = currentRoleKey !== "default";

  if (authBtn && loggedUserSection) {
    if (isLogged) {
      authBtn.classList.add("hidden");
      loggedUserSection.classList.remove("hidden");

      // 組合出 3 層的翻譯 Key（例如 index.roles.admin, index.roles.developer）
      const roleI18nKey = `index.roles.${currentRoleKey}`;
      const defaultName = ROLES[currentRoleKey]?.name || currentRoleKey;
      const translatedRole = i18next.t(roleI18nKey, { defaultValue: defaultName });

      // 1. 設定外層身分名稱與 data-i18n
      if (roleTextSpan) {
        roleTextSpan.setAttribute("data-i18n", roleI18nKey); // 👈 確保是 index.roles.xxx
        roleTextSpan.textContent = translatedRole;
      }

      // 2. 設定下拉選單內的的角色名稱與 data-i18n
      if (dropdownRoleName) {
        dropdownRoleName.setAttribute("data-i18n", roleI18nKey); // 👈 確保是 index.roles.xxx
        dropdownRoleName.textContent = translatedRole;
      }

      if (dropdownUserEmail) {
        const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
        dropdownUserEmail.textContent = currentUser?.email || "super@cra.com";
      }

      if (roleIcon) {
        roleIcon.className =
          currentRoleKey === "admin" || currentRoleKey === "super_admin"
            ? "fa-solid fa-user-shield text-amber-500"
            : "fa-solid fa-user-check text-green-500";
      }
    } else {
      authBtn.classList.remove("hidden");
      loggedUserSection.classList.add("hidden");
      document.getElementById("userDropdownMenu")?.classList.add("hidden");
    }
  }
  // ==========================================
}
