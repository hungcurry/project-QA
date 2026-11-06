// permissions.js
// 權限與角色定義 (permissions.js)
// ---------
// 1. 權限定義
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
// 2. 角色定義
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
// prettier-ignore
export const userCredentialsJSON = [
  { role: "super_admin", name: "超級管理員", email: "super@cra.com", password: "123" },
  { role: "admin", name: "管理員", email: "admin@cra.com", password: "123" },
  { role: "developer", name: "開發者", email: "dev@cra.com", password: "123" },
  { role: "viewer", name: "檢視者", email: "viewer@cra.com", password: "123" },
  { role: "default", name: "未登入", email: "", password: "" },
];

// 3. 狀態持久化：從 localStorage 初始化 currentRoleKey
const STORAGE_KEY = "CRA-role";
let currentRoleKey = localStorage.getItem(STORAGE_KEY) || "default";

function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toastMessage");
  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.classList.remove("translate-y-20", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-20", "opacity-0");
  }, 3000);
}

export function getCurrentUser() {
  if (currentRoleKey === "default") return null;
  return userCredentialsJSON.find((u) => u.role === currentRoleKey) || null;
}

export function getCurrentRoleKey() {
  return currentRoleKey;
}

// 支援傳入 targetUser 或用全域狀態判斷 (方便前後端共用邏輯思維)
export function hasPermission(permission, targetRoleKey = currentRoleKey) {
  const roleConfig = ROLES[targetRoleKey] || ROLES.default;
  if (roleConfig.permissions.includes(PERMISSIONS.ALL)) return true;
  return roleConfig.permissions.includes(permission);
}

export function hasRole(roleName, targetRoleKey = currentRoleKey) {
  return targetRoleKey === roleName;
}

export function loginAs(roleKey) {
  if (ROLES[roleKey]) {
    currentRoleKey = roleKey;
    localStorage.setItem(STORAGE_KEY, roleKey); // 儲存到 localStorage
    updateUIByPermission();

    const roleName = ROLES[roleKey].name;
    if (roleKey === "default") {
      showToast("已成功登出，目前為未登入狀態");
    } else {
      showToast(`已成功以【${roleName}】身分登入！`);
    }
  }
}

export function logout() {
  currentRoleKey = "default";
  localStorage.removeItem(STORAGE_KEY); // 清除持久化
  updateUIByPermission();
  showToast("已成功登出當前帳號");
}

// 4. Composable 風格的 hook 封裝 (符合優化 2 需求)
export function useAdminAuth() {
  return {
    getCurrentUser,
    getCurrentRoleKey,
    hasPermission: (perm) => hasPermission(perm, currentRoleKey),
    hasRole: (role) => hasRole(role, currentRoleKey),
  };
}

// UI 自動掃描更新
export function updateUIByPermission() {
  const permissionElements = document.querySelectorAll("[data-permission]");

  permissionElements.forEach((el) => {
    const requiredPermissionKey = el.getAttribute("data-permission");
    const permissionValue = PERMISSIONS[requiredPermissionKey] || requiredPermissionKey;

    if (!permissionValue) return;

    const allowed = hasPermission(permissionValue);

    // 💡 關鍵判斷：如果是 READ 權限，視為外層容器，控制「顯示 / 隱藏」
    // 如果是 CREATE / UPDATE / DELETE 等動作權限，視為互動元素，控制「啟用 / 禁用」
    const isReadPermission = requiredPermissionKey.includes("READ") || permissionValue.endsWith(":read");

    if (isReadPermission) {
      // 區塊級容器：控制顯示與隱藏
      el.style.display = allowed ? "" : "none";
    } else {
      // 動作級元素（不限標籤 button, a, div, tr...）：控制禁用樣式與防護
      if (allowed) {
        el.removeAttribute("disabled");
        el.removeAttribute("aria-disabled");
        el.classList.remove("is-disabled", "opacity-50", "cursor-not-allowed", "pointer-events-none");
      } else {
        // 如果是原生表單元素加上 disabled，非表單元素則透過 pointer-events-none 與樣式阻擋
        if (["BUTTON", "INPUT", "SELECT", "TEXTAREA"].includes(el.tagName)) {
          el.setAttribute("disabled", "true");
        } else {
          el.setAttribute("aria-disabled", "true");
        }
        el.classList.add("is-disabled", "opacity-50", "cursor-not-allowed", "pointer-events-none");
      }
    }
  });

  // 更新導覽列登入文字與圖示
  const roleTextSpan = document.getElementById("currentRoleText");
  const authIcon = document.getElementById("authIcon");
  const isLogged = currentRoleKey !== "default";

  if (roleTextSpan) {
    roleTextSpan.textContent = isLogged ? ROLES[currentRoleKey].name : "登入";
  }
  if (authIcon) {
    authIcon.className = isLogged
      ? "fa-solid fa-user-check text-green-500"
      : "fa-solid fa-right-to-bracket text-slate-500";
  }

  // 測試：判斷是否為 super_admin
  // const isSuperAdmin = hasRole('super_admin');
  // console.log(`[Auth Status] 當前身分 : ${currentRoleKey}, 是否為 super_admin: ${isSuperAdmin}`);
}
