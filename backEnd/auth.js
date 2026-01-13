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
                roleDisplay.textContent = 'Rol: ' + role;
            } else {
                roleDisplay.textContent = 'Rol: Gast';
            }
        }

        // Update Login/Logout button
        const loginLink = document.getElementById('loginLink');
        if (loginLink) {
            if (user) {
                loginLink.innerHTML = `
                    Uitloggen
                    <div class="user-icon">👤</div>
                `;
                // Change onclick to logout
                loginLink.onclick = (e) => {
                    e.preventDefault(); // prevent navigation
                    e.stopPropagation();
                    this.logout();
                };
            } else {
                loginLink.innerHTML = `
                    Inloggen
                    <div class="user-icon">👤</div>
                `;
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
