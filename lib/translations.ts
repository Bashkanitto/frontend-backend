export const translations = {
  en: {
    // Navigation
    home: 'Home',
    statistic: 'Statistics',
    transactions: 'Transactions',
    wallet: 'Wallet',
    categories: 'Categories',
    
    // Common
    add: 'Add',
    edit: 'Edit',
    delete: 'Delete',
    cancel: 'Cancel',
    save: 'Save',
    close: 'Close',
    search: 'Search',
    
    // Header titles
    budgetOverview: 'Budget Overview',
    
    // Transactions
    addTransaction: 'Add Transaction',
    expenses: 'Expenses',
    incomes: 'Incomes',
    amount: 'Amount',
    comment: 'Add a comment...',
    selectWallet: 'Select Wallet',
    selectCategory: 'Select Category',
    
    // Wallet
    addWallet: 'Add Wallet',
    walletName: 'Wallet Name',
    balance: 'Balance',
    
    // Category
    addCategory: 'Add Category',
    categoryName: 'Category Name',
    
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    username: 'Username',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',
    notMember: 'Not a member?',
    signUpNow: 'Sign up now',
    alreadyHaveAccount: 'Already have an account?',
    
    // Settings
    settings: 'Settings',
    language: 'Language',
    currency: 'Currency',
    theme: 'Theme',
    profile: 'Profile',
    logout: 'Log Out',
    
    // Theme options
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    
    // Statistics
    timePeriod: 'Time Period',
    lastWeek: 'Last Week',
    lastMonth: 'Last Month',
    lastYear: 'Last Year',
    allTime: 'All Time',
    monthlyBalance: 'Monthly Balance',
    incomeByCategory: 'Income by Category',
    expenseByCategory: 'Expense by Category',
    topTransactions: 'Top Transactions This Month',
    
    // Messages
    fillAllFields: 'Please fill in all fields',
    usernameTooShort: 'Username must be at least 3 characters',
    invalidEmail: 'Please enter a valid email',
    passwordTooShort: 'Password must be at least 6 characters',
    loginFailed: 'Login failed',
    registrationFailed: 'Registration failed',
    emailExists: 'Email already registered',
    usernameExists: 'Username already taken',
    userNotFound: 'User not found',
    incorrectPassword: 'Incorrect password',
  },
  ru: {
    // Navigation
    home: 'Главная',
    statistic: 'Статистика',
    transactions: 'Транзакции',
    wallet: 'Кошельки',
    categories: 'Категории',
    
    // Common
    add: 'Добавить',
    edit: 'Редактировать',
    delete: 'Удалить',
    cancel: 'Отмена',
    save: 'Сохранить',
    close: 'Закрыть',
    search: 'Поиск',
    
    // Header titles
    budgetOverview: 'Обзор бюджета',
    
    // Transactions
    addTransaction: 'Добавить транзакцию',
    expenses: 'Расходы',
    incomes: 'Доходы',
    amount: 'Сумма',
    comment: 'Добавить комментарий...',
    selectWallet: 'Выберите кошелек',
    selectCategory: 'Выберите категорию',
    
    // Wallet
    addWallet: 'Добавить кошелек',
    walletName: 'Название кошелька',
    balance: 'Баланс',
    
    // Category
    addCategory: 'Добавить категорию',
    categoryName: 'Название категории',
    
    // Auth
    signIn: 'Войти',
    signUp: 'Регистрация',
    username: 'Имя пользователя',
    email: 'Email',
    password: 'Пароль',
    forgotPassword: 'Забыли пароль?',
    notMember: 'Нет аккаунта?',
    signUpNow: 'Зарегистрироваться',
    alreadyHaveAccount: 'Уже есть аккаунт?',
    
    // Settings
    settings: 'Настройки',
    language: 'Язык',
    currency: 'Валюта',
    theme: 'Тема',
    profile: 'Профиль',
    logout: 'Выйти',
    
    // Theme options
    light: 'Светлая',
    dark: 'Темная',
    system: 'Системная',
    
    // Statistics
    timePeriod: 'Период времени',
    lastWeek: 'Последняя неделя',
    lastMonth: 'Последний месяц',
    lastYear: 'Последний год',
    allTime: 'Все время',
    monthlyBalance: 'Месячный баланс',
    incomeByCategory: 'Доходы по категориям',
    expenseByCategory: 'Расходы по категориям',
    topTransactions: 'Топ транзакций за месяц',
    
    // Messages
    fillAllFields: 'Пожалуйста, заполните все поля',
    usernameTooShort: 'Имя пользователя должно быть не менее 3 символов',
    invalidEmail: 'Пожалуйста, введите корректный email',
    passwordTooShort: 'Пароль должен быть не менее 6 символов',
    loginFailed: 'Не удалось войти',
    registrationFailed: 'Не удалось зарегистрироваться',
    emailExists: 'Email уже зарегистрирован',
    usernameExists: 'Имя пользователя уже занято',
    userNotFound: 'Пользователь не найден',
    incorrectPassword: 'Неверный пароль',
  },
};

export type TranslationKey = keyof typeof translations.en;