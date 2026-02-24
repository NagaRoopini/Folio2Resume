
const Auth = {
    // Save only the minimal ID to the browser storage
    saveSession(userId) {
        sessionStorage.setItem("userId", userId);
    },

    getUserId() {
        return sessionStorage.getItem("userId");
    },

    isLoggedIn() {
        return !!this.getUserId();
    },

    async getUserDetails() {
        const id = this.getUserId();
        if (!id) return null;
        try {
            const res = await fetch(`https://folio2resume-backend.onrender.com/api/auth/user/${id}`);
            return await res.json();
        } catch (e) {
            return null;
        }
    },

    logout() {
        sessionStorage.clear();
        window.location.href = "index.html";
    }
};
