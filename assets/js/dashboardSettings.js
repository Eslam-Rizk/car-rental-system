import { authDashboard, dashboardSettingsAuth } from "./utils/dashboardUtils.js";
import { getAdminSettings } from "./utils/dashboardUtils.js";
import { logout } from "./utils/navUtils.js";

// must be logged in AND admin!!
authDashboard();

// check if id matches - can only access logged in admin's settings page 
dashboardSettingsAuth()

// sidebar
logout();
getAdminSettings();
