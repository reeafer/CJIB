/**
 * Auth Helper for CJIB Prototype
 * Handles session storage for user roles and some UI updates.
 */

const Auth = {
    getUser: function () {
        return sessionStorage.getItem('loggedInUser');
    },

    getRole: function () {
        return sessionStorage.getItem('userRole'); // 'Administrator' or 'Gebruiker'
    },

    isAdmin: function () {
        return this.getRole() === 'Administrator';
    },

    checkAuth: function () {
        // Optional: Redirect to login if not logged in. 
        // For this prototype we might want to allow viewing as guest, 
        // but the prompt implies we are checking roles.
        // For now, if no user, we treat as guest (or redirect if needed).
        if (!this.getUser()) {
            // console.log("Not logged in");
        }
    },

    logout: function () {
        sessionStorage.removeItem('loggedInUser');
        sessionStorage.removeItem('userRole');
        window.location.href = 'login.html';
    },

    // Update common UI elements like the "Rol: ..." text in navbar
    updateUI: function () {
        const role = this.getRole();
        const user = this.getUser();

        // Update user role display in navbar
        // Expected element: <div class="nav-item">Rol: gebruiker</div>
        // We will look for an element that contains "Rol:" or create a specific ID in HTML to be safe.
        // For now, let's try to find the specific nav item or rely on IDs we will add.

        const roleDisplay = document.getElementById('userRoleDisplay');
        if (roleDisplay) {
            if (role) {
                const isAdmin = (role.toLowerCase() === 'administrator' || role.toLowerCase() === 'admin');
                roleDisplay.setAttribute('data-i18n', isAdmin ? 'role_admin' : 'role_user');
            } else {
                roleDisplay.setAttribute('data-i18n', 'role_guest');
            }
            // Trigger translation if global applyLang exists
            if (typeof applyLang === 'function') {
                applyLang(localStorage.getItem('lang') || 'nl');
            } else {
                // Fallback for pages without the new system yet
                if (role) {
                    const displayRole = (role.toLowerCase() === 'administrator' || role.toLowerCase() === 'admin') ? 'admin' : 'gebruiker';
                    roleDisplay.textContent = 'Rol: ' + displayRole;
                } else {
                    roleDisplay.textContent = 'Rol: Gast';
                }
            }
        }

        // Update Login/Logout button
        const loginLink = document.getElementById('loginLink');
        if (loginLink) {
            const loginSpan = loginLink.querySelector('[data-i18n="login"]');
            if (user) {
                if (loginSpan) {
                    loginSpan.setAttribute('data-i18n', 'logout');
                    // Trigger translation if the global applyLang exists
                    if (typeof applyLang === 'function') {
                        applyLang(localStorage.getItem('lang') || 'nl');
                    } else {
                        loginSpan.textContent = 'Uitloggen';
                    }
                } else {
                    loginLink.innerHTML = `Uitloggen <div class="user-icon">👤</div>`;
                }
                loginLink.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.logout();
                };
            } else {
                if (loginSpan) {
                    loginSpan.setAttribute('data-i18n', 'login');
                    if (typeof applyLang === 'function') {
                        applyLang(localStorage.getItem('lang') || 'nl');
                    } else {
                        loginSpan.textContent = 'Inloggen';
                    }
                } else {
                    loginLink.innerHTML = `Inloggen <div class="user-icon">👤</div>`;
                }
                loginLink.onclick = () => {
                    window.location.href = 'login.html';
                };
            }
        }
    }
};

// Auto-run on load
document.addEventListener('DOMContentLoaded', () => {
    Auth.updateUI();
});
