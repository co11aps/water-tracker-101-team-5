export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export const selectUser = (state) => state.auth.user;

export const selectDailyNorma = (state) => state.auth.user.dailyNorma;

export const selectIsRefreshing = (state) => state.auth.isRefreshing;

export const selectIsAuthHeaderSet = (state) => state.auth.isAuthHeaderSet;
