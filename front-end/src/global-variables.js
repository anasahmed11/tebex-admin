import Cookies from 'universal-cookie';


const cookies = new Cookies();

if(cookies.get('lang')===undefined) cookies.set('lang','ar');

const globalVariables = {
    LANG: cookies.get('lang'),
// VARIABLES
    ACCESS_TOKEN: 'access_token',
    LANGUGAE: 'lang',
    
// MESSAGES
    MSG_LOGIN_FAIL:{
            en: 'Login failed.',
            ar: '',
        },
    MSG_LOGIN_SUCCESS:{
            en: 'Logged in successfully.',
            ar: '',
        },

    MSG_LOGOUT_FAIL:{
            en: 'Error.',
            ar: '',
        },
    MSG_LOGOUT_SUCCESS:{
            en: 'Logged out successfully.',
            ar: '',
        },

    MSG_REGISTER_SUCCESS:{
            en: 'Registered successfully.\nCheck your mail for account activation.',
            ar: '',
        },
    MSG_REGISTER_FAIL:{
            en: 'Registeration failed.',
            ar: '',
        },
    MSG_NETWORK_ERROR:{
            en: 'No response from server.\ntry again later',
            ar: 'لا يوجد استجابة من السيرفر\nحاول مجددا في وقت لاحق'
        },
    MSG_VERIFIY_ACCOUNT:{
            en: 'Please verifiy your account, check your mail!',
            ar: 'رجاء قم بتفعيل حسابك, قم بتفقد بريدك الالكتروني!'
        },

//Appbar
    APPBAR_SHOP:{
            en: 'Shop',
            ar: 'تسوق'
        },
    APPBAR_SEARCH: {
            en: 'Search ..',
            ar: 'ابحث ..'
        },
    SETTINGS_SECTION_LOGIN:{
            en: 'Sign in | Sign up',
            ar: 'تجسيل الدخول | اشتراك'
        },
    SETTINGS_SECTION_PROFILE:{
            en: 'My Profile',
            ar: 'الملف الشخصي'
        },
    SETTINGS_SECTION_ORDERS:{
            en: 'My Orders',
            ar: 'مشترياتي'
        },
    SETTINGS_SECTION_DASHBOARD:{
            en: 'Dashboard',
            ar: 'لوحة التحكم'
        },
    SETTINGS_SECTION_LINK_GENERATOR:{
            en: 'Link Generator',
            ar: 'مولد اللنكات'
        },
    SETTINGS_SECTION_TEAM_TREE:{
            en: 'Team Tree',
            ar: 'شجرة الفريق'
        },
    SETTINGS_SECTION_SIGN_OUT:{
            en: 'Sign Out',
            ar: 'تسجيل الخروج'
        },
    SETTINGS_SECTION_AFFILIATE:{
            en:'Affiliate Program',
            ar:'برنامج التسويق',
        },
    SETTINGS_SECTION_SELLER:{
            en:'Seller Program',
            ar:'برنامج التجار',
        },

//Afiliate
    AFFILIATE_PAGE1:{
            en:'Your registration request has been submitted successfully and will be reviewed soon.',
            ar:'قد تم استلام طلبك بنجاح وسيتم مراجعته قريبا.',
        },
    AFFILIATE_PAGE2:{
            en:'Your are already in affiliate program.',
            ar:'انت مسجل في البرنامج بالفعل.',
        },
    FORM_AFFILIATE_LABEL_VODAFONE:{
            en:'Vodafone Cash',
            ar:'فودافون كاش',
        },
    FORM_AFFILIATE_LABEL_ETISALAT:{
            en:'Etisalat Cash',
            ar:'اتصالات كاش',
        },
    FORM_AFFILIATE_LABEL_PACKAGE:{
            en:'Package',
            ar:'الحزمة',
        },
    Package1_AFFILIATE:{
            en:['Discount 25%'],
            ar:['خصم 25%']
        },
    Package2_AFFILIATE:{
            en:['Discount 20%'],
            ar:['خصم 20%']
        },
    Package3_AFFILIATE:{
            en:['Discount 10%'],
            ar:['خصم 10%']
        },


//Seller
    SELLER_PAGE1:{
            en:'Your registration request has been submitted successfully and will be reviewed soon.',
            ar:'قد تم استلام طلبك بنجاح وسيتم مراجعته قريبا.',
        },
    SELLER_PAGE2:{
            en:'Your are already in seller program.',
            ar:'انت مسجل في البرنامج بالفعل.',
        },
    FORM_SELLER_LABEL_VODAFONE:{
            en:'Vodafone Cash',
            ar:'فودافون كاش',
        },
    FORM_SELLER_LABEL_ETISALAT:{
            en:'Etisalat Cash',
            ar:'اتصالات كاش',
        },
    FORM_SELLER_LABEL_STORE_URL:{
            en:'Store URL',
            ar:'الحزمة',
        },
    FORM_SELLER_LABEL_STORE_ADDRESS:{
            en:'Store Address',
            ar:'الحزمة',
        },
    
    FORM_SELLER_LABEL_PICKUP_ADDRESS:{
            en:'Pickup Address',
            ar:'الحزمة',
        },
    FORM_SELLER_LABEL_PICKUP_PHONE:{
            en:'Pickup Phone',
            ar:'الحزمة',
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
    
// Checkou
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
            en: 'Pound',
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

// LOGIN FORM
    FORM_LOGIN_LABEL_TITLE:{
            en: 'Login',
            ar: 'تسجيل الدخول',
        },
    FORM_LOGIN_LABEL_EMAIL:{
            en: 'Email',
            ar: 'البريد الالكتروني',
        },
    FORM_LOGIN_LABEL_PASS:{
            en: 'Password',
            ar: 'كلمة المرور',
        },
    FORM_LOGIN_LABEL_LOGIN:{
            en: 'Login',
            ar: 'تسجيل الدخول',
        },
    FORM_LOGIN_LABEL_FORGOT:{
            en: 'Forgot your password?',
            ar: 'هل نسيت كلمة المرور؟',
        },
    FORM_LOGIN_LABEL_REMEMBER:{
            en: 'Remember me',
            ar: 'تذكرني',
        },
    FORM_LOGIN_ERR_EMAIL:{
            en: 'Invalid email.',
            ar: '',
        },
    FORM_LOGIN_ERR_PASS:{
            en: 'Invalid password.',
            ar: '',
        },
// Register
    FORM_REGISTER_LABEL_TITLE:{
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

    
}
export default globalVariables;