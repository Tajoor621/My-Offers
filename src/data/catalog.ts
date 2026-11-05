import type { GroupId, Species, Symptom } from "./types";

export const GROUPS: Record<GroupId, { en: string; ur: string }> = {
  field: { en: "Whole field", ur: "سارا کھیت" },
  leaf: { en: "Leaves", ur: "پتے" },
  stem: { en: "Stem and base", ur: "تنا اور جڑ" },
  fruit: { en: "Ear, fruit, boll", ur: "بالی، پھل، ٹینڈا" },
  bug: { en: "Insects you can see", ur: "نظر آنے والے کیڑے" },
  root: { en: "Wilt and roots", ur: "مرجھانا اور جڑ" },
  body: { en: "Whole animal", ur: "سارا جانور" },
  eat: { en: "Appetite and stomach", ur: "بھوک اور پیٹ" },
  breath: { en: "Fever and breath", ur: "بخار اور سانس" },
  dung: { en: "Dung and urine", ur: "پاخانہ اور پیشاب" },
  milk: { en: "Milk and udder", ur: "دودھ اور تھن" },
  skin: { en: "Skin, ticks, wounds", ur: "جلد، چیچڑی، زخم" },
  feet: { en: "Mouth and feet", ur: "منہ اور پاؤں" },
  repro: { en: "Breeding and birth", ur: "نسل اور زچگی" },
  neuro: { en: "Walk and nerves", ur: "چال اور اعصاب" },
};

function s(id: string, en: string, ur: string, group: GroupId): Symptom {
  return { id, en, ur, group };
}

const wheat: Symptom[] = [
  s("y-stripes", "Yellow powdery stripes along the leaf veins", "پتے کی رگوں کے ساتھ پیلی پاؤڈر جیسی دھاریاں", "leaf"),
  s("o-pustules", "Orange-brown dusty pustules, scattered", "نارنجی بھورے گرد آلود دانے، بکھرے ہوئے", "leaf"),
  s("black-ears", "Black powder in place of grain in the ear", "بالی میں دانے کی جگہ کالا پاؤڈر", "fruit"),
  s("aphids", "Green or black soft insects crowded on the ear or leaf", "بالی یا پتے پر سبز یا کالے نرم کیڑوں کا ہجوم", "bug"),
  s("sticky", "Leaves sticky, black sooty mould afterwards", "پتے چپچپے، بعد میں کالی کیلک", "leaf"),
  s("white-ear", "Ears white and empty while neighbours are still green", "پڑوسی سبز ہوں اور یہ بالیاں سفید اور خالی", "fruit"),
  s("base-dry", "Plant dries from the base, pulls out easily", "پودا نیچے سے سوکھے، ہاتھ سے نکل آئے", "stem"),
  s("mud-tubes", "Mud tubes on soil or the stem base", "مٹی پر یا تنے کے نیچے مٹی کی نالیاں", "stem"),
  s("stunt", "Patch of short plants, older leaves pale", "ایک ٹکڑے میں پودے چھوٹے، پرانے پتے پیلے", "field"),
  s("white-midrib", "Young leaves pale with a white streak beside the midrib", "نئے پتے پیلے اور درمیانی رگ کے پاس سفید دھاری", "leaf"),
];

const rice: Symptom[] = [
  s("wavy-yellow", "Leaf edges turn yellow in a wavy line, then dry straw-coloured", "پتے کے کنارے لہراتی پیلی لکیر، پھر بھوسے جیسے سوکھیں", "leaf"),
  s("milky-ooze", "Cut leaf in clear water and a milky thread oozes out", "پتا صاف پانی میں کاٹیں تو دودھیا دھاگہ نکلے", "leaf"),
  s("diamond-spot", "Eye-shaped spots, grey centre, brown rim", "آنکھ جیسے دھبے، درمیان سرمئی، کنارہ بھورا", "leaf"),
  s("neck-blast", "Neck of the panicle turns brown and the head breaks", "بالی کی گردن بھوری ہو اور سر ٹوٹ جائے", "fruit"),
  s("dead-heart", "Central shoot dries and pulls out (dead heart)", "درمیان کی کونپل سوکھ کر نکل آئے", "stem"),
  s("whitehead-rice", "Whole panicles white and empty", "پوری بالیاں سفید اور خالی", "fruit"),
  s("hopper-burn", "Round patches of plants dry up as if burnt", "گول ٹکڑوں میں پودے جلے ہوئے سوکھیں", "field"),
  s("planthopper", "Small brown hoppers at the stem base when you tap", "تنا تھپتھپائیں تو نیچے بھورے چھوٹے کیڑے", "bug"),
  s("borer-hole", "Small hole and frass on the stem", "تنے پر چھوٹا سوراخ اور برادا", "stem"),
];

const cotton: Symptom[] = [
  s("curl-up", "Leaves cup upward, veins thick and green", "پتے اوپر کپ کی طرح، رگیں موٹی اور گہری سبز", "leaf"),
  s("enations", "Small leafy outgrowths under the leaf", "پتے کے نیچے چھوٹے پتے جیسے ابھار", "leaf"),
  s("whitefly", "Tiny white flies rise in a cloud when the plant is shaken", "پودا ہلائیں تو سفید مکھیاں بادل کی طرح اڑیں", "bug"),
  s("jassid", "Leaves curl down at the rim, yellow then brick red; green wedge insects underneath", "کنارے نیچے مڑیں، پیلے پھر اینٹ جیسے؛ نیچے سبز تیلہ", "leaf"),
  s("sooty", "Black sooty film on leaves", "پتوں پر کالی کیلک", "leaf"),
  s("rosette", "Flower looks like a rosette, does not open, boll fails", "پھول گلاب کی طرح بند رہے، ٹینڈا نہ بنے", "fruit"),
  s("boll-hole", "Small hole in the boll, pink caterpillar inside", "ٹینڈے میں سوراخ، اندر گلابی سنڈی", "fruit"),
  s("stunted-cotton", "Plants stay short, few bolls, whole patch", "پودے چھوٹے رہیں، ٹینڈے کم، سارا ٹکڑا", "field"),
];

const maize: Symptom[] = [
  s("window", "Window-pane scraping on young leaves", "نئے پتوں پر کھڑکی جیسے شفاف نشان", "leaf"),
  s("whorl-frass", "Wet sawdust in the whorl, caterpillar inside", "گبھ میں گیلا برادا، اندر سنڈی", "bug"),
  s("armyworm", "Striped caterpillar with a pale Y on the head", "دھاری دار سنڈی، سر پر ہلکی وائی شکل", "bug"),
  s("ragged", "Leaves ragged, only midrib left in a patch", "پتے پھٹے، کسی ٹکڑے میں صرف درمیانی رگ", "field"),
  s("stalk-soft", "Stalk soft at the base, plant lodges, sour smell", "تنا نیچے سے نرم، پودا گرے، کھٹی بو", "stem"),
];

const cane: Symptom[] = [
  s("red-split", "Split the cane: inner tissue red with white patches across", "گنا چیریں: اندر سرخ گودا اور آڑی سفید دھاریاں", "stem"),
  s("vinegar", "Sour or alcoholic smell from the split cane", "چیرنے پر کھٹی یا شراب جیسی بو", "stem"),
  s("top-dead", "Top leaves dry, spindle dead", "اوپر کے پتے سوکھیں، گبھ مر جائے", "leaf"),
  s("borer-cane", "Borer hole and chewed top", "سوراخ اور کٹا ہوا اوپری حصہ", "bug"),
  s("pyrilla", "Pale hoppers and white waxy fluff, leaves yellow and sooty", "ہلکے کیڑے اور سفید موم، پتے پیلے اور کیلک آلود", "bug"),
];

const tomato: Symptom[] = [
  s("target", "Round spots with rings, on older leaves first", "گول دھبے جن میں چھلے ہوں، پرانے پتوں سے شروع", "leaf"),
  s("late-water", "Large water-soaked blotches, white mould under the leaf in wet weather", "بڑے پانی جیسے دھبے، نمی میں پتے کے نیچے سفید پھپھوند", "leaf"),
  s("fruit-rot-late", "Fruit turns brown and firm, greasy rot", "پھل بھورا اور سخت، چکنا سڑن", "fruit"),
  s("curl-whitefly", "Leaves curl up, plant stunted, whiteflies present", "پتے اوپر مڑیں، پودا چھوٹا، سفید مکھی موجود", "leaf"),
  s("fruit-hole-tomato", "Hole near the stalk of the fruit, caterpillar inside", "ڈنٹھل کے پاس سوراخ، اندر سنڈی", "fruit"),
  s("blossom-end", "Dry sunken brown patch at the far end of the fruit", "پھل کے آخری سرے پر خشک دھنسا بھورا داغ", "fruit"),
  s("wilt-midday", "Plant wilts at noon and may recover at night, then dies", "دوپہر کو مرجھائے، رات کو سنبھلے، پھر مر جائے", "root"),
];

const potato: Symptom[] = [
  s("water-lesion", "Dark water-soaked lesions on leaves in cool wet weather", "ٹھنڈی نمی میں پتوں پر گہرے پانی جیسے دھبے", "leaf"),
  s("mould-under", "White mould on the underside of the leaf in the morning", "صبح پتے کے نیچے سفید پھپھوند", "leaf"),
  s("tuber-rot", "Tuber rot brown and granular under the skin", "آلو کے چھلکے کے نیچے بھورا دانے دار سڑن", "fruit"),
  s("target-potato", "Target spots on older leaves, plant still standing", "پرانے پتوں پر نشانے جیسے دھبے، پودا کھڑا رہے", "leaf"),
  s("tuber-moth", "Tunnels in stored or field tubers, pinkish caterpillar", "آلو میں سرنگیں، گلابی سنڈی", "fruit"),
  s("field-collapse", "A patch collapses in a few days after rain or fog", "بارش یا دھند کے چند دن میں ٹکڑا بیٹھ جائے", "field"),
];

const chili: Symptom[] = [
  s("chili-curl", "Leaves curl upward, small, thick, plant stunted", "پتے اوپر مڑیں، چھوٹے موٹے، پودا بونا", "leaf"),
  s("chili-mites", "Leaves curl down and look bronze; tiny mites", "پتے نیچے مڑیں اور تانبے جیسے؛ بہت باریک کیڑے", "leaf"),
  s("dieback", "Twigs dry back from the tip, flowers drop", "ٹہنی سرے سے سوکھے، پھول گریں", "stem"),
  s("fruit-spot-chili", "Sunken black spots on ripe fruit", "پکے پھل پر دھنسے کالے دھبے", "fruit"),
];

const mango: Symptom[] = [
  s("blossom-black", "Flowers blacken and dry on the panicle", "پھول مانجھ پر کالے ہو کر سوکھیں", "fruit"),
  s("powdery", "White powder on flowers and young fruit", "پھولوں اور کوچک پھل پر سفید پاؤڈر", "fruit"),
  s("hopper-mango", "Small wedge insects on the flower, honeydew and sooty mould", "پھول پر چھوٹا تیلہ، شہد جیسا مادہ اور کیلک", "bug"),
  s("fruit-black-spot", "Black sunken spots on fruit as it ripens, tears the skin", "پکنے پر پھل پر کالے دھنسے دھبے", "fruit"),
  s("sting", "Fruit stung, maggots inside near ripening", "پھل میں ڈنک، پکنے کے قریب اندر کیڑے", "fruit"),
];

const citrus: Symptom[] = [
  s("corky", "Raised corky scabs on leaves and fruit, yellow halo", "پتوں اور پھل پر اٹھے ہوئے کارک جیسے داغ، پیلا ہالہ", "leaf"),
  s("blotchy-mottle", "Blotchy yellow mottle, not a clean nutrient stripe", "دھبے دار پیلا پن، صاف غذائی دھاری نہیں", "leaf"),
  s("lopsided", "Fruit lopsided, bitter, seeds aborted, green at the stylar end", "پھل ٹیڑھا، کڑوا، بیج خراب، سرہ سبز", "fruit"),
  s("psyllid", "Tiny insects angled on the new flush", "نئی کونپل پر ترچھے بیٹھے باریک کیڑے", "bug"),
  s("miner", "Silver snakes under the young leaf", "نئے پتے کے اندر چاندی جیسی بل دار لائنیں", "leaf"),
];

const gram: Symptom[] = [
  s("gram-spots", "Brown spots with dark dots on leaves, stems and pods", "پتوں، تنے اور پھلیوں پر بھورے دھبے اور سیاہ نقطے", "leaf"),
  s("stem-break", "Stem breaks, patches die after rain", "تنا ٹوٹے، بارش کے بعد ٹکڑے مر جائیں", "stem"),
  s("pod-hole", "Round hole in the pod, caterpillar inside eating grain", "پھلی میں گول سوراخ، اندر سنڈی دانہ کھائے", "fruit"),
  s("gram-wilt", "Plant wilts even with water in soil, roots brown inside", "مٹی گیلی ہو پھر بھی مرجھائے، جڑ اندر سے بھوری", "root"),
];

const mustard: Symptom[] = [
  s("aphid-colony", "Dense grey-green colonies on the flower head", "پھول کے گچھے پر سرمئی سبز تیلے کا ہجوم", "bug"),
  s("black-rings", "Black spots with rings on leaves and pods", "پتوں اور پھلیوں پر چھلے دار کالے دھبے", "leaf"),
  s("staghead", "Flower head swells pale and sterile", "پھول کا سر سوج کر پیلا اور بانجھ", "fruit"),
];

const onion: Symptom[] = [
  s("purple-blotch", "Purple oval spots with yellow margin on leaves", "پتوں پر جامنی بیضوی دھبے، پیلا کنارہ", "leaf"),
  s("thrips-silver", "Silver streaks and black specks in the leaf fold", "پتے کی تہہ میں چاندی دھاریاں اور کالے نقطے", "leaf"),
  s("tip-dry", "Tips dry down the leaf in a large patch", "بڑے ٹکڑے میں پتوں کے سرے سوکھیں", "field"),
  s("neck-rot", "Soft rot at the neck in store", "گودام میں گردن سے نرم سڑن", "fruit"),
];

const cattle: Symptom[] = [
  s("fever", "Fever: ears hot, animal dull (adult cattle usually above 39.5°C)", "بخار: کان گرم، جانور سست (بڑی عمر عموماً 39.5 سے اوپر)", "breath"),
  s("sudden-death", "Found dead, or died within hours", "مرا پڑا ملا، یا چند گھنٹوں میں موت", "body"),
  s("off-feed", "Off feed, cud stopped", "چارہ بند، جگالی رکی", "eat"),
  s("drop-milk", "Milk dropped sharply", "دودھ اچانک گر گیا", "milk"),
  s("throat-swell", "Hot painful swelling of the throat or dewlap", "گلے یا ڈلیپ پر گرم دردناک سوجن", "breath"),
  s("hard-breath", "Breathing with mouth open, grunt, or neck stretched", "منہ کھول کر سانس، کراہ، یا گردن تانی", "breath"),
  s("lame", "Lame on one or more feet", "ایک یا زیادہ پاؤں سے لنگڑانا", "feet"),
  s("mouth-sores", "Blisters or raw sores in the mouth, smacking lips", "منہ میں چھالے یا زخم، ہونٹ چٹکارنا", "feet"),
  s("foot-sores", "Sores or blisters between the claws", "کھروں کے درمیان زخم یا چھالے", "feet"),
  s("drool", "Long ropes of saliva", "لعاب کے لمبے دھاگے", "feet"),
  s("left-drum", "Left flank tight like a drum, uncomfortable", "بائیں کوکھ ڈھول کی طرح تنگ، بے چین", "eat"),
  s("down", "Down and cannot get up", "گرا پڑا ہے، اٹھ نہیں سکتا", "body"),
  s("cold-ears", "Ears and muzzle cold, started around calving", "کان اور تھوتھنی ٹھنڈے، بچھڑے کے دنوں میں", "repro"),
  s("neck-s", "Neck curved to the side, still quite bright", "گردن ایک طرف مڑی، ہوش تقریباً ٹھیک", "neuro"),
  s("udder-hot", "Udder or one quarter hot, hard, painful", "تھن یا ایک پستان گرم، سخت، درد", "milk"),
  s("milk-clots", "Clots, flakes, watery, bloody or pus-like milk", "دودھ میں لوتھڑے، پانی، خون یا پیپ", "milk"),
  s("ticks", "Ticks attached, especially ears, udder, groin", "چیچڑیاں لگی ہوں، کان، تھن، ران", "skin"),
  s("lymph", "Lymph node in front of the shoulder or inside the thigh is big", "موڈھے کے آگے یا ران کے اندر غدود بڑا", "body"),
  s("pale", "Eye and gum membranes pale", "آنکھ اور مسوڑھے پیلے یا سفید پڑ گئے", "body"),
  s("jaundice", "Eye membranes yellow", "آنکھ کی جھلی پیلی", "body"),
  s("nodules", "Firm round nodules in the skin", "جلد میں سخت گول گرہیں", "skin"),
  s("diarrhea", "Diarrhea", "دست", "dung"),
  s("cough", "Cough", "کھانسی", "breath"),
  s("wasting", "Losing weight over weeks", "ہفتوں سے وزن گر رہا ہے", "body"),
  s("abortion", "Abortion or weak calf", "حمل گر گیا یا بچہ کمزور", "repro"),
  s("itch", "Itching, hair loss, crusts", "خارش، بال جھڑنا، پپڑی", "skin"),
  s("blood-holes", "After death, dark blood from nose, mouth or anus that does not clot", "موت کے بعد ناک، منہ یا مقعد سے کالا خون جو جمتا نہیں", "body"),
  s("many-sick", "Several animals sick or dead the same week", "ایک ہی ہفتے میں کئی بیمار یا مردہ", "field"),
  s("lush", "Turned onto lush berseem, lucerne or young cereal today", "آج برسیم، لوسرن یا نرم فصل پر چھوڑا", "eat"),
  s("after-calving", "Within three days after calving", "بچھڑے کے تین دن کے اندر", "repro"),
  s("red-urine", "Red or coffee-coloured urine", "پیشاب سرخ یا کافی جیسا", "dung"),
  s("stagger", "Staggering, teeth grinding, smell of ammonia on the breath", "لڑکھڑانا، دانت پیسنا، سانس میں امونیا کی بو", "neuro"),
  s("retained", "Placenta still hanging after 12 hours", "بارہ گھنٹے بعد بھی جیر لٹکی ہو", "repro"),
  s("repeat-heat", "Comes back in heat again and again, or aborted once", "بار بار مٹتی ہے، یا ایک بار حمل گرا", "repro"),
  s("sweet-breath", "Sweet nail-polish smell on the breath, early lactation, off feed", "سانس میں میٹھی بو، دودھ کے شروع میں، چارہ بند", "eat"),
];

const small: Symptom[] = [
  s("fever", "Fever, dull, ears hot", "بخار، سست، کان گرم", "breath"),
  s("sudden-death", "Kid or adult found dead, often the best one", "بچہ یا بڑا مرا پڑا، اکثر تندرست والا", "body"),
  s("off-feed", "Off feed", "چارہ نہیں کھاتا", "eat"),
  s("mouth-sores", "Sores in the mouth, smelly breath", "منہ میں زخم، سانس بدبو دار", "feet"),
  s("diarrhea", "Diarrhea, sometimes with mucus", "دست، کبھی بلغم کے ساتھ", "dung"),
  s("bloody-dung", "Diarrhea with blood in kids", "بچوں کے دست میں خون", "dung"),
  s("hard-breath", "Pneumonia: cough, fast breath, nose discharge", "نمونیا: کھانسی، تیز سانس، ناک بہنا", "breath"),
  s("many-sick", "Many goats or sheep sick together", "کئی بکریاں یا بھیڑیں اکٹھی بیمار", "field"),
  s("scabby-lips", "Scabby crusts on lips and nostrils", "ہونٹوں اور نتھنوں پر پپڑی دار زخم", "skin"),
  s("pale", "Pale eyes, bottle jaw under the chin", "آنکھ سفید، ٹھوڑی کے نیچے سوجن", "body"),
  s("itch", "Intense itch, hair loss, crusts", "تیز خارش، بال جھڑنا، پپڑی", "skin"),
  s("neuro-kid", "Kid stares up, convulsions, or dies after a feed change", "بچہ اوپر تکے، دورہ، یا چارہ بدلتے ہی مرے", "neuro"),
  s("late-preg", "Last weeks of pregnancy, twins likely, off feed, dull", "حمل کے آخری ہفتے، جڑواں ممکن، چارہ بند", "repro"),
  s("down", "Down, teeth grinding", "گرا پڑا، دانت پیسے", "neuro"),
  s("abortion", "Abortions in the flock", "ریوڑ میں حمل گرتے ہیں", "repro"),
  s("wasting", "Thin despite eating", "کھاتا ہے پھر بھی دبلا", "body"),
  s("diarrhea-green", "Green or dark scour in several animals", "کئی جانوروں میں سبز یا گہرا دست", "dung"),
  s("foot-sores", "Lameness and sores around the mouth or feet", "لنگڑا پن اور منہ یا پاؤں کے زخم", "feet"),
  s("drool", "Drooling", "لعاب بہنا", "feet"),
];

const poultry: Symptom[] = [
  s("twist-neck", "Twisted neck, circling, or paralysis", "گردن مڑی، چکر، یا فالج", "neuro"),
  s("green-drop", "Green diarrhea", "سبز پاخانہ", "dung"),
  s("bloody-drop", "Bloody droppings, young birds", "خونی پاخانہ، جوان چوزے", "dung"),
  s("gasp", "Gasping, rattle, sneezing", "ہانپنا، گھرغراہٹ، چھینک", "breath"),
  s("sudden-flock", "Several birds dead the same day, often the good ones", "ایک دن میں کئی مرغییں مریں، اکثر تندرست", "body"),
  s("drop-eggs", "Egg drop, soft or pale eggs", "انڈے کم، نرم یا پیلے چھلکے", "repro"),
  s("face-swell", "Face or eyes swollen, chronic", "چہرہ یا آنکھ سوجی، پرانا مرض", "breath"),
  s("scabs-comb", "Scabs on comb, wattles or feet", "کلنگی، جھال یا پاؤں پر پپڑی", "skin"),
  s("huddle", "Huddled, sleepy, ruffled feathers", "اکٹھے سمٹے، نیند، پر پھولے", "body"),
  s("vent-peck", "Pecking at the vent, watery diarrhea, 3 to 6 weeks old", "مقعد چونچنا، پتلا پاخانہ، 3 سے 6 ہفتے", "dung"),
  s("pant-heat", "Panting, wings spread, deaths in the hot afternoon", "ہانپنا، پر کھلے، دوپہر کی گرمی میں موت", "breath"),
  s("mites", "Mites on feathers or legs, restless at night", "پر یا ٹانگوں پر جوئیں، رات بے چین", "skin"),
  s("comb-blue", "Comb blue or purple, swelling of head, sudden deaths", "کلنگی نیلی، سر سوجا، اچانک موتیں", "body"),
];

const camel: Symptom[] = [
  s("wasting", "Slow wasting over weeks or months", "ہفتوں یا مہینوں میں دھیرے وزن گرے", "body"),
  s("fever-wave", "Fever that comes and goes", "بخار آئے اور جائے", "breath"),
  s("edema", "Swelling of legs, brisket or belly", "ٹانگوں، سینے یا پیٹ پر سوجن", "body"),
  s("flies", "Heavy biting flies around the herd", "ریوڑ پر کاٹنے والی مکھیاں بہت ہوں", "bug"),
  s("itch", "Hairless itchy crusts, especially legs and belly", "بال گرتے خارشی زخم، خاص کر ٹانگیں اور پیٹ", "skin"),
  s("off-feed", "Off feed during fever spells", "بخار کے دور میں چارہ بند", "eat"),
  s("abortion", "Abortion or weak calf", "حمل گرے یا بچہ کمزور", "repro"),
  s("pale", "Pale membranes", "جھلیاں سفید", "body"),
];

const horse: Symptom[] = [
  s("roll", "Looking at the flank, pawing, rolling", "کوکھ دیکھے، ٹاپ مارے، لوٹے", "eat"),
  s("no-dung", "No dung, tight belly", "پاخانہ بند، پیٹ تنگ", "dung"),
  s("fever", "Fever, dull", "بخار، سست", "breath"),
  s("throat-horse", "Throat swollen, abscess, difficulty swallowing", "گلا سوجا، پھوڑا، نگلنے میں دقت", "breath"),
  s("nasal-pus", "Thick pus from the nose, young horse", "ناک سے گاڑھا پیپ، جوان گھوڑا", "breath"),
  s("stiff-jaw", "Jaw stiff, third eyelid flashes, sawhorse stance, old wound", "جبڑا اکڑا، تیسری پلک چمکے، پرانا زخم", "neuro"),
  s("puncture", "Nail or deep puncture in the last month", "پچھلے مہینے میں کیل یا گہرا زخم", "skin"),
  s("sweat-colic", "Sweating, up and down, pulse hard to find", "پسینہ، بار بار اٹھے بیٹھے، نبض کمزور", "body"),
];

export const SPECIES: Species[] = [
  { id: "wheat", domain: "crop", en: "Wheat", ur: "گندم", symptoms: wheat },
  { id: "rice", domain: "crop", en: "Rice", ur: "دھان", symptoms: rice },
  { id: "cotton", domain: "crop", en: "Cotton", ur: "کپاس", symptoms: cotton },
  { id: "maize", domain: "crop", en: "Maize", ur: "مکئی", symptoms: maize },
  { id: "sugarcane", domain: "crop", en: "Sugarcane", ur: "گنا", symptoms: cane },
  { id: "tomato", domain: "crop", en: "Tomato", ur: "ٹماٹر", symptoms: tomato },
  { id: "potato", domain: "crop", en: "Potato", ur: "آلو", symptoms: potato },
  { id: "chili", domain: "crop", en: "Chilli", ur: "مرچ", symptoms: chili },
  { id: "mango", domain: "crop", en: "Mango", ur: "آم", symptoms: mango },
  { id: "citrus", domain: "crop", en: "Citrus", ur: "کینو / مالٹا", symptoms: citrus },
  { id: "chickpea", domain: "crop", en: "Chickpea", ur: "چنا", symptoms: gram },
  { id: "mustard", domain: "crop", en: "Mustard", ur: "سرسوں", symptoms: mustard },
  { id: "onion", domain: "crop", en: "Onion", ur: "پیاز", symptoms: onion },
  { id: "cattle", domain: "animal", en: "Cattle", ur: "گائے", symptoms: cattle },
  { id: "buffalo", domain: "animal", en: "Buffalo", ur: "بھینس", symptoms: cattle },
  { id: "goat", domain: "animal", en: "Goat", ur: "بکری", symptoms: small },
  { id: "sheep", domain: "animal", en: "Sheep", ur: "بھیڑ", symptoms: small },
  { id: "poultry", domain: "animal", en: "Poultry", ur: "مرغی", symptoms: poultry },
  { id: "camel", domain: "animal", en: "Camel", ur: "اونٹ", symptoms: camel },
  { id: "horse", domain: "animal", en: "Horse", ur: "گھوڑا", symptoms: horse },
];

export function speciesById(id: string) {
  return SPECIES.find((s) => s.id === id);
}
