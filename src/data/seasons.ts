export const MONTHS: { en: string; ur: string }[] = [
  { en: "January", ur: "جنوری" },
  { en: "February", ur: "فروری" },
  { en: "March", ur: "مارچ" },
  { en: "April", ur: "اپریل" },
  { en: "May", ur: "مئی" },
  { en: "June", ur: "جون" },
  { en: "July", ur: "جولائی" },
  { en: "August", ur: "اگست" },
  { en: "September", ur: "ستمبر" },
  { en: "October", ur: "اکتوبر" },
  { en: "November", ur: "نومبر" },
  { en: "December", ur: "دسمبر" },
];

export type MonthPlan = {
  cropEn: string[];
  cropUr: string[];
  vaxEn: string[];
  vaxUr: string[];
  watch: string[];
};

export const YEAR: MonthPlan[] = [
  {
    cropEn: ["Wheat: watch yellow rust after fog.", "Mustard aphid on the flower head.", "Berseem cuts, do not turn hungry cattle straight onto lush growth."],
    cropUr: ["گندم: دھند کے بعد پیلی زنگ دیکھیں۔", "سرسوں کے پھول پر تیلہ۔", "برسیم کی کٹائی، بھوکے جانور کو یکدم نرم چارے پر نہ چھوڑیں۔"],
    vaxEn: ["Poultry: Newcastle if the flock is due.", "Goats: keep kids dry and out of the wind."],
    vaxUr: ["مرغی: رانی کھیت کا ٹیکہ اگر وقت ہو۔", "بکری کے بچے خشک اور ہوا سے بچائیں۔"],
    watch: ["wheat-yellow-rust", "mustard-aphid", "bloat"],
  },
  {
    cropEn: ["Yellow rust can move fast on wheat.", "Potato late blight if nights are wet.", "Gram pod borer starts."],
    cropUr: ["گندم کی پیلی زنگ تیزی سے پھیل سکتی ہے۔", "رات گیلی ہو تو آلو کا جھلساؤ۔", "چنے کی پھلی کی سنڈی۔"],
    vaxEn: ["FMD booster if the campaign is open.", "Deworm small ruminants before the spring flush."],
    vaxUr: ["منہ کھر کا بوسٹر اگر مہم چل رہی ہو۔", "موسم بہار سے پہلے بکری بھیڑ کے کیڑے گرا دیں۔"],
    watch: ["wheat-yellow-rust", "potato-late", "gram-podborer"],
  },
  {
    cropEn: ["Last rust spray only if the flag leaf is still at risk.", "Harvest planning for wheat.", "Mango hopper and powdery mildew on blossom."],
    cropUr: ["آخری زنگ کا سپرے صرف اگر جھنڈا پتا ابھی خطرے میں ہو۔", "گندم کی کٹائی کی تیاری۔", "آم کے پھول پر تیلہ اور سفید پھپھوند۔"],
    vaxEn: ["Enterotoxemia before feed changes at harvest.", "Horse tetanus if a wound is dirty."],
    vaxUr: ["کٹائی پر چارہ بدلنے سے پہلے انتڑوں کے زہر کا ٹیکہ۔", "گھوڑے کا گندا زخم ہو تو تشنج کا ٹیکہ۔"],
    watch: ["mango-hopper", "enterotoxemia", "wheat-aphid"],
  },
  {
    cropEn: ["Wheat harvest. Store clean seed.", "Cotton sowing window. Whitefly starts on early cotton.", "Maize fall armyworm on the whorl."],
    cropUr: ["گندم کی کٹائی۔ صاف بیج رکھیں۔", "کپاس کی بوائی۔ جلد کپاس پر سفید مکھی۔", "مکئی کے گبھ میں فوجی سنڈی۔"],
    vaxEn: ["Book HS vaccine before the rains.", "Shade and water as days heat up."],
    vaxUr: ["بارش سے پہلے گل گھونٹو کا ٹیکہ لکھ لیں۔", "گرمی بڑھے تو سایہ اور پانی۔"],
    watch: ["maize-faw", "cotton-clcv", "heat-poultry"],
  },
  {
    cropEn: ["Cotton sucking pests.", "Rice nursery.", "Do not graze hungry stock on drought-stressed sorghum."],
    cropUr: ["کپاس کے رس چوسنے والے کیڑے۔", "دھان کی پنیری۔", "سوکھی جوار پر بھوکے جانور نہ چرائیں۔"],
    vaxEn: ["HS vaccine this month in most canal colonies.", "FMD if not done in winter."],
    vaxUr: ["زیادہ تر نہری علاقوں میں اس مہینے گل گھونٹو کا ٹیکہ۔", "منہ کھر اگر سردی میں نہ لگا ہو۔"],
    watch: ["hs", "cotton-jassid", "heat-poultry"],
  },
  {
    cropEn: ["Monsoon prep: clear field drains.", "Rice transplant.", "Sugarcane pyrilla and red rot scouting."],
    cropUr: ["بارش کی تیاری: کھیت کا پانی نکلنے دیں۔", "دھان کی پنیری لگائیں۔", "گنے میں پائریلا اور سرخ سڑن دیکھیں۔"],
    vaxEn: ["HS must be on before the first big rain.", "Mastitis rises with mud — clean the milking place."],
    vaxUr: ["پہلی بڑی بارش سے پہلے گل گھونٹو لگ چکا ہو۔", "کیچڑ سے تھن کی سوجن بڑھتی ہے — دوہنی صاف رکھیں۔"],
    watch: ["hs", "rice-blb", "mastitis"],
  },
  {
    cropEn: ["Rice BLB and blast in humid weather.", "Cotton leaf curl and whitefly.", "Bloat on lush grass after rain."],
    cropUr: ["نمی میں دھان کا جھلساؤ اور بلاسٹ۔", "کپاس کا لیف کرل اور سفید مکھی۔", "بارش کے بعد نرم گھاس پر افارہ۔"],
    vaxEn: ["Watch sudden deaths. Do not open a carcass that bleeds from the nose.", "Poultry litter must stay dry."],
    vaxUr: ["اچانک موت دیکھیں۔ ناک سے خون بہے تو لاش نہ کھولیں۔", "مرغی کا فرش خشک رہے۔"],
    watch: ["rice-blb", "bloat", "anthrax"],
  },
  {
    cropEn: ["Continue rice and cotton scouting.", "Chilli dieback in wet spells.", "Mango fruit fly as fruit colours."],
    cropUr: ["دھان اور کپاس دیکھتے رہیں۔", "گیلے دنوں میں مرچ کا سر سے سوکھنا۔", "آم رنگ پکڑے تو پھل کی مکھی۔"],
    vaxEn: ["Deworm after the main rains, especially goats.", "Tick check on ears and udder."],
    vaxUr: ["بڑی بارش کے بعد کیڑے گرائیں، خاص کر بکری۔", "کان اور تھن پر چیچڑی دیکھیں۔"],
    watch: ["theileria", "mango-fruitfly", "cotton-pbw"],
  },
  {
    cropEn: ["Cotton picking. Destroy ratoon that carries leaf curl.", "Rice harvest soon.", "Prepare rabi seed and DAP."],
    cropUr: ["کپاس کی چنائی۔ لیف کرل والی راٹون ختم کریں۔", "دھان کی کٹائی قریب۔", "ربی کے بیج اور ڈی اے پی تیار۔"],
    vaxEn: ["PPR for goats if the campaign is announced.", "Newcastle before winter nights."],
    vaxUr: ["بکری کا پی پی آر اگر مہم ہو۔", "سردی کی راتوں سے پہلے رانی کھیت۔"],
    watch: ["cotton-clcv", "ppr", "nd"],
  },
  {
    cropEn: ["Wheat sowing. Seed treatment for smut.", "Berseem sowing.", "Mustard and gram sowing."],
    cropUr: ["گندم کی بوائی۔ کنگی کے لیے بیج کا علاج۔", "برسیم کی بوائی۔", "سرسوں اور چنے کی بوائی۔"],
    vaxEn: ["Enterotoxemia before the new green feed.", "FMD ahead of winter movements."],
    vaxUr: ["نئے سبز چارے سے پہلے انتڑوں کے زہر کا ٹیکہ۔", "سردی کے نقل و حمل سے پہلے منہ کھر۔"],
    watch: ["wheat-loose-smut", "enterotoxemia", "fmd"],
  },
  {
    cropEn: ["Finish wheat sowing. First irrigation on time.", "Onion thrips.", "Citrus canker on the new flush."],
    cropUr: ["گندم کی بوائی ختم کریں۔ پہلا پانی وقت پر۔", "پیاز کا تھرپس۔", "کینو کی نئی کونپل پر کینکر۔"],
    vaxEn: ["Cold stress in poultry: close the wind side, not the air.", "Check cow heat records."],
    vaxUr: ["مرغی کی سردی: ہوا والا پاسہ بند کریں، سانس کی ہوا بند نہ کریں۔", "گائے کی مٹ کا حساب دیکھیں۔"],
    watch: ["wheat-aphid", "onion-thrips", "citrus-canker"],
  },
  {
    cropEn: ["Wheat tillering. Aphid scouting.", "Potato and tomato blight if fog sits.", "Do not flood stagnant wheat."],
    cropUr: ["گندم ٹیلرنگ۔ تیلہ دیکھیں۔", "دھند بیٹھے تو آلو ٹماٹر کا جھلساؤ۔", "گندم میں پانی کھڑا نہ چھوڑیں۔"],
    vaxEn: ["Liver fluke drench where fields stay wet.", "Keep calving pens clean and dry."],
    vaxUr: ["جہاں کھیت گیلے رہیں وہاں جگر کے کیڑے کی دوا۔", "بچھڑے کی جگہ صاف اور خشک۔"],
    watch: ["liver-fluke", "potato-late", "mastitis"],
  },
];
