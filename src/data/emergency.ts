export type Emergency = {
  id: string;
  en: string;
  ur: string;
  seeEn: string;
  seeUr: string;
  doEn: string[];
  doUr: string[];
  dontEn: string[];
  dontUr: string[];
};

export const EMERGENCIES: Emergency[] = [
  {
    id: "bloat",
    en: "Bloat",
    ur: "افارہ",
    seeEn: "Left flank tight like a drum after lush berseem or young cereal. The animal kicks its belly.",
    seeUr: "نرم برسیم یا کچی فصل کے بعد بائیں کوکھ ڈھول کی طرح تنگ۔ جانور پیٹ پر لات مارتا ہے۔",
    doEn: [
      "Stop grazing. Walk it gently if it is still standing.",
      "If it can swallow: an adult cow or buffalo can be given about 300–500 ml of plain cooking oil by mouth as first aid for frothy bloat.",
      "Call a vet if the drum does not ease, or the animal goes down.",
    ],
    doUr: [
      "چارہ بند کریں۔ اگر کھڑا ہو تو آہستہ چلائیں۔",
      "اگر نگل سکتا ہو: جھاگ والے افارے میں بڑی گائے یا بھینس کو تقریباً 300 سے 500 ملی سادہ کھانا پکانے کا تیل منہ سے دیا جا سکتا ہے۔",
      "ڈھول نہ بیٹھے یا جانور گر جائے تو ڈاکٹر بلائیں۔",
    ],
    dontEn: [
      "Do not drench an animal that is down or thrashing. It will inhale the oil and die.",
      "A trocar in the left flank is a vet act, not a first try.",
    ],
    dontUr: [
      "گرے یا تڑپتے جانور کے منہ میں کچھ نہ ڈالیں۔ تیل پھیپھڑے میں جائے گا اور وہ مر جائے گا۔",
      "بائیں کوکھ میں سوئی پہلا کام نہیں، یہ ڈاکٹر کا کام ہے۔",
    ],
  },
  {
    id: "urea",
    en: "Urea or nitrate poisoning",
    ur: "یوریا یا نائٹریٹ کا زہر",
    seeEn: "Animal ate fertilizer, or hungry stock grazed stressed sorghum. Staggering, salivation, bloat, rapid death. Nitrate cases have chocolate-brown blood.",
    seeUr: "جانور نے کھاد کھائی، یا بھوکے جانور نے سوکھی جوار چری۔ لڑکھڑانا، لعاب، افارہ، جلدی موت۔ نائٹریٹ میں خون چاکلیٹ جیسا بھورا۔",
    doEn: [
      "If an adult cow ate urea and can still swallow: about 2–4 litres of household vinegar mixed into several litres of cold water, given carefully by drench, then more cold water. This slows the poison. It is not a cure.",
      "Bring the fertilizer bag to the vet.",
    ],
    doUr: [
      "اگر بڑی گائے نے یوریا کھایا اور ابھی نگل سکتی ہے: تقریباً 2 سے 4 لیٹر سرکہ کئی لیٹر ٹھنڈے پانی میں ملا کر احتیاط سے دیں۔ پھر مزید ٹھنڈا پانی۔ یہ زہر کو سست کرتا ہے، مکمل علاج نہیں۔",
      "کھاد کا تھیلہ ڈاکٹر کو دکھائیں۔",
    ],
    dontEn: [
      "Do not drench a thrashing animal.",
      "Do not graze hungry animals on drought-stressed sorghum or sudan grass.",
    ],
    dontUr: [
      "تڑپتے جانور کو نہ پلائیں۔",
      "بھوکے جانور سوکھی جوار یا سوڈان گراس پر نہ چرائیں۔",
    ],
  },
  {
    id: "spray",
    en: "Spray poisoning",
    ur: "سپرے کا زہر",
    seeEn: "Just after dipping, spraying, or eating a treated field. Salivation, trembling, or skin wet with chemical.",
    seeUr: "ڈپ، سپرے، یا زہر والے کھیت کے فوراً بعد۔ لعاب، کانپنا، یا کھال پر کیمیکل۔",
    doEn: [
      "Wash the skin with plenty of plain water if the chemical is on the body. Wear gloves.",
      "Take the bottle with you. Organophosphate and pyrethroid are not treated the same way. Only a vet decides on atropine.",
    ],
    doUr: [
      "اگر زہر جسم پر لگے تو بہت سارے سادے پانی سے دھوئیں۔ دستانے پہنیں۔",
      "بوتل ساتھ لے جائیں۔ آرگنوفاسفورس اور پائیریتھرائیڈ کا علاج ایک نہیں۔ ایٹروپین کا فیصلہ صرف ڈاکٹر کرے۔",
    ],
    dontEn: ["Do not induce vomiting.", "Do not reuse an empty pesticide bottle for water or milk."],
    dontUr: ["قے نہ کرائیں۔", "زہر کی خالی بوتل پانی یا دودھ کے لیے نہ رکھیں۔"],
  },
  {
    id: "birth",
    en: "Difficult birth",
    ur: "مشکل زچگی",
    seeEn: "Water bag showed more than about two hours ago and nothing has moved, or you see only one leg, or a tail with no head.",
    seeUr: "پانی کا تھیلا تقریباً دو گھنٹے سے نظر آ رہا ہے اور کچھ نہیں بڑھا، یا صرف ایک ٹانگ ہے، یا دم ہے اور سر نہیں۔",
    doEn: [
      "Clean hands and arms. Use oil or soap as lubricant if that is all you have.",
      "A normal front birth is two front feet and a nose. If that is not what you feel, stop and get help.",
    ],
    doUr: [
      "ہاتھ اور بازو دھوئیں۔ اگر کچھ اور نہ ہو تو تیل یا صابن پھسلانے کو۔",
      "صحیح سامنے کی پیدائش: دو اگلی ٹانگیں اور ناک۔ اگر یہ نہ ملے تو کھینچنا بند کریں اور مدد لیں۔",
    ],
    dontEn: ["Do not pull against a closed cervix.", "Do not tie a rope and let a tractor pull."],
    dontUr: ["بند منہ کے خلاف نہ کھینچیں۔", "رسی باندھ کر ٹریکٹر سے نہ کھینچوائیں۔"],
  },
  {
    id: "heat",
    en: "Heat stroke",
    ur: "گرمی کا دورہ",
    seeEn: "Hot afternoon, no shade, open-mouth breathing. Poultry pant with wings open and die in the heat of the day.",
    seeUr: "گرم دوپہر، سایہ نہیں، منہ کھول کر سانس۔ مرغی پر کھول کر ہانپتی ہے اور دن کی گرمی میں مرتی ہے۔",
    doEn: [
      "Shade, air, and cool water to drink. Wet the body with cool water. Do not throw ice water on a collapsed animal.",
      "Poultry: more drinkers, less crowding, electrolytes in the water if you have them.",
    ],
    doUr: [
      "سایہ، ہوا، اور ٹھنڈا پینے کا پانی۔ جسم کو ٹھنڈے پانی سے بھگوئیں۔ گرے ہوئے جانور پر برف کا پانی نہ ماریں۔",
      "مرغی: زیادہ پینے کے برتن، کم بھیڑ، الیکٹرولائٹ اگر ہو۔",
    ],
    dontEn: ["Do not walk stock at noon.", "Do not lock birds in a shut room."],
    dontUr: ["دوپہر کو جانور نہ چلائیں۔", "پرندوں کو بند کمرے میں نہ بند کریں۔"],
  },
  {
    id: "snake",
    en: "Snake bite",
    ur: "سانپ کا کاٹا",
    seeEn: "Sudden swelling on a leg or muzzle, pain, trembling, after grazing in long grass.",
    seeUr: "لمبی گھاس میں چرنے کے بعد ٹانگ یا تھوتھنی اچانک سوجے، درد، کانپنا۔",
    doEn: ["Keep the animal quiet. Note where the swelling is. Call a vet. Antivenom is rarely on the farm."],
    doUr: ["جانور کو چپ رکھیں۔ سوجن کی جگہ نوٹ کریں۔ ڈاکٹر بلائیں۔ زہر کا انجکشن اکثر فارم پر نہیں ہوتا۔"],
    dontEn: ["Do not cut the bite and suck it.", "Do not tie a tight tourniquet."],
    dontUr: ["کاٹ کو چیر کر نہ چوسیں۔", "سخت بندھ نہ باندھیں۔"],
  },
  {
    id: "carcass",
    en: "Sudden death, do not open",
    ur: "اچانک موت، لاش نہ کھولیں",
    seeEn: "A good animal is dead with dark blood from the nose, mouth, or anus that does not clot. Or several animals die the same day.",
    seeUr: "تندرست جانور مرا پڑا ہو اور ناک، منہ یا مقعد سے کالا خون آئے جو جمتا نہ ہو۔ یا ایک دن میں کئی مر جائیں۔",
    doEn: [
      "Keep people and dogs away. Tell the livestock department. This can be anthrax, which also kills people.",
      "Poultry: many dead birds with swollen blue heads can be avian influenza. Report it. Do not eat the birds. Do not sell them.",
    ],
    doUr: [
      "لوگوں اور کتوں کو دور رکھیں۔ محکمہ لائیو سٹاک کو بتائیں۔ یہ سڑکی ہو سکتی ہے جو انسان کو بھی مارتی ہے۔",
      "مرغی: نیلی سوجی کلنگی کے ساتھ کئی موتیں برڈ فلو ہو سکتی ہیں۔ خبر دیں۔ پرندے نہ کھائیں، نہ بیچیں۔",
    ],
    dontEn: ["Do not skin or open the carcass.", "Do not throw it in a canal."],
    dontUr: ["لاش نہ کھولیں اور کھال نہ اتاریں۔", "نہری پانی میں نہ پھینکیں۔"],
  },
  {
    id: "rabies",
    en: "Bite to a person",
    ur: "انسان کو کاٹا",
    seeEn: "Any dog, cat, or livestock bite, or saliva on a broken skin. Rabies is fatal once signs start in a person.",
    seeUr: "کتا، بلی، یا مویشی کا کاٹا، یا زخم پر لعاب۔ انسان میں علامات کے بعد ریبیز تقریباً ہمیشہ موت ہے۔",
    doEn: ["Wash the wound with soap and running water for 15 minutes. Go to a hospital the same day for vaccine. Tie the animal safely and tell the authorities. Do not kill it if it can be watched."],
    doUr: ["زخم کو صابن اور بہتے پانی سے 15 منٹ دھوئیں۔ اسی دن ہسپتال جائیں ٹیکے کے لیے۔ جانور کو محفوظ باندھیں اور محکمے کو بتائیں۔ اگر دیکھ بھال ہو سکے تو فوراً مار نہ دیں۔"],
    dontEn: ["Do not put chilli, ash, or turmeric on the wound and stay home.", "Do not handle a nervous animal with bare hands."],
    dontUr: ["زخم پر مرچ، راکھ یا ہلدی لگا کر گھر نہ بیٹھیں۔", "بے چین جانور کو ننگے ہاتھ نہ پکڑیں۔"],
  },
];
