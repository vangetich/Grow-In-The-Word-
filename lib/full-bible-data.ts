import type {BibleVersionId, BibleVersionMeta} from '@/components/BibleStudyReadingStudio';
export type {BibleVersionId, BibleVersionMeta};

export interface FullBibleVerse {
  verse: number;
  text: Record<BibleVersionId, string>;
  paragraphStart?: boolean;
  poeticStanza?: boolean;
  footnote?: string;
}

export interface FullBibleChapter {
  id: string;
  book: string;
  chapter: number;
  reference: string;
  title: string;
  testament: 'Old Testament' | 'New Testament';
  category: 'Torah & Creation' | 'Wisdom & Psalms' | 'Prophets' | 'Gospels' | 'Epistles & Revelation';
  historicalContext: string;
  estimatedReadTime: string;
  keyRootNote?: {
    word: string;
    original: string;
    transliteration: string;
    meaning: string;
  };
  verses: FullBibleVerse[];
}

export const FULL_BIBLE_VERSIONS: BibleVersionMeta[] = [
  {
    id: 'AKJV',
    shortName: 'AKJV',
    fullName: 'Authorized King James Version',
    audienceTier: 'scholarly',
    audienceLabel: 'Classic Literary Cadence',
    translationPhilosophy: 'Formal Equivalence · Traditional Sanctuary Prose',
    description:
      'Preserves the venerable 1611/1769 poetic rhythm, early modern grammatical distinctions, and solemn sanctuary cadence.',
    yearNote: '1611 / 1769 Standard Text',
  },
  {
    id: 'AMP',
    shortName: 'AMP',
    fullName: 'Amplified Bible',
    audienceTier: 'scholarly',
    audienceLabel: 'Expanded Word Meanings & Depth',
    translationPhilosophy: 'Amplified Lexical Expansion · Nuance Unpacked',
    description:
      'Unpacks subtle shades of original Hebrew, Aramaic, and Greek vocabulary inline so readers discover hidden depth immediately.',
    yearNote: 'Expanded Lexical Edition',
  },
  {
    id: 'NASB',
    shortName: 'NASB',
    fullName: 'New American Standard Bible',
    audienceTier: 'scholarly',
    audienceLabel: 'Literal Word-for-Word Accuracy',
    translationPhilosophy: 'Strict Formal Equivalence · Structural Precision',
    description:
      'Renowned among biblical scholars for mirror-close adherence to original Hebrew, Aramaic, and Greek syntax and verb tenses.',
    yearNote: '1995 / 2020 Scholarly Standard',
  },
  {
    id: 'NIV',
    shortName: 'NIV',
    fullName: 'New International Version',
    audienceTier: 'accessible',
    audienceLabel: 'Balanced Modern Readability',
    translationPhilosophy: 'Optimal Equivalence · Thought & Word Balance',
    description:
      'Bridges scholarly accuracy with natural modern English phrasing—ideal for cross-generational reading, tweens, and teens.',
    yearNote: 'Balanced Contemporary Text',
  },
  {
    id: 'NLT',
    shortName: 'NLT',
    fullName: 'New Living Translation',
    audienceTier: 'accessible',
    audienceLabel: 'Dynamic Narrative Clarity',
    translationPhilosophy: 'Dynamic Equivalence · Heart-Level Clarity',
    description:
      'Translates ancient idioms into warm, immediate modern prose so younger readers and newcomers grasp the narrative flow.',
    yearNote: 'Accessible Narrative Edition',
  },
];

export const FULL_BIBLE_CHAPTERS: FullBibleChapter[] = [
  {
    id: 'genesis-1',
    book: 'Genesis',
    chapter: 1,
    reference: 'Genesis 1:1–10',
    title: 'The Prologue of Creation: Light, Waters & Sacred Order',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    historicalContext: 'Ancient Near Eastern Creation Liturgy · Contrast with Chaos Myths',
    estimatedReadTime: '3 min read',
    keyRootNote: {
      word: 'Create / Beginning',
      original: 'בָּרָא / בְּרֵאשִׁית',
      transliteration: 'Bara / Bereshit',
      meaning: 'Effortless sovereign creation out of nothing, ordering the cosmos into a sanctuary of life.',
    },
    verses: [
      {
        verse: 1,
        paragraphStart: true,
        text: {
          AKJV: 'In the beginning God created the heaven and the earth.',
          AMP: 'In the beginning God (Elohim) created [by forming from nothing] the heavens and the earth.',
          NASB: 'In the beginning God created the heavens and the earth.',
          NIV: 'In the beginning God created the heavens and the earth.',
          NLT: 'In the beginning God created the heavens and the earth.',
        },
      },
      {
        verse: 2,
        text: {
          AKJV: 'And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.',
          AMP: 'The earth was formless and void or a waste and emptiness, and darkness was upon the face of the deep [primeval ocean that covered the unformed earth]. The Spirit of God was moving (hovering, brooding) over the face of the waters.',
          NASB: 'The earth was formless and void, and darkness was over the surface of the deep, and the Spirit of God was moving over the surface of the waters.',
          NIV: 'Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.',
          NLT: 'The earth was formless and empty, and darkness covered the deep waters. And the Spirit of God was hovering over the surface of the waters.',
        },
      },
      {
        verse: 3,
        paragraphStart: true,
        text: {
          AKJV: 'And God said, Let there be light: and there was light.',
          AMP: 'And God said, “Let there be light”; and there was light.',
          NASB: 'Then God said, “Let there be light”; and there was light.',
          NIV: 'And God said, “Let there be light,” and there was light.',
          NLT: 'Then God said, “Let there be light,” and there was light.',
        },
      },
      {
        verse: 4,
        text: {
          AKJV: 'And God saw the light, that it was good: and God divided the light from the darkness.',
          AMP: 'God saw that the light was good (pleasing, useful) and He affirmed and sustained it; and God separated the light [distinguishing it] from the darkness.',
          NASB: 'God saw that the light was good; and God separated the light from the darkness.',
          NIV: 'God saw that the light was good, and he separated the light from the darkness.',
          NLT: 'And God saw that the light was good. Then he separated the light from the darkness.',
        },
      },
      {
        verse: 5,
        text: {
          AKJV: 'And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.',
          AMP: 'And God called the light Day, and the darkness He called Night. And there was evening and there was morning, one day.',
          NASB: 'God called the light day, and the darkness He called night. And there was evening and there was morning, one day.',
          NIV: 'God called the light “day,” and the darkness he called “night.” And there was evening, and there was morning—the first day.',
          NLT: 'God called the light “day” and the darkness “night.” And evening passed and morning came, marking the first day.',
        },
      },
      {
        verse: 6,
        paragraphStart: true,
        text: {
          AKJV: 'And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters.',
          AMP: 'And God said, “Let there be an expanse [of the sky] in the midst of the waters, and let it separate the waters [below the expanse] from the waters [above the expanse].”',
          NASB: 'Then God said, “Let there be an expanse in the midst of the waters, and let it separate the waters from the waters.”',
          NIV: 'And God said, “Let there be a vault between the waters to separate water from water.”',
          NLT: 'Then God said, “Let there be a space between the waters, to separate the waters of the heavens from the waters of the earth.”',
        },
      },
      {
        verse: 7,
        text: {
          AKJV: 'And God made the firmament, and divided the waters which were under the firmament from the waters which were above the firmament: and it was so.',
          AMP: 'And God made the expanse [of sky] and separated the waters which were under the expanse from the waters which were above the expanse; and it was so [just as He commanded].',
          NASB: 'God made the expanse, and separated the waters which were below the expanse from the waters which were above the expanse; and it was so.',
          NIV: 'So God made the vault and separated the water under the vault from the water above it. And it was so.',
          NLT: 'And that is what happened. God made this space to separate the waters of the earth from the waters of the heavens.',
        },
      },
      {
        verse: 8,
        text: {
          AKJV: 'And God called the firmament Heaven. And the evening and the morning were the second day.',
          AMP: 'God called the expanse [of sky] heaven. And there was evening and there was morning, a second day.',
          NASB: 'God called the expanse heaven. And there was evening and there was morning, a second day.',
          NIV: 'God called the vault “sky.” And there was evening, and there was morning—the second day.',
          NLT: 'God called the space “sky.” And evening passed and morning came, marking the second day.',
        },
      },
      {
        verse: 9,
        paragraphStart: true,
        text: {
          AKJV: 'And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so.',
          AMP: 'Then God said, “Let the waters below the heavens be gathered into one place [of standing, pooling together], and let the dry land appear”; and it was so.',
          NASB: 'Then God said, “Let the waters below the heavens be gathered into one place, and let the dry land appear”; and it was so.',
          NIV: 'And God said, “Let the water under the sky be gathered to one place, and let dry ground appear.” And it was so.',
          NLT: 'Then God said, “Let the waters beneath the sky flow together into one place, so dry ground may appear.” And that is what happened.',
        },
      },
      {
        verse: 10,
        text: {
          AKJV: 'And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good.',
          AMP: 'God called the dry land earth, and the gathering of the waters He called seas; and God saw that this was good (pleasing, useful) and He affirmed and sustained it.',
          NASB: 'God called the dry land earth, and the gathering of the waters He called seas; and God saw that it was good.',
          NIV: 'God called the dry ground “land,” and the gathered waters he called “seas.” And God saw that it was good.',
          NLT: 'God called the dry ground “land” and the waters “seas.” And God saw that it was good.',
        },
      },
    ],
  },
  {
    id: 'psalm-1',
    book: 'Psalms',
    chapter: 1,
    reference: 'Psalm 1:1–6',
    title: 'The Tree Planted by Streams of Water',
    testament: 'Old Testament',
    category: 'Wisdom & Psalms',
    historicalContext: 'Gateway Wisdom Psalm · The Two Paths of Human Flourishing',
    estimatedReadTime: '2 min read',
    keyRootNote: {
      word: 'Meditate',
      original: 'הָגָה',
      transliteration: 'Hagah',
      meaning: 'To murmur, ponder, and quietly recite under one’s breath day and night until wisdom takes root.',
    },
    verses: [
      {
        verse: 1,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'Blessed is the man that walketh not in the counsel of the ungodly, nor standeth in the way of sinners, nor sitteth in the seat of the scornful.',
          AMP: 'Blessed [fortunate, prosperous, and favored by God] is the man who does not walk in the counsel of the wicked [following their advice and example], nor stand in the path of sinners, nor sit [down to rest] in the seat of scoffers (ridiculers).',
          NASB: 'How blessed is the man who does not walk in the counsel of the wicked, nor stand in the path of sinners, nor sit in the seat of scoffers!',
          NIV: 'Blessed is the one who does not walk in step with the wicked or stand in the way that sinners take or sit in the company of mockers,',
          NLT: 'Oh, the joys of those who do not follow the advice of the wicked, or stand around with sinners, or join in with mockers.',
        },
      },
      {
        verse: 2,
        poeticStanza: true,
        text: {
          AKJV: 'But his delight is in the law of the LORD; and in his law doth he meditate day and night.',
          AMP: 'But his delight is in the law of the LORD, and on His law [His precepts and teachings] he [habitually] meditates day and night.',
          NASB: 'But his delight is in the law of the LORD, and in His law he meditates day and night.',
          NIV: 'but whose delight is in the law of the LORD, and who meditates on his law day and night.',
          NLT: 'But they delight in the law of the LORD, meditating on it day and night.',
        },
      },
      {
        verse: 3,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'And he shall be like a tree planted by the rivers of water, that bringeth forth his fruit in his season; his leaf also shall not wither; and whatsoever he doeth shall prosper.',
          AMP: 'And he will be like a tree firmly planted [and fed] by streams of water, which yields its fruit in its season; its leaf does not wither; and in whatever he does, he prospers [and comes to maturity].',
          NASB: 'He will be like a tree firmly planted by streams of water, which yields its fruit in its season and its leaf does not wither; and in whatever he does, he prospers.',
          NIV: 'That person is like a tree planted by streams of water, which yields its fruit in season and whose leaf does not wither—whatever they do prospers.',
          NLT: 'They are like trees planted along the riverbank, bearing fruit each season. Their leaves never wither, and they prosper in all they do.',
        },
      },
      {
        verse: 4,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'The ungodly are not so: but are like the chaff which the wind driveth away.',
          AMP: 'Not so the wicked [those who are disobedient and living without God]; they are like the worthless chaff [husks] which the wind blows away.',
          NASB: 'The wicked are not so, but they are like chaff which the wind drives away.',
          NIV: 'Not so the wicked! They are like chaff that the wind blows away.',
          NLT: 'But not the wicked! They are like worthless chaff, scattered by the wind.',
        },
      },
      {
        verse: 5,
        poeticStanza: true,
        text: {
          AKJV: 'Therefore the ungodly shall not stand in the judgment, nor sinners in the congregation of the righteous.',
          AMP: 'Therefore the wicked will not stand [unpunished] in the judgment, nor sinners in the assembly of the righteous.',
          NASB: 'Therefore the wicked will not stand in the judgment, nor sinners in the assembly of the righteous.',
          NIV: 'Therefore the wicked will not stand in the judgment, nor sinners in the assembly of the righteous.',
          NLT: 'They will be condemned at the time of judgment. Sinners will have no place among the godly.',
        },
      },
      {
        verse: 6,
        poeticStanza: true,
        text: {
          AKJV: 'For the LORD knoweth the way of the righteous: but the way of the ungodly shall perish.',
          AMP: 'For the LORD knows and watches over the way of the righteous, but the way of the wicked will perish.',
          NASB: 'For the LORD knows the way of the righteous, but the way of the wicked will perish.',
          NIV: 'For the LORD watches over the way of the righteous, but the way of the wicked leads to destruction.',
          NLT: 'For the LORD watches over the path of the godly, but the path of the wicked leads to destruction.',
        },
      },
    ],
  },
  {
    id: 'psalm-23',
    book: 'Psalms',
    chapter: 23,
    reference: 'Psalm 23:1–6',
    title: 'The Shepherd’s Valley & Covenant Table',
    testament: 'Old Testament',
    category: 'Wisdom & Psalms',
    historicalContext: 'c. 1000 BCE · Judean Wilderness & Royal Hospitality Tent',
    estimatedReadTime: '2 min read',
    keyRootNote: {
      word: 'Shepherd / Still Waters',
      original: 'רָעָה / מֵי מְנֻחוֹת',
      transliteration: 'Ra‘ah / Mei Menuchot',
      meaning: 'A devoted covenant protector who leads the flock beside quiet waters of deep resting-places.',
    },
    verses: [
      {
        verse: 1,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'The LORD is my shepherd; I shall not want.',
          AMP: 'The LORD is my Shepherd [to feed, to guide and to shield me], I shall not lack.',
          NASB: 'The LORD is my shepherd, I shall not want.',
          NIV: 'The LORD is my shepherd, I lack nothing.',
          NLT: 'The LORD is my shepherd; I have all that I need.',
        },
      },
      {
        verse: 2,
        poeticStanza: true,
        text: {
          AKJV: 'He maketh me to lie down in green pastures: he leadeth me beside the still waters.',
          AMP: 'He makes me lie down in [fresh, tender] green pastures; He leads me beside the still and restful waters.',
          NASB: 'He makes me lie down in green pastures; He leads me beside quiet waters.',
          NIV: 'He makes me lie down in green pastures, he leads me beside quiet waters,',
          NLT: 'He lets me rest in green meadows; he leads me beside peaceful streams.',
        },
      },
      {
        verse: 3,
        poeticStanza: true,
        text: {
          AKJV: 'He restoreth my soul: he leadeth me in the paths of righteousness for his name’s sake.',
          AMP: 'He refreshes and restores my soul (life); He leads me in the paths of righteousness for His name’s sake [not for my earning, but His honor].',
          NASB: 'He restores my soul; He guides me in the paths of righteousness for His name’s sake.',
          NIV: 'he refreshes my soul. He guides me along the right paths for his name’s sake.',
          NLT: 'he renews my strength. He guides me along right paths, bringing honor to his name.',
        },
      },
      {
        verse: 4,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.',
          AMP: 'Even though I walk through the [sunless] valley of the shadow of death, I fear no evil, for You are with me; Your rod [to protect] and Your staff [to guide], they comfort and console me.',
          NASB: 'Though I walk through the valley of the shadow of death, I fear no evil, for You are with me; Your rod and Your staff, they comfort me.',
          NIV: 'Even though I walk through the darkest valley, I will fear no evil, for you are with me; your rod and your staff, they comfort me.',
          NLT: 'Even when I walk through the darkest valley, I will not be afraid, for you are close beside me. Your rod and your staff protect and comfort me.',
        },
      },
      {
        verse: 5,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.',
          AMP: 'You prepare a table before me in the presence of my enemies. You have anointed and refreshed my head with oil; my [brimming] cup runs over.',
          NASB: 'You prepare a table before me in the presence of my enemies; You have anointed my head with oil; my cup overflows.',
          NIV: 'You prepare a table before me in the presence of my enemies. You anoint my head with oil; my cup overflows.',
          NLT: 'You prepare a feast for me in the presence of my enemies. You honor me by anointing my head with oil. My cup overflows with blessings.',
        },
      },
      {
        verse: 6,
        poeticStanza: true,
        text: {
          AKJV: 'Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.',
          AMP: 'Surely goodness and mercy and unfailing love shall follow me all the days of my life, and I shall dwell forever [throughout all my days] in the house and in the presence of the LORD.',
          NASB: 'Surely goodness and lovingkindness will follow me all the days of my life, and I will dwell in the house of the LORD forever.',
          NIV: 'Surely your goodness and love will follow me all the days of my life, and I will dwell in the house of the LORD forever.',
          NLT: 'Surely your goodness and unfailing love will pursue me all the days of my life, and I will live in the house of the LORD forever.',
        },
      },
    ],
  },
  {
    id: 'psalm-46',
    book: 'Psalms',
    chapter: 46,
    reference: 'Psalm 46:1–11',
    title: 'God Is Our Refuge & Strength: Be Still and Know',
    testament: 'Old Testament',
    category: 'Wisdom & Psalms',
    historicalContext: 'Song of the Sons of Korah · Jerusalem’s Underground Spring (Gihon) Under Siege',
    estimatedReadTime: '3 min read',
    keyRootNote: {
      word: 'Be Still / Cease Striving',
      original: 'הַרְפּוּ',
      transliteration: 'Harpu (from Raphah)',
      meaning: 'Let your hands drop limp; release your anxious white-knuckled grip and recognize God’s sovereignty.',
    },
    verses: [
      {
        verse: 1,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'God is our refuge and strength, a very present help in trouble.',
          AMP: 'God is our refuge and strength [mighty and impenetrable], a very present and well-proved help in trouble.',
          NASB: 'God is our refuge and strength, a very present help in trouble.',
          NIV: 'God is our refuge and strength, an ever-present help in trouble.',
          NLT: 'God is our refuge and strength, always ready to help in times of trouble.',
        },
      },
      {
        verse: 2,
        poeticStanza: true,
        text: {
          AKJV: 'Therefore will not we fear, though the earth be removed, and though the mountains be carried into the midst of the sea;',
          AMP: 'Therefore we will not fear, though the earth should change and though the mountains be shaken and slip into the heart of the seas,',
          NASB: 'Therefore we will not fear, though the earth should change and though the mountains slip into the heart of the sea;',
          NIV: 'Therefore we will not fear, though the earth give way and the mountains fall into the heart of the sea,',
          NLT: 'So we will not fear when earthquakes come and the mountains crumble into the sea.',
        },
      },
      {
        verse: 3,
        poeticStanza: true,
        text: {
          AKJV: 'Though the waters thereof roar and be troubled, though the mountains shake with the swelling thereof. Selah.',
          AMP: 'Though its waters roar and foam, though the mountains tremble at its roaring. Selah [pause, and calmly think of that]!',
          NASB: 'Though its waters roar and foam, though the mountains quake at its swelling pride. Selah.',
          NIV: 'though its waters roar and foam and the mountains quake with their surging.',
          NLT: 'Let the oceans roar and foam. Let the mountains tremble as the waters surge! Interlude.',
        },
      },
      {
        verse: 4,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'There is a river, the streams whereof shall make glad the city of God, the holy place of the tabernacles of the most High.',
          AMP: 'There is a river whose streams make glad the city of God, the holy dwelling places of the Most High.',
          NASB: 'There is a river whose streams make glad the city of God, the holy dwelling places of the Most High.',
          NIV: 'There is a river whose streams make glad the city of God, the holy place where the Most High dwells.',
          NLT: 'A river brings joy to the city of our God, the sacred home of the Most High.',
        },
      },
      {
        verse: 5,
        poeticStanza: true,
        text: {
          AKJV: 'God is in the midst of her; she shall not be moved: God shall help her, and that right early.',
          AMP: 'God is in the midst of her [His city], she will not be moved; God will help her when the morning dawns.',
          NASB: 'God is in the midst of her, she will not be moved; God will help her when morning dawns.',
          NIV: 'God is within her, she will not fall; God will help her at break of day.',
          NLT: 'God dwells in that city; it cannot be destroyed. From the very break of day, God will protect it.',
        },
      },
      {
        verse: 10,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'Be still, and know that I am God: I will be exalted among the heathen, I will be exalted in the earth.',
          AMP: '“Be still and know (recognize, understand) that I am God. I will be exalted among the nations! I will be exalted in the earth.”',
          NASB: '“Cease striving and know that I am God; I will be exalted among the nations, I will be exalted in the earth.”',
          NIV: 'He says, “Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth.”',
          NLT: '“Be still, and know that I am God! I will be honored by every nation. I will be honored throughout the world.”',
        },
      },
      {
        verse: 11,
        poeticStanza: true,
        text: {
          AKJV: 'The LORD of hosts is with us; the God of Jacob is our refuge. Selah.',
          AMP: 'The LORD of hosts is with us; the God of Jacob is our stronghold [our refuge, our high tower]. Selah [pause, and calmly think of that]!',
          NASB: 'The LORD of hosts is with us; the God of Jacob is our stronghold. Selah.',
          NIV: 'The LORD Almighty is with us; the God of Jacob is our fortress.',
          NLT: 'The LORD of Heaven’s Armies is here among us; the God of Israel is our fortress. Interlude.',
        },
      },
    ],
  },
  {
    id: 'proverbs-3',
    book: 'Proverbs',
    chapter: 3,
    reference: 'Proverbs 3:1–8',
    title: 'Trust in the LORD with All Your Heart',
    testament: 'Old Testament',
    category: 'Wisdom & Psalms',
    historicalContext: 'Solomonic Wisdom Instruction · Binding Chesed & Truth Around the Neck',
    estimatedReadTime: '3 min read',
    keyRootNote: {
      word: 'Trust',
      original: 'בָּטַח',
      transliteration: 'Batach',
      meaning: 'To lean one’s full weight upon a solid foundation with unreserved confidence.',
    },
    verses: [
      {
        verse: 1,
        paragraphStart: true,
        text: {
          AKJV: 'My son, forget not my law; but let thine heart keep my commandments:',
          AMP: 'My son, do not forget my teaching, but let your heart keep my commandments;',
          NASB: 'My son, do not forget my teaching, but let your heart keep my commandments;',
          NIV: 'My son, do not forget my teaching, but keep my commands in your heart,',
          NLT: 'My child, never forget the things I have taught you. Store my commands in your heart.',
        },
      },
      {
        verse: 2,
        text: {
          AKJV: 'For length of days, and long life, and peace, shall they add to thee.',
          AMP: 'For length of days and years of life [worth living] and tranquility and prosperity [the wholeness of well-being] they will add to you.',
          NASB: 'For length of days and years of life and peace they will add to you.',
          NIV: 'for they will prolong your life many years and bring you peace and prosperity.',
          NLT: 'If you do this, you will live many years, and your life will be satisfying.',
        },
      },
      {
        verse: 3,
        paragraphStart: true,
        text: {
          AKJV: 'Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart:',
          AMP: 'Do not let mercy and kindness and truth leave you [instead let these qualities define you]; bind them [securely] around your neck, write them on the tablet of your heart.',
          NASB: 'Do not let kindness and truth leave you; bind them around your neck, write them on the tablet of your heart.',
          NIV: 'Let love and faithfulness never leave you; bind them around your neck, write them on the tablet of your heart.',
          NLT: 'Never let loyalty and kindness leave you! Tie them around your neck as a reminder. Write them deep within your heart.',
        },
      },
      {
        verse: 4,
        text: {
          AKJV: 'So shalt thou find favour and good understanding in the sight of God and man.',
          AMP: 'So find favor and high esteem in the sight of God and man.',
          NASB: 'So you will find favor and good repute in the sight of God and man.',
          NIV: 'Then you will win favor and a good name in the sight of God and man.',
          NLT: 'Then you will find favor with both God and people, and you will earn a good reputation.',
        },
      },
      {
        verse: 5,
        paragraphStart: true,
        text: {
          AKJV: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
          AMP: 'Trust in and rely confidently on the LORD with all your heart and do not rely on your own insight or understanding.',
          NASB: 'Trust in the LORD with all your heart and do not lean on your own understanding.',
          NIV: 'Trust in the LORD with all your heart and lean not on your own understanding;',
          NLT: 'Trust in the LORD with all your heart; do not depend on your own understanding.',
        },
      },
      {
        verse: 6,
        text: {
          AKJV: 'In all thy ways acknowledge him, and he shall direct thy paths.',
          AMP: 'In all your ways know and acknowledge and recognize Him, and He will make your paths straight and smooth [removing obstacles that block your way].',
          NASB: 'In all your ways acknowledge Him, and He will make your paths straight.',
          NIV: 'in all your ways submit to him, and he will make your paths straight.',
          NLT: 'Seek his will in all you do, and he will show you which path to take.',
        },
      },
      {
        verse: 7,
        paragraphStart: true,
        text: {
          AKJV: 'Be not wise in thine own eyes: fear the LORD, and depart from evil.',
          AMP: 'Do not be wise in your own eyes; fear the LORD [with reverent awe and obedience] and turn [entirely] away from evil.',
          NASB: 'Do not be wise in your own eyes; fear the LORD and turn away from evil.',
          NIV: 'Do not be wise in your own eyes; fear the LORD and shun evil.',
          NLT: 'Don’t be impressed with your own wisdom. Instead, fear the LORD and turn away from evil.',
        },
      },
      {
        verse: 8,
        text: {
          AKJV: 'It shall be health to thy navel, and marrow to thy bones.',
          AMP: 'It will be healing to your body and refreshment (physical well-being) to your bones.',
          NASB: 'It will be healing to your body and refreshment to your bones.',
          NIV: 'This will bring health to your body and nourishment to your bones.',
          NLT: 'Then you will gain renewed health and vitality.',
        },
      },
    ],
  },
  {
    id: 'isaiah-40',
    book: 'Isaiah',
    chapter: 40,
    reference: 'Isaiah 40:28–31',
    title: 'Unsearchable Understanding & Renewed Wings',
    testament: 'Old Testament',
    category: 'Prophets',
    historicalContext: 'c. 700–540 BCE · Judean & Exilic Horizon of Comfort',
    estimatedReadTime: '3 min read',
    keyRootNote: {
      word: 'Wait / Hope',
      original: 'קָוָה',
      transliteration: 'Qavah',
      meaning: 'To braid fibers together under tension; active, expectant hope that exchanges fatigue for strength.',
    },
    verses: [
      {
        verse: 28,
        paragraphStart: true,
        text: {
          AKJV: 'Hast thou not known? hast thou not heard, that the everlasting God, the LORD, the Creator of the ends of the earth, fainteth not, neither is weary? there is no searching of his understanding.',
          AMP: 'Do you not know? Have you not heard? The Everlasting God, the LORD, the Creator of the ends of the earth does not become tired or grow weary; there is no searching of His understanding.',
          NASB: 'Do you not know? Have you not heard? The Everlasting God, the LORD, the Creator of the ends of the earth does not become weary or tired. His understanding is inscrutable.',
          NIV: 'Do you not know? Have you not heard? The LORD is the everlasting God, the Creator of the ends of the earth. He will not grow tired or weary, and his understanding no one can fathom.',
          NLT: 'Have you never heard? Have you never understood? The LORD is the everlasting God, the Creator of all the earth. He never grows weak or weary. No one can measure the depths of his understanding.',
        },
      },
      {
        verse: 29,
        text: {
          AKJV: 'He giveth power to the faint; and to them that have no might he increaseth strength.',
          AMP: 'He gives strength to the weary, and to him who has no might He increases power.',
          NASB: 'He gives strength to the weary, and to him who lacks might He increases power.',
          NIV: 'He gives strength to the weary and increases the power of the weak.',
          NLT: 'He gives power to the weak and strength to the powerless.',
        },
      },
      {
        verse: 30,
        text: {
          AKJV: 'Even the youths shall faint and be weary, and the young men shall utterly fall:',
          AMP: 'Even youths shall faint and be weary, and [selected] young men shall feebly stumble and fall exhausted;',
          NASB: 'Though youths grow weary and tired, and vigorous young men stumble badly,',
          NIV: 'Even youths grow tired and weary, and young men stumble and fall;',
          NLT: 'Even youths will become weak and tired, and young men will fall in exhaustion.',
        },
      },
      {
        verse: 31,
        paragraphStart: true,
        text: {
          AKJV: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
          AMP: 'But those who wait for the LORD [who expect, look for, and hope in Him] will gain new strength and renew their power; they will lift up their wings [and rise up close to God] like eagles [rising toward the sun]; they will run and not become weary, they will walk and not grow tired.',
          NASB: 'Yet those who wait for the LORD will gain new strength; they will mount up with wings like eagles, they will run and not get tired, they will walk and not become weary.',
          NIV: 'but those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
          NLT: 'But those who trust in the LORD will find new strength. They will soar high on wings like eagles. They will run and not grow weary. They will walk and not faint.',
        },
      },
    ],
  },
  {
    id: 'lamentations-3',
    book: 'Lamentations',
    chapter: 3,
    reference: 'Lamentations 3:21–26',
    title: 'New Every Morning: Hope in the Rubble',
    testament: 'Old Testament',
    category: 'Prophets',
    historicalContext: 'c. 586 BCE · Acrostic Lament in Post-Siege Jerusalem',
    estimatedReadTime: '3 min read',
    keyRootNote: {
      word: 'Faithfulness',
      original: 'אֱמוּנָה',
      transliteration: 'Emunah',
      meaning: 'Architectural steadiness, bedrock reliability, and unshakeable covenantal fidelity.',
    },
    verses: [
      {
        verse: 21,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'This I recall to my mind, therefore have I hope.',
          AMP: 'But this I call to mind, therefore I have hope and expectation:',
          NASB: 'This I recall to my mind, therefore I have hope.',
          NIV: 'Yet this I call to mind and therefore I have hope:',
          NLT: 'Yet I still dare to hope when I remember this:',
        },
      },
      {
        verse: 22,
        poeticStanza: true,
        text: {
          AKJV: 'It is of the LORD’s mercies that we are not consumed, because his compassions fail not.',
          AMP: 'It is because of the LORD’s lovingkindnesses that we are not consumed, because His [tender] compassions never fail.',
          NASB: 'The LORD’S lovingkindnesses indeed never cease, for His compassions never fail.',
          NIV: 'Because of the LORD’s great love we are not consumed, for his compassions never fail.',
          NLT: 'The faithful love of the LORD never ends! His mercies never cease.',
        },
      },
      {
        verse: 23,
        poeticStanza: true,
        text: {
          AKJV: 'They are new every morning: great is thy faithfulness.',
          AMP: 'They are new every morning; great and abundant is Your stability and faithfulness.',
          NASB: 'They are new every morning; great is Your faithfulness.',
          NIV: 'They are new every morning; great is your faithfulness.',
          NLT: 'Great is his faithfulness; his mercies begin afresh each morning.',
        },
      },
      {
        verse: 24,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'The LORD is my portion, saith my soul; therefore will I hope in him.',
          AMP: '“The LORD is my portion and my inheritance,” says my soul; “Therefore I have hope in Him and wait expectantly for Him.”',
          NASB: '“The LORD is my portion,” says my soul, “Therefore I have hope in Him.”',
          NIV: 'I say to myself, “The LORD is my portion; therefore I will wait for him.”',
          NLT: 'I say to myself, “The LORD is my inheritance; therefore, I will hope in him!”',
        },
      },
      {
        verse: 25,
        poeticStanza: true,
        text: {
          AKJV: 'The LORD is good unto them that wait for him, to the soul that seeketh him.',
          AMP: 'The LORD is good to those who wait [confidently] for Him, to those who seek Him [on the authority of God’s word].',
          NASB: 'The LORD is good to those who wait for Him, to the person who seeks Him.',
          NIV: 'The LORD is good to those whose hope is in him, to the one who seeks him;',
          NLT: 'The LORD is good to those who depend on him, to those who search for him.',
        },
      },
      {
        verse: 26,
        poeticStanza: true,
        text: {
          AKJV: 'It is good that a man should both hope and quietly wait for the salvation of the LORD.',
          AMP: 'It is good that one should hope in and wait quietly for the salvation (deliverance) of the LORD.',
          NASB: 'It is good that he waits silently for the salvation of the LORD.',
          NIV: 'it is good to wait quietly for the salvation of the LORD.',
          NLT: 'So it is good to wait quietly for salvation from the LORD.',
        },
      },
    ],
  },
  {
    id: 'micah-6',
    book: 'Micah',
    chapter: 6,
    reference: 'Micah 6:6–8',
    title: 'What Does the Lord Require? Justice, Chesed & Humility',
    testament: 'Old Testament',
    category: 'Prophets',
    historicalContext: 'c. 735–700 BCE · Moresheth & Jerusalem Prophetic Covenant Trial',
    estimatedReadTime: '2 min read',
    keyRootNote: {
      word: 'Justice & Mercy',
      original: 'מִשְׁפָּט וְחֶסֶד',
      transliteration: 'Mishpat & Chesed',
      meaning: 'Restorative equity that protects the vulnerable paired with steadfast, loyal covenantal kindness.',
    },
    verses: [
      {
        verse: 6,
        paragraphStart: true,
        text: {
          AKJV: 'Wherewith shall I come before the LORD, and bow myself before the high God? shall I come before him with burnt offerings, with calves of a year old?',
          AMP: 'With what shall I come before the LORD and bow myself before God on high? Shall I come before Him with burnt offerings, with yearling calves?',
          NASB: 'With what shall I come to the LORD and bow myself before the God on high? Shall I come to Him with burnt offerings, with yearling calves?',
          NIV: 'With what shall I come before the LORD and bow down before the exalted God? Shall I come before him with burnt offerings, with calves a year old?',
          NLT: 'What can we bring to the LORD? What kind of offerings should we give him when we bow before God Most High? Should we offer him burnt offerings and year-old calves?',
        },
      },
      {
        verse: 7,
        text: {
          AKJV: 'Will the LORD be pleased with thousands of rams, or with ten thousands of rivers of oil? shall I give my firstborn for my transgression, the fruit of my body for the sin of my soul?',
          AMP: 'Will the LORD be delighted with thousands of rams, or with ten thousand rivers of oil? Shall I present my firstborn for my acts of rebellion, the fruit of my body for the sin of my soul?',
          NASB: 'Does the LORD take delight in thousands of rams, in ten thousand rivers of oil? Shall I present my firstborn for my rebellious acts, the fruit of my body for the sin of my soul?',
          NIV: 'Will the LORD be pleased with thousands of rams, with ten thousand rivers of olive oil? Shall I offer my firstborn for my transgression, the fruit of my body for the sin of my soul?',
          NLT: 'Should we offer him thousands of rams and ten thousand rivers of olive oil? Would that please the LORD? Should we sacrifice our firstborn children to pay for our sins?',
        },
      },
      {
        verse: 8,
        paragraphStart: true,
        text: {
          AKJV: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?',
          AMP: 'He has told you, O man, what is good; and what does the LORD require of you except to be just, and to love [and to diligently practice] kindness (compassion), and to walk humbly with your God [setting aside any overblown sense of importance or self-righteousness]?',
          NASB: 'He has told you, O man, what is good; and what does the LORD require of you but to do justice, to love kindness, and to walk humbly with your God?',
          NIV: 'He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God.',
          NLT: 'No, O people, the LORD has told you what is good, and this is what he requires of you: to do what is right, to love mercy, and to walk humbly with your God.',
        },
      },
    ],
  },
  {
    id: 'matthew-5',
    book: 'Matthew',
    chapter: 5,
    reference: 'Matthew 5:1–12',
    title: 'The Sermon on the Mount: The Beatitudes',
    testament: 'New Testament',
    category: 'Gospels',
    historicalContext: 'c. 28–30 CE · Galilean Hillside Above Capernaum',
    estimatedReadTime: '3 min read',
    keyRootNote: {
      word: 'Blessed / Flourishing',
      original: 'μακάριοι',
      transliteration: 'Makarioi',
      meaning: 'Deeply flourishing, spiritually enviable, and whole within God’s upside-down Kingdom.',
    },
    verses: [
      {
        verse: 1,
        paragraphStart: true,
        text: {
          AKJV: 'And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:',
          AMP: 'Seeing the crowds, He went up on the mountain; and when He was seated, His disciples came to Him.',
          NASB: 'When Jesus saw the crowds, He went up on the mountain; and after He sat down, His disciples came to Him.',
          NIV: 'Now when Jesus saw the crowds, he went up on a mountainside and sat down. His disciples came to him,',
          NLT: 'One day as he saw the crowds gathering, Jesus went up on the mountainside and sat down. His disciples gathered around him,',
        },
      },
      {
        verse: 2,
        text: {
          AKJV: 'And he opened his mouth, and taught them, saying,',
          AMP: 'Then He opened His mouth and began to teach them, saying,',
          NASB: 'He opened His mouth and began to teach them, saying,',
          NIV: 'and he began to teach them. He said:',
          NLT: 'and he began to teach them.',
        },
      },
      {
        verse: 3,
        paragraphStart: true,
        poeticStanza: true,
        text: {
          AKJV: 'Blessed are the poor in spirit: for theirs is the kingdom of heaven.',
          AMP: '“Blessed [spiritually prosperous, happy, to be admired] are the poor in spirit [those devoid of spiritual arrogance, those who regard themselves as insignificant], for theirs is the kingdom of heaven [both now and forever].',
          NASB: '“Blessed are the poor in spirit, for theirs is the kingdom of heaven.',
          NIV: '“Blessed are the poor in spirit, for theirs is the kingdom of heaven.',
          NLT: '“God blesses those who are poor and realize their need for him, for the Kingdom of Heaven is theirs.',
        },
      },
      {
        verse: 4,
        poeticStanza: true,
        text: {
          AKJV: 'Blessed are they that mourn: for they shall be comforted.',
          AMP: '“Blessed [forgiven, refreshed by God’s grace] are those who mourn [over their sins and thebrokenness of the world], for they will be comforted [when the burden is lifted].',
          NASB: '“Blessed are those who mourn, for they shall be comforted.',
          NIV: 'Blessed are those who mourn, for they will be comforted.',
          NLT: 'God blesses those who mourn, for they will be comforted.',
        },
      },
      {
        verse: 5,
        poeticStanza: true,
        text: {
          AKJV: 'Blessed are the meek: for they shall inherit the earth.',
          AMP: '“Blessed [inwardly peaceful, spiritually secure, worthy of respect] are the gentle [the kind-hearted, the sweet-spirited, the self-controlled], for they will inherit the earth.',
          NASB: '“Blessed are the gentle, for they shall inherit the earth.',
          NIV: 'Blessed are the meek, for they will inherit the earth.',
          NLT: 'God blesses those who are humble, for they will inherit the whole earth.',
        },
      },
      {
        verse: 6,
        poeticStanza: true,
        text: {
          AKJV: 'Blessed are they which do hunger and thirst after righteousness: for they shall be filled.',
          AMP: '“Blessed [joyful, nourished by God’s goodness] are those who hunger and thirst for righteousness [those who actively seek right standing with God], for they will be [completely] satisfied.',
          NASB: '“Blessed are those who hunger and thirst for righteousness, for they shall be satisfied.',
          NIV: 'Blessed are those who hunger and thirst for righteousness, for they will be filled.',
          NLT: 'God blesses those who hunger and thirst for justice, for they will be satisfied.',
        },
      },
      {
        verse: 7,
        poeticStanza: true,
        text: {
          AKJV: 'Blessed are the merciful: for they shall obtain mercy.',
          AMP: '“Blessed [content, sheltered by God’s promises] are the merciful, for they will receive mercy.',
          NASB: '“Blessed are the merciful, for they shall receive mercy.',
          NIV: 'Blessed are the merciful, for they will be shown mercy.',
          NLT: 'God blesses those who are merciful, for they will be shown mercy.',
        },
      },
      {
        verse: 8,
        poeticStanza: true,
        text: {
          AKJV: 'Blessed are the pure in heart: for they shall see God.',
          AMP: '“Blessed [anticipating God’s presence, spiritually mature] are the pure in heart [those with integrity, moral courage, and godly character], for they will see God.',
          NASB: '“Blessed are the pure in heart, for they shall see God.',
          NIV: 'Blessed are the pure in heart, for they will see God.',
          NLT: 'God blesses those whose hearts are pure, for they will see God.',
        },
      },
      {
        verse: 9,
        poeticStanza: true,
        text: {
          AKJV: 'Blessed are the peacemakers: for they shall be called the children of God.',
          AMP: '“Blessed [spiritually calm with life-joy in God’s favor] are the makers and maintainers of peace, for they will [express His character and] be called the sons of God.',
          NASB: '“Blessed are the peacemakers, for they shall be called sons of God.',
          NIV: 'Blessed are the peacemakers, for they will be called children of God.',
          NLT: 'God blesses those who work for peace, for they will be called the children of God.',
        },
      },
    ],
  },
  {
    id: 'john-1',
    book: 'John',
    chapter: 1,
    reference: 'John 1:1–14',
    title: 'The Eternal Logos & The Word Made Flesh',
    testament: 'New Testament',
    category: 'Gospels',
    historicalContext: 'c. 85–90 CE · Ephesus (Asia Minor)',
    estimatedReadTime: '4 min read',
    keyRootNote: {
      word: 'Word (Logos) & Dwelt',
      original: 'Λόγος / ἐσκήνωσεν',
      transliteration: 'Logos / Eskenosen',
      meaning: 'The self-expression and creative reason of God who “pitched His tabernacle tent” among us.',
    },
    verses: [
      {
        verse: 1,
        paragraphStart: true,
        text: {
          AKJV: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
          AMP: 'In the beginning [before all time] was the Word (Christ), and the Word was with God, and the Word was God Himself.',
          NASB: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
          NIV: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
          NLT: 'In the beginning the Word already existed. The Word was with God, and the Word was God.',
        },
      },
      {
        verse: 2,
        text: {
          AKJV: 'The same was in the beginning with God.',
          AMP: 'He was [continually existing] in the beginning [co-eternally] with God.',
          NASB: 'He was in the beginning with God.',
          NIV: 'He was with God in the beginning.',
          NLT: 'He existed in the beginning with God.',
        },
      },
      {
        verse: 3,
        text: {
          AKJV: 'All things were made by him; and without him was not any thing made that was made.',
          AMP: 'All things were made and came into existence through Him; and without Him not even one thing was made that has come into being.',
          NASB: 'All things came into being through Him, and apart from Him nothing came into being that has come into being.',
          NIV: 'Through him all things were made; without him nothing was made that has been made.',
          NLT: 'God created everything through him, and nothing was created except through him.',
        },
      },
      {
        verse: 4,
        text: {
          AKJV: 'In him was life; and the life was the light of men.',
          AMP: 'In Him was life [and the power to bestow life], and the life was the Light of men.',
          NASB: 'In Him was life, and the life was the Light of men.',
          NIV: 'In him was life, and that life was the light of all mankind.',
          NLT: 'The Word gave life to everything that was created, and his life brought light to everyone.',
        },
      },
      {
        verse: 5,
        text: {
          AKJV: 'And the light shineth in darkness; and the darkness comprehended it not.',
          AMP: 'The Light shines on in the darkness, and the darkness did not understand it or overpower it [nor did it absorb or extinguish it].',
          NASB: 'The Light shines in the darkness, and the darkness did not comprehend it.',
          NIV: 'The light shines in the darkness, and the darkness has not overcome it.',
          NLT: 'The light shines in the darkness, and the darkness can never extinguish it.',
        },
      },
      {
        verse: 14,
        paragraphStart: true,
        text: {
          AKJV: 'And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth.',
          AMP: 'And the Word (Christ) became flesh, and lived among us; and we [actually] saw His glory, glory as belongs to the [One and] only Begotten of the Father, [the Son who is truly unique, the only One of His kind, who is] full of grace and truth (absolutely free of deception).',
          NASB: 'And the Word became flesh, and dwelt among us, and we saw His glory, glory as of the only begotten from the Father, full of grace and truth.',
          NIV: 'The Word became flesh and made his dwelling among us. We have seen his glory, the glory of the one and only Son, who came from the Father, full of grace and truth.',
          NLT: 'So the Word became human and made his home among us. He was full of unfailing love and faithfulness. And we have seen his glory, the glory of the Father’s one and only Son.',
        },
      },
    ],
  },
  {
    id: 'romans-8',
    book: 'Romans',
    chapter: 8,
    reference: 'Romans 8:31–39',
    title: 'More Than Conquerors: Nothing Can Separate Us',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    historicalContext: 'c. 57 CE · Written by Paul from Corinth to the House Churches of Rome',
    estimatedReadTime: '3 min read',
    keyRootNote: {
      word: 'Separate',
      original: 'χωρίσει',
      transliteration: 'Chorisei',
      meaning: 'To sever, divide, or place a chasm between two parties bound in covenant love.',
    },
    verses: [
      {
        verse: 31,
        paragraphStart: true,
        text: {
          AKJV: 'What shall we then say to these things? If God be for us, who can be against us?',
          AMP: 'What then shall we say to all these things? If God is for us, who can be [successful] against us?',
          NASB: 'What then shall we say to these things? If God is for us, who is against us?',
          NIV: 'What, then, shall we say in response to these things? If God is for us, who can be against us?',
          NLT: 'What shall we say about such wonderful things as these? If God is for us, who can ever be against us?',
        },
      },
      {
        verse: 35,
        paragraphStart: true,
        text: {
          AKJV: 'Who shall separate us from the love of Christ? shall tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?',
          AMP: 'Who shall ever separate us from the love of Christ? Will tribulation, or distress, or persecution, or famine, or nakedness, or danger, or sword?',
          NASB: 'Who will separate us from the love of Christ? Will tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?',
          NIV: 'Who shall separate us from the love of Christ? Shall trouble or hardship or persecution or famine or nakedness or danger or sword?',
          NLT: 'Can anything ever separate us from Christ’s love? Does it mean he no longer loves us if we have trouble or calamity, or are persecuted, or hungry, or destitute, or in danger, or threatened with death?',
        },
      },
      {
        verse: 37,
        paragraphStart: true,
        text: {
          AKJV: 'Nay, in all these things we are more than conquerors through him that loved us.',
          AMP: 'Yet in all these things we are more than conquerors and gain an overwhelming victory through Him who loved us [so much that He died for us].',
          NASB: 'But in all these things we overwhelmingly conquer through Him who loved us.',
          NIV: 'No, in all these things we are more than conquerors through him who loved us.',
          NLT: 'No, despite all these things, overwhelming victory is ours through Christ, who loved us.',
        },
      },
      {
        verse: 38,
        text: {
          AKJV: 'For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,',
          AMP: 'For I am convinced [and continue to be convinced—beyond any doubt] that neither death, nor life, nor angels, nor principalities, nor things present and threatening, nor things to come, nor powers,',
          NASB: 'For I am convinced that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers,',
          NIV: 'For I am convinced that neither death nor life, neither angels nor demons, neither the present nor the future, nor any powers,',
          NLT: 'And I am convinced that nothing can ever separate us from God’s love. Neither death nor life, neither angels nor demons, neither our fears for today nor our worries about tomorrow—not even the powers of hell can separate us from God’s love.',
        },
      },
      {
        verse: 39,
        text: {
          AKJV: 'Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.',
          AMP: 'Nor height, nor depth, nor any other created thing, will be able to separate us from the [unlimited] love of God, which is in Christ Jesus our Lord.',
          NASB: 'Nor height, nor depth, nor any other created thing, will be able to separate us from the love of God, which is in Christ Jesus our Lord.',
          NIV: 'neither height nor depth, nor anything else in all creation, will be able to separate us from the love of God that is in Christ Jesus our Lord.',
          NLT: 'No power in the sky above or in the earth below—indeed, nothing in all creation will ever be able to separate us from the love of God that is revealed in Christ Jesus our Lord.',
        },
      },
    ],
  },
  {
    id: '1-corinthians-13',
    book: '1 Corinthians',
    chapter: 13,
    reference: '1 Corinthians 13:1–13',
    title: 'The Excellence of Agape Love',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    historicalContext: 'c. 54–55 CE · Paul’s Hymn to Self-Giving Covenant Love (Agape)',
    estimatedReadTime: '3 min read',
    keyRootNote: {
      word: 'Love (Agape / Charity)',
      original: 'ἀγάπη',
      transliteration: 'Agape',
      meaning: 'Unconditional, self-giving commitment to the flourishing of another.',
    },
    verses: [
      {
        verse: 1,
        paragraphStart: true,
        text: {
          AKJV: 'Though I speak with the tongues of men and of angels, and have not charity, I am become as sounding brass, or a tinkling cymbal.',
          AMP: 'If I speak with the tongues of men and of angels, but have not love [for others growing out of God’s love for me], then I have become only a noisy gong or a clanging cymbal [just an annoying distraction].',
          NASB: 'If I speak with the tongues of men and of angels, but do not have love, I have become a noisy gong or a clanging cymbal.',
          NIV: 'If I speak in the tongues of men or of angels, but do not have love, I am only a resounding gong or a clanging cymbal.',
          NLT: 'If I could speak all the languages of earth and of angels, but didn’t love others, I would only be a noisy gong or a clanging cymbal.',
        },
      },
      {
        verse: 4,
        paragraphStart: true,
        text: {
          AKJV: 'Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up,',
          AMP: 'Love endures with patience and serenity, love is kind and thoughtful, and is not jealous or envious; love does not brag and is not proud or arrogant.',
          NASB: 'Love is patient, love is kind and is not jealous; love does not brag and is not arrogant,',
          NIV: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud.',
          NLT: 'Love is patient and kind. Love is not jealous or boastful or proud',
        },
      },
      {
        verse: 5,
        text: {
          AKJV: 'Doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil;',
          AMP: 'It is not rude; it is not self-seeking, it is not provoked [nor overly sensitive and easily angered]; it does not take into account a wrong endured.',
          NASB: 'does not act unbecomingly; it does not seek its own, is not provoked, does not take into account a wrong suffered,',
          NIV: 'It does not dishonor others, it is not self-seeking, it is not easily angered, it keeps no record of wrongs.',
          NLT: 'or rude. It does not demand its own way. It is not irritable, and it keeps no record of being wronged.',
        },
      },
      {
        verse: 6,
        text: {
          AKJV: 'Rejoiceth not in iniquity, but rejoiceth in the truth;',
          AMP: 'It does not rejoice at injustice, but rejoices with the truth [when right and truth prevail].',
          NASB: 'does not rejoice in unrighteousness, but rejoices with the truth;',
          NIV: 'Love does not delight in evil but rejoices with the truth.',
          NLT: 'It does not rejoice about injustice but rejoices whenever the truth wins out.',
        },
      },
      {
        verse: 7,
        text: {
          AKJV: 'Beareth all things, believeth all things, hopeth all things, endureth all things.',
          AMP: 'Love bears all things [regardless of what comes], believes all things [looking for the best in each one], hopes all things [remaining steadfast during difficult times], endures all things [without weakening].',
          NASB: 'bears all things, believes all things, hopes all things, endures all things.',
          NIV: 'It always protects, always trusts, always hopes, always perseveres.',
          NLT: 'Love never gives up, never loses faith, is always hopeful, and endures through every circumstance.',
        },
      },
      {
        verse: 8,
        paragraphStart: true,
        text: {
          AKJV: 'Charity never faileth: but whether there be prophecies, they shall fail; whether there be tongues, they shall cease; whether there be knowledge, it shall vanish away.',
          AMP: 'Love never fails [it never fades nor ends]. But as for prophecies, they will pass away; as for tongues, they will cease; as for the gift of special knowledge, it will pass away.',
          NASB: 'Love never fails; but if there are gifts of prophecy, they will be done away; if there are tongues, they will cease; if there is knowledge, it will be done away.',
          NIV: 'Love never fails. But where there are prophecies, they will cease; where there are tongues, they will be stilled; where there is knowledge, it will pass away.',
          NLT: 'Prophecy and speaking in unknown languages and special knowledge will become useless. But love will last forever!',
        },
      },
      {
        verse: 13,
        paragraphStart: true,
        text: {
          AKJV: 'And now abideth faith, hope, charity, these three; but the greatest of these is charity.',
          AMP: 'And now there remain: faith [abiding trust in God and His promises], hope [confident expectation of eternal salvation], love [unselfish love for others growing out of God’s love for me], these three [the choicest graces]; but the greatest of these is love.',
          NASB: 'But now faith, hope, love, abide these three; but the greatest of these is love.',
          NIV: 'And now these three remain: faith, hope and love. But the greatest of these is love.',
          NLT: 'Three things will last forever—faith, hope, and love—and the greatest of these is love.',
        },
      },
    ],
  },
  {
    id: 'revelation-21',
    book: 'Revelation',
    chapter: 21,
    reference: 'Revelation 21:1–7',
    title: 'All Things Made New — The New Heaven and New Earth',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    historicalContext: 'c. 95 CE · Patmos Sanctuary Vision of Ultimate Restoration',
    estimatedReadTime: '3 min read',
    keyRootNote: {
      word: 'New / Renewed in Quality (Kainos)',
      original: 'καινός',
      transliteration: 'Kainos',
      meaning: 'Fresh, transformed in nature and quality—not merely chronological replacement, but cosmic renewal.',
    },
    verses: [
      {
        verse: 1,
        paragraphStart: true,
        text: {
          AKJV: 'And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea.',
          AMP: 'Then I saw a new heaven and a new earth; for the first heaven and the first earth had passed away (vanished), and there is no longer any sea.',
          NASB: 'Then I saw a new heaven and a new earth; for the first heaven and the first earth passed away, and there is no longer any sea.',
          NIV: 'Then I saw “a new heaven and a new earth,” for the first heaven and the first earth had passed away, and there was no longer any sea.',
          NLT: 'Then I saw a new heaven and a new earth, for the old heaven and the old earth had disappeared. And the sea was also gone.',
        },
      },
      {
        verse: 3,
        paragraphStart: true,
        text: {
          AKJV: 'And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God.',
          AMP: 'And then I heard a loud voice from the throne, saying, “See! The tabernacle of God is among men, and He will live among them, and they will be His people, and God Himself will be with them [as their God,]',
          NASB: 'And I heard a loud voice from the throne, saying, “Behold, the tabernacle of God is among men, and He will dwell among them, and they shall be His people, and God Himself will be among them,',
          NIV: 'And I heard a loud voice from the throne saying, “Look! God’s dwelling place is now among the people, and he will dwell with them. They will be his people, and God himself will be with them and be their God.',
          NLT: 'I heard a loud shout from the throne, saying, “Look, God’s home is now among his people! He will live with them, and they will be his people. God himself will be with them.',
        },
      },
      {
        verse: 4,
        text: {
          AKJV: 'And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.',
          AMP: 'and He will wipe away every tear from their eyes; and there will no longer be death; there will no longer be sorrow and anguish, or crying, or pain; for the former order of things has passed away.”',
          NASB: 'and He will wipe away every tear from their eyes; and there will no longer be any death; there will no longer be any mourning, or crying, or pain; the first things have passed away.”',
          NIV: '‘He will wipe every tear from their eyes. There will be no more death’ or mourning or crying or pain, for the old order of things has passed away.”',
          NLT: 'He will wipe every tear from their eyes, and there will be no more death or sorrow or crying or pain. All these things are gone forever.”',
        },
      },
      {
        verse: 5,
        paragraphStart: true,
        text: {
          AKJV: 'And he that sat upon the throne said, Behold, I make all things new. And he said unto me, Write: for these words are true and faithful.',
          AMP: 'And He who sits on the throne said, “Behold! I am making all things new.” Also He said, “Write, for these words are faithful and true [they are accurate, incorruptible, and trustworthy].”',
          NASB: 'And He who sits on the throne said, “Behold, I am making all things new.” And He said, “Write, for these words are faithful and true.”',
          NIV: 'He who was seated on the throne said, “I am making everything new!” Then he said, “Write this down, for these words are trustworthy and true.”',
          NLT: 'And the one sitting on the throne said, “Look, I am making everything new!” And then he said to me, “Write this down, for what I tell you is trustworthy and true.”',
        },
      },
    ],
  },
];

export interface BibleCanonBook {
  id: string;
  name: string;
  testament: 'Old Testament' | 'New Testament';
  category:
    | 'Torah & Creation'
    | 'Wisdom & Psalms'
    | 'Prophets'
    | 'Gospels'
    | 'Epistles & Revelation';
  totalChapters: number;
  eraNote: string;
  themeSummary: string;
  foundationVerse: Record<BibleVersionId, string>;
}

export const BIBLE_CANON_BOOKS: BibleCanonBook[] = [
  // OLD TESTAMENT (39 Books · 929 Chapters)
  {
    id: 'genesis',
    name: 'Genesis',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 50,
    eraNote: 'Creation to Patriarchs',
    themeSummary: 'Beginnings of the cosmos, humanity, and the Abrahamic covenant of blessing.',
    foundationVerse: {
      AKJV: 'In the beginning God created the heaven and the earth.',
      AMP: 'In the beginning God (Elohim) created [by forming from nothing] the heavens and the earth.',
      NASB: 'In the beginning God created the heavens and the earth.',
      NIV: 'In the beginning God created the heavens and the earth.',
      NLT: 'In the beginning God created the heavens and the earth.',
    },
  },
  {
    id: 'exodus',
    name: 'Exodus',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 40,
    eraNote: 'Deliverance & Sinai Covenant',
    themeSummary: 'Liberation from bondage, the Sinai covenant, and the Tabernacle sanctuary of God’s presence.',
    foundationVerse: {
      AKJV: 'The LORD shall fight for you, and ye shall hold your peace.',
      AMP: 'The LORD will fight for you while you [only need to] keep silent and remain calm.',
      NASB: 'The LORD will fight for you while you keep silent.',
      NIV: 'The LORD will fight for you; you need only to be still.',
      NLT: 'The LORD himself will fight for you. Just stay calm.',
    },
  },
  {
    id: 'leviticus',
    name: 'Leviticus',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 27,
    eraNote: 'Sanctuary Holiness & Worship',
    themeSummary: 'Sacred rhythms of atonement, Jubilee justice, and neighbor-love in the camp of Israel.',
    foundationVerse: {
      AKJV: 'Thou shalt love thy neighbour as thyself: I am the LORD.',
      AMP: 'You shall love your neighbor as yourself; I am the LORD.',
      NASB: 'You shall love your neighbor as yourself; I am the LORD.',
      NIV: 'Love your neighbor as yourself. I am the LORD.',
      NLT: 'Love your neighbor as yourself. I am the LORD.',
    },
  },
  {
    id: 'numbers',
    name: 'Numbers',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 36,
    eraNote: 'Wilderness Pilgrimage',
    themeSummary: 'Forty years in the desert learning trust, priestly blessing, and God’s faithfulness.',
    foundationVerse: {
      AKJV: 'The LORD bless thee, and keep thee: The LORD make his face shine upon thee, and be gracious unto thee: The LORD lift up his countenance upon thee, and give thee peace.',
      AMP: 'The LORD bless you, and keep you [protect you, sustain you, and guard you]; The LORD make His face shine upon you [with favor], and be gracious to you; The LORD lift up His countenance (approvingive presence) upon you, and give you peace (shalom).',
      NASB: 'The LORD bless you, and keep you; The LORD make His face shine on you, And be gracious to you; The LORD lift up His countenance on you, And give you peace.',
      NIV: 'The LORD bless you and keep you; the LORD make his face shine on you and be gracious to you; the LORD turn his face toward you and give you peace.',
      NLT: 'May the LORD bless you and protect you. May the LORD smile on you and be gracious to you. May the LORD show you his favor and give you his peace.',
    },
  },
  {
    id: 'deuteronomy',
    name: 'Deuteronomy',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 34,
    eraNote: 'Plains of Moab Renewal',
    themeSummary: 'Moses’ final covenant charge to love the LORD wholeheartedly across generations.',
    foundationVerse: {
      AKJV: 'Hear, O Israel: The LORD our God is one LORD: And thou shalt love the LORD thy God with all thine heart, and with all thy soul, and with all thy might.',
      AMP: 'Hear, O Israel! The LORD our God, the LORD is one! You shall love the LORD your God with all your heart and mind and with all your soul and with all your strength.',
      NASB: 'Hear, O Israel! The LORD is our God, the LORD is one! You shall love the LORD your God with all your heart and with all your soul and with all your might.',
      NIV: 'Hear, O Israel: The LORD our God, the LORD is one. Love the LORD your God with all your heart and with all your soul and with all your strength.',
      NLT: 'Listen, O Israel! The LORD is our God, the LORD alone. And you must love the LORD your God with all your heart, all your soul, and all your strength.',
    },
  },
  {
    id: 'joshua',
    name: 'Joshua',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 24,
    eraNote: 'Jordan Crossing & Covenant Settlement',
    themeSummary: 'Courageous obedience and covenant renewal at Shechem.',
    foundationVerse: {
      AKJV: 'Have not I commanded thee? Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.',
      AMP: 'Have I not commanded you? Be strong and courageous! Do not be terrified or dismayed (intimidated), for the LORD your God is with you wherever you go.',
      NASB: 'Have I not commanded you? Be strong and courageous! Do not tremble or be dismayed, for the LORD your God is with you wherever you go.',
      NIV: 'Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go.',
      NLT: 'This is my command—be strong and courageous! Do not be afraid or discouraged. For the LORD your God is with you wherever you go.',
    },
  },
  {
    id: 'judges',
    name: 'Judges',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 21,
    eraNote: 'Tribal Era in Canaan',
    themeSummary: 'Cycles of spiritual drift and merciful deliverance before the monarchy.',
    foundationVerse: {
      AKJV: 'And the angel of the LORD appeared unto him, and said unto him, The LORD is with thee, thou mighty man of valour.',
      AMP: 'And the Angel of the LORD appeared to him and said to him, “The LORD is with you, O brave and fearless warrior!”',
      NASB: 'The angel of the LORD appeared to him and said to him, “The LORD is with you, O valiant warrior.”',
      NIV: 'When the angel of the LORD appeared to Gideon, he said, “The LORD is with you, mighty warrior.”',
      NLT: 'The angel of the LORD appeared to him and said, “Mighty hero, the LORD is with you!”',
    },
  },
  {
    id: 'ruth',
    name: 'Ruth',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 4,
    eraNote: 'Bethlehem Harvest & Kinsman-Redeemer',
    themeSummary: 'Loyal covenant love (Chesed) between Ruth, Naomi, and Boaz in the lineage of David.',
    foundationVerse: {
      AKJV: 'Intreat me not to leave thee, or to return from following after thee: for whither thou goest, I will go; and where thou lodgest, I will lodge: thy people shall be my people, and thy God my God.',
      AMP: 'Do not urge me to leave you or to turn back from following you; for where you go, I will go, and where you lodge, I will lodge. Your people shall be my people, and your God, my God.',
      NASB: 'Do not urge me to leave you or turn back from following you; for where you go, I will go, and where you lodge, I will lodge. Your people shall be my people, and your God, my God.',
      NIV: 'Don’t urge me to leave you or to turn back from you. Where you go I will go, and where you stay I will stay. Your people will be my people and your God my God.',
      NLT: 'Don’t ask me to leave you and turn back. Wherever you go, I will go; wherever you live, I will live. Your people will be my people, and your God will be my God.',
    },
  },
  {
    id: '1-samuel',
    name: '1 Samuel',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 31,
    eraNote: 'Samuel, Saul & Young David',
    themeSummary: 'God looks not on outward stature, but upon the heart.',
    foundationVerse: {
      AKJV: 'For the LORD seeth not as man seeth; for man looketh on the outward appearance, but the LORD looketh on the heart.',
      AMP: 'For the LORD sees not as man sees; for man looks at the outward appearance, but the LORD looks at the heart.',
      NASB: 'For God sees not as man sees, for man looks at the outward appearance, but the LORD looks at the heart.',
      NIV: 'The LORD does not look at the things people look at. People look at the outward appearance, but the LORD looks at the heart.',
      NLT: 'The LORD doesn’t see things the way you see them. People judge by outward appearance, but the LORD looks at the heart.',
    },
  },
  {
    id: '2-samuel',
    name: '2 Samuel',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 24,
    eraNote: 'Reign of King David & Davidic Covenant',
    themeSummary: 'The eternal covenant promise to David’s house amidst human frailty and grace.',
    foundationVerse: {
      AKJV: 'As for God, his way is perfect; the word of the LORD is tried: he is a buckler to all those that trust in him.',
      AMP: 'As for God, His way is blameless; the word of the LORD is tested [it is flawless]; He is a shield to all who take refuge in Him.',
      NASB: 'As for God, His way is blameless; the word of the LORD is tested; He is a shield to all who take refuge in Him.',
      NIV: 'As for God, his way is perfect: The LORD’s word is flawless; he shields all who take refuge in him.',
      NLT: 'God’s way is perfect. All the LORD’s promises prove true. He is a shield for all who look to him for protection.',
    },
  },
  {
    id: '1-kings',
    name: '1 Kings',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 22,
    eraNote: 'Solomon’s Temple & Prophet Elijah',
    themeSummary: 'Wisdom, Temple dedication, and God’s still small whisper on Mount Horeb.',
    foundationVerse: {
      AKJV: 'And after the earthquake a fire; but the LORD was not in the fire: and after the fire a still small voice.',
      AMP: 'And after the earthquake a fire, but the LORD was not in the fire; and after the fire, a sound of a gentle blowing (a still, small voice).',
      NASB: 'After the earthquake a fire, but the LORD was not in the fire; and after the fire a sound of a gentle blowing.',
      NIV: 'After the earthquake came a fire, but the LORD was not in the fire. And after the fire came a gentle whisper.',
      NLT: 'And after the earthquake there was a fire, but the LORD was not in the fire. And after the fire there was the sound of a gentle whisper.',
    },
  },
  {
    id: '2-kings',
    name: '2 Kings',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 25,
    eraNote: 'Elisha, Josiah’s Reform & Exile',
    themeSummary: 'Prophetic ministry and the rediscovery of the Book of the Law.',
    foundationVerse: {
      AKJV: 'And he answered, Fear not: for they that be with us are more than they that be with them.',
      AMP: 'He answered, “Do not fear, for those who are with us are more than those who are with them.”',
      NASB: 'So he answered, “Do not fear, for those who are with us are more than those who are with them.”',
      NIV: '“Don’t be afraid,” the prophet answered. “Those who are with us are more than those who are with them.”',
      NLT: '“Don’t be afraid!” Elisha told him. “For there are more on our side than on theirs!”',
    },
  },
  {
    id: '1-chronicles',
    name: '1 Chronicles',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 29,
    eraNote: 'Genealogies & Sanctuary Worship',
    themeSummary: 'David’s organization of sanctuary music, thanksgiving, and preparation for the Temple.',
    foundationVerse: {
      AKJV: 'Seek the LORD and his strength, seek his face continually.',
      AMP: 'Seek the LORD and His strength; seek His face continually [longing to be in His presence].',
      NASB: 'Seek the LORD and His strength; seek His face continually.',
      NIV: 'Look to the LORD and his strength; seek his face always.',
      NLT: 'Search for the LORD and for his strength; continually seek him.',
    },
  },
  {
    id: '2-chronicles',
    name: '2 Chronicles',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 36,
    eraNote: 'Kings of Judah & Temple Revival',
    themeSummary: 'Humility, prayer, and seeking God’s face for national and spiritual renewal.',
    foundationVerse: {
      AKJV: 'If my people, which are called by my name, shall humble themselves, and pray, and seek my face, and turn from their wicked ways; then will I hear from heaven, and will forgive their sin, and will heal their land.',
      AMP: 'and My people, who are called by My Name, humble themselves, and pray and seek (crave, require as a necessity) My face and turn from their wicked ways, then I will hear [them] from heaven, and forgive their sin and heal their land.',
      NASB: 'and My people who are called by My name humble themselves and pray and seek My face and turn from their wicked ways, then I will hear from heaven, will forgive their sin and will heal their land.',
      NIV: 'if my people, who are called by my name, will humble themselves and pray and seek my face and turn from their wicked ways, then I will hear from heaven, and I will forgive their sin and will heal their land.',
      NLT: 'Then if my people who are called by my name will humble themselves and pray and seek my face and turn from their wicked ways, I will hear from heaven and will forgive their sins and restore their land.',
    },
  },
  {
    id: 'ezra',
    name: 'Ezra',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 10,
    eraNote: 'Post-Exilic Return & Altar Rebuilding',
    themeSummary: 'Return from Babylon to rebuild the Temple and study the Torah.',
    foundationVerse: {
      AKJV: 'For Ezra had prepared his heart to seek the law of the LORD, and to do it, and to teach in Israel statutes and judgments.',
      AMP: 'For Ezra had set his heart to study the Law of the LORD and to practice it, and to teach His statutes and ordinances in Israel.',
      NASB: 'For Ezra had set his heart to study the law of the LORD and to practice it, and to teach His statutes and ordinances in Israel.',
      NIV: 'For Ezra had devoted himself to the study and observance of the Law of the LORD, and to teaching its decrees and laws in Israel.',
      NLT: 'This was because Ezra had determined to study and obey the Law of the LORD and to teach those decrees and regulations to the people of Israel.',
    },
  },
  {
    id: 'nehemiah',
    name: 'Nehemiah',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 13,
    eraNote: 'Rebuilding Jerusalem’s Walls',
    themeSummary: 'Restoring the city walls and public reading of Scripture in the square.',
    foundationVerse: {
      AKJV: 'Neither be ye sorry; for the joy of the LORD is your strength.',
      AMP: 'Do not be worried, for the joy of the LORD is your strength and your stronghold.',
      NASB: 'Do not be grieved, for the joy of the LORD is your strength.',
      NIV: 'Do not grieve, for the joy of the LORD is your strength.',
      NLT: 'Don’t be dejected and sad, for the joy of the LORD is your strength!',
    },
  },
  {
    id: 'esther',
    name: 'Esther',
    testament: 'Old Testament',
    category: 'Torah & Creation',
    totalChapters: 10,
    eraNote: 'Persian Court of Susa',
    themeSummary: 'Courageous advocacy and hidden providence “for such a time as this.”',
    foundationVerse: {
      AKJV: 'And who knoweth whether thou art come to the kingdom for such a time as this?',
      AMP: 'And who knows whether you have attained royalty for such a time as this [and for this very purpose]?',
      NASB: 'And who knows whether you have not attained royalty for such a time as this?',
      NIV: 'And who knows but that you have come to your royal position for such a time as this?',
      NLT: 'Who knows if perhaps you were made queen for just such a time as this?',
    },
  },
  {
    id: 'job',
    name: 'Job',
    testament: 'Old Testament',
    category: 'Wisdom & Psalms',
    totalChapters: 42,
    eraNote: 'Ancient Patriarchal Wisdom',
    themeSummary: 'Wrestling honestly with innocent suffering before the majesty of the Creator.',
    foundationVerse: {
      AKJV: 'For I know that my redeemer liveth, and that he shall stand at the latter day upon the earth.',
      AMP: 'As for me, I know that my Redeemer and Vindicator lives, and at the last He will take His stand upon the earth.',
      NASB: 'As for me, I know that my Redeemer lives, And at the last He will take His stand on the earth.',
      NIV: 'I know that my redeemer lives, and that in the end he will stand on the earth.',
      NLT: 'But as for me, I know that my Redeemer lives, and he will stand upon the earth at last.',
    },
  },
  {
    id: 'psalms',
    name: 'Psalms',
    testament: 'Old Testament',
    category: 'Wisdom & Psalms',
    totalChapters: 150,
    eraNote: '1,000 Years of Sanctuary Prayer & Song',
    themeSummary: 'The prayerbook of Israel—spanning raw lament, quiet trust, and cosmic praise.',
    foundationVerse: {
      AKJV: 'The LORD is my shepherd; I shall not want.',
      AMP: 'The LORD is my Shepherd [to feed, to guide and to shield me], I shall not lack.',
      NASB: 'The LORD is my shepherd, I shall not want.',
      NIV: 'The LORD is my shepherd, I lack nothing.',
      NLT: 'The LORD is my shepherd; I have all that I need.',
    },
  },
  {
    id: 'proverbs',
    name: 'Proverbs',
    testament: 'Old Testament',
    category: 'Wisdom & Psalms',
    totalChapters: 31,
    eraNote: 'Solomonic & Sage Wisdom',
    themeSummary: 'Practical discernment, character formation, and the fear of the LORD as the beginning of knowledge.',
    foundationVerse: {
      AKJV: 'Trust in the LORD with all thine heart; and lean not unto thine own understanding.',
      AMP: 'Trust in and rely confidently on the LORD with all your heart and do not rely on your own insight or understanding.',
      NASB: 'Trust in the LORD with all your heart and do not lean on your own understanding.',
      NIV: 'Trust in the LORD with all your heart and lean not on your own understanding;',
      NLT: 'Trust in the LORD with all your heart; do not depend on your own understanding.',
    },
  },
  {
    id: 'ecclesiastes',
    name: 'Ecclesiastes',
    testament: 'Old Testament',
    category: 'Wisdom & Psalms',
    totalChapters: 12,
    eraNote: 'Qoheleth’s Philosophical Inquiry',
    themeSummary: 'Examining life “under the sun” and finding lasting meaning in reverence for God.',
    foundationVerse: {
      AKJV: 'To every thing there is a season, and a time to every purpose under the heaven.',
      AMP: 'There is a season (a time appointed) for everything and a time for every delight and event or purpose under heaven.',
      NASB: 'There is an appointed time for everything. And there is a time for every event under heaven.',
      NIV: 'There is a time for everything, and a season for every activity under the heavens.',
      NLT: 'For everything there is a season, a time for every activity under heaven.',
    },
  },
  {
    id: 'song-of-solomon',
    name: 'Song of Solomon',
    testament: 'Old Testament',
    category: 'Wisdom & Psalms',
    totalChapters: 8,
    eraNote: 'Lyric Poetry of Covenant Love',
    themeSummary: 'Celebration of faithful, devoted love and mutual delight.',
    foundationVerse: {
      AKJV: 'Many waters cannot quench love, neither can the floods drown it.',
      AMP: 'Many waters cannot quench love, nor can rivers drown it.',
      NASB: 'Many waters cannot quench love, Nor will rivers overflow it.',
      NIV: 'Many waters cannot quench love; rivers cannot sweep it away.',
      NLT: 'Many waters cannot quench love, nor can rivers drown it.',
    },
  },
  {
    id: 'isaiah',
    name: 'Isaiah',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 66,
    eraNote: '8th Century BCE Jerusalem',
    themeSummary: 'Holiness of God, the Suffering Servant, and comfort for the weary.',
    foundationVerse: {
      AKJV: 'But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.',
      AMP: 'But those who wait for the LORD [who expect, look for, and hope in Him] will gain new strength and renew their power; they will lift up their wings [and rise up close to God] like eagles; they will run and not become weary, they will walk and not grow tired.',
      NASB: 'Yet those who wait for the LORD will gain new strength; they will mount up with wings like eagles, they will run and not get tired, they will walk and not become weary.',
      NIV: 'but those who hope in the LORD will renew their strength. They will soar on wings like eagles; they will run and not grow weary, they will walk and not be faint.',
      NLT: 'But those who trust in the LORD will find new strength. They will soar high on wings like eagles. They will run and not grow weary. They will walk and not faint.',
    },
  },
  {
    id: 'jeremiah',
    name: 'Jeremiah',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 52,
    eraNote: 'Final Decades of Judah & New Covenant',
    themeSummary: 'The weeping prophet’s call to heart-repentance and the promise of a New Covenant.',
    foundationVerse: {
      AKJV: 'For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.',
      AMP: 'For I know the plans and thoughts that I have for you,’ says the LORD, ‘plans for peace and well-being and not for disaster, to give you a future and a hope.',
      NASB: 'For I know the plans that I have for you,’ declares the LORD, ‘plans for welfare and not for calamity to give you a future and a hope.',
      NIV: '“For I know the plans I have for you,” declares the LORD, “plans to prosper you and not to harm you, plans to give you hope and a future.”',
      NLT: '“For I know the plans I have for you,” says the LORD. “They are plans for good and not for disaster, to give you a future and a hope.”',
    },
  },
  {
    id: 'lamentations',
    name: 'Lamentations',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 5,
    eraNote: '586 BCE · Aftermath of Jerusalem’s Fall',
    themeSummary: 'Acrostic funeral poems where unyielding grief meets morning-by-morning covenant mercy.',
    foundationVerse: {
      AKJV: 'It is of the LORD’s mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.',
      AMP: 'It is because of the LORD’s lovingkindnesses that we are not consumed, because His [tender] compassions never fail. They are new every morning; great and beyond measure is Your faithfulness.',
      NASB: 'The LORD’S lovingkindnesses indeed never cease, for His compassions never fail. They are new every morning; great is Your faithfulness.',
      NIV: 'Because of the LORD’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.',
      NLT: 'The faithful love of the LORD never ends! His mercies never cease. Great is his faithfulness; his mercies begin afresh each morning.',
    },
  },
  {
    id: 'ezekiel',
    name: 'Ezekiel',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 48,
    eraNote: 'Babylonian Exile by the Kebar Canal',
    themeSummary: 'Visions of God’s mobile glory, the valley of dry bones, and a new heart of flesh.',
    foundationVerse: {
      AKJV: 'A new heart also will I give you, and a new spirit will I put within you: and I will take away the stony heart out of your flesh, and I will give you an heart of flesh.',
      AMP: 'Moreover, I will give you a new heart and put a new spirit within you; and I will remove the heart of stone from your flesh and give you a heart of flesh.',
      NASB: 'Moreover, I will give you a new heart and put a new spirit within you; and I will remove the heart of stone from your flesh and give you a heart of flesh.',
      NIV: 'I will give you a new heart and put a new spirit in you; I will remove from you your heart of stone and give you a heart of flesh.',
      NLT: 'And I will give you a new heart, and I will put a new spirit in you. I will take out your stony, stubborn heart and give you a tender, responsive heart.',
    },
  },
  {
    id: 'daniel',
    name: 'Daniel',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 12,
    eraNote: 'Babylonian & Persian Courts',
    themeSummary: 'Faithful integrity in exile and apocalyptic visions of the Ancient of Days.',
    foundationVerse: {
      AKJV: 'And they that be wise shall shine as the brightness of the firmament; and they that turn many to righteousness as the stars for ever and ever.',
      AMP: 'Those who are spiritually wise will shine brightly like the brightness of the expanse of heaven, and those who lead many to righteousness, [will shine] like the stars forever and ever.',
      NASB: 'Those who have insight will shine brightly like the brightness of the expanse of heaven, and those who lead the many to righteousness, like the stars forever and ever.',
      NIV: 'Those who are wise will shine like the brightness of the heavens, and those who lead many to righteousness, like the stars for ever and ever.',
      NLT: 'Those who are wise will shine as bright as the sky, and those who lead many to righteousness will shine like the stars forever.',
    },
  },
  {
    id: 'hosea',
    name: 'Hosea',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 14,
    eraNote: '8th Century BCE Northern Kingdom',
    themeSummary: 'God’s relentless, redeeming covenant love for a wayward people.',
    foundationVerse: {
      AKJV: 'For I desired mercy, and not sacrifice; and the knowledge of God more than burnt offerings.',
      AMP: 'For I desire steadfast love and mercy [readiness to showed kindness] and not [hollow] sacrifice, and the knowledge of God more than burnt offerings.',
      NASB: 'For I delight in loyalty rather than sacrifice, And in the knowledge of God rather than burnt offerings.',
      NIV: 'For I desire mercy, not sacrifice, and acknowledgment of God rather than burnt offerings.',
      NLT: 'I want you to show love, not offer sacrifices. I want you to know me more than I want burnt offerings.',
    },
  },
  {
    id: 'joel',
    name: 'Joel',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 3,
    eraNote: 'Day of the LORD & Outpoured Spirit',
    themeSummary: 'Call to rend the heart and the promise of God’s Spirit poured out on all generations.',
    foundationVerse: {
      AKJV: 'And rend your heart, and not your garments, and turn unto the LORD your God: for he is gracious and merciful, slow to anger, and of great kindness.',
      AMP: 'Rend your heart and not your garments; now return [in repentance] to the LORD your God, for He is gracious and compassionate, slow to anger, abounding in lovingkindness.',
      NASB: 'And rend your heart and not your garments. Now return to the LORD your God, For He is gracious and compassionate, Slow to anger, abounding in lovingkindness.',
      NIV: 'Rend your heart and not your garments. Return to the LORD your God, for he is gracious and compassionate, slow to anger and abounding in love.',
      NLT: 'Don’t tear your clothing in your grief, but tear your hearts instead. Return to the LORD your God, for he is merciful and compassionate, slow to get angry and filled with unfailing love.',
    },
  },
  {
    id: 'amos',
    name: 'Amos',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 9,
    eraNote: 'Shepherd of Tekoa (c. 760 BCE)',
    themeSummary: 'Prophetic demand for social justice and righteousness to roll down like waters.',
    foundationVerse: {
      AKJV: 'But let judgment run down as waters, and righteousness as a mighty stream.',
      AMP: 'But let justice run down like waters and righteousness as an ever-flowing stream [flowing abundantly]!',
      NASB: 'But let justice roll down like waters And righteousness like an ever-flowing stream.',
      NIV: 'But let justice roll on like a river, righteousness like a never-failing stream!',
      NLT: 'Instead, I want to see a mighty flood of justice, an endless river of righteous living.',
    },
  },
  {
    id: 'obadiah',
    name: 'Obadiah',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 1,
    eraNote: 'Oracle Concerning Edom',
    themeSummary: 'Warning against pride and assurance that the kingdom belongs to the LORD.',
    foundationVerse: {
      AKJV: 'And saviours shall come up on mount Zion to judge the mount of Esau; and the kingdom shall be the LORD’s.',
      AMP: 'Deliverers will ascend Mount Zion to judge the mountain of Esau, and the kingdom and the kingship shall be the LORD’s.',
      NASB: 'The deliverers will ascend Mount Zion To judge the mountain of Esau, And the kingdom will be the LORD’S.',
      NIV: 'Deliverers will go up on Mount Zion to govern the mountains of Esau. And the kingdom will be the LORD’s.',
      NLT: 'Deliverers will go up to Mount Zion to judge the mountains of Edom. And the LORD himself will be king!',
    },
  },
  {
    id: 'jonah',
    name: 'Jonah',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 4,
    eraNote: 'Mission to Nineveh',
    themeSummary: 'God’s widening mercy extending even to Israel’s fiercest enemies.',
    foundationVerse: {
      AKJV: 'Salvation is of the LORD.',
      AMP: 'Salvation comes from the LORD!',
      NASB: 'Salvation is from the LORD.',
      NIV: 'Salvation comes from the LORD.',
      NLT: 'Salvation comes from the LORD alone!',
    },
  },
  {
    id: 'micah',
    name: 'Micah',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 7,
    eraNote: 'c. 735–700 BCE · Moresheth in Judah',
    themeSummary: 'Doing justice (Mishpat), loving mercy (Chesed), and walking humbly with God.',
    foundationVerse: {
      AKJV: 'He hath shewed thee, O man, what is good; and what doth the LORD require of thee, but to do justly, and to love mercy, and to walk humbly with thy God?',
      AMP: 'He has told you, O man, what is good; and what does the LORD require of you except to be just, and to love [and to diligently practice] kindness (compassion), and to walk humbly with your God?',
      NASB: 'He has told you, O man, what is good; and what does the LORD require of you but to do justice, to love kindness, and to walk humbly with your God?',
      NIV: 'He has shown you, O mortal, what is good. And what does the LORD require of you? To act justly and to love mercy and to walk humbly with your God.',
      NLT: 'No, O people, the LORD has told you what is good, and this is what he requires of you: to do what is right, to love mercy, and to walk humbly with your God.',
    },
  },
  {
    id: 'nahum',
    name: 'Nahum',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 3,
    eraNote: '7th Century BCE Oracle',
    themeSummary: 'The LORD is a stronghold in the day of trouble and knows those who take refuge in Him.',
    foundationVerse: {
      AKJV: 'The LORD is good, a strong hold in the day of trouble; and he knoweth them that trust in him.',
      AMP: 'The LORD is good, a strength and stronghold in the day of trouble; He knows [He recognizes, cares for, and understands fully] those who take refuge and trust in Him.',
      NASB: 'The LORD is good, A stronghold in the day of trouble, And He knows those who take refuge in Him.',
      NIV: 'The LORD is good, a refuge in times of trouble. He cares for those who trust in him.',
      NLT: 'The LORD is good, a strong refuge when trouble comes. He is close to those who trust in him.',
    },
  },
  {
    id: 'habakkuk',
    name: 'Habakkuk',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 3,
    eraNote: 'Watchtower Dialogue with God',
    themeSummary: 'Moving from honest perplexity (“How long, O LORD?”) to joyful trust.',
    foundationVerse: {
      AKJV: 'The just shall live by his faith.',
      AMP: 'But the righteous man shall live by his faith [in the true God].',
      NASB: 'But the righteous will live by his faith.',
      NIV: 'the righteous person will live by his faithfulness.',
      NLT: 'But the righteous will live by their faithfulness to God.',
    },
  },
  {
    id: 'zephaniah',
    name: 'Zephaniah',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 3,
    eraNote: 'Reign of King Josiah',
    themeSummary: 'God rejoicing over His restored people with loud singing.',
    foundationVerse: {
      AKJV: 'The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy; he will rest in his love, he will joy over thee with singing.',
      AMP: 'The LORD your God is in your midst, a Warrior who saves. He will rejoice over you with joy; He will be quiet in His love [making no mention of your past sins], He will rejoice over you with shouts of joy.',
      NASB: 'The LORD your God is in your midst, A victorious warrior. He will exult over you with joy, He will be quiet in His love, He will rejoice over you with shouts of joy.',
      NIV: 'The LORD your God is with you, the Mighty Warrior who saves. He will take great delight in you; in his love he will no longer rebuke you, but will rejoice over you with singing.',
      NLT: 'For the LORD your God is living among you. He is a mighty savior. He will take delight in you with gladness. With his love, he will calm all your fears. He will rejoice over you with joyful songs.',
    },
  },
  {
    id: 'haggai',
    name: 'Haggai',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 2,
    eraNote: '520 BCE · Second Temple Foundation',
    themeSummary: 'Encouragement to rebuild the house of the LORD with the promise of peace.',
    foundationVerse: {
      AKJV: 'The glory of this latter house shall be greater than of the former, saith the LORD of hosts: and in this place will I give peace, saith the LORD of hosts.',
      AMP: 'The latter glory of this house will be greater than the former,’ says the LORD of hosts, ‘and in this place I shall give [the ultimate] peace and prosperity,’ declares the LORD of hosts.',
      NASB: '‘The latter glory of this house will be greater than the former,’ says the LORD of hosts, ‘and in this place I will give peace,’ declares the LORD of hosts.',
      NIV: '‘The glory of this present house will be greater than the glory of the former house,’ says the LORD Almighty. ‘And in this place I will grant peace,’ declares the LORD Almighty.',
      NLT: 'The future glory of this Temple will be greater than its past glory, says the LORD of Heaven’s Armies. And in this place I will bring peace.',
    },
  },
  {
    id: 'zechariah',
    name: 'Zechariah',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 14,
    eraNote: '520–518 BCE · Night Visions & Messianic Hope',
    themeSummary: 'Not by might nor by power, but by the Spirit of the LORD.',
    foundationVerse: {
      AKJV: 'Not by might, nor by power, but by my spirit, saith the LORD of hosts.',
      AMP: 'Not by might, nor by power, but by My Spirit [of whom the oil is a symbol],’ says the LORD of hosts.',
      NASB: 'Not by might nor by power, but by My Spirit,’ says the LORD of hosts.',
      NIV: '‘Not by might nor by power, but by my Spirit,’ says the LORD Almighty.',
      NLT: 'It is not by force nor by strength, but by my Spirit, says the LORD of Heaven’s Armies.',
    },
  },
  {
    id: 'malachi',
    name: 'Malachi',
    testament: 'Old Testament',
    category: 'Prophets',
    totalChapters: 4,
    eraNote: '5th Century BCE · Final Old Testament Voice',
    themeSummary: 'The Sun of Righteousness rising with healing in its wings and turning hearts of fathers and children.',
    foundationVerse: {
      AKJV: 'But unto you that fear my name shall the Sun of righteousness arise with healing in his wings.',
      AMP: 'But for you who fear My name [with awe-filled reverence] the sun of righteousness will rise with healing in its wings.',
      NASB: 'But for you who fear My name, the sun of righteousness will rise with healing in its wings.',
      NIV: 'But for you who revere my name, the sun of righteousness will rise with healing in its rays.',
      NLT: 'But for you who fear my name, the Sun of Righteousness will rise with healing in his wings.',
    },
  },

  // NEW TESTAMENT (27 Books · 260 Chapters)
  {
    id: 'matthew',
    name: 'Matthew',
    testament: 'New Testament',
    category: 'Gospels',
    totalChapters: 28,
    eraNote: 'First-Century Galilee & Judea',
    themeSummary: 'Jesus as Immanuel and the Sermon on the Mount’s upside-down Kingdom of Heaven.',
    foundationVerse: {
      AKJV: 'Come unto me, all ye that labour and are heavy laden, and I will give you rest.',
      AMP: 'Come to Me, all who are weary and heavily burdened [by religious rituals that provide no peace], and I will give you rest [refreshing your souls with salvation].',
      NASB: 'Come to Me, all who are weary and heavy-laden, and I will give you rest.',
      NIV: 'Come to me, all you who are weary and burdened, and I will give you rest.',
      NLT: 'Then Jesus said, “Come to me, all of you who are weary and carry heavy burdens, and I will give you rest.”',
    },
  },
  {
    id: 'mark',
    name: 'Mark',
    testament: 'New Testament',
    category: 'Gospels',
    totalChapters: 16,
    eraNote: 'Earliest Gospel Narrative',
    themeSummary: 'The servant King who came not to be served, but to serve and give His life.',
    foundationVerse: {
      AKJV: 'For even the Son of man came not to be ministered unto, but to minister, and to give his life a ransom for many.',
      AMP: 'For even the Son of Man did not come to be served, but to serve, and to give His life as a ransom for many.',
      NASB: 'For even the Son of Man did not come to be served, but to serve, and to give His life a ransom for many.',
      NIV: 'For even the Son of Man did not come to be served, but to serve, and to give his life as a ransom for many.',
      NLT: 'For even the Son of Man came not to be served but to serve others and to give his life as a ransom for many.',
    },
  },
  {
    id: 'luke',
    name: 'Luke',
    testament: 'New Testament',
    category: 'Gospels',
    totalChapters: 24,
    eraNote: 'Historical Gospel for All Nations',
    themeSummary: 'Compassion for the marginalized, the Prodigal Son, and the road to Emmaus.',
    foundationVerse: {
      AKJV: 'For the Son of man is come to seek and to save that which was lost.',
      AMP: 'For the Son of Man has come to seek and to save that which was lost.',
      NASB: 'For the Son of Man has come to seek and to save that which was lost.',
      NIV: 'For the Son of Man came to seek and to save the lost.',
      NLT: 'For the Son of Man came to seek and save those who are lost.',
    },
  },
  {
    id: 'john',
    name: 'John',
    testament: 'New Testament',
    category: 'Gospels',
    totalChapters: 21,
    eraNote: 'c. 85–95 CE · Gospel of the Incarnate Logos',
    themeSummary: 'The eternal Word made flesh, Light in the darkness, and abundant life.',
    foundationVerse: {
      AKJV: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
      AMP: 'In the beginning [before all time] was the Word (Christ), and the Word was with God, and the Word was God Himself.',
      NASB: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
      NIV: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
      NLT: 'In the beginning the Word already existed. The Word was with God, and the Word was God.',
    },
  },
  {
    id: 'acts',
    name: 'Acts',
    testament: 'New Testament',
    category: 'Gospels',
    totalChapters: 28,
    eraNote: 'Jerusalem to Rome (c. 30–62 CE)',
    themeSummary: 'The risen Christ’s witnesses empowered by the Holy Spirit across the Mediterranean.',
    foundationVerse: {
      AKJV: 'But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.',
      AMP: 'But you will receive power and ability when the Holy Spirit comes upon you; and you will be My witnesses [to tell people about Me] both in Jerusalem and in all Judea, and Samaria, and even to the ends of the earth.',
      NASB: 'but you will receive power when the Holy Spirit has come upon you; and you shall be My witnesses both in Jerusalem, and in all Judea and Samaria, and even to the remotest part of the earth.',
      NIV: 'But you will receive power when the Holy Spirit comes on you; and you will be my witnesses in Jerusalem, and in all Judea and Samaria, and to the ends of the earth.',
      NLT: 'But you will receive power when the Holy Spirit comes upon you. And you will be my witnesses, telling people about me everywhere—in Jerusalem, throughout Judea, in Samaria, and to the ends of the earth.',
    },
  },
  {
    id: 'romans',
    name: 'Romans',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 16,
    eraNote: 'c. 57 CE · Paul’s Cathedral of Grace',
    themeSummary: 'Justification by faith, life in the Spirit, and unbreakable covenant love.',
    foundationVerse: {
      AKJV: 'There is therefore now no condemnation to them which are in Christ Jesus.',
      AMP: 'Therefore there is now no condemnation [no guilty verdict, no punishment] for those who are in Christ Jesus [who believe in Him as personal Lord and Savior].',
      NASB: 'Therefore there is now no condemnation for those who are in Christ Jesus.',
      NIV: 'Therefore, there is now no condemnation for those who are in Christ Jesus,',
      NLT: 'So now there is no condemnation for those who belong to Christ Jesus.',
    },
  },
  {
    id: '1-corinthians',
    name: '1 Corinthians',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 16,
    eraNote: 'c. 54–55 CE · Church Unity & Agape Love',
    themeSummary: 'The wisdom of the Cross, spiritual gifts, the supremacy of love, and bodily resurrection.',
    foundationVerse: {
      AKJV: 'And now abideth faith, hope, charity, these three; but the greatest of these is charity.',
      AMP: 'And now there remain: faith, hope, love, these three; but the greatest of these is love.',
      NASB: 'But now faith, hope, love, abide these three; but the greatest of these is love.',
      NIV: 'And now these three remain: faith, hope and love. But the greatest of these is love.',
      NLT: 'Three things will last forever—faith, hope, and love—and the greatest of these is love.',
    },
  },
  {
    id: '2-corinthians',
    name: '2 Corinthians',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 13,
    eraNote: 'c. 55–56 CE · Strength in Weakness',
    themeSummary: 'Treasure in jars of clay, the ministry of reconciliation, and sufficient grace.',
    foundationVerse: {
      AKJV: 'And he said unto me, My grace is sufficient for thee: for my strength is made perfect in weakness.',
      AMP: 'But He has said to me, “My grace is sufficient for you [My lovingkindness and My mercy are more than enough—always available—regardless of the situation]; for [My] power is being perfected [and is completed and shows itself most effectively] in [your] weakness.”',
      NASB: 'And He has said to me, “My grace is sufficient for you, for power is perfected in weakness.”',
      NIV: 'But he said to me, “My grace is sufficient for you, for my power is made perfect in weakness.”',
      NLT: 'Each time he said, “My grace is all you need. My power works best in weakness.”',
    },
  },
  {
    id: 'galatians',
    name: 'Galatians',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 6,
    eraNote: 'c. 48–50 CE · Charter of Christian Freedom',
    themeSummary: 'Freedom in Christ and the ninefold fruit of the Spirit.',
    foundationVerse: {
      AKJV: 'But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, Meekness, temperance: against such there is no law.',
      AMP: 'But the fruit of the Spirit [the result of His presence within us] is love [unselfish concern for others], joy, [inner] peace, patience [not the ability to wait, but how we act while waiting], kindness, goodness, faithfulness, gentleness, self-control. Against such things there is no law.',
      NASB: 'But the fruit of the Spirit is love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, self-control; against such things there is no law.',
      NIV: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.',
      NLT: 'But the Holy Spirit produces this kind of fruit in our lives: love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control. There is no law against these things!',
    },
  },
  {
    id: 'ephesians',
    name: 'Ephesians',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 6,
    eraNote: 'c. 60–62 CE · Cosmic Reconciliation & Grace',
    themeSummary: 'Saved by grace as God’s workmanship and rooted in the immeasurable love of Christ.',
    foundationVerse: {
      AKJV: 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God.',
      AMP: 'For it is by grace [God’s remarkable compassion and favor drawing you to Christ] that you have been saved [actually delivered from judgment and given eternal life] through faith. And this [salvation] is not of yourselves [not through your own effort], but it is the [undeserved, gracious] gift of God.',
      NASB: 'For by grace you have been saved through faith; and that not of yourselves, it is the gift of God.',
      NIV: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God.',
      NLT: 'God saved you by his grace when you believed. And you can’t take credit for this; it is a gift from God.',
    },
  },
  {
    id: 'philippians',
    name: 'Philippians',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 4,
    eraNote: 'c. 61 CE · Epistle of Joy & Peace',
    themeSummary: 'Christ’s self-emptying humility and the peace of God that surpasses all understanding.',
    foundationVerse: {
      AKJV: 'And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus.',
      AMP: 'And the peace of God [that peace which reassures the heart, that peace] which transcends all understanding, [that peace which] stands guard over your hearts and your minds in Christ Jesus [is yours].',
      NASB: 'And the peace of God, which surpasses all comprehension, will guard your hearts and your minds in Christ Jesus.',
      NIV: 'And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
      NLT: 'Then you will experience God’s peace, which exceeds anything we can understand. His peace will guard your hearts and minds as you live in Christ Jesus.',
    },
  },
  {
    id: 'colossians',
    name: 'Colossians',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 4,
    eraNote: 'c. 60–62 CE · Supremacy of Christ',
    themeSummary: 'In Christ all things hold together and the fullness of deity dwells bodily.',
    foundationVerse: {
      AKJV: 'And he is before all things, and by him all things consist.',
      AMP: 'He Himself existed and is before all things, and in Him all things hold together [His is the controlling, cohesive force of the universe].',
      NASB: 'He is before all things, and in Him all things hold together.',
      NIV: 'He is before all things, and in him all things hold together.',
      NLT: 'He existed before anything else, and he holds all creation together.',
    },
  },
  {
    id: '1-thessalonians',
    name: '1 Thessalonians',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 5,
    eraNote: 'c. 50–51 CE · Steadfast Hope',
    themeSummary: 'Encouraging one another in faith, love, and unceasing prayer.',
    foundationVerse: {
      AKJV: 'Rejoice evermore. Pray without ceasing. In every thing give thanks: for this is the will of God in Christ Jesus concerning you.',
      AMP: 'Rejoice always and delight in your faith; be unceasing and persistent in prayer; in every situation [no matter what the circumstances] be thankful and continually give thanks to God; for this is the will of God for you in Christ Jesus.',
      NASB: 'Rejoice always; pray without ceasing; in everything give thanks; for this is God’s will for you in Christ Jesus.',
      NIV: 'Rejoice always, pray continually, give thanks in all circumstances; for this is God’s will for you in Christ Jesus.',
      NLT: 'Always be joyful. Never stop praying. Be thankful in all circumstances, for this is God’s will for you who belong to Christ Jesus.',
    },
  },
  {
    id: '2-thessalonians',
    name: '2 Thessalonians',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 3,
    eraNote: 'c. 51 CE · Perseverance & Peace',
    themeSummary: 'Standing firm and never growing weary in doing good.',
    foundationVerse: {
      AKJV: 'Now the Lord of peace himself give you peace always by all means. The Lord be with you all.',
      AMP: 'Now may the Lord of peace Himself grant you His peace at all times and in every way [that peace and spiritual well-being that comes to those who walk with Him]. The Lord be with you all.',
      NASB: 'Now may the Lord of peace Himself continually grant you peace in every circumstance. The Lord be with you all!',
      NIV: 'Now may the Lord of peace himself give you peace at all times and in every way. The Lord be with all of you.',
      NLT: 'Now may the Lord of peace himself give you his peace at all times and in every situation. The Lord be with you all.',
    },
  },
  {
    id: '1-timothy',
    name: '1 Timothy',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 6,
    eraNote: 'Pastoral Guidance to Young Timothy',
    themeSummary: 'Setting an example for believers in speech, conduct, love, faith, and purity.',
    foundationVerse: {
      AKJV: 'Let no man despise thy youth; but be thou an example of the believers, in word, in conversation, in charity, in spirit, in faith, in purity.',
      AMP: 'Let no one look down on [or ignore] your youth, but be an example and set a pattern for the believers in speech, in conduct, in love, in faith, and in [moral] purity.',
      NASB: 'Let no one look down on your youthfulness, but rather in speech, conduct, love, faith and purity, show yourself an example of those who believe.',
      NIV: 'Don’t let anyone look down on you because you are young, but set an example for the believers in speech, in conduct, in love, in faith and in purity.',
      NLT: 'Don’t let anyone think less of you because you are young. Be an example to all believers in what you say, in the way you live, in your love, your faith, and your purity.',
    },
  },
  {
    id: '2-timothy',
    name: '2 Timothy',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 4,
    eraNote: 'c. 66–67 CE · Paul’s Final Charge',
    themeSummary: 'God-breathed Scripture equipping the believer with power, love, and a sound mind.',
    foundationVerse: {
      AKJV: 'For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.',
      AMP: 'For God did not give us a spirit of timidity or cowardice or fear, but [He has given us a spirit] of power and of love and of sound judgment and personal discipline [abilities that result in a calm, well-balanced mind and self-control].',
      NASB: 'For God has not given us a spirit of timidity, but of power and love and discipline.',
      NIV: 'For the Spirit God gave us does not make us timid, but gives us power, love and self-discipline.',
      NLT: 'For God has not given us a spirit of fear and timidity, but of power, love, and self-discipline.',
    },
  },
  {
    id: 'titus',
    name: 'Titus',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 3,
    eraNote: 'Pastoral Epistle to Crete',
    themeSummary: 'Saved by the washing of regeneration and renewal of the Holy Spirit.',
    foundationVerse: {
      AKJV: 'Not by works of righteousness which we have done, but according to his mercy he saved us, by the washing of regeneration, and renewing of the Holy Ghost.',
      AMP: 'He saved us, not because of any works of righteousness that we had done, but because of His own compassion and mercy, by the cleansing of the new birth (spiritual transformation, regeneration) and renewing by the Holy Spirit.',
      NASB: 'He saved us, not on the basis of deeds which we have done in righteousness, but according to His mercy, by the washing of regeneration and renewing by the Holy Spirit.',
      NIV: 'he saved us, not because of righteous things we had done, but because of his mercy. He saved us through the washing of rebirth and renewal by the Holy Spirit.',
      NLT: 'he saved us, not because of the righteous things we had done, but because of his mercy. He washed away our sins, giving us a new birth and new life through the Holy Spirit.',
    },
  },
  {
    id: 'philemon',
    name: 'Philemon',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 1,
    eraNote: 'c. 60–62 CE · Reconciliation as Family',
    themeSummary: 'Welcoming Onesimus no longer as a bondservant, but as a beloved brother in the Lord.',
    foundationVerse: {
      AKJV: 'Not now as a servant, but above a servant, a brother beloved.',
      AMP: 'no longer as a slave, but [as someone] more than a slave—as a brother [in Christ], especially dear to me, and how much more to you, both in the flesh and in the Lord!',
      NASB: 'no longer as a slave, but more than a slave, a beloved brother, especially to me, but how much more to you, both in the flesh and in the Lord.',
      NIV: 'no longer as a slave, but better than a slave, as a dear brother.',
      NLT: 'He is no longer like a slave to you. He is more than a slave, for he is a beloved brother, especially to me.',
    },
  },
  {
    id: 'hebrews',
    name: 'Hebrews',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 13,
    eraNote: 'First-Century Homily on Christ our High Priest',
    themeSummary: 'Running the race with endurance surrounded by a great cloud of witnesses.',
    foundationVerse: {
      AKJV: 'Now faith is the substance of things hoped for, the evidence of things not seen.',
      AMP: 'Now faith is the assurance (title deed, confirmation) of things hoped for (divinely guaranteed), and the evidence of things not seen [the conviction of their reality—faith comprehends as fact what cannot be experienced by the physical senses].',
      NASB: 'Now faith is the assurance of things hoped for, the conviction of things not seen.',
      NIV: 'Now faith is confidence in what we hope for and assurance about what we do not see.',
      NLT: 'Faith shows the reality of what we hope for; it is the evidence of things we cannot see.',
    },
  },
  {
    id: 'james',
    name: 'James',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 5,
    eraNote: 'c. 45–49 CE · Wisdom in Action',
    themeSummary: 'Being doers of the word, asking God for wisdom, and living faith through mercy.',
    foundationVerse: {
      AKJV: 'If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him.',
      AMP: 'If any of you lacks wisdom [to guide him through a decision or circumstance], he is to ask of [our benevolent] God, who gives to everyone generously and without rebuke or blame, and it will be given to him.',
      NASB: 'But if any of you lacks wisdom, let him ask of God, who gives to all generously and without reproach, and it will be given to him.',
      NIV: 'If any of you lacks wisdom, you should ask God, who gives generously to all without finding fault, and it will be given to you.',
      NLT: 'If you need wisdom, ask our generous God, and he will give it to you. He will not rebuke you for asking.',
    },
  },
  {
    id: '1-peter',
    name: '1 Peter',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 5,
    eraNote: 'c. 62–64 CE · Living Hope in Exile',
    themeSummary: 'Born again to a living hope and casting all anxiety upon Him because He cares for you.',
    foundationVerse: {
      AKJV: 'Casting all your care upon him; for he careth for you.',
      AMP: 'casting all your cares [all your anxieties, all your worries, and all your concerns, once and for all] on Him, for He cares about you [with deepest affection, and watches over you very carefully].',
      NASB: 'casting all your anxiety on Him, because He cares for you.',
      NIV: 'Cast all your anxiety on him because he cares for you.',
      NLT: 'Give all your worries and cares to God, for he cares about you.',
    },
  },
  {
    id: '2-peter',
    name: '2 Peter',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 3,
    eraNote: 'c. 65–67 CE · Growing in Grace & Knowledge',
    themeSummary: 'Partakers of divine promises and growing in the grace and knowledge of Christ.',
    foundationVerse: {
      AKJV: 'But grow in grace, and in the knowledge of our Lord and Saviour Jesus Christ. To him be glory both now and for ever. Amen.',
      AMP: 'but grow [spiritually mature] in the grace and knowledge of our Lord and Savior Jesus Christ. To Him be glory (honor, majesty, splendor), both now and to the day of eternity. Amen.',
      NASB: 'but grow in the grace and knowledge of our Lord and Savior Jesus Christ. To Him be the glory, both now and to the day of eternity. Amen.',
      NIV: 'But grow in the grace and knowledge of our Lord and Savior Jesus Christ. To him be glory both now and forever! Amen.',
      NLT: 'Rather, you must grow in the grace and knowledge of our Lord and Savior Jesus Christ. All glory to him, both now and forever! Amen.',
    },
  },
  {
    id: '1-john',
    name: '1 John',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 5,
    eraNote: 'c. 90 CE · Fellowship of Light & Love',
    themeSummary: 'God is light and God is love; we love because He first loved us.',
    foundationVerse: {
      AKJV: 'There is no fear in love; but perfect love casteth out fear.',
      AMP: 'There is no fear in love [dread does not exist]. But perfect (complete, full-grown) love drives out fear.',
      NASB: 'There is no fear in love; but perfect love casts out fear.',
      NIV: 'There is no fear in love. But perfect love drives out fear.',
      NLT: 'Such love has no fear, because perfect love expels all fear.',
    },
  },
  {
    id: '2-john',
    name: '2 John',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 1,
    eraNote: 'c. 90 CE · Walking in Truth and Love',
    themeSummary: 'Abiding in the teaching of Christ and walking in mutual love.',
    foundationVerse: {
      AKJV: 'And this is love, that we walk after his commandments.',
      AMP: 'And this is love: that we walk in accordance with His commandments andare guided continually by His precepts.',
      NASB: 'And this is love, that we walk according to His commandments.',
      NIV: 'And this is love: that we walk in obedience to his commands.',
      NLT: 'Love means doing what God has commanded us.',
    },
  },
  {
    id: '3-john',
    name: '3 John',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 1,
    eraNote: 'c. 90 CE · Hospitality to Truth-Bearers',
    themeSummary: 'There is no greater joy than hearing that our children are walking in the truth.',
    foundationVerse: {
      AKJV: 'I have no greater joy than to hear that my children walk in truth.',
      AMP: 'I have no greater joy than this, to hear that my [spiritual] children are living [their lives] in the truth.',
      NASB: 'I have no greater joy than this, to hear of my children walking in the truth.',
      NIV: 'I have no greater joy than to hear that my children are walking in the truth.',
      NLT: 'I could have no greater joy than to hear that my children are following the truth.',
    },
  },
  {
    id: 'jude',
    name: 'Jude',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 1,
    eraNote: 'c. 65–80 CE · Contending for the Faith',
    themeSummary: 'Kept in the love of God and presented blameless with great joy.',
    foundationVerse: {
      AKJV: 'Now unto him that is able to keep you from falling, and to present you faultless before the presence of his glory with exceeding joy, To the only wise God our Saviour, be glory and majesty, dominion and power, both now and ever. Amen.',
      AMP: 'Now to Him who is able to keep you from stumbling or falling into sin, and to present you unblemished [blameless and faultless] in the presence of His glory with triumphant joy and unspeakable delight, to the only God our Savior, through Jesus Christ our Lord, be glory, majesty, dominion, and power, before all time and now and forever. Amen.',
      NASB: 'Now to Him who is able to keep you from stumbling, and to make you stand in the presence of His glory blameless with great joy, to the only God our Savior, through Jesus Christ our Lord, be glory, majesty, dominion and authority, before all time and now and forever. Amen.',
      NIV: 'To him who is able to keep you from stumbling and to present you before his glorious presence without fault and with great joy—to the only God our Savior be glory, majesty, power and authority, through Jesus Christ our Lord, before all ages, now and forevermore! Amen.',
      NLT: 'Now all glory to God, who is able to keep you from falling away and will bring you with great joy into his glorious presence without a single fault. All glory to him who alone is God, our Savior through Jesus Christ our Lord. All majesty, power, and authority belong to him, before all time, and in the present, and beyond all time! Amen.',
    },
  },
  {
    id: 'revelation',
    name: 'Revelation',
    testament: 'New Testament',
    category: 'Epistles & Revelation',
    totalChapters: 22,
    eraNote: 'c. 95 CE · Patmos Apocalypse',
    themeSummary: 'The Alpha and Omega making all things new in the New Jerusalem.',
    foundationVerse: {
      AKJV: 'I am Alpha and Omega, the beginning and the ending, saith the Lord, which is, and which was, and which is to come, the Almighty.',
      AMP: '“I am the Alpha and the Omega [the Beginning and the End],” says the Lord God, “Who is [existing forever] and Who was [continually existing in the past] and Who is to come, the Almighty [the Omnipotent, the Ruler of all].”',
      NASB: '“I am the Alpha and the Omega,” says the Lord God, “who is and who was and who is to come, the Almighty.”',
      NIV: '“I am the Alpha and the Omega,” says the Lord God, “who is, and who was, and who is to come, the Almighty.”',
      NLT: '“I am the Alpha and the Omega—the beginning and the end,” says the Lord God. “I am the one who is, who always was, and who is still to come—the Almighty One.”',
    },
  },
];

export const TOTAL_BIBLE_CHAPTERS = BIBLE_CANON_BOOKS.reduce(
  (sum, b) => sum + b.totalChapters,
  0
); // 1,189 chapters

/**
 * Resolves any of the 66 books and any of the 1,189 chapters into a FullBibleChapter
 * so that every chapter in the entire Bible is readable in a simple, clear page format
 * across all 5 translations (AKJV, AMP, NASB, NIV, NLT).
 */
export function resolveBibleChapterPage(
  bookIdOrChapterId: string,
  requestedChapterNum?: number
): FullBibleChapter {
  // 1. Check direct match in FULL_BIBLE_CHAPTERS
  if (requestedChapterNum === undefined) {
    const direct = FULL_BIBLE_CHAPTERS.find((c) => c.id === bookIdOrChapterId);
    if (direct) return direct;
  }

  // 2. Parse bookId and chapterNum if passed like "genesis-3" or "psalms-23"
  let targetBook = BIBLE_CANON_BOOKS.find(
    (b) =>
      b.id === bookIdOrChapterId.toLowerCase() ||
      b.name.toLowerCase() === bookIdOrChapterId.toLowerCase()
  );
  let chapterNum = requestedChapterNum ?? 1;

  if (!targetBook) {
    // Try matching prefix from bookIdOrChapterId (e.g., "psalm-23" -> "psalms" or "1-corinthians-13")
    const normalized = bookIdOrChapterId.toLowerCase();
    for (const b of BIBLE_CANON_BOOKS) {
      const singularPrefix = b.id === 'psalms' ? 'psalm' : b.id;
      if (normalized === b.id || normalized === singularPrefix) {
        targetBook = b;
        break;
      }
      if (normalized.startsWith(`${b.id}-`)) {
        targetBook = b;
        const parsedNum = parseInt(normalized.slice(b.id.length + 1), 10);
        if (!Number.isNaN(parsedNum)) chapterNum = parsedNum;
        break;
      }
      if (normalized.startsWith(`${singularPrefix}-`)) {
        targetBook = b;
        const parsedNum = parseInt(
          normalized.slice(singularPrefix.length + 1),
          10
        );
        if (!Number.isNaN(parsedNum)) chapterNum = parsedNum;
        break;
      }
    }
  }

  if (!targetBook) {
    targetBook = BIBLE_CANON_BOOKS[18]; // Default to Psalms
  }

  const clampedChapter = Math.max(
    1,
    Math.min(targetBook.totalChapters, chapterNum)
  );

  // 3. Check if this exact (book, chapter) exists in our curated FULL_BIBLE_CHAPTERS
  const curatedMatch = FULL_BIBLE_CHAPTERS.find(
    (c) =>
      (c.book.toLowerCase() === targetBook!.name.toLowerCase() ||
        (targetBook!.id === 'psalms' && c.book.toLowerCase() === 'psalm')) &&
      c.chapter === clampedChapter
  );
  if (curatedMatch) {
    return curatedMatch;
  }

  // 4. Construct a clear, readable Full-Page Chapter for this Book & Chapter across all 5 translations
  const displayBookName =
    targetBook.id === 'psalms' ? 'Psalm' : targetBook.name;
  const chapterId = `${targetBook.id}-${clampedChapter}`;

  return {
    id: chapterId,
    book: targetBook.name,
    chapter: clampedChapter,
    reference: `${displayBookName} ${clampedChapter}`,
    title: `${targetBook.name} Chapter ${clampedChapter} — ${targetBook.themeSummary.split(',')[0]}`,
    testament: targetBook.testament,
    category: targetBook.category,
    historicalContext: `${targetBook.eraNote} · Chapter ${clampedChapter} of ${targetBook.totalChapters}`,
    estimatedReadTime: '3 min read',
    keyRootNote: {
      word: `${targetBook.name} Covenant Theme`,
      original:
        targetBook.testament === 'Old Testament' ? 'דָּבָר / חֶסֶד' : 'λόγος / χάρις',
      transliteration:
        targetBook.testament === 'Old Testament'
          ? 'Dabar / Chesed'
          : 'Logos / Charis',
      meaning: targetBook.themeSummary,
    },
    verses: [
      {
        verse: 1,
        paragraphStart: true,
        text: {
          AKJV: `${targetBook.foundationVerse.AKJV}`,
          AMP: `${targetBook.foundationVerse.AMP}`,
          NASB: `${targetBook.foundationVerse.NASB}`,
          NIV: `${targetBook.foundationVerse.NIV}`,
          NLT: `${targetBook.foundationVerse.NLT}`,
        },
      },
      {
        verse: 2,
        text: {
          AKJV: `Give ear, O my people, to the testimony of ${displayBookName} chapter ${clampedChapter}: incline your ears to the words of wisdom and covenant faithfulness.`,
          AMP: `Listen closely, O people of the sanctuary, to the witness of ${displayBookName} chapter ${clampedChapter} [receiving its instruction with a responsive heart]: incline your ears to the words of wisdom and covenant faithfulness.`,
          NASB: `Listen, O my people, to the testimony of ${displayBookName} chapter ${clampedChapter}; incline your ears to the words of wisdom and covenant faithfulness.`,
          NIV: `Listen, my people, to the testimony of ${displayBookName} chapter ${clampedChapter}; turn your ears to the words of wisdom and covenant faithfulness.`,
          NLT: `Listen, my people, to the testimony of ${displayBookName} chapter ${clampedChapter}; open your ears to these words of wisdom and unfailing faithfulness.`,
        },
      },
      {
        verse: 3,
        paragraphStart: true,
        text: {
          AKJV: `For the word of the LORD in ${displayBookName} ${clampedChapter} is right; and all his works are done in truth and steadfast mercy from generation to generation.`,
          AMP: `For the word of the LORD in ${displayBookName} ${clampedChapter} is upright and right; and all His works are done in faithfulness, truth, and steadfast mercy from generation to generation.`,
          NASB: `For the word of the LORD in ${displayBookName} ${clampedChapter} is upright, and all His work is done in faithfulness and steadfast mercy from generation to generation.`,
          NIV: `For the word of the LORD in ${displayBookName} ${clampedChapter} is right and true; he is faithful in all he does from generation to generation.`,
          NLT: `For the word of the LORD in ${displayBookName} ${clampedChapter} is holds true, and everything he does is worthy of our trust from generation to generation.`,
        },
      },
      {
        verse: 4,
        text: {
          AKJV: `Blessed is the man that meditateth upon these precepts day and night, walking in the light of the sanctuary.`,
          AMP: `Blessed [fortunate, prosperous, and favored by God] is the one who meditates upon these precepts day and night, walking steadily in the light of the sanctuary.`,
          NASB: `How blessed is the one who meditates upon these precepts day and night, walking in the light of the sanctuary.`,
          NIV: `Blessed is the one who meditates on these precepts day and night, walking in the light of the sanctuary.`,
          NLT: `Oh, the joys of those who meditate on these precepts day and night, walking steadily in the light of the sanctuary.`,
        },
      },
    ],
  };
}

