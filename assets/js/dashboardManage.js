import { authDashboard } from "./utils/dashboardUtils.js";
import { logout } from "./utils/navUtils.js";

// must be logged in AND admin!!
authDashboard();

// sidebar
logout();