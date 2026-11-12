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
export const UserJSON = [
  { role: "super_admin",
    name: "超級管理員",
    email: "superadmin@example.com",
    password: "password123"
  },
  { role: "admin",
    name: "管理員",
    email: "admin@example.com",
    password: "password123"
  },
  { role: "developer",
    name: "開發者",
    email: "developer@example.com",
    password: "password123"
  },
  { role: "viewer",
    name: "檢視者",
    email: "viewer@example.com",
    password: "password123"
  },
  { role: "default",
    name: "未登入",
    email: "",
    password: ""
  },
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
  updateUIByPermission();
  return true;
}
// 取得使用者資訊
function getCurrentUser() {
  if (currentRoleKey === "default") return null;
  return UserJSON.find((u) => u.role === currentRoleKey) || null;
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
// ==========================================
import i18next from "../locales/index.js";

function handlePermissionElement(el) {
  const PermissionKey = el.getAttribute("data-permission");
  // 拿到 HERO_READ
  if (!PermissionKey) return;
  const permissionValue = PERMISSIONS[PermissionKey] || PermissionKey;
  // 拿到 hero:read
  if (!permissionValue) return;

  const hasAccess = hasPermission(permissionValue);
  // 有權限 hasAccess : true

  // 判斷是否為「讀取權限 字樣」（決定顯示/隱藏 vs 啟用/停用）
  // prettier-ignore
  const isReadString = PermissionKey.includes("READ") || permissionValue.endsWith(":read");

  // prettier-ignore
  if (isReadString) {
    // js 可以使用 el.remove() 移除DOM 但只後續+回 很麻煩
    // 如果是會動態切換權限的場景，建議還是維持用 style.display = "none";，
    // 正確方式是用 前端框架（如 Vue 的 v-if）來處理。
    // 讀取權限：控制元素的顯示與隱藏
    el.style.display = hasAccess ? "" : "none";
  }
  else {
    // 操作權限：控制元素的啟用與停用（加上 Tailwind 禁用樣式）
    if (hasAccess) {
      el.removeAttribute("disabled");
      el.removeAttribute("aria-disabled");
      el.classList.remove("is-disabled", "opacity-50", "cursor-not-allowed", "pointer-events-none");
    }
    else {
      if (["BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(el.tagName)) {
        el.setAttribute("disabled", "true");
      }
      else {
        el.setAttribute("aria-disabled", "true");
      }
      el.classList.add("is-disabled", "opacity-50", "cursor-not-allowed", "pointer-events-none");
    }
  }
}
function handleLoggedInState() {
  const authBtn = document.getElementById("authBtn");
  const loggedUserSection = document.getElementById("loggedUserSection");

  if (!authBtn || !loggedUserSection) return;

  authBtn.classList.add("hidden");
  loggedUserSection.classList.remove("hidden");

  // 拿到 index.roles.admin, index.roles.developer
  const roleI18nKey = `index.roles.${currentRoleKey}`;
  // 拿到 "Admin", "Developer"
  const defaultName = ROLES[currentRoleKey]?.name || currentRoleKey;

  // 翻譯後的角色文字
  const translatedRole =
    typeof i18next !== "undefined" && typeof i18next.t === "function"
      ? i18next.t(roleI18nKey, { defaultValue: defaultName })
      : defaultName;

  // 1. 設定外層身分名稱與 i18n 屬性
  const roleName = document.getElementById("currentRoleText");
  if (roleName) {
    roleName.setAttribute("data-i18n", roleI18nKey);
    roleName.textContent = translatedRole;
  }

  // 2. 設定下拉選單內的角色名稱與 i18n 屬性
  const dropdownRoleName = document.getElementById("dropdownRoleName");
  if (dropdownRoleName) {
    dropdownRoleName.setAttribute("data-i18n", roleI18nKey);
    dropdownRoleName.textContent = translatedRole;
  }

  // 3. 設定使用者 Email 資訊
  const dropdownUserEmail = document.getElementById("dropdownUserEmail");
  if (dropdownUserEmail) {
    const currentUser = typeof getCurrentUser === "function" ? getCurrentUser() : null;
    dropdownUserEmail.textContent = currentUser?.email || "example@example.com";
  }

  // 4. 根據不同權限角色切換對應的圖示與顏色
  const roleIcon = document.getElementById("roleIcon");
  if (roleIcon) {
    roleIcon.className =
      currentRoleKey === "admin" || currentRoleKey === "super_admin"
        ? "fa-solid fa-user-shield text-amber-500"
        : "fa-solid fa-user-check text-green-500";
  }
}
function handleLoggedOutState() {
  const authBtn = document.getElementById("authBtn");
  const loggedUserSection = document.getElementById("loggedUserSection");
  const userDropdownMenu = document.getElementById("userDropdownMenu")

  authBtn?.classList.remove("hidden");
  loggedUserSection?.classList.add("hidden");
  userDropdownMenu?.classList.add("hidden");
}
// 主進入點：使用者的權限與登入狀態更新整個介面
export function updateUIByPermission() {
  // 1. 控制的 DOM 元素進行 隱藏/顯示/禁止
  const permissionElements = document.querySelectorAll("[data-permission]");
  permissionElements.forEach((el) => {
    // <div data-permission="HERO_READ"...>
    handlePermissionElement(el);
  });

  // 2. 根據角色身分切換登入按鈕與會員區塊的顯示
  // prettier-ignore
  if (currentRoleKey !== "default") {
    // 處理登入後的 loggedUserSection 介面
    handleLoggedInState();
  }
  else {
    // 處理未登入時的 authBtn 介面
    handleLoggedOutState();
  }
}
