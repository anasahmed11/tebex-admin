import Cookies from 'universal-cookie';


const cookies = new Cookies();
const LANGUGAE = 'langlang'
if (cookies.get(LANGUGAE) === undefined) cookies.set(LANGUGAE, 'ar');

if (cookies.get(LANGUGAE) !== 'ar' && cookies.get(LANGUGAE) !== 'en') cookies.set(LANGUGAE, 'ar');

const globalVariables = {
    LANG: cookies.get(LANGUGAE),
    // VARIABLES
    ACCESS_TOKEN: 'access_token',
    LANGUGAE: LANGUGAE,
    AFFILIATE_PARAM: 'ref',
    AFFILIATE_COOKIE: 'ref',
    AVATAR_COLOR_COOKIE: 'avatar_color',
    // MESSAGES
    MSG_LOGIN_FAIL: {
        en: 'Login failed.',
        ar: 'فشل في تسجيل الدخول',
    },
    MSG_LOGIN_SUCCESS: {
        en: 'Logged in successfully.',
        ar: 'تم تسجيل الدخول',
    },

    MSG_LOGOUT_FAIL: {
        en: 'Error.',
        ar: 'فشل!',
    },
    MSG_LOGOUT_SUCCESS: {
        en: 'Logged out successfully.',
        ar: '.تم تسجيل الخروج',
    },

    MSG_REGISTER_SUCCESS: {
        en: 'Registered successfully.\nCheck your mail for account activation.',
        ar: '.تم انشاء حساب بنجاح, تفقد بريدك الالكتروني لتفعيله',
    },
    MSG_REGISTER_FAIL: {
        en: 'Registeration failed.',
        ar: 'فشل تسجيل الحساب.',
    },
    MSG_NETWORK_ERROR: {
        en: 'No response from server.\ntry again later',
        ar: 'لا يوجد استجابة من السيرفر\nحاول مجددا في وقت لاحق'
    },
    MSG_VERIFIY_ACCOUNT: {
        en: 'Please verifiy your account, check your mail!',
        ar: 'رجاء قم بتفعيل حسابك, قم بتفقد بريدك الالكتروني!'
    },
    // TABLE
    TABLE_NO_RECORDS: {
        en: 'No Records to Display',
        ar: 'لا يوجد عناصر لعرضها'
    },
    //Appbar
    APPBAR_SHOP: {
        en: 'Shop',
        ar: 'تسوق'
    },
    APPBAR_SEARCH: {
        en: 'Search ..',
        ar: 'ابحث ..'
    },
    SETTINGS_SECTION_LOGIN: {
        en: 'Sign in | Sign up',
        ar: 'تجسيل الدخول | اشتراك'
    },
    SETTINGS_SECTION_PROFILE: {
        en: 'My Profile',
        ar: 'الملف الشخصي'
    },
    SETTINGS_SECTION_ORDERS: {
        en: 'My Orders',
        ar: 'مشترياتي'
    },
    SETTINGS_SECTION_DASHBOARD: {
        en: 'Dashboard',
        ar: 'لوحة التحكم'
    },
    SETTINGS_SECTION_LINK_GENERATOR: {
        en: 'Link Generator',
        ar: 'مولد اللنكات'
    },
    SETTINGS_SECTION_TEAM_TREE: {
        en: 'Team Tree',
        ar: 'شجرة الفريق'
    },
    SETTINGS_SECTION_SIGN_OUT: {
        en: 'Sign Out',
        ar: 'تسجيل الخروج'
    },
    SETTINGS_SECTION_AFFILIATE: {
        en: 'Affiliate Program',
        ar: 'برنامج التسويق',
    },
    SETTINGS_SECTION_SELLER: {
        en: 'Seller Program',
        ar: 'برنامج التجار',
    },
    SETTINGS_SECTION_MY_PRODUCTS: {
        en: 'My Products',
        ar: 'منتجاتي',
    },
    SETTINGS_SECTION_SELLING_ORDERS: {
        en: 'Selling Orders',
        ar: 'اوردرات البيع',
    },
    SETTINGS_SECTION_SELLING_DASHBOARD: {
        en: 'Dashboard',
        ar: 'لوحة التحكم',
    },
    SETTINGS_SECTION_ADD_PRODUCTS: {
        en: 'Add Products',
        ar: 'اضافة منتجات',
    },

    //Afiliate
    AFFILIATE_PAGE1: {
        en: 'Your registration request has been submitted successfully and will be reviewed soon.',
        ar: 'قد تم استلام طلبك بنجاح وسيتم مراجعته قريبا.',
    },
    AFFILIATE_PAGE2: {
        en: 'Your are already in affiliate program.',
        ar: 'انت مسجل في البرنامج بالفعل.',
    },
    AFFILIATE_REFUSED: {
        en: 'Your request have been refused, contact with support or send new application',
        ar: 'لقد تم رفض طلبك, تواصل مع الدعم او قم بارسال طلب جديد',

    },
    FORM_AFFILIATE_LABEL_VODAFONE: {
        en: 'Vodafone Cash',
        ar: 'فودافون كاش',
    },
    FORM_AFFILIATE_LABEL_ETISALAT: {
        en: 'Etisalat Cash',
        ar: 'اتصالات كاش',
    },
    FORM_AFFILIATE_LABEL_Bank: {
        en: 'Bank',
        ar: 'حساب بنكي',
    },
    FORM_AFFILIATE_LABEL_PACKAGE: {
        en: 'Package',
        ar: 'الحزمة',
    },
    FORM_AFFILIATE_LABEL_PAYMENT_METHOD: {
        en: 'Payment Method',
        ar: 'طريقة الدفع',
    },
    Package1_AFFILIATE: {
        en: ['Discount 25%'],
        ar: ['خصم 25%']
    },
    Package2_AFFILIATE: {
        en: ['Discount 20%'],
        ar: ['خصم 20%']
    },
    Package3_AFFILIATE: {
        en: ['Discount 10%'],
        ar: ['خصم 10%']
    },


    //Seller
    SELLER_PAGE1: {
        en: 'Your registration request has been submitted successfully and will be reviewed soon.',
        ar: 'قد تم استلام طلبك بنجاح وسيتم مراجعته قريبا.',
    },
    SELLER_PAGE2: {
        en: 'Your are already in seller program.',
        ar: 'انت مسجل في البرنامج بالفعل.',
    },
    FORM_SELLER_LABEL_VODAFONE: {
        en: 'Vodafone Cash',
        ar: 'فودافون كاش',
    },
    FORM_SELLER_LABEL_ETISALAT: {
        en: 'Etisalat Cash',
        ar: 'اتصالات كاش',
    },
    FORM_SELLER_LABEL_ITEMS: {
        en: 'Item\'s Type',
        ar: 'انواع المنتجات',
    },
    FORM_SELLER_LABEL_NAME: {
        en: 'Store Name(Arabic)',
        ar: 'اسم المتجر(عربي)',
    },
    FORM_SELLER_LABEL_NAME_EN: {
        en: 'Store Name(English)',
        ar: 'اسم المتجر(انجليزي)',
    },
    FORM_SELLER_LABEL_STORE_URL: {
        en: 'Store URL',
        ar: 'URL المتجر',
    },
    FORM_SELLER_LABEL_STORE_ADDRESS: {
        en: 'Store Address',
        ar: 'عنوان المتجر',
    },
    FORM_SELLER_LABEL_STORE_SLUG: {
        en: 'SLUG',
        ar: 'سلاج',
    },
    FORM_SELLER_LABEL_STORE_EMAIL: {
        en: 'Store Email',
        ar: 'ايميل المتجر',
    },
    // FORM_SELLER_LABEL_PICKUP_ADDRESS:{
    //         en:'Pickup Address',
    //         ar:'موقع الشحن',
    //     },
    FORM_SELLER_LABEL_PICKUP_PHONE: {
        en: 'Store Phone',
        ar: 'رقم المتجر',
    },
    // User Dashboard
    DASHBOARD_CLICKS: {
        en: 'Clikcs',
        ar: 'الكليكات',
    },
    DASHBOARD_CLICKS_DESC: {
        en: 'Cliks on affiliate link',
        ar: 'الضغطات على رابط الافيليت',
    },
    DASHBOARD_TOTAL_ORDERS: {
        en: 'Total Orders',
        ar: 'اجمالي الطلبات',
    },
    DASHBOARD_TOTAL_ORDERS_DESC: {
        en: 'My orders and affiliate link orders',
        ar: 'طلباتي والطلبات عن طريق رابط الافيليت',
    },
    DASHBOARD_CONFIRMED_ORDERS: {
        en: 'Confirmed Orders',
        ar: 'الطلبات المكتملة',
    },
    DASHBOARD_CONFIRMED_ORDERS_DESC: {
        en: '',
        ar: '',
    },
    DASHBOARD_ORDERS_EARNING: {
        en: 'Orders Earning',
        ar: 'ارباح الطلبات',
    },
    DASHBOARD_ORDERS_EARNING_DESC: {
        en: '',
        ar: '',
    },
    DASHBOARD_TEAM_MEMBERS: {
        en: 'My Team',
        ar: 'فريقي',
    },
    DASHBOARD_TEAM_MEMBERS_DESC: {
        en: '',
        ar: '',
    },
    DASHBOARD_TEAM_EARNING: {
        en: 'Team Earning',
        ar: 'ارباح الفريق',
    },
    DASHBOARD_TEAM_EARNING_DESC: {
        en: '',
        ar: '',
    },
    DASHBOARD_REFERRAL_EARNING: {
        en: 'Refferal Earning',
        ar: 'ارباح المحول',
    },
    DASHBOARD_REFERRAL_EARNING_DESC: {
        en: '',
        ar: '',
    },
    DASHBOARD_CONFIRMED_EARNING: {
        en: 'Confirmed Earning',
        ar: 'الارباح',
    },
    DASHBOARD_CONFIRMED_EARNING_DESC: {
        en: '',
        ar: '',
    },

    //User Profile

    PROFILE_TITLE: {
        en: 'Profile',
        ar: 'الملف الشخصي'
    },
    PROFILE_MAIN_SETTINGS: {
        en: 'Main Settings',
        ar: 'الاعدادات الرئيسية'
    },
    PROFILE_SECURITY_SETTINGS: {
        en: 'Security Settings',
        ar: 'معلومات الامان'
    },


    //Upperbar
    UPPERBAR_LANGUAGE: {
        en: 'العربية',
        ar: 'English'
    },
    UPPERBAR_US: {
        en: 'Who is us?',
        ar: 'من نحن؟'
    },
    UPPERBAR_Q: {
        en: 'Questions',
        ar: 'اسئلة'
    },
    UPPERBAR_MAGAZINE: {
        en: 'Magazine',
        ar: 'المجلة'
    },
    UPPERBAR_CALL_US: {
        en: 'Call us',
        ar: 'اتصل بنا'
    },
    // POPUP TYPES
    TYPE_SUCCESS: 'success',
    TYPE_ERROR: 'error',
    TYPE_INFO: 'info',

    // Cart
    CART_TITLE: {
        en: 'Shopping Cart',
        ar: 'عربة التسوق'
    },
    CART_ADD: {
        en: 'Add To Cart',
        ar: 'اضف الى العربة'
    },
    CART_ORDER_SUMMARY: {
        en: 'Order Summary',
        ar: 'ملخص الطلبية'
    },
    CART_ORDER_ITEMS_PRICE: {
        en: 'Itmes Price',
        ar: 'المجموع الفرعي'
    },
    CART_ORDER_SHIPPING_PRICE: {
        en: 'Shipping',
        ar: 'الشحن'
    },
    CART_ORDER_SHIPPING_STATUS: {
        en: 'Please proceed and choose shipping location',
        ar: 'يرجى المتابعة واختيار منطقة الشحن'
    },
    CART_ORDER_TOTAL_PRICE: {
        en: 'Total',
        ar: 'المجموع'
    },
    CART_CHECKOUT: {
        en: 'Checkout',
        ar: 'متابعة عملية الشراء'
    },
    CART_EMPTY: {
        en: 'Shopping cart is empty',
        ar: 'لا يوجد منتجات في عربة التسوق',
    },
    CART_VISIT_STORE: {
        en: 'Please visit our shop and add some items from',
        ar: 'يمكنك زيارة متجرنا واضافة بعض المنتجات من'
    },

    // Product
    PRODUCT_SHIPPING_STATUS: {
        en: 'Shipping is not supported for this area',
        ar: 'هذه المنطقة غير مدعومة في الشحن'
    },

    // Checkout
    CHECKOUT_SHIPPING_ADDRESS: {
        en: 'Shipping address',
        ar: 'عنوان الشحن'
    },
    CHECKOUT_THANKS_STATUS: {
        en: 'Order has been placed successfully!',
        ar: 'لقد تمت عملية الشراء بنجاح!'
    },
    CHECKOUT_THANKS_REDIRECT: {
        en: 'Thank you!, you can check your order status from',
        ar: 'شكرا لثقتك بنا, يمكنك متابعة حالة طلبك من'
    },

    CHECKOUT_ADD_NEW_ADDRESS: {
        en: 'Add new address',
        ar: 'اضف عنوان جديد'
    },

    //Labels
    LABEL_SAVE_CHANGES: {
        en: 'Save Changes',
        ar: 'حفظ التغييرات'
    },
    LABEL_NO_PRODUCTS: {
        en: 'No products.',
        ar: 'لا يوجد منتجات.'
    },
    LABEL_SHOP_BANNER: {
        en: 'Shop Now!',
        ar: 'تسوق الان!',
    },
    LABEL_SHOP_SORT: {
        en: 'SORT BY',
        ar: 'الترتيب',
    },
    LABEL_SHOP_PERPAGE: {
        en: 'PER PAGE',
        ar: 'لكل صفحة',
    },
    LABEL_SHOP_TO: {
        en: 'TO',
        ar: 'الى',
    },
    LABEL_SHOP_APPLY: {
        en: 'APPLY',
        ar: 'تطبيق',
    },
    LABEL_SHOP_ADD_TO_CART: {
        en: 'ADD TO CART',
        ar: 'اضف للسلة',
    },
    LABEL_SHOP_VIEW_DETAILS: {
        en: 'VIEW DETAILS',
        ar: 'التفاصيل',
    },
    LABEL_PAYMENT: {
        en: 'Payment',
        ar: 'الدفع'
    },
    LABEL_THANKS: {
        en: 'Thanks',
        ar: 'شكرا'
    },
    LABEL_HERE: {
        en: 'Here',
        ar: 'هنا'
    },
    LABEL_SHIPPING_TO: {
        en: 'Shipping to:',
        ar: 'الشحن الى:'
    },
    LABEL_SHIPPING: {
        en: 'Shipping',
        ar: 'الشحن'
    },
    LABEL_SELLER: {
        en: 'Seller',
        ar: 'البائع'
    },
    LABEL_QUANTITY: {
        en: 'Quantity',
        ar: 'الكمية'
    },
    LABEL_CURRENCY: {
        en: 'EGP',
        ar: 'جنيه'
    },
    LABEL_PRICE: {
        en: 'Price',
        ar: 'السعر'
    },
    LABEL_FREE: {
        en: 'FREE',
        ar: 'مجاني'
    },
    LABEL_DESCRIPTION: {
        en: 'Description',
        ar: 'الوصف'
    },
    LABEL_PRODUCT: {
        en: 'Product',
        ar: 'منتج'
    },
    LABEL_PRODUCT_DISCOUNT: {
        en: 'OFF',
        ar: 'خصم'
    },
    LABEL_PRODUCT_PRICE: {
        en: 'Product price',
        ar: 'سعر المنتج'
    },
    LABEL_NEXT: {
        en: 'Next',
        ar: 'التالي'
    },
    LABEL_PREVIOUS: {
        en: 'Previous',
        ar: 'السابق'
    },
    LABEL_BUY: {
        en: 'Buy',
        ar: 'شراء'
    },
    LABEL_DETAILS: {
        en: 'Details',
        ar: 'التفاصيل'
    },
    LABEL_NAME: {
        en: 'Name',
        ar: 'الاسم'
    },
    LABEL_PHONE: {
        en: 'Phone',
        ar: 'موبايل'
    },
    LABEL_ADDRESS: {
        en: 'Adress',
        ar: 'العنوان'
    },
    LABEL_BUILD: {
        en: 'Build',
        ar: 'توليد'
    },
    LABEL_URL: {
        en: 'URL',
        ar: 'رابط'
    },
    LABEL_MY_ORDERS: {
        en: 'My Orders',
        ar: 'مشترياتي'
    },
    LABEL_DASHBOARD: {
        en: 'Dashbaord',
        ar: 'الاحصائيات'
    },

    LABEL_AFFILIATE: {
        en: 'Affiliate',
        ar: 'مسوق',
    },
    LABEL_LANGUAGE: {
        en: 'Langugage',
        ar: 'اللغة'
    },
    LABEL_AVATAR: {
        en: 'Avatar',
        ar: 'الافتار'
    },
    LABEL_REGISTERED_AT: {
        en: 'Registerd at',
        ar: 'سجل في'
    },
    LABEL_LEVEL: {
        en: 'Level',
        ar: 'المستوى'
    },
    LABEL_EARNINGS: {
        en: 'Earnings',
        ar: 'الارباح'
    },
    LABEL_OF: {
        en: 'Of',
        ar: 'من'
    },
    LABEL_FIRST_PAGE: {
        en: 'First Page',
        ar: 'الصفحة الاولى'
    },
    LABEL_LAST_PAGE: {
        en: 'Last Page',
        ar: 'الصفحة الاخير'
    },
    LABEL_OF: {
        en: 'of',
        ar: 'من'
    },
    LABEL_ROWS: {
        en: 'rows',
        ar: 'صفوف'
    },
    LABEL_RESEND: {
        en: 'Resend',
        ar: 'اعادة ارسال'
    },
    LABEL_OR: {
        en: 'or',
        ar: 'أو'
    },
    LABEL_CATEGORY: {
        en: 'Category',
        ar: 'القسم'
    },


    // Link Genrator Page
    LINK_GENERATOR_TITLE: {
        en: 'Affiliate Link Generator',
        ar: 'مولد لينك الافيليت'
    },
    LINK_GENERATOR_PUT: {
        en: 'Put Page URL Here',
        ar: 'ضع الرابط هنا'
    },
    LINK_GENERATOR_AFFILIATE_LINK: {
        en: 'Affiliate Link',
        ar: 'رابط الافيليت'
    },



    // My Orders 
    MY_ORDERS_EMPTY: {
        en: 'You haven\'t make any order',
        ar: 'لم تقم بشراء اي منتج',
    },
    MY_ORDERS_VISIT_STORE: {
        en: 'Please visit our shop and buy items from',
        ar: 'يمكنك زيارة متجرنا وشراء بعض المنتجات من'
    },


    // LOGIN FORM
    FORM_LOGIN_LABEL_TITLE: {
        en: 'Login',
        ar: 'تسجيل الدخول',
    },
    FORM_LOGIN_LABEL_EMAIL: {
        en: 'Email',
        ar: 'البريد الالكتروني',
    },
    FORM_LOGIN_LABEL_PASS: {
        en: 'Password',
        ar: 'كلمة المرور',
    },
    FORM_LOGIN_LABEL_LOGIN: {
        en: 'Login',
        ar: 'تسجيل الدخول',
    },
    FORM_LOGIN_LABEL_FORGOT: {
        en: 'Forgot your password?',
        ar: 'هل نسيت كلمة المرور؟',
    },
    FORM_LOGIN_LABEL_REMEMBER: {
        en: 'Remember me',
        ar: 'تذكرني',
    },
    FORM_LOGIN_ERR_EMAIL: {
        en: 'Invalid email.',
        ar: 'البريد غير صحيح',
    },
    FORM_LOGIN_ERR_PASS: {
        en: 'Invalid password.',
        ar: 'كلمة المرور غير صحيح',
    },
    // Register
    FORM_REGISTER_LABEL_TITLE: {
        en: 'Create new account',
        ar: 'انشاء حساب جديد'
    },
    FORM_REGISTER_LABEL_EMAIL: {
        en: 'Email',
        ar: 'البريد الالكتروني'
    },
    FORM_REGISTER_LABEL_PASSWORD: {
        en: 'Password',
        ar: 'الرقم السري'
    },
    FORM_REGISTER_LABEL_FIRST_NAME: {
        en: 'First name',
        ar: 'الاسم الاول'
    },
    FORM_REGISTER_LABEL_LAST_NAME: {
        en: 'Last name',
        ar: 'الاسم الاخير'
    },
    FORM_REGISTER_LABEL_PHONE: {
        en: 'Mobile',
        ar: 'رقم الهاتف'
    },
    FORM_REGISTER_LABEL_BIRTHDAY: {
        en: 'Birthday',
        ar: 'عيد الميلاد'
    },
    FORM_REGISTER_LABEL_SEX: {
        en: 'Sex',
        ar: 'الجنس'
    },
    FORM_REGISTER_LABEL_REGISTER: {
        en: 'Register',
        ar: 'تسجيل'
    },

    // Form Address
    FORM_ADDRESS_LABEL_EMAIL: {
        en: 'Email',
        ar: 'البريد الالكتروني'
    },

    FORM_ADDRESS_LABEL_FIRST_NAME: {
        en: 'First name',
        ar: 'الاسم الاول'
    },
    FORM_ADDRESS_LABEL_LAST_NAME: {
        en: 'Last name',
        ar: 'الاسم الاخير'
    },
    FORM_ADDRESS_LABEL_PHONE: {
        en: 'Mobile',
        ar: 'رقم الهاتف'
    },

    FORM_ADDRESS_LABEL_SEX: {
        en: 'Sex',
        ar: 'الجنس'
    },
    FORM_ADDRESS_LABEL_COUNTRY: {
        en: 'Country',
        ar: 'الدولة'
    },
    FORM_ADDRESS_LABEL_CITY: {
        en: 'City',
        ar: 'المدينة'
    },
    FORM_ADDRESS_LABEL_AREA: {
        en: 'Area',
        ar: 'المنطقة'
    },
    FORM_ADDRESS_LABEL_ADDRESS: {
        en: 'Address',
        ar: 'العنوان'
    },
    FORM_ADDRESS_LABEL_LAND_MARK: {
        en: 'Land mark',
        ar: 'علامة مميزة'
    },
    FORM_ADDRESS_LABEL_NOTE: {
        en: 'Note',
        ar: 'ملاحظة'
    },
    FORM_ADDRESS_LABEL_OK: {
        en: 'Done',
        ar: 'موافق'
    },
    FORM_ADDRESS_LABEL_BACK: {
        en: 'Back',
        ar: 'رجوع'
    },

    // Track Order
    TRACK_OREDER_RECIPIENT: {
        en: 'Recipient',
        ar: 'المتسلم'
    },
    TRACK_OREDER_TOTAL_PRICE: {
        en: 'Total price',
        ar: 'اجمالي السعر'
    },
    TRACK_OREDER_DATE: {
        en: 'Order placed on',
        ar: 'تاريخ الطلب'
    },
    TRACK_OREDER_STATUS: {
        en: 'Order Status',
        ar: 'حالة الطلب'
    },
    TRACK_OREDER_NUMBER: {
        en: 'Order Number',
        ar: 'رقم الطلب'
    },
    TRACK_OREDER_DETAIL: {
        en: 'Order details',
        ar: 'تفاصيل الطلب'
    },




    PAGE_TITLE_CART: {
        en: 'Cart | UYC',
        ar: 'عربة التسوق | UYC'
    },
    PAGE_TITLE_CHECKOUT: {
        en: 'Checkout | UYC',
        ar: 'الدفع | UYC'
    },
    PAGE_TITLE_HOME: {
        en: 'Home | UYC',
        ar: 'الصفحة الرئيسية | UYC'
    },
    PAGE_TITLE_NOT_FOUND: {
        en: 'Page Not Found | UYC',
        ar: 'الصفحة غير موجودة | UYC'
    },
    PAGE_TITLE_PRODUCT: {
        en: 'Product | UYC',
        ar: 'منتج | UYC'
    },
    PAGE_TITLE_SHOP: {
        en: 'Shop | UYC',
        ar: 'المتجر | UYC'
    },
    PAGE_TITLE_TRACK_ORDER: {
        en: 'Track Order | UYC',
        ar: 'تتبع شحنتك | UYC'
    },
    PAGE_TITLE_VERIFY: {
        en: 'Verify | UYC',
        ar: 'تفعيل | UYC'
    },
    PAGE_TITLE_AUTH: {
        en: 'UYC',
        ar: 'UYC'
    },
    PAGE_TITLE_USER_PANEL: {
        en: 'Profile | UYC',
        ar: 'الصفحة الشخصية | UYC'
    }


}
export default globalVariables;