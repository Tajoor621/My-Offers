import type { Book } from "./types";

export const BOOKS: Book[] = [
  {
    slug: "read-a-field",
    en: "How to read a sick field",
    ur: "بیمار کھیت کیسے پڑھیں",
    minutes: 8,
    blurbEn: "A walking order so you do not spray the wrong thing.",
    blurbUr: "چلنے کا ترتیب تاکہ غلط چیز کا سپرے نہ ہو۔",
    chapters: [
      {
        en: "Stand back first",
        ur: "پہلے دور سے دیکھیں",
        bodyEn: [
          "Before you pull a leaf, look at the pattern. A round burnt patch in rice is often hopper burn. A wavy yellow edge on many leaves is bacterial blight. Scattered short plants on alkaline soil may be zinc, not a fungus.",
          "Ask what changed: a fog, a urea bag, a new seed lot, a neighbour spraying. The answer is usually in that week, not in a thicker poison.",
        ],
        bodyUr: [
          "پتا توڑنے سے پہلے نقشہ دیکھیں۔ دھان میں گول جلا ٹکڑا اکثر ہوپر برن ہے۔ کئی پتوں پر لہراتا پیلا کنارہ بیکٹیریل بلائیٹ ہے۔ کھاری زمین پر بکھرے چھوٹے پودے زنک ہو سکتے ہیں، پھپھوند نہیں۔",
          "پوچھیں کیا بدلا: دھند، یوریا کا تھیلا، نیا بیج، پڑوسی کا سپرے۔ جواب عموماً اسی ہفتے میں ہے، گاڑھے زہر میں نہیں۔",
        ],
      },
      {
        en: "Then the plant",
        ur: "پھر پودا",
        bodyEn: [
          "Top leaves and old leaves tell different stories. Nitrogen yellows the old leaf. Iron and many viruses mark the young leaf. Rust dust rubs off on a finger. A virus curl does not.",
          "Split stems for borers. Split sugarcane for red rot. Pull a wheat plant: if it comes up with mud tubes, think termite before you buy a rust spray.",
        ],
        bodyUr: [
          "اوپر کے پتے اور پرانے پتے الگ کہانی کہتے ہیں۔ نائٹروجن پرانا پتا پیلا کرتی ہے۔ لوہا اور کئی وائرس نیا پتا نشان زد کرتے ہیں۔ زنگ کی گرد انگلی پر آتی ہے۔ وائرس کا مڑا پتا نہیں آتا۔",
          "سنڈی کے لیے تنا چیریں۔ سرخ سڑن کے لیے گنا چیریں۔ گندم کا پودا کھینچیں: مٹی کی نالیوں کے ساتھ نکلے تو زنگ کا سپرے خریدنے سے پہلے دیمک سوچیں۔",
        ],
      },
    ],
  },
  {
    slug: "read-an-animal",
    en: "How to read a sick animal",
    ur: "بیمار جانور کیسے پڑھیں",
    minutes: 9,
    blurbEn: "A field exam when the vet is a road away.",
    blurbUr: "جب ڈاکٹر ایک سڑک دور ہو تو فیلڈ معائنہ۔",
    chapters: [
      {
        en: "The order",
        ur: "ترتیب",
        bodyEn: [
          "Watch before you catch. Is she eating, chewing cud, away from the herd? Count breaths for half a minute and double it. Cattle and buffalo at rest are usually under about 30 breaths a minute. Open-mouth breathing is not normal.",
          "Ears: hot with a dull animal suggests fever. Cold ears on a cow down after calving suggest milk fever. Feel the left flank for a drum before you call every downer a calcium case.",
        ],
        bodyUr: [
          "پکڑنے سے پہلے دیکھیں۔ کیا کھا رہی ہے، جگالی کر رہی ہے، ریوڑ سے الگ ہے؟ آدھی منٹ سانس گن کر دوگنا کریں۔ آرام سے گائے بھینس عموماً منٹ میں 30 سے کم سانس لیتی ہیں۔ منہ کھول کر سانس معمول نہیں۔",
          "کان: سست جانور کے گرم کان بخار کی طرف۔ بچھڑے کے بعد گری گائے کے ٹھنڈے کان دودھ کے بخار کی طرف۔ ہر گری ہوئی کو کیلشیم کہنے سے پہلے بائیں کوکھ کا ڈھول دیکھیں۔",
        ],
      },
      {
        en: "What not to miss",
        ur: "جو چھوٹنا نہیں چاہیے",
        bodyEn: [
          "Pull the eyelid. Pink is reassuring. White is worms, fluke, or a blood parasite. Yellow is theileria, babesia, or a liver problem. Look in the mouth and between the claws together if several animals are drooling.",
          "One dead animal with dark blood that does not clot is not a post-mortem for the farm. That is anthrax until the department says otherwise. People die of curiosity.",
        ],
        bodyUr: [
          "پلک کھینچیں۔ گلابی تسلی ہے۔ سفید کیڑے، جگر کا کیڑا، یا خون کا کیڑا ہے۔ پیلا ٹک بخار، بیبیسیا، یا جگر ہے۔ اگر کئی جانور لعاب بہا رہے ہوں تو منہ اور کھروں کے درمیان اکٹھے دیکھیں۔",
          "ایک مردہ جانور جس کا کالا خون نہ جمے، فارم کا پوسٹ مارٹم نہیں۔ جب تک محکمہ نہ کہے یہ سڑکی ہے۔ تجسس سے انسان مرتے ہیں۔",
        ],
      },
    ],
  },
  {
    slug: "three-crops",
    en: "Wheat, rice, and cotton",
    ur: "گندم، دھان، اور کپاس",
    minutes: 10,
    blurbEn: "The three crops that pay the year's bills.",
    blurbUr: "تین فصلیں جن پر سال کا حساب چلتا ہے۔",
    chapters: [
      {
        en: "Wheat",
        ur: "گندم",
        bodyEn: [
          "Yellow stripes that dust a finger are yellow rust. Spray while the flag leaf is still clean. Black powder where the grain should be is loose smut: rogue the ears and do not save that seed. Mud tubes and a plant that pulls out are termites.",
          "A white streak beside the midrib of a young leaf, on a short patch, is zinc. It is not rust and a triazole will not feed it.",
        ],
        bodyUr: [
          "پیلی دھاریاں جو انگلی پر گرد چھوڑیں پیلی زنگ ہیں۔ جھنڈا پتا صاف ہو تب سپرے کریں۔ جہاں دانہ ہونا تھا کالا پاؤڈر اڑن کنگی ہے: بالیاں نکالیں اور وہ بیج نہ رکھیں۔ مٹی کی نالیاں اور کھنچ کر نکلتا پودا دیمک ہے۔",
          "نئے پتے کی درمیانی رگ کے پاس سفید دھاری، چھوٹے ٹکڑے میں، زنک ہے۔ یہ زنگ نہیں اور ٹرائیزول اسے کھانا نہیں دیتا۔",
        ],
      },
      {
        en: "Rice and cotton",
        ur: "دھان اور کپاس",
        bodyEn: [
          "Rice bacterial blight makes a wavy yellow edge and a milky thread in a glass of water. Blast makes eye spots and a broken neck. Neither is helped by spraying a hopper poison. Hopper burn is a round dry patch with insects at the stem base, and the wrong spray makes it worse.",
          "Cotton leaf curl cups upward with thick veins. Jassid cups the rim down and turns the leaf brick red. Pink bollworm is inside the boll. Bt seed is not a virus vaccine and it is no longer a full answer to pink bollworm in many districts.",
        ],
        bodyUr: [
          "دھان کا بیکٹیریل بلائیٹ لہراتا پیلا کنارہ بناتا ہے اور پانی کے گلاس میں دودھیا دھاگہ۔ بلاسٹ آنکھ جیسے دھبے اور ٹوٹی گردن۔ دونوں پر ہوپر کا زہر کام نہیں کرتا۔ ہوپر برن گول سوکھا ٹکڑا ہے، کیڑے تنے کے نیچے، اور غلط سپرے اسے بڑھاتا ہے۔",
          "کپاس کا لیف کرل اوپر کپ اور موٹی رگیں ہیں۔ سبز تیلہ کنارہ نیچے موڑ کر پتا اینٹ جیسا کرتا ہے۔ گلابی سنڈی ٹینڈے کے اندر ہے۔ بی ٹی بیج وائرس کا ٹیکہ نہیں اور کئی اضلاع میں گلابی سنڈی کا پورا جواب بھی نہیں رہا۔",
        ],
      },
    ],
  },
  {
    slug: "dairy",
    en: "Dairy animals",
    ur: "دودھ والے جانور",
    minutes: 9,
    blurbEn: "Milk, fever, bloat, and the deaths you report.",
    blurbUr: "دودھ، بخار، افارہ، اور وہ موتیں جن کی خبر دینی ہے۔",
    chapters: [
      {
        en: "The udder and the calving week",
        ur: "تھن اور بچھڑے کا ہفتہ",
        bodyEn: [
          "Clots on a dark plate are mastitis. Milk that quarter last, throw the milk where a calf cannot steal it, and honour the days on the tube. A dry-cow tube in a milking cow is a residue scandal.",
          "Down, cold ears, around calving: milk fever, calcium slowly in the vein, cow kept on her chest. Sweet breath and off feed in early milk: ketosis, energy and a better ration. Do not swap the bottles.",
        ],
        bodyUr: [
          "کالے برتن پر لوتھڑے تھن کی سوجن ہیں۔ وہ پستان آخر میں دوہیں، دودھ وہاں پھینکیں جہاں بچھڑا نہ چوری کرے، اور نلی کے دن پورے کریں۔ دودھ والی گائے میں خشک گائے کی نلی باقی ماندہ زہر کا سکینڈل ہے۔",
          "بچھڑے کے آس پاس گرنا، ٹھنڈے کان: دودھ کا بخار، رگ میں آہستہ کیلشیم، گائے سینے کے بل۔ دودھ کے شروع میں میٹھی سانس اور بند چارہ: کیٹوسس، توانائی اور بہتر راشن۔ بوتلیں نہ بدل دیں۔",
        ],
      },
      {
        en: "What the village must report",
        ur: "گاؤں نے کس کی خبر دینی ہے",
        bodyEn: [
          "Mouth sores plus foot sores in several animals is foot and mouth. Stop movement. Throat swelling and death in the rains is haemorrhagic septicaemia. Skin nodules spreading in the herd is lumpy skin. Dark unclotted blood from a carcass is anthrax: do not open it.",
          "Abortion with a retained placenta can be brucella. Boil the milk. Gloves at every birth. Dogs do not get the fetus.",
        ],
        bodyUr: [
          "کئی جانوروں میں منہ اور پاؤں کے زخم منہ کھر ہے۔ نقل روکیں۔ بارش میں گلے کی سوجن اور موت گل گھونٹو ہے۔ ریوڑ میں پھیلتی جلد کی گرہیں لمپی سکن ہیں۔ لاش سے کالا نہ جمنے والا خون سڑکی ہے: مت کھولیں۔",
          "جیر رُکے کے ساتھ گرا بچہ بروسلا ہو سکتا ہے۔ دودھ ابالیں۔ ہر زچگی پر دستانے۔ کتے کو بچہ نہیں ملتا۔",
        ],
      },
    ],
  },
  {
    slug: "small-and-birds",
    en: "Goats and backyard birds",
    ur: "بکریاں اور گھریلو مرغی",
    minutes: 8,
    blurbEn: "The deaths that look sudden and the ones that are dirty pens.",
    blurbUr: "وہ موتیں جو اچانک لگتی ہیں اور وہ جو گندے باڑے کی ہیں۔",
    chapters: [
      {
        en: "Goats",
        ur: "بکریاں",
        bodyEn: [
          "Pale eyelid and a thin goat is worms until you have drenched at a real weight. The fat kid dead after a feed change is enterotoxaemia: you vaccinate the next time before the change. Bloody scour in live kids is coccidiosis and a dry pen. Mouth sores, diarrhoea, and pneumonia in many goats is PPR: report it.",
          "Scabs only on the lips are orf. Wear gloves. It goes to people.",
        ],
        bodyUr: [
          "سفید پلک اور دبلی بکری کیڑے ہیں جب تک آپ نے سچے وزن پر دوا نہ دی ہو۔ چارہ بدلتے مرا موٹا بچہ انتڑوں کا زہر ہے: اگلی بار تبدیلی سے پہلے ٹیکہ۔ زندہ بچوں کا خونی دست کاکسیڈیا اور سوکھا باڑا ہے۔ کئی بکریوں میں منہ کے زخم، دست اور نمونیا پی پی آر ہے: خبر دیں۔",
          "صرف ہونٹوں کی پپڑی کھری ہے۔ دستانے پہنیں۔ یہ انسان کو لگتی ہے۔",
        ],
      },
      {
        en: "Birds",
        ur: "مرغیاں",
        bodyEn: [
          "Twisted necks and a pile of dead birds is Newcastle until a lab says otherwise. Vaccine on a rhythm, and do not sell the sick ones. Bloody droppings in growers is coccidiosis: dry litter, amprolium as the sachet says. Open wings at noon is heat: air and water, not an antibiotic.",
          "Blue combs and many dead in a day can be avian influenza. Report. Do not cook. Do not dump.",
        ],
        bodyUr: [
          "مڑی گردنیں اور مردوں کا ڈھیر رانی کھیت ہے جب تک لیب کچھ اور نہ کہے۔ ترتیب سے ٹیکہ، اور بیمار نہ بیچیں۔ بڑھوتری میں خونی پاخانہ کاکسیڈیا: خشک فرش، ساشے کے مطابق ایمپرولیم۔ دوپہر کو کھلے پر گرمی: ہوا اور پانی، اینٹی بائیوٹک نہیں۔",
          "نیلی کلنگی اور ایک دن میں کئی موتیں برڈ فلو ہو سکتی ہیں۔ خبر دیں۔ نہ پکائیں۔ نہ پھینکیں۔",
        ],
      },
    ],
  },
  {
    slug: "medicines",
    en: "Medicines, withdrawal, and hands",
    ur: "دوائیں، وقفہ، اور ہاتھ",
    minutes: 8,
    blurbEn: "The label beats this app. The app only does the arithmetic.",
    blurbUr: "لیبل اس ایپ سے بڑا ہے۔ ایپ صرف حساب کرتی ہے۔",
    chapters: [
      {
        en: "Dose from a weight",
        ur: "وزن سے خوراک",
        bodyEn: [
          "Millilitres = weight in kg × mg per kg ÷ mg per ml on the bottle. A 2.5% albendazole drench is 25 mg per ml. A 10% drench is 100 mg per ml. The same 'one cap' on both bottles is how you poison a goat or breed a resistant worm.",
          "Ivermectin 1% is 10 mg per ml and the usual cattle dose is 0.2 mg per kg. Many brands are forbidden in milking animals. Poultry is not a small cow.",
        ],
        bodyUr: [
          "ملی لیٹر = کلو وزن × ملی گرام فی کلو ÷ بوتل کے ملی گرام فی ملی۔ 2.5% البینڈازول 25 ملی گرام فی ملی ہے۔ 10% سو ملی گرام فی ملی ہے۔ دونوں پر ایک ہی ڈھکن اسی طرح بکری کو زہر دیتی ہے یا مزاحم کیڑا پالتی ہے۔",
          "1% آئیورمیکٹن 10 ملی گرام فی ملی ہے اور گائے کی عام خوراک 0.2 ملی گرام فی کلو ہے۔ کئی برانڈ دودھ والے جانور میں منع ہیں۔ مرغی چھوٹی گائے نہیں۔",
        ],
      },
      {
        en: "What reaches the cup",
        ur: "کپ تک کیا پہنچتا ہے",
        bodyEn: [
          "Every tube and injection has days for milk and days for meat. If the wall of the shed does not show the date you may sell again, you are not done. Children drink the residue you forgot.",
          "Boil milk from a herd that aborts. Wash a bite for fifteen minutes and go to hospital the same day. Rabies is not a turmeric wound.",
        ],
        bodyUr: [
          "ہر نلی اور انجکشن کے دودھ کے دن اور گوشت کے دن ہوتے ہیں۔ اگر شیڈ کی دیوار پر وہ تاریخ نہ ہو جب دوبارہ بیچ سکتے ہیں تو کام ادھورا ہے۔ بچے وہ باقی ماندہ پیتے ہیں جو آپ بھولے۔",
          "جس ریوڑ میں حمل گرے اس کا دودھ ابالیں۔ کاٹے کو پندرہ منٹ دھوئیں اور اسی دن ہسپتال جائیں۔ ریبیز ہلدی والا زخم نہیں۔",
        ],
      },
    ],
  },
  {
    slug: "soil",
    en: "Fertilizer without a lab",
    ur: "لیب کے بغیر کھاد",
    minutes: 7,
    blurbEn: "A soil test still wins. This is the interim arithmetic.",
    blurbUr: "مٹی کا ٹیسٹ پھر بھی جیتتا ہے۔ یہ درمیانی حساب ہے۔",
    chapters: [
      {
        en: "Bags",
        ur: "تھیلے",
        bodyEn: [
          "A 50 kg bag of urea is about 23 kg of nitrogen. A 50 kg bag of DAP is about 23 kg of phosphorus and 9 kg of nitrogen. A 50 kg bag of SOP is about 25 kg of potash. The calculator in this app starts from a typical irrigated rate per acre and scales kanal, marla, and hectare. Punjab kanal here means eight to the acre.",
          "Put phosphorus and potash at sowing. Split nitrogen. Late urea on cotton feeds whitefly. Late urea on wheat feeds a soft canopy for rust.",
        ],
        bodyUr: [
          "50 کلو یوریا میں تقریباً 23 کلو نائٹروجن۔ 50 کلو ڈی اے پی میں تقریباً 23 کلو فاسفورس اور 9 کلو نائٹروجن۔ 50 کلو ایس او پی میں تقریباً 25 کلو پوٹاش۔ اس ایپ کا کیلکولیٹر ایکڑ کی عام نہری مقدار سے شروع ہو کر کنال، مرلہ اور ہیکٹر گھٹاتا بڑھا تا ہے۔ یہاں پنجاب کا کنال آٹھ فی ایکڑ ہے۔",
          "فاسفورس اور پوٹاش بوائی پر۔ نائٹروجن بانٹیں۔ کپاس پر دیر کی یوریا سفید مکھی کو کھلاتی ہے۔ گندم پر دیر کی یوریا زنگ کے لیے نرم چھتری پالتی ہے۔",
        ],
      },
    ],
  },
  {
    slug: "voice-privacy",
    en: "Voice on this phone",
    ur: "اس فون پر آواز",
    minutes: 6,
    blurbEn: "How speech stays on the device, and what the dialect label is not.",
    blurbUr: "آواز فون پر کیسے رہتی ہے، اور لہجے کا لیبل کیا نہیں ہے۔",
    chapters: [
      {
        en: "The path",
        ur: "راستہ",
        bodyEn: [
          "You speak, for example: gaye number teen ka wazan do sau pachas kilo. The phone records. A Whisper model runs in the browser if you agree to its download. Nothing is uploaded unless you tap Export.",
          "Urdu script is turned into one Roman spelling for you to read. The parser then looks for a species, a tag, a weight, a medicine, a paddock, and a day. You see the transcript and the fields. Nothing is saved until you confirm. Typing the same fields always works if the model is unsure.",
        ],
        bodyUr: [
          "آپ بولتے ہیں، مثلاً: گائے نمبر تین کا وزن دو سو پچاس کلو۔ فون ریکارڈ کرتا ہے۔ اگر آپ ڈاؤن لوڈ مان لیں تو وسپر ماڈل براؤزر میں چلتا ہے۔ جب تک ایکسپورٹ نہ دبائیں کچھ اپ لوڈ نہیں ہوتا۔",
          "اردو رسم الخط ایک رومن ہجے میں دکھایا جاتا ہے۔ پھر پارسر قسم، ٹیگ، وزن، دوا، کھیت، اور دن ڈھونڈتا ہے۔ آپ نقل اور خانے دیکھتے ہیں۔ تصدیق سے پہلے کچھ محفوظ نہیں ہوتا۔ اگر ماڈل غیر یقینی ہو تو وہی خانے ٹائپ کرنا ہمیشہ چلتا ہے۔",
        ],
      },
      {
        en: "Dialect is a hint",
        ur: "لہجہ صرف اشارہ ہے",
        bodyEn: [
          "A label such as Punjabi-influenced or Sindhi-influenced is a guess from words in the transcript, to help the farm-word parser. It is not a judgment of the speaker and it is not a trained accent test. Two clear markers are required. Otherwise the app says low confidence and asks you to repeat.",
          "We do not train on television drama. Only audio you record, and only the text you confirm, stays. The audio itself is discarded unless you export it.",
        ],
        bodyUr: [
          "پنجابی اثر یا سندھی اثر جیسا لیبل نقل کے الفاظ سے اندازہ ہے، تاکہ کھیت کے الفاظ کا پارسر بہتر چلے۔ یہ بولنے والے کا فیصلہ نہیں اور نہ تربیت یافتہ لہجہ ٹیسٹ ہے۔ دو واضح علامتیں چاہییں۔ ورنہ ایپ کم یقین کہتی ہے اور دہرانے کو کہتی ہے۔",
          "ہم ٹیلی وژن کے ڈرامے پر تربیت نہیں کرتے۔ صرف وہ آواز جو آپ ریکارڈ کریں، اور صرف وہ متن جس کی آپ تصدیق کریں، رہتا ہے۔ آواز خود تب تک نہیں رکھی جاتی جب تک آپ ایکسپورٹ نہ کریں۔",
        ],
      },
    ],
  },
  {
    slug: "sources",
    en: "Sources, not copied books",
    ur: "ماخذ، نقل شدہ کتابیں نہیں",
    minutes: 6,
    blurbEn: "Where to read further, free and official.",
    blurbUr: "آگے کہاں پڑھیں، مفت اور سرکاری۔",
    chapters: [
      {
        en: "Read these yourself",
        ur: "یہ خود پڑھیں",
        bodyEn: [
          "This shelf is our own field notes. It is not the Merck Veterinary Manual, not Smith’s Large Animal Internal Medicine, not Ensminger, not Havlin’s soil text, and not Savory’s Holistic Management. Those are copyrighted. Merck is free to read at merckvetmanual.com. FAO animal health guidelines and the WOAH terrestrial code and manual are free official texts. Follow them when they disagree with a village habit.",
          "Weather on the weather page is Open-Meteo. Climate normals are NASA POWER. Both are fetched only when you ask, then stored on the phone. Pasture area is measured on a map with Turf. Live Sentinel-2 greenness needs a Copernicus account, so this app asks you to score the paddock with your eyes instead of pretending a satellite tile is loaded.",
          "Speech uses Whisper (Radford and others, 2022) through Transformers.js, in the browser. Common Voice (Ardila and others, 2020) is the public Urdu corpus people use to test such models. We have not fine-tuned a dialect model. XLS-R (Babu and others, 2021) is the paper to read if a consented adaptation is built later. Word error should be measured per dialect before anyone trusts it.",
          "On grazing, Teague, Dowhower, Baker, Haile, DeLaune and Conover, Agriculture, Ecosystems and Environment, 2011, volume 141, pages 310–322, compared multi-paddock grazing with continuous grazing on Texas prairie. Some claims around holistic grazing are disputed. Read that paper beside the criticism, and do not treat one ranch study as a law for a canal farm.",
        ],
        bodyUr: [
          "یہ شیلف ہمارے اپنے فیلڈ نوٹ ہیں۔ یہ مرک ویٹرنری مینوئل نہیں، نہ سمتھ کی لارج اینیمل انٹرنل میڈیسن، نہ اینسمینگر، نہ ہیولن کی مٹی کی کتاب، نہ سیوری کی ہولسٹک مینیجمنٹ۔ وہ حق اشاعت میں ہیں۔ مرک مفت پڑھا جا سکتا ہے merckvetmanual.com پر۔ ایف اے او کی جانوروں کی رہنما کتابیں اور ڈبلیو او اے ایچ کا زمینی کوڈ اور مینوئل مفت سرکاری متن ہیں۔ جہاں گاؤں کی عادت ان سے ٹکرائے وہاں انہیں مانیں۔",
          "موسم کے صفحے کا موسم اوپن میٹیو ہے۔ آب و ہوا ناسا پاور ہے۔ دونوں تب آتے ہیں جب آپ مانگیں، پھر فون پر رہتے ہیں۔ چراگاہ کا رقبہ نقشے پر ٹرف سے ناپا جاتا ہے۔ سینٹینل-2 کی زندہ ہریالی کو کوپرنیکس اکاؤنٹ چاہیے، اس لیے یہ ایپ آپ سے کھیت کو آنکھ سے نمبر دینے کو کہتی ہے، مصنوعی سیٹلائٹ ٹائل کا بہانہ نہیں کرتی۔",
          "آواز وسپر استعمال کرتی ہے (ریڈفورڈ اور ساتھی، 2022) ٹرانسفارمرز جے ایس کے ذریعے، براؤزر میں۔ کامن وائس (ارڈیلا اور ساتھی، 2020) وہ عوامی اردو ذخیرہ ہے جس پر ایسے ماڈل آزمائے جاتے ہیں۔ ہم نے لہجے کا ماڈل فائن ٹیون نہیں کیا۔ ایکس ایل ایس آر (بابو اور ساتھی، 2021) وہ مقالہ ہے جو بعد میں رضامند موافقت بنے تو پڑھا جائے۔ لہجے کے گروہ پر لفظ کی غلطی ناپے بغیر بھروسہ نہیں۔",
          "چرا پر ٹیگ، ڈاؤ ہاؤر، بیکر، ہیل، ڈی لون اور کونوور، ایگریکلچر، ایکو سسٹمز اینڈ انوائرنمنٹ، 2011، جلد 141، صفحہ 310–322، نے ٹیکساس کے میدان میں کئی چراگاہوں والی چرا کا مسلسل چرا سے موازنہ کیا۔ ہولسٹک چرا کے کچھ دعوے متنازع ہیں۔ وہ مقالہ تنقید کے ساتھ پڑھیں، اور ایک فارم کے مطالعے کو نہری کھیت کا قانون نہ بنائیں۔",
        ],
      },
    ],
  },
];

export function bookBySlug(slug: string) {
  return BOOKS.find((b) => b.slug === slug);
}
