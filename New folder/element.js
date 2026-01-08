const atomicWeights = [
  '1.0080',  // Hydrogen (H)
  '4.0026',  // Helium (He)
  '6.94',    // Lithium (Li)
  '9.0122',  // Beryllium (Be)
  '10.81',   // Boron (B)
  '12.011',  // Carbon (C)
  '14.007',  // Nitrogen (N)
  '15.999',  // Oxygen (O)
  '18.998',  // Fluorine (F)
  '20.180',  // Neon (Ne)
  '22.990',  // Sodium (Na)
  '24.305',  // Magnesium (Mg)
  '26.982',  // Aluminum (Al)
  '28.085',  // Silicon (Si)
  '30.974',  // Phosphorus (P)
  '32.06',   // Sulfur (S)
  '35.45',   // Chlorine (Cl)
  '39.948',  // Argon (Ar)
  '39.098',  // Potassium (K)
  '40.078',  // Calcium (Ca)
  '44.956',  // Scandium (Sc)
  '47.867',  // Titanium (Ti)
  '50.942',  // Vanadium (V)
  '51.996',  // Chromium (Cr)
  '54.938',  // Manganese (Mn)
  '55.845',  // Iron (Fe)
  '58.933',  // Cobalt (Co)
  '58.693',  // Nickel (Ni)
  '63.546',  // Copper (Cu)
  '65.38',   // Zinc (Zn)
  '69.723',  // Gallium (Ga)
  '72.63',   // Germanium (Ge)
  '74.922',  // Arsenic (As)
  '78.971',  // Selenium (Se)
  '79.904',  // Bromine (Br)
  '83.798',  // Krypton (Kr)
  '85.468',  // Rubidium (Rb)
  '87.62',   // Strontium (Sr)
  '88.906',  // Yttrium (Y)
  '91.224',  // Zirconium (Zr)
  '92.906',  // Niobium (Nb)
  '95.95',   // Molybdenum (Mo)
  '98.0',    // Technetium (Tc)
  '101.07',  // Ruthenium (Ru)
  '102.91',  // Rhodium (Rh)
  '106.42',  // Palladium (Pd)
  '107.87',  // Silver (Ag)
  '112.41',  // Cadmium (Cd)
  '114.82',  // Indium (In)
  '118.71',  // Tin (Sn)
  '121.76',  // Antimony (Sb)
  '127.60',  // Tellurium (Te)
  '126.90',  // Iodine (I)
  '131.29',  // Xenon (Xe)
  '132.91',  // Cesium (Cs)
  '137.33',  // Barium (Ba)
  '138.91',  // Lanthanum (La)
  '140.12',  // Cerium (Ce)
  '140.91',  // Praseodymium (Pr)
  '144.24',  // Neodymium (Nd)
  '145.0',   // Promethium (Pm)
  '150.36',  // Samarium (Sm)
  '151.96',  // Europium (Eu)
  '157.25',  // Gadolinium (Gd)
  '158.93',  // Terbium (Tb)
  '162.50',  // Dysprosium (Dy)
  '164.93',  // Holmium (Ho)
  '167.26',  // Erbium (Er)
  '168.93',  // Thulium (Tm)
  '173.04',  // Ytterbium (Yb)
  '174.97',  // Lutetium (Lu)
  '178.49',  // Hafnium (Hf)
  '180.95',  // Tantalum (Ta)
  '183.84',  // Tungsten (W)
  '186.21',  // Rhenium (Re)
  '190.23',  // Osmium (Os)
  '192.22',  // Iridium (Ir)
  '195.08',  // Platinum (Pt)
  '196.97',  // Gold (Au)
  '200.59',  // Mercury (Hg)
  '204.38',  // Thallium (Tl)
  '207.2',   // Lead (Pb)
  '208.98',  // Bismuth (Bi)
  '209.0',   // Polonium (Po)
  '210.0',   // Astatine (At)
  '222.0',   // Radon (Rn)
  '223.0',   // Francium (Fr)
  '226.0',   // Radium (Ra)
  '227.0',   // Actinium (Ac)
  '232.04',  // Thorium (Th)
  '231.04',  // Protactinium (Pa)
  '238.03',  // Uranium (U)
  '237.0',   // Neptunium (Np)
  '244.0',   // Plutonium (Pu)
  '243.0',   // Americium (Am)
  '247.0',   // Curium (Cm)
  '247.0',   // Berkelium (Bk)
  '251.0',   // Californium (Cf)
  '252.0',   // Einsteinium (Es)
  '257.0',   // Fermium (Fm)
  '258.0',   // Mendelevium (Md)
  '259.0',   // Nobelium (No)
  '262.0',   // Lawrencium (Lr)
  '267.0',   // Rutherfordium (Rf)
  '270.0',   // Dubnium (Db)
  '271.0',   // Seaborgium (Sg)
  '270.0',   // Bohrium (Bh)
  '277.0',   // Hassium (Hs)
  '276.0',   // Meitnerium (Mt)
  '282.0',   // Darmstadtium (Ds)
  '285.0',   // Roentgenium (Rg)
  '288.0',   // Copernicium (Cn)
  '293.0',   // Nihonium (Nh)
  '294.0',   // Flerovium (Fl)
  '294.0',   // Moscovium (Mc)
  '294.0',   // Livermorium (Lv)
  '294.0'    // Oganesson (Og)
];
const electronegativities = [
  '2.20',  // Hydrogen (H)
  '0.00',  // Helium (He) - No value as it is inert
  '0.98',  // Lithium (Li)
  '1.57',  // Beryllium (Be)
  '2.04',  // Boron (B)
  '2.55',  // Carbon (C)
  '3.04',  // Nitrogen (N)
  '3.44',  // Oxygen (O)
  '3.98',  // Fluorine (F)
  '3.00',  // Neon (Ne) - No value as it is inert
  '0.93',  // Sodium (Na)
  '1.31',  // Magnesium (Mg)
  '1.61',  // Aluminum (Al)
  '1.90',  // Silicon (Si)
  '2.19',  // Phosphorus (P)
  '2.58',  // Sulfur (S)
  '2.96',  // Chlorine (Cl)
  '2.60',  // Argon (Ar) - No value as it is inert
  '0.82',  // Potassium (K)
  '1.00',  // Calcium (Ca)
  '1.36',  // Scandium (Sc)
  '1.54',  // Titanium (Ti)
  '1.63',  // Vanadium (V)
  '1.66',  // Chromium (Cr)
  '1.83',  // Manganese (Mn)
  '1.83',  // Iron (Fe)
  '1.88',  // Cobalt (Co)
  '1.91',  // Nickel (Ni)
  '1.90',  // Copper (Cu)
  '1.65',  // Zinc (Zn)
  '1.81',  // Gallium (Ga)
  '2.01',  // Germanium (Ge)
  '2.18',  // Arsenic (As)
  '2.55',  // Selenium (Se)
  '2.96',  // Bromine (Br)
  '2.60',  // Krypton (Kr) - No value as it is inert
  '0.82',  // Rubidium (Rb)
  '0.95',  // Strontium (Sr)
  '1.22',  // Yttrium (Y)
  '1.33',  // Zirconium (Zr)
  '1.34',  // Niobium (Nb)
  '1.30',  // Molybdenum (Mo)
  '1.28',  // Technetium (Tc)
  '1.30',  // Ruthenium (Ru)
  '1.44',  // Rhodium (Rh)
  '1.45',  // Palladium (Pd)
  '1.41',  // Silver (Ag)
  '1.69',  // Cadmium (Cd)
  '1.78',  // Indium (In)
  '1.96',  // Tin (Sn)
  '1.24',  // Antimony (Sb)
  '2.06',  // Tellurium (Te)
  '2.66',  // Iodine (I)
  '2.60',  // Xenon (Xe) - No value as it is inert
  '0.79',  // Cesium (Cs)
  '0.89',  // Barium (Ba)
  '1.10',  // Lanthanum (La)
  '1.12',  // Cerium (Ce)
  '1.13',  // Praseodymium (Pr)
  '1.14',  // Neodymium (Nd)
  '1.13',  // Promethium (Pm)
  '1.17',  // Samarium (Sm)
  '1.19',  // Europium (Eu)
  '1.20',  // Gadolinium (Gd)
  '1.23',  // Terbium (Tb)
  '1.24',  // Dysprosium (Dy)
  '1.25',  // Holmium (Ho)
  '1.27',  // Erbium (Er)
  '1.24',  // Thulium (Tm)
  '1.27',  // Ytterbium (Yb)
  '1.27',  // Lutetium (Lu)
  '1.30',  // Hafnium (Hf)
  '1.50',  // Tantalum (Ta)
  '2.36',  // Tungsten (W)
  '1.90',  // Rhenium (Re)
  '2.20',  // Osmium (Os)
  '2.20',  // Iridium (Ir)
  '2.28',  // Platinum (Pt)
  '2.54',  // Gold (Au)
  '1.44',  // Mercury (Hg)
  '1.62',  // Thallium (Tl)
  '1.87',  // Lead (Pb)
  '2.02',  // Bismuth (Bi)
  '2.0',   // Polonium (Po)
  '2.2',   // Astatine (At)
  '2.2',   // Radon (Rn) - No value as it is inert
  '0.7',   // Francium (Fr)
  '0.9',   // Radium (Ra)
  '1.1',   // Actinium (Ac)
  '1.3',   // Thorium (Th)
  '1.5',   // Protactinium (Pa)
  '1.38',  // Uranium (U)
  '1.36',  // Neptunium (Np)
  '1.28',  // Plutonium (Pu)
  '1.3',   // Americium (Am)
  '1.28',  // Curium (Cm)
  '1.3',   // Berkelium (Bk)
  '1.3',   // Californium (Cf)
  '1.3',   // Einsteinium (Es)
  '1.3',   // Fermium (Fm)
  '1.3',   // Mendelevium (Md)
  '1.3',   // Nobelium (No)
  '1.3',   // Lawrencium (Lr)
  '1.3',   // Rutherfordium (Rf)
  '1.3',   // Dubnium (Db)
  '1.3',   // Seaborgium (Sg)
  '1.3',   // Bohrium (Bh)
  '1.3',   // Hassium (Hs)
  '1.3',   // Meitnerium (Mt)
  '1.3',   // Darmstadtium (Ds)
  '1.3',   // Roentgenium (Rg)
  '1.3',   // Copernicium (Cn)
  '1.3',   // Nihonium (Nh)
  '1.3',   // Flerovium (Fl)
  '1.3',   // Moscovium (Mc)
  '1.3',   // Livermorium (Lv)
  '1.3'    // Oganesson (Og)
];
const meltingPoints = [
  '-259.16', // Hydrogen (H)
  '-272.2',  // Helium (He)
  '180.5',   // Lithium (Li)
  '1287',    // Beryllium (Be)
  '2300',    // Boron (B)
  '3550',    // Carbon (C)
  '-210.0',  // Nitrogen (N)
  '-218.79', // Oxygen (O)
  '-219.67', // Fluorine (F)
  '-248.59', // Neon (Ne)
  '97.79',   // Sodium (Na)
  '650',     // Magnesium (Mg)
  '660.32',  // Aluminum (Al)
  '1414',    // Silicon (Si)
  '44.2',    // Phosphorus (P)
  '115.21',  // Sulfur (S)
  '-101.5',  // Chlorine (Cl)
  '-189.34', // Argon (Ar)
  '63.5',    // Potassium (K)
  '842',     // Calcium (Ca)
  '1541',    // Scandium (Sc)
  '1668',    // Titanium (Ti)
  '1910',    // Vanadium (V)
  '1907',    // Chromium (Cr)
  '1246',    // Manganese (Mn)
  '1538',    // Iron (Fe)
  '1495',    // Cobalt (Co)
  '1455',    // Nickel (Ni)
  '1084.62', // Copper (Cu)
  '419.53',  // Zinc (Zn)
  '29.76',   // Gallium (Ga)
  '938.25',  // Germanium (Ge)
  '817',     // Arsenic (As)
  '221',     // Selenium (Se)
  '-7.2',    // Bromine (Br)
  '-157.36', // Krypton (Kr)
  '39.31',   // Rubidium (Rb)
  '777',     // Strontium (Sr)
  '1526',    // Yttrium (Y)
  '1855',    // Zirconium (Zr)
  '2477',    // Niobium (Nb)
  '2623',    // Molybdenum (Mo)
  '2157',    // Technetium (Tc)
  '2334',    // Ruthenium (Ru)
  '1964',    // Rhodium (Rh)
  '1554.9',  // Palladium (Pd)
  '961.78',  // Silver (Ag)
  '321.07',  // Cadmium (Cd)
  '156.6',   // Indium (In)
  '231.93',  // Tin (Sn)
  '630.63',  // Antimony (Sb)
  '449.51',  // Tellurium (Te)
  '113.7',   // Iodine (I)
  '-111.75', // Xenon (Xe)
  '28.44',   // Cesium (Cs)
  '727',     // Barium (Ba)
  '920',     // Lanthanum (La)
  '798',     // Cerium (Ce)
  '931',     // Praseodymium (Pr)
  '1010',    // Neodymium (Nd)
  '1042',    // Promethium (Pm)
  '1072',    // Samarium (Sm)
  '826',     // Europium (Eu)
  '1312',    // Gadolinium (Gd)
  '1356',    // Terbium (Tb)
  '1407',    // Dysprosium (Dy)
  '1474',    // Holmium (Ho)
  '1529',    // Erbium (Er)
  '1545',    // Thulium (Tm)
  '824',     // Ytterbium (Yb)
  '1652',    // Lutetium (Lu)
  '2233',    // Hafnium (Hf)
  '3017',    // Tantalum (Ta)
  '3422',    // Tungsten (W)
  '3186',    // Rhenium (Re)
  '3033',    // Osmium (Os)
  '2410',    // Iridium (Ir)
  '1768.3',  // Platinum (Pt)
  '1064.18', // Gold (Au)
  '-38.83',  // Mercury (Hg)
  '304',     // Thallium (Tl)
  '327.46',  // Lead (Pb)
  '271.4',   // Bismuth (Bi)
  '254',     // Polonium (Po)
  '302',     // Astatine (At)
  '-71',     // Radon (Rn)
  '27',      // Francium (Fr)
  '700',     // Radium (Ra)
  '1050',    // Actinium (Ac)
  '1750',    // Thorium (Th)
  '1572',    // Protactinium (Pa)
  '1132.2',  // Uranium (U)
  '639',     // Neptunium (Np)
  '640',     // Plutonium (Pu)
  '1176',    // Americium (Am)
  '1340',    // Curium (Cm)
  '986',     // Berkelium (Bk)
  '900',     // Californium (Cf)
  '860',     // Einsteinium (Es)
  '1527',    // Fermium (Fm)
  '827',     // Mendelevium (Md)
  '827',     // Nobelium (No)
  '1627',    // Lawrencium (Lr)
  '2100',    // Rutherfordium (Rf)
  '2400',    // Dubnium (Db)
  '2300',    // Seaborgium (Sg)
  '2200',    // Bohrium (Bh)
  '2300',    // Hassium (Hs)
  '1100',    // Meitnerium (Mt)
  '0',       // Darmstadtium (Ds) - predicted
  '0',       // Roentgenium (Rg) - predicted
  '0',       // Copernicium (Cn) - predicted
  '0',       // Nihonium (Nh) - predicted
  '0',       // Flerovium (Fl) - predicted
  '0',       // Moscovium (Mc) - predicted
  '0',       // Livermorium (Lv) - predicted
  '0'        // Oganesson (Og) - predicted
];const boilingPoints = [
  '-252.87', // Hydrogen (H)
  '-268.93', // Helium (He)
  '1342',    // Lithium (Li)
  '2469',    // Beryllium (Be)
  '2550',    // Boron (B)
  '4827',    // Carbon (C)
  '-195.8',  // Nitrogen (N)
  '-182.96', // Oxygen (O)
  '-188.12', // Fluorine (F)
  '-246.08', // Neon (Ne)
  '883',     // Sodium (Na)
  '1091',    // Magnesium (Mg)
  '2519',    // Aluminum (Al)
  '3265',    // Silicon (Si)
  '280.5',   // Phosphorus (P)
  '444.72',  // Sulfur (S)
  '-34.04',  // Chlorine (Cl)
  '-185.85', // Argon (Ar)
  '759',     // Potassium (K)
  '1484',    // Calcium (Ca)
  '2830',    // Scandium (Sc)
  '3287',    // Titanium (Ti)
  '3407',    // Vanadium (V)
  '2671',    // Chromium (Cr)
  '2061',    // Manganese (Mn)
  '2862',    // Iron (Fe)
  '2927',    // Cobalt (Co)
  '2730',    // Nickel (Ni)
  '2562',    // Copper (Cu)
  '907',     // Zinc (Zn)
  '2400',    // Gallium (Ga)
  '2833',    // Germanium (Ge)
  '614',     // Arsenic (As)
  '685',     // Selenium (Se)
  '58.8',    // Bromine (Br)
  '-153.22', // Krypton (Kr)
  '688',     // Rubidium (Rb)
  '1377',    // Strontium (Sr)
  '3336',    // Yttrium (Y)
  '4377',    // Zirconium (Zr)
  '4744',    // Niobium (Nb)
  '4639',    // Molybdenum (Mo)
  '4265',    // Technetium (Tc)
  '4150',    // Ruthenium (Ru)
  '3695',    // Rhodium (Rh)
  '2963',    // Palladium (Pd)
  '2162',    // Silver (Ag)
  '767',     // Cadmium (Cd)
  '2080',    // Indium (In)
  '2602',    // Tin (Sn)
  '1587',    // Antimony (Sb)
  '988',     // Tellurium (Te)
  '184.3',   // Iodine (I)
  '-108.1',  // Xenon (Xe)
  '671',     // Cesium (Cs)
  '1897',    // Barium (Ba)
  '3464',    // Lanthanum (La)
  '3443',    // Cerium (Ce)
  '3290',    // Praseodymium (Pr)
  '3074',    // Neodymium (Nd)
  '3000',    // Promethium (Pm)
  '1794',    // Samarium (Sm)
  '1597',    // Europium (Eu)
  '3250',    // Gadolinium (Gd)
  '3230',    // Terbium (Tb)
  '2562',    // Dysprosium (Dy)
  '2700',    // Holmium (Ho)
  '2868',    // Erbium (Er)
  '1950',    // Thulium (Tm)
  '1196',    // Ytterbium (Yb)
  '3402',    // Lutetium (Lu)
  '4603',    // Hafnium (Hf)
  '5458',    // Tantalum (Ta)
  '5555',    // Tungsten (W)
  '5596',    // Rhenium (Re)
  '5012',    // Osmium (Os)
  '4130',    // Iridium (Ir)
  '3825',    // Platinum (Pt)
  '2856',    // Gold (Au)
  '356.73',  // Mercury (Hg)
  '1473',    // Thallium (Tl)
  '1749',    // Lead (Pb)
  '1564',    // Bismuth (Bi)
  '962',     // Polonium (Po)
  '337',     // Astatine (At)
  '-61.7',   // Radon (Rn)
  '677',     // Francium (Fr)
  '1737',    // Radium (Ra)
  '3200',    // Actinium (Ac)
  '4788',    // Thorium (Th)
  '4000',    // Protactinium (Pa)
  '4131',    // Uranium (U)
  '3902',    // Neptunium (Np)
  '3228',    // Plutonium (Pu)
  '2607',    // Americium (Am)
  '3110',    // Curium (Cm)
  '2627',    // Berkelium (Bk)
  '1743',    // Californium (Cf)
  '1269',    // Einsteinium (Es)
  '1530',    // Fermium (Fm)
  '1449',    // Mendelevium (Md)
  '1100',    // Nobelium (No)
  '3480',    // Lawrencium (Lr)
  '5800',    // Rutherfordium (Rf)
  '0',       // Dubnium (Db) - predicted
  '0',       // Seaborgium (Sg) - predicted
  '0',       // Bohrium (Bh) - predicted
  '0',       // Hassium (Hs) - predicted
  '0',       // Meitnerium (Mt) - predicted
  '0',       // Darmstadtium (Ds) - predicted
  '0',       // Roentgenium (Rg) - predicted
  '0',       // Copernicium (Cn) - predicted
  '0',       // Nihonium (Nh) - predicted
  '0',       // Flerovium (Fl) - predicted
  '0',       // Moscovium (Mc) - predicted
  '0',       // Livermorium (Lv) - predicted
  '0'        // Oganesson (Og) - predicted
];

const elementDensities = [
  '0.00008988',   // Hydrogen (H)
  '0.0001785',    // Helium (He)
  '0.534',        // Lithium (Li)
  '1.85',         // Beryllium (Be)
  '2.34',         // Boron (B)
  '2.267',        // Carbon (C)
  '1.251',        // Nitrogen (N)
  '1.429',        // Oxygen (O)
  '1.696',        // Fluorine (F)
  '0.003214',     // Neon (Ne)
  '0.971',        // Sodium (Na)
  '1.738',        // Magnesium (Mg)
  '2.34',         // Aluminium (Al)
  '2.33',         // Silicon (Si)
  '1.82',         // Phosphorus (P)
  '2.067',        // Sulfur (S)
  '3.17',         // Chlorine (Cl)
  '0.001784',     // Argon (Ar)
  '0.862',        // Potassium (K)
  '1.55',         // Calcium (Ca)
  '3.19',         // Scandium (Sc)
  '4.5',          // Titanium (Ti)
  '6.0',          // Vanadium (V)
  '7.19',         // Chromium (Cr)
  '7.43',         // Manganese (Mn)
  '7.874',        // Iron (Fe)
  '8.9',          // Cobalt (Co)
  '8.96',         // Nickel (Ni)
  '8.65',         // Copper (Cu)
  '7.14',         // Zinc (Zn)
  '5.91',         // Gallium (Ga)
  '5.323',        // Germanium (Ge)
  '5.72',         // Arsenic (As)
  '4.82',         // Selenium (Se)
  '3.99',         // Bromine (Br)
  '0.002',        // Krypton (Kr)
  '1.532',        // Rubidium (Rb)
  '2.64',         // Strontium (Sr)
  '4.93',         // Yttrium (Y)
  '6.49',         // Zirconium (Zr)
  '8.57',         // Niobium (Nb)
  '10.28',        // Molybdenum (Mo)
  '11.5',         // Technetium (Tc)
  '12.37',        // Ruthenium (Ru)
  '12.41',        // Rhodium (Rh)
  '12.02',        // Palladium (Pd)
  '10.49',        // Silver (Ag)
  '8.65',         // Cadmium (Cd)
  '7.31',         // Indium (In)
  '7.287',        // Tin (Sn)
  '6.685',        // Antimony (Sb)
  '6.24',         // Tellurium (Te)
  '4.93',         // Iodine (I)
  '0.005894',     // Xenon (Xe)
  '1.873',        // Cesium (Cs)
  '3.62',         // Barium (Ba)
  '6.145',        // Lanthanum (La)
  '6.77',         // Cerium (Ce)
  '6.77',         // Praseodymium (Pr)
  '7.007',        // Neodymium (Nd)
  '7.26',         // Promethium (Pm)
  '7.52',         // Samarium (Sm)
  '5.243',        // Europium (Eu)
  '7.895',        // Gadolinium (Gd)
  '8.229',        // Terbium (Tb)
  '8.55',         // Dysprosium (Dy)
  '8.8',          // Holmium (Ho)
  '9.066',        // Erbium (Er)
  '9.32',         // Thulium (Tm)
  '6.965',        // Ytterbium (Yb)
  '9.84',         // Lutetium (Lu)
  '13.31',        // Hafnium (Hf)
  '16.654',       // Tantalum (Ta)
  '19.25',        // Tungsten (W)
  '21.02',        // Rhenium (Re)
  '22.59',        // Osmium (Os)
  '22.56',        // Iridium (Ir)
  '21.45',        // Platinum (Pt)
  '19.32',        // Gold (Au)
  '13.534',       // Mercury (Hg)
  '11.85',        // Thallium (Tl)
  '11.34',        // Lead (Pb)
  '9.78',         // Bismuth (Bi)
  '9.32',         // Polonium (Po)
  '7',            // Astatine (At) - predicted
  '0.00973',      // Radon (Rn)
  '1.87',         // Francium (Fr) - predicted
  '5.5',          // Radium (Ra)
  '10.07',        // Actinium (Ac)
  '11.724',       // Thorium (Th)
  '15.37',        // Protactinium (Pa)
  '18.95',        // Uranium (U)
  '20.45',        // Neptunium (Np)
  '19.84',        // Plutonium (Pu)
  '13.67',        // Americium (Am)
  '13.51',        // Curium (Cm)
  '14.78',        // Berkelium (Bk) - predicted
  '15.1',         // Californium (Cf)
  '8.84',         // Einsteinium (Es)
  '9.71',         // Fermium (Fm) - predicted
  '10.3',         // Mendelevium (Md) - predicted
  '9.9',          // Nobelium (No) - predicted
  '15.6',         // Lawrencium (Lr) - predicted
  '23.2',         // Rutherfordium (Rf) - predicted
  '29.3',         // Dubnium (Db) - predicted
  '35.0',         // Seaborgium (Sg) - predicted
  '37.1',         // Bohrium (Bh) - predicted
  '40.7',         // Hassium (Hs) - predicted
  '37.4',         // Meitnerium (Mt) - predicted
  '34.8',         // Darmstadtium (Ds) - predicted
  '28.7',         // Roentgenium (Rg) - predicted
  '23.7',         // Copernicium (Cn) - predicted
  '16',           // Nihonium (Nh) - predicted
  '14',           // Flerovium (Fl) - predicted
  '13.5',         // Moscovium (Mc) - predicted
  '12.9',         // Livermorium (Lv) - predicted
  '10'            // Oganesson (Og) - predicted
];

const elementTriplePoints = [
  '13.81',   // Hydrogen (H)
  '1.4',     // Helium (He)
  '180.54',  // Lithium (Li)
  '1560',    // Beryllium (Be)
  '2349',    // Boron (B)
  '3915',    // Carbon (C)
  '63.15',   // Nitrogen (N)
  '54.36',   // Oxygen (O)
  '118.5',   // Fluorine (F)
  '27.4',    // Neon (Ne)
  '371',     // Sodium (Na)
  '923',     // Magnesium (Mg)
  '933.47',  // Aluminium (Al)
  '1687',    // Silicon (Si)
  '317.2',   // Phosphorus (P)
  '388.36',  // Sulfur (S)
  '208.15',  // Chlorine (Cl)
  '115.5',   // Argon (Ar)
  '301.6',   // Potassium (K)
  '1042',    // Calcium (Ca)
  '1815',    // Scandium (Sc)
  '2125',    // Titanium (Ti)
  '1890',    // Vanadium (V)
  '2130',    // Chromium (Cr)
  '1519',    // Manganese (Mn)
  '1809',    // Iron (Fe)
  '1768',    // Cobalt (Co)
  '1455',    // Nickel (Ni)
  '1357',    // Copper (Cu)
  '594.22',  // Zinc (Zn)
  '302.91',  // Gallium (Ga)
  '1211',    // Germanium (Ge)
  '903.9',   // Arsenic (As)
  '726',     // Selenium (Se)
  '387.85',  // Bromine (Br)
  '115.5',   // Krypton (Kr)
  '312.46',  // Rubidium (Rb)
  '1050',    // Strontium (Sr)
  '1500',    // Yttrium (Y)
  '2120',    // Zirconium (Zr)
  '2469',    // Niobium (Nb)
  '2896',    // Molybdenum (Mo)
  '2585',    // Technetium (Tc)
  '2580',    // Ruthenium (Ru)
  '2528',    // Rhodium (Rh)
  '1828',    // Palladium (Pd)
  '1235',    // Silver (Ag)
  '594.22',  // Cadmium (Cd)
  '505.07',  // Indium (In)
  '505.07',  // Tin (Sn)
  '903.9',   // Antimony (Sb)
  '723.7',   // Tellurium (Te)
  '386.85',  // Iodine (I)
  '161.4',   // Xenon (Xe)
  '301.6',   // Cesium (Cs)
  '970',     // Barium (Ba)
  '1195',    // Lanthanum (La)
  '1067',    // Cerium (Ce)
  '1200',    // Praseodymium (Pr)
  '1294',    // Neodymium (Nd)
  '1315',    // Promethium (Pm)
  '1072',    // Samarium (Sm)
  '1090',    // Europium (Eu)
  '1280',    // Gadolinium (Gd)
  '1354',    // Terbium (Tb)
  '1412',    // Dysprosium (Dy)
  '1420',    // Holmium (Ho)
  '1460',    // Erbium (Er)
  '1460',    // Thulium (Tm)
  '1092',    // Ytterbium (Yb)
  '1620',    // Lutetium (Lu)
  '2507',    // Hafnium (Hf)
  '3290',    // Tantalum (Ta)
  '3695',    // Tungsten (W)
  '3459',    // Rhenium (Re)
  '3300',    // Osmium (Os)
  '2739',    // Iridium (Ir)
  '2041',    // Platinum (Pt)
  '1337',    // Gold (Au)
  '234.3',   // Mercury (Hg)
  '545',     // Thallium (Tl)
  '600',     // Lead (Pb)
  '545',     // Bismuth (Bi)
  '527',     // Polonium (Po)
  '335.7',   // Astatine (At)
  '202.6',   // Radon (Rn)
  '300',     // Francium (Fr) - predicted
  '1413',    // Radium (Ra)
  '1500',    // Actinium (Ac)
  '2115',    // Thorium (Th)
  '1840',    // Protactinium (Pa)
  '1400',    // Uranium (U)
  '1440',    // Neptunium (Np)
  '1440',    // Plutonium (Pu)
  '1260',    // Americium (Am)
  '1510',    // Curium (Cm)
  '1390',    // Berkelium (Bk)
  '900',     // Californium (Cf)
  '1150',    // Einsteinium (Es)
  '1170',    // Fermium (Fm)
  '827',     // Mendelevium (Md)
  '827',     // Nobelium (No)
  '1627',    // Lawrencium (Lr)
  '2100',    // Rutherfordium (Rf)
  '0',       // Dubnium (Db) - predicted
  '0',       // Seaborgium (Sg) - predicted
  '0',       // Bohrium (Bh) - predicted
  '0',       // Hassium (Hs) - predicted
  '0',       // Meitnerium (Mt) - predicted
  '0',       // Darmstadtium (Ds) - predicted
  '0',       // Roentgenium (Rg) - predicted
  '0',       // Copernicium (Cn) - predicted
  '0',       // Nihonium (Nh) - predicted
  '0',       // Flerovium (Fl) - predicted
  '0',       // Moscovium (Mc) - predicted
  '0',       // Livermorium (Lv) - predicted
  '0'        // Oganesson (Og) - predicted
];
const elementCriticalPoints = [
  '33.19, 1.3', // Hydrogen (H)
  '5.2, 0.227', // Helium (He)
  '1590, 0.79', // Lithium (Li)
  '2470, 0.18', // Beryllium (Be)
  '4200, 0.27', // Boron (B)
  '4500, 0.3',  // Carbon (C)
  '126.2, 0.12', // Nitrogen (N)
  '154.6, 0.53', // Oxygen (O)
  '144.2, 0.49', // Fluorine (F)
  '227, 0.58',   // Neon (Ne)
  '1156, 0.24',  // Sodium (Na)
  '1387, 0.54',  // Magnesium (Mg)
  '933, 1.6',    // Aluminium (Al)
  '2900, 0.72',  // Silicon (Si)
  '1175, 0.55',  // Phosphorus (P)
  '627, 0.89',   // Sulfur (S)
  '333, 0.77',   // Chlorine (Cl)
  '150, 0.76',   // Argon (Ar)
  '674, 0.39',   // Potassium (K)
  '1740, 0.29',  // Calcium (Ca)
  '1700, 1.8',   // Scandium (Sc)
  '2540, 0.55',  // Titanium (Ti)
  '4000, 1.0',   // Vanadium (V)
  '2930, 0.52',  // Chromium (Cr)
  '1730, 0.48',  // Manganese (Mn)
  '2870, 0.8',   // Iron (Fe)
  '2590, 1.8',   // Cobalt (Co)
  '2910, 1.3',   // Nickel (Ni)
  '1350, 1.5',   // Copper (Cu)
  '1060, 1.4',   // Zinc (Zn)
  '2260, 0.5',   // Gallium (Ga)
  '2850, 0.9',   // Germanium (Ge)
  '600, 1.4',    // Arsenic (As)
  '665, 1.0',    // Selenium (Se)
  '332, 1.3',    // Bromine (Br)
  '207, 0.77',   // Krypton (Kr)
  '312, 0.89',   // Rubidium (Rb)
  '1700, 0.48',  // Strontium (Sr)
  '1610, 0.75',  // Yttrium (Y)
  '2740, 0.6',   // Zirconium (Zr)
  '2650, 1.4',   // Niobium (Nb)
  '4910, 0.3',   // Molybdenum (Mo)
  '4300, 0.95',  // Technetium (Tc)
  '4200, 0.89',  // Ruthenium (Ru)
  '3950, 0.1',   // Rhodium (Rh)
  '3770, 0.9',   // Palladium (Pd)
  '3150, 0.77',  // Silver (Ag)
  '319, 0.1',    // Cadmium (Cd)
  '2070, 0.2',   // Indium (In)
  '2310, 0.8',   // Tin (Sn)
  '900, 0.9',    // Antimony (Sb)
  '1290, 1.0',   // Tellurium (Te)
  '430, 0.11',   // Iodine (I)
  '150, 0.5',    // Xenon (Xe)
  '393, 0.21',   // Cesium (Cs)
  '1410, 0.2',   // Barium (Ba)
  '3700, 0.33',  // Lanthanum (La)
  '3790, 0.3',   // Cerium (Ce)
  '4000, 0.3',   // Praseodymium (Pr)
  '4130, 0.3',   // Neodymium (Nd)
  '3600, 0.35',  // Promethium (Pm)
  '3390, 0.35',  // Samarium (Sm)
  '3370, 0.35',  // Europium (Eu)
  '3300, 0.35',  // Gadolinium (Gd)
  '3440, 0.35',  // Terbium (Tb)
  '3570, 0.35',  // Dysprosium (Dy)
  '3600, 0.35',  // Holmium (Ho)
  '3530, 0.35',  // Erbium (Er)
  '3330, 0.35',  // Thulium (Tm)
  '2700, 0.35',  // Ytterbium (Yb)
  '3470, 0.35',  // Lutetium (Lu)
  '5400, 0.8',   // Hafnium (Hf)
  '5380, 0.9',   // Tantalum (Ta)
  '5500, 0.3',   // Tungsten (W)
  '5860, 0.6',   // Rhenium (Re)
  '5500, 0.9',   // Osmium (Os)
  '4700, 0.9',   // Iridium (Ir)
  '4100, 0.7',   // Platinum (Pt)
  '3560, 0.6',   // Gold (Au)
  '174, 0.1',    // Mercury (Hg)
  '1560, 0.7',   // Thallium (Tl)
  '1740, 0.3',   // Lead (Pb)
  '1420, 0.7',   // Bismuth (Bi)
  '1260, 0.4',   // Polonium (Po)
  '610, 0.3',    // Astatine (At)
  '0, 0',        // Radon (Rn) - not applicable
  '0, 0',        // Francium (Fr) - predicted
  '1413, 0.8',   // Radium (Ra)
  '1030, 0.6',   // Actinium (Ac)
  '1440, 0.4',   // Thorium (Th)
  '1515, 0.35',  // Protactinium (Pa)
  '1400, 0.5',   // Uranium (U)
  '1630, 0.45',  // Neptunium (Np)
  '1550, 0.45',  // Plutonium (Pu)
  '1370, 0.3',   // Americium (Am)
  '1510, 0.3',   // Curium (Cm)
  '0, 0',        // Berkelium (Bk) - predicted
  '0, 0',        // Californium (Cf) - predicted
  '0, 0',        // Einsteinium (Es) - predicted
  '0, 0',        // Fermium (Fm) - predicted
  '0, 0',        // Mendelevium (Md) - predicted
  '0, 0',        // Nobelium (No) - predicted
  '0, 0',        // Lawrencium (Lr) - predicted
  '0, 0',        // Rutherfordium (Rf) - predicted
  '0, 0',        // Dubnium (Db) - predicted
  '0, 0',        // Seaborgium (Sg) - predicted
  '0, 0',        // Bohrium (Bh) - predicted
  '0, 0',        // Hassium (Hs) - predicted
  '0, 0',        // Meitnerium (Mt) - predicted
  '0, 0',        // Darmstadtium (Ds) - predicted
  '0, 0',        // Roentgenium (Rg) - predicted
  '0, 0',        // Copernicium (Cn) - predicted
  '0, 0',        // Nihonium (Nh) - predicted
  '0, 0',        // Flerovium (Fl) - predicted
  '0, 0',        // Moscovium (Mc) - predicted
  '0, 0',        // Livermorium (Lv) - predicted
  '0, 0'         // Oganesson (Og) - predicted
];

const elementAtomicRadius = [
  '53',   // Hydrogen (H)
  '140',  // Helium (He)
  '167',  // Lithium (Li)
  '112',  // Beryllium (Be)
  '87',   // Boron (B)
  '77',   // Carbon (C)
  '71',   // Nitrogen (N)
  '66',   // Oxygen (O)
  '64',   // Fluorine (F)
  '154',  // Neon (Ne)
  '186',  // Sodium (Na)
  '160',  // Magnesium (Mg)
  '143',  // Aluminium (Al)
  '118',  // Silicon (Si)
  '110',  // Phosphorus (P)
  '104',  // Sulfur (S)
  '99',   // Chlorine (Cl)
  '116',  // Argon (Ar)
  '235',  // Potassium (K)
  '197',  // Calcium (Ca)
  '162',  // Scandium (Sc)
  '140',  // Titanium (Ti)
  '134',  // Vanadium (V)
  '126',  // Chromium (Cr)
  '139',  // Manganese (Mn)
  '126',  // Iron (Fe)
  '125',  // Cobalt (Co)
  '124',  // Nickel (Ni)
  '127',  // Copper (Cu)
  '148',  // Zinc (Zn)
  '135',  // Gallium (Ga)
  '125',  // Germanium (Ge)
  '133',  // Arsenic (As)
  '121',  // Selenium (Se)
  '114',  // Bromine (Br)
  '216',  // Krypton (Kr)
  '265',  // Rubidium (Rb)
  '195',  // Strontium (Sr)
  '180',  // Yttrium (Y)
  '160',  // Zirconium (Zr)
  '146',  // Niobium (Nb)
  '139',  // Molybdenum (Mo)
  '138',  // Technetium (Tc)
  '137',  // Ruthenium (Ru)
  '136',  // Rhodium (Rh)
  '139',  // Palladium (Pd)
  '144',  // Silver (Ag)
  '148',  // Cadmium (Cd)
  '156',  // Indium (In)
  '145',  // Tin (Sn)
  '159',  // Antimony (Sb)
  '140',  // Tellurium (Te)
  '140',  // Iodine (I)
  '140',  // Xenon (Xe)
  '262',  // Cesium (Cs)
  '195',  // Barium (Ba)
  '193',  // Lanthanum (La)
  '182',  // Cerium (Ce)
  '182',  // Praseodymium (Pr)
  '182',  // Neodymium (Nd)
  '183',  // Promethium (Pm)
  '179',  // Samarium (Sm)
  '184',  // Europium (Eu)
  '181',  // Gadolinium (Gd)
  '177',  // Terbium (Tb)
  '175',  // Dysprosium (Dy)
  '172',  // Holmium (Ho)
  '172',  // Erbium (Er)
  '171',  // Thulium (Tm)
  '176',  // Ytterbium (Yb)
  '174',  // Lutetium (Lu)
  '208',  // Hafnium (Hf)
  '200',  // Tantalum (Ta)
  '139',  // Tungsten (W)
  '144',  // Rhenium (Re)
  '138',  // Osmium (Os)
  '166',  // Iridium (Ir)
  '144',  // Platinum (Pt)
  '144',  // Gold (Au)
  '150',  // Mercury (Hg)
  '190',  // Thallium (Tl)
  '202',  // Lead (Pb)
  '207',  // Bismuth (Bi)
  '150',  // Polonium (Po)
  '202',  // Astatine (At)
  '216',  // Radon (Rn)
  '260',  // Francium (Fr)
  '210',  // Radium (Ra)
  '215',  // Actinium (Ac)
  '220',  // Thorium (Th)
  '224',  // Protactinium (Pa)
  '196',  // Uranium (U)
  '226',  // Neptunium (Np)
  '226',  // Plutonium (Pu)
  '229',  // Americium (Am)
  '233',  // Curium (Cm)
  '234',  // Berkelium (Bk)
  '244',  // Californium (Cf)
  '244',  // Einsteinium (Es)
  '252',  // Fermium (Fm)
  '257',  // Mendelevium (Md)
  '262',  // Nobelium (No)
  '157',  // Lawrencium (Lr)
  '0',    // Rutherfordium (Rf) - predicted
  '0',    // Dubnium (Db) - predicted
  '0',    // Seaborgium (Sg) - predicted
  '0',    // Bohrium (Bh) - predicted
  '0',    // Hassium (Hs) - predicted
  '0',    // Meitnerium (Mt) - predicted
  '0',    // Darmstadtium (Ds) - predicted
  '0',    // Roentgenium (Rg) - predicted
  '0',    // Copernicium (Cn) - predicted
  '0',    // Nihonium (Nh) - predicted
  '0',    // Flerovium (Fl) - predicted
  '0',    // Moscovium (Mc) - predicted
  '0',    // Livermorium (Lv) - predicted
  '0'     // Oganesson (Og) - predicted
];
const elementIonizationEnergy = [
  '1312',  // Hydrogen (H)
  '2372',  // Helium (He)
  '520',   // Lithium (Li)
  '899',   // Beryllium (Be)
  '800',   // Boron (B)
  '1086',  // Carbon (C)
  '1402',  // Nitrogen (N)
  '1314',  // Oxygen (O)
  '1681',  // Fluorine (F)
  '2080',  // Neon (Ne)
  '495',   // Sodium (Na)
  '738',   // Magnesium (Mg)
  '577',   // Aluminium (Al)
  '786',   // Silicon (Si)
  '1012',  // Phosphorus (P)
  '999',   // Sulfur (S)
  '1251',  // Chlorine (Cl)
  '1521',  // Argon (Ar)
  '375',   // Potassium (K)
  '590',   // Calcium (Ca)
  '633',   // Scandium (Sc)
  '659',   // Titanium (Ti)
  '650',   // Vanadium (V)
  '652',   // Chromium (Cr)
  '717',   // Manganese (Mn)
  '762',   // Iron (Fe)
  '760',   // Cobalt (Co)
  '737',   // Nickel (Ni)
  '745',   // Copper (Cu)
  '906',   // Zinc (Zn)
  '590',   // Gallium (Ga)
  '762',   // Germanium (Ge)
  '600',   // Arsenic (As)
  '941',   // Selenium (Se)
  '1140',  // Bromine (Br)
  '1351',  // Krypton (Kr)
  '375',   // Rubidium (Rb)
  '550',   // Strontium (Sr)
  '600',   // Yttrium (Y)
  '640',   // Zirconium (Zr)
  '690',   // Niobium (Nb)
  '687',   // Molybdenum (Mo)
  '702',   // Technetium (Tc)
  '711',   // Ruthenium (Ru)
  '723',   // Rhodium (Rh)
  '724',   // Palladium (Pd)
  '731',   // Silver (Ag)
  '867',   // Cadmium (Cd)
  '558',   // Indium (In)
  '708',   // Tin (Sn)
  '631',   // Antimony (Sb)
  '702',   // Tellurium (Te)
  '1000',  // Iodine (I)
  '1170',  // Xenon (Xe)
  '375',   // Cesium (Cs)
  '503',   // Barium (Ba)
  '538',   // Lanthanum (La)
  '534',   // Cerium (Ce)
  '541',   // Praseodymium (Pr)
  '527',   // Neodymium (Nd)
  '527',   // Promethium (Pm)
  '545',   // Samarium (Sm)
  '549',   // Europium (Eu)
  '582',   // Gadolinium (Gd)
  '565',   // Terbium (Tb)
  '573',   // Dysprosium (Dy)
  '581',   // Holmium (Ho)
  '563',   // Erbium (Er)
  '545',   // Thulium (Tm)
  '642',   // Ytterbium (Yb)
  '542',   // Lutetium (Lu)
  '658',   // Hafnium (Hf)
  '761',   // Tantalum (Ta)
  '770',   // Tungsten (W)
  '760',   // Rhenium (Re)
  '761',   // Osmium (Os)
  '668',   // Iridium (Ir)
  '870',   // Platinum (Pt)
  '1007',  // Gold (Au)
  '1007',  // Mercury (Hg)
  '589',   // Thallium (Tl)
  '710',   // Lead (Pb)
  '703',   // Bismuth (Bi)
  '813',   // Polonium (Po)
  '920',   // Astatine (At)
  '1413',  // Radon (Rn)
  '380',   // Francium (Fr)
  '1410',  // Radium (Ra)
  '1500',  // Actinium (Ac)
  '1420',  // Thorium (Th)
  '1530',  // Protactinium (Pa)
  '1400',  // Uranium (U)
  '1580',  // Neptunium (Np)
  '1590',  // Plutonium (Pu)
  '1400',  // Americium (Am)
  '1500',  // Curium (Cm)
  '0',     // Berkelium (Bk)
  '0',     // Californium (Cf)
  '0',     // Einsteinium (Es)
  '0',     // Fermium (Fm)
  '0',     // Mendelevium (Md)
  '0',     // Nobelium (No)
  '0',     // Lawrencium (Lr)
  '0',     // Rutherfordium (Rf)
  '0',     // Dubnium (Db)
  '0',     // Seaborgium (Sg)
  '0',     // Bohrium (Bh)
  '0',     // Hassium (Hs)
  '0',     // Meitnerium (Mt)
  '0',     // Darmstadtium (Ds)
  '0',     // Roentgenium (Rg)
  '0',     // Copernicium (Cn)
  '0',     // Nihonium (Nh)
  '0',     // Flerovium (Fl)
  '0',     // Moscovium (Mc)
  '0',     // Livermorium (Lv)
  '0'      // Oganesson (Og)
];

const elementEmissionSpectra = [
  ['656.3', '486.1', '434.0', '410.2'], // Hydrogen (H)
  ['587.6', '447.1', '402.6'], // Helium (He)
  ['670.8', '610.4', '589.0'], // Lithium (Li)
  ['234.7', '260.4'], // Beryllium (Be)
  ['249.7', '262.3', '280.1'], // Boron (B)
  ['193.7', '248.2', '265.8', '280.0'], // Carbon (C)
  ['149.0', '161.2', '174.1'], // Nitrogen (N)
  ['130.4', '150.1', '165.0'], // Oxygen (O)
  ['130.6', '147.1', '156.1', '175.1'], // Fluorine (F)
  ['588.2', '589.3', '640.2'], // Neon (Ne)
  ['589.0', '589.6'], // Sodium (Na)
  ['285.2', '279.6', '272.2'], // Magnesium (Mg)
  ['396.2', '422.7', '267.3'], // Aluminium (Al)
  ['288.2', '251.4', '223.0'], // Silicon (Si)
  ['253.6', '216.4'], // Phosphorus (P)
  ['180.0', '181.0', '182.0'], // Sulfur (S)
  ['434.0', '404.7', '346.0'], // Chlorine (Cl)
  ['750.4', '772.0', '781.5'], // Argon (Ar)
  ['780.2', '766.5', '794.8'], // Rubidium (Rb)
  ['422.7', '393.4', '415.0'], // Calcium (Ca)
  ['424.6', '434.6', '457.1'], // Scandium (Sc)
  ['278.4', '283.6', '314.5'], // Titanium (Ti)
  ['290.4', '281.7', '329.7'], // Vanadium (V)
  ['425.5', '428.5', '432.5'], // Chromium (Cr)
  ['280.0', '293.4', '312.6'], // Manganese (Mn)
  ['371.0', '348.0', '261.4'], // Iron (Fe)
  ['345.8', '350.5', '399.5'], // Cobalt (Co)
  ['341.5', '321.2', '338.5'], // Nickel (Ni)
  ['327.4', '324.7', '310.0'], // Copper (Cu)
  ['213.9', '228.0', '327.0'], // Zinc (Zn)
  ['410.2', '403.7', '429.7'], // Gallium (Ga)
  ['265.4', '288.5', '327.3'], // Germanium (Ge)
  ['196.1', '197.0', '206.8'], // Arsenic (As)
  ['196.0', '204.2', '209.0'], // Selenium (Se)
  ['253.7', '181.9', '196.0'], // Bromine (Br)
  ['123.6', '126.0', '147.0'], // Krypton (Kr)
  ['780.2', '766.5', '794.8'], // Rubidium (Rb)
  ['455.4', '493.5', '565.0'], // Strontium (Sr)
  ['378.5', '401.8', '450.0'], // Yttrium (Y)
  ['334.9', '365.6', '384.2'], // Zirconium (Zr)
  ['220.8', '239.7', '273.7'], // Niobium (Nb)
  ['267.4', '296.8', '312.2'], // Molybdenum (Mo)
  ['221.4', '284.0', '288.5'], // Technetium (Tc)
  ['244.6', '284.4', '290.2'], // Ruthenium (Ru)
  ['343.0', '358.0', '369.5'], // Rhodium (Rh)
  ['311.4', '335.3', '340.1'], // Palladium (Pd)
  ['328.0', '340.1', '368.0'], // Silver (Ag)
  ['228.8', '310.5', '326.0'], // Cadmium (Cd)
  ['410.2', '451.0', '535.0'], // Indium (In)
  ['232.6', '247.3', '286.0'], // Tin (Sn)
  ['220.0', '290.0', '336.0'], // Antimony (Sb)
  ['189.0', '208.0', '227.0'], // Tellurium (Te)
  ['129.0', '204.0', '253.5'], // Iodine (I)
  ['147.0', '172.0', '174.0'], // Xenon (Xe)
  ['459.0', '678.0', '700.0'], // Cesium (Cs)
  ['453.0', '529.0', '644.0'], // Barium (Ba)
  ['405.0', '425.0', '442.0'], // Lanthanum (La)
  ['367.5', '396.0', '423.0'], // Cerium (Ce)
  ['354.0', '373.0', '382.5'], // Praseodymium (Pr)
  ['401.5', '411.0', '417.5'], // Neodymium (Nd)
  ['240.0', '258.0', '266.0'], // Promethium (Pm)
  ['106.0', '149.0', '155.0'], // Samarium (Sm)
  ['381.5', '393.0', '409.5'], // Europium (Eu)
  ['293.0', '333.0', '350.5'], // Gadolinium (Gd)
  ['490.0', '525.0', '545.0'], // Terbium (Tb)
  ['410.0', '421.0', '441.0'], // Dysprosium (Dy)
  ['408.0', '421.5', '435.0'], // Holmium (Ho)
  ['381.0', '406.0', '419.0'], // Erbium (Er)
  ['493.0', '524.0', '529.0'], // Thulium (Tm)
  ['327.0', '355.0', '370.0'], // Ytterbium (Yb)
  ['330.0', '349.5', '363.0'], // Lutetium (Lu)
  ['265.0', '314.0', '339.0'], // Hafnium (Hf)
  ['307.0', '328.0', '369.0'], // Tantalum (Ta)
  ['280.0', '314.5', '344.0'], // Tungsten (W)
  ['365.0', '388.0', '398.0'], // Rhenium (Re)
  ['343.0', '396.0', '420.0'], // Osmium (Os)
  ['250.0', '270.0', '279.0'], // Iridium (Ir)
  ['255.0', '270.0', '310.0'], // Platinum (Pt)
  ['253.7', '265.0', '284.0'], // Gold (Au)
  ['254.0', '265.0', '280.0'], // Mercury (Hg)
  ['306.0', '315.0', '330.0'], // Thallium (Tl)
  ['217.0', '222.0', '277.0'], // Lead (Pb)
  ['207.0', '223.0', '235.0'], // Bismuth (Bi)
  ['294.0', '319.0', '322.0'], // Polonium (Po)
  ['209.0', '210.0', '220.0'], // Astatine (At)
  ['0'],     // Radon (Rn) - Not typically measured
  '0',     // Francium (Fr) - Not typically measured
  '0',     // Radium (Ra) - Not typically measured
  '0',     // Actinium (Ac) - Not typically measured
  '0',     // Thorium (Th) - Not typically measured
  '0',     // Protactinium (Pa) - Not typically measured
  '0',     // Uranium (U) - Not typically measured
  '0',     // Neptunium (Np) - Not typically measured
  '0',     // Plutonium (Pu) - Not typically measured
  '0',     // Americium (Am) - Not typically measured
  '0',     // Curium (Cm) - Not typically measured
  '0',     // Berkelium (Bk) - Not typically measured
  '0',     // Californium (Cf) - Not typically measured
  '0',     // Einsteinium (Es) - Not typically measured
  '0',     // Fermium (Fm) - Not typically measured
  '0',     // Mendelevium (Md) - Not typically measured
  '0',     // Nobelium (No) - Not typically measured
  '0',     // Lawrencium (Lr) - Not typically measured
  '0',     // Rutherfordium (Rf) - Not typically measured
  '0',     // Dubnium (Db) - Not typically measured
  '0',     // Seaborgium (Sg) - Not typically measured
  '0',     // Bohrium (Bh) - Not typically measured
  '0',     // Hassium (Hs) - Not typically measured
  '0',     // Meitnerium (Mt) - Not typically measured
  '0',     // Darmstadtium (Ds) - Not typically measured
  '0',     // Roentgenium (Rg) - Not typically measured
  '0',     // Copernicium (Cn) - Not typically measured
  '0',     // Nihonium (Nh) - Not typically measured
  '0',     // Flerovium (Fl) - Not typically measured
  '0',     // Moscovium (Mc) - Not typically measured
  '0',     // Livermorium (Lv) - Not typically measured
  '0',     // Tennessine (Ts) - Not typically measured
  '0',     // Oganesson (Og) - Not typically measured
];

const elementCrystalStructure = [
  'spherical', // Hydrogen (H) - Molecular solid
  'cubic',     // Helium (He) - Face-centered cubic (fcc) (liquid state at very low temperatures)
  'body-centered cubic (bcc)', // Lithium (Li)
  'hexagonal close-packed (hcp)', // Beryllium (Be)
  'rhombic',  // Boron (B) - Various allotropes
  'diamond',   // Carbon (C) - Diamond
  'cubic',     // Nitrogen (N) - Molecular solid (N2)
  'cubic',     // Oxygen (O) - Molecular solid (O2)
  'cubic',     // Fluorine (F) - Molecular solid (F2)
  'cubic',     // Neon (Ne) - Face-centered cubic (fcc)
  'body-centered cubic (bcc)', // Sodium (Na)
  'hexagonal close-packed (hcp)', // Magnesium (Mg)
  'face-centered cubic (fcc)', // Aluminium (Al)
  'diamond',   // Silicon (Si) - Diamond cubic
  'rhombic',   // Phosphorus (P) - White phosphorus
  'rhombic',   // Sulfur (S) - Rhombic sulfur
  'cubic',     // Chlorine (Cl) - Molecular solid (Cl2)
  'face-centered cubic (fcc)', // Argon (Ar) - Solid Argon
  'body-centered cubic (bcc)', // Potassium (K)
  'face-centered cubic (fcc)', // Calcium (Ca)
  'hexagonal close-packed (hcp)', // Scandium (Sc)
  'hexagonal close-packed (hcp)', // Titanium (Ti)
  'body-centered cubic (bcc)', // Vanadium (V)
  'body-centered cubic (bcc)', // Chromium (Cr)
  'body-centered cubic (bcc)', // Manganese (Mn)
  'body-centered cubic (bcc)', // Iron (Fe)
  'hexagonal close-packed (hcp)', // Cobalt (Co)
  'face-centered cubic (fcc)', // Nickel (Ni)
  'face-centered cubic (fcc)', // Copper (Cu)
  'hexagonal close-packed (hcp)', // Zinc (Zn)
  'cubic',     // Gallium (Ga) - Orthorhombic
  'diamond',   // Germanium (Ge) - Diamond cubic
  'orthorhombic', // Arsenic (As)
  'hexagonal', // Selenium (Se) - Hexagonal
  'cubic',     // Bromine (Br) - Molecular solid (Br2)
  'face-centered cubic (fcc)', // Krypton (Kr) - Solid Krypton
  'body-centered cubic (bcc)', // Rubidium (Rb)
  'face-centered cubic (fcc)', // Strontium (Sr)
  'hexagonal close-packed (hcp)', // Yttrium (Y)
  'hexagonal close-packed (hcp)', // Zirconium (Zr)
  'body-centered cubic (bcc)', // Niobium (Nb)
  'body-centered cubic (bcc)', // Molybdenum (Mo)
  'body-centered cubic (bcc)', // Technetium (Tc)
  'body-centered cubic (bcc)', // Ruthenium (Ru)
  'face-centered cubic (fcc)', // Rhodium (Rh)
  'face-centered cubic (fcc)', // Palladium (Pd)
  'face-centered cubic (fcc)', // Silver (Ag)
  'hexagonal close-packed (hcp)', // Cadmium (Cd)
  'face-centered cubic (fcc)', // Indium (In)
  'diamond',   // Tin (Sn) - Diamond cubic
  'rhombic',   // Antimony (Sb)
  'trigonal',  // Tellurium (Te)
  'face-centered cubic (fcc)', // Iodine (I) - Molecular solid (I2)
  'face-centered cubic (fcc)', // Xenon (Xe) - Solid Xenon
  'body-centered cubic (bcc)', // Cesium (Cs)
  'body-centered cubic (bcc)', // Barium (Ba)
  'hexagonal close-packed (hcp)', // Lanthanum (La)
  'face-centered cubic (fcc)', // Cerium (Ce)
  'face-centered cubic (fcc)', // Praseodymium (Pr)
  'face-centered cubic (fcc)', // Neodymium (Nd)
  'cubic',     // Promethium (Pm)
  'face-centered cubic (fcc)', // Samarium (Sm)
  'face-centered cubic (fcc)', // Europium (Eu)
  'face-centered cubic (fcc)', // Gadolinium (Gd)
  'face-centered cubic (fcc)', // Terbium (Tb)
  'face-centered cubic (fcc)', // Dysprosium (Dy)
  'face-centered cubic (fcc)', // Holmium (Ho)
  'face-centered cubic (fcc)', // Erbium (Er)
  'face-centered cubic (fcc)', // Thulium (Tm)
  'face-centered cubic (fcc)', // Ytterbium (Yb)
  'face-centered cubic (fcc)', // Lutetium (Lu)
  'body-centered cubic (bcc)', // Hafnium (Hf)
  'body-centered cubic (bcc)', // Tantalum (Ta)
  'body-centered cubic (bcc)', // Tungsten (W)
  'body-centered cubic (bcc)', // Rhenium (Re)
  'hexagonal close-packed (hcp)', // Osmium (Os)
  'face-centered cubic (fcc)', // Iridium (Ir)
  'face-centered cubic (fcc)', // Platinum (Pt)
  'face-centered cubic (fcc)', // Gold (Au)
  'cubic',     // Mercury (Hg) - Amorphous solid
  'face-centered cubic (fcc)', // Thallium (Tl)
  'face-centered cubic (fcc)', // Lead (Pb)
  'rhombohedral', // Bismuth (Bi)
  'hexagonal close-packed (hcp)', // Polonium (Po)
  'monoclinic', // Astatine (At)
  'face-centered cubic (fcc)', // Radon (Rn)
  'body-centered cubic (bcc)', // Francium (Fr)
  'body-centered cubic (bcc)', // Radium (Ra)
  'face-centered cubic (fcc)', // Actinium (Ac)
  'face-centered cubic (fcc)', // Thorium (Th)
  'body-centered cubic (bcc)', // Protactinium (Pa)
  'body-centered cubic (bcc)', // Uranium (U)
  'body-centered cubic (bcc)', // Neptunium (Np)
  'body-centered cubic (bcc)', // Plutonium (Pu)
  'face-centered cubic (fcc)', // Americium (Am)
  'face-centered cubic (fcc)', // Curium (Cm)
  'face-centered cubic (fcc)', // Berkelium (Bk)
  'face-centered cubic (fcc)', // Californium (Cf)
  'face-centered cubic (fcc)', // Einsteinium (Es)
  'face-centered cubic (fcc)', // Fermium (Fm)
  'face-centered cubic (fcc)', // Mendelevium (Md)
  'face-centered cubic (fcc)', // Nobelium (No)
  'face-centered cubic (fcc)', // Lawrencium (Lr)
  'face-centered cubic (fcc)', // Rutherfordium (Rf)
  'face-centered cubic (fcc)', // Dubnium (Db)
  'face-centered cubic (fcc)', // Seaborgium (Sg)
  'face-centered cubic (fcc)', // Bohrium (Bh)
  'face-centered cubic (fcc)', // Hassium (Hs)
  'face-centered cubic (fcc)', // Meitnerium (Mt)
  'face-centered cubic (fcc)', // Darmstadtium (Ds)
  'face-centered cubic (fcc)', // Roentgenium (Rg)
  'face-centered cubic (fcc)', // Copernicium (Cn)
  'face-centered cubic (fcc)', // Nihonium (Nh)
  'face-centered cubic (fcc)', // Flerovium (Fl)
  'face-centered cubic (fcc)', // Moscovium (Mc)
  'face-centered cubic (fcc)', // Livermorium (Lv)
  'face-centered cubic (fcc)'  // Oganesson (Og)
];

const elementElectronAffinity = [
  '72.8',  // Hydrogen (H)
  '0',     // Helium (He)
  '30.7',  // Lithium (Li)
  '0',     // Beryllium (Be)
  '0',     // Boron (B)
  '121.8', // Carbon (C)
  '0',     // Nitrogen (N)
  '140.0', // Oxygen (O)
  '328.0', // Fluorine (F)
  '0',     // Neon (Ne)
  '0',     // Sodium (Na)
  '0',     // Magnesium (Mg)
  '41.8',  // Aluminium (Al)
  '134.0', // Silicon (Si)
  '72.6',  // Phosphorus (P)
  '200.4', // Sulfur (S)
  '348.6', // Chlorine (Cl)
  '0',     // Argon (Ar)
  '0',     // Potassium (K)
  '0',     // Calcium (Ca)
  '0',     // Scandium (Sc)
  '0',     // Titanium (Ti)
  '0',     // Vanadium (V)
  '0',     // Chromium (Cr)
  '0',     // Manganese (Mn)
  '0',     // Iron (Fe)
  '0',     // Cobalt (Co)
  '0',     // Nickel (Ni)
  '0',     // Copper (Cu)
  '0',     // Zinc (Zn)
  '0',     // Gallium (Ga)
  '0',     // Germanium (Ge)
  '0',     // Arsenic (As)
  '0',     // Selenium (Se)
  '0',     // Bromine (Br)
  '0',     // Krypton (Kr)
  '0',     // Rubidium (Rb)
  '0',     // Strontium (Sr)
  '0',     // Yttrium (Y)
  '0',     // Zirconium (Zr)
  '0',     // Niobium (Nb)
  '0',     // Molybdenum (Mo)
  '0',     // Technetium (Tc)
  '0',     // Ruthenium (Ru)
  '0',     // Rhodium (Rh)
  '0',     // Palladium (Pd)
  '0',     // Silver (Ag)
  '0',     // Cadmium (Cd)
  '0',     // Indium (In)
  '0',     // Tin (Sn)
  '0',     // Antimony (Sb)
  '0',     // Tellurium (Te)
  '0',     // Iodine (I)
  '0',     // Xenon (Xe)
  '0',     // Cesium (Cs)
  '0',     // Barium (Ba)
  '0',     // Lanthanum (La)
  '0',     // Cerium (Ce)
  '0',     // Praseodymium (Pr)
  '0',     // Neodymium (Nd)
  '0',     // Promethium (Pm)
  '0',     // Samarium (Sm)
  '0',     // Europium (Eu)
  '0',     // Gadolinium (Gd)
  '0',     // Terbium (Tb)
  '0',     // Dysprosium (Dy)
  '0',     // Holmium (Ho)
  '0',     // Erbium (Er)
  '0',     // Thulium (Tm)
  '0',     // Ytterbium (Yb)
  '0',     // Lutetium (Lu)
  '0',     // Hafnium (Hf)
  '0',     // Tantalum (Ta)
  '0',     // Tungsten (W)
  '0',     // Rhenium (Re)
  '0',     // Osmium (Os)
  '0',     // Iridium (Ir)
  '0',     // Platinum (Pt)
  '0',     // Gold (Au)
  '0',     // Mercury (Hg)
  '0',     // Thallium (Tl)
  '0',     // Lead (Pb)
  '0',     // Bismuth (Bi)
  '0',     // Polonium (Po)
  '0',     // Astatine (At)
  '0',     // Radon (Rn)
  '0',     // Francium (Fr)
  '0',     // Radium (Ra)
  '0',     // Actinium (Ac)
  '0',     // Thorium (Th)
  '0',     // Protactinium (Pa)
  '0',     // Uranium (U)
  '0',     // Neptunium (Np)
  '0',     // Plutonium (Pu)
  '0',     // Americium (Am)
  '0',     // Curium (Cm)
  '0',     // Berkelium (Bk)
  '0',     // Californium (Cf)
  '0',     // Einsteinium (Es)
  '0',     // Fermium (Fm)
  '0',     // Mendelevium (Md)
  '0',     // Nobelium (No)
  '0',     // Lawrencium (Lr)
  '0',     // Rutherfordium (Rf)
  '0',     // Dubnium (Db)
  '0',     // Seaborgium (Sg)
  '0',     // Bohrium (Bh)
  '0',     // Hassium (Hs)
  '0',     // Meitnerium (Mt)
  '0',     // Darmstadtium (Ds)
  '0',     // Roentgenium (Rg)
  '0',     // Copernicium (Cn)
  '0',     // Nihonium (Nh)
  '0',     // Flerovium (Fl)
  '0',     // Moscovium (Mc)
  '0',     // Livermorium (Lv)
  '0'      // Oganesson (Og)
];
const elementHeatOfFusion = [
  '0.71',   // Hydrogen (H)
  '0',      // Helium (He)
  '3.00',   // Lithium (Li)
  '6.0',    // Beryllium (Be)
  '0',      // Boron (B)
  '1.71',   // Carbon (C)
  '0',      // Nitrogen (N)
  '0.99',   // Oxygen (O)
  '0.69',   // Fluorine (F)
  '0',      // Neon (Ne)
  '2.60',   // Sodium (Na)
  '2.60',   // Magnesium (Mg)
  '5.9',    // Aluminium (Al)
  '1.71',   // Silicon (Si)
  '0.76',   // Phosphorus (P)
  '0.71',   // Sulfur (S)
  '0.33',   // Chlorine (Cl)
  '0',      // Argon (Ar)
  '2.93',   // Potassium (K)
  '8.8',    // Calcium (Ca)
  '0',      // Scandium (Sc)
  '0',      // Titanium (Ti)
  '0',      // Vanadium (V)
  '0',      // Chromium (Cr)
  '0',      // Manganese (Mn)
  '0',      // Iron (Fe)
  '0',      // Cobalt (Co)
  '0',      // Nickel (Ni)
  '0',      // Copper (Cu)
  '0',      // Zinc (Zn)
  '0',      // Gallium (Ga)
  '0',      // Germanium (Ge)
  '0',      // Arsenic (As)
  '0',      // Selenium (Se)
  '0',      // Bromine (Br)
  '0',      // Krypton (Kr)
  '0',      // Rubidium (Rb)
  '0',      // Strontium (Sr)
  '0',      // Yttrium (Y)
  '0',      // Zirconium (Zr)
  '0',      // Niobium (Nb)
  '0',      // Molybdenum (Mo)
  '0',      // Technetium (Tc)
  '0',      // Ruthenium (Ru)
  '0',      // Rhodium (Rh)
  '0',      // Palladium (Pd)
  '0',      // Silver (Ag)
  '0',      // Cadmium (Cd)
  '0',      // Indium (In)
  '0',      // Tin (Sn)
  '0',      // Antimony (Sb)
  '0',      // Tellurium (Te)
  '0',      // Iodine (I)
  '0',      // Xenon (Xe)
  '0',      // Cesium (Cs)
  '0',      // Barium (Ba)
  '0',      // Lanthanum (La)
  '0',      // Cerium (Ce)
  '0',      // Praseodymium (Pr)
  '0',      // Neodymium (Nd)
  '0',      // Promethium (Pm)
  '0',      // Samarium (Sm)
  '0',      // Europium (Eu)
  '0',      // Gadolinium (Gd)
  '0',      // Terbium (Tb)
  '0',      // Dysprosium (Dy)
  '0',      // Holmium (Ho)
  '0',      // Erbium (Er)
  '0',      // Thulium (Tm)
  '0',      // Ytterbium (Yb)
  '0',      // Lutetium (Lu)
  '0',      // Hafnium (Hf)
  '0',      // Tantalum (Ta)
  '0',      // Tungsten (W)
  '0',      // Rhenium (Re)
  '0',      // Osmium (Os)
  '0',      // Iridium (Ir)
  '0',      // Platinum (Pt)
  '0',      // Gold (Au)
  '0',      // Mercury (Hg)
  '0',      // Thallium (Tl)
  '0',      // Lead (Pb)
  '0',      // Bismuth (Bi)
  '0',      // Polonium (Po)
  '0',      // Astatine (At)
  '0',      // Radon (Rn)
  '0',      // Francium (Fr)
  '0',      // Radium (Ra)
  '0',      // Actinium (Ac)
  '0',      // Thorium (Th)
  '0',      // Protactinium (Pa)
  '0',      // Uranium (U)
  '0',      // Neptunium (Np)
  '0',      // Plutonium (Pu)
  '0',      // Americium (Am)
  '0',      // Curium (Cm)
  '0',      // Berkelium (Bk)
  '0',      // Californium (Cf)
  '0',      // Einsteinium (Es)
  '0',      // Fermium (Fm)
  '0',      // Mendelevium (Md)
  '0',      // Nobelium (No)
  '0',      // Lawrencium (Lr)
  '0',      // Rutherfordium (Rf)
  '0',      // Dubnium (Db)
  '0',      // Seaborgium (Sg)
  '0',      // Bohrium (Bh)
  '0',      // Hassium (Hs)
  '0',      // Meitnerium (Mt)
  '0',      // Darmstadtium (Ds)
  '0',      // Roentgenium (Rg)
  '0',      // Copernicium (Cn)
  '0',      // Nihonium (Nh)
  '0',      // Flerovium (Fl)
  '0',      // Moscovium (Mc)
  '0',      // Livermorium (Lv)
  '0'       // Oganesson (Og)
];
const elementHeatOfVaporization = [
  '0.45',  // Hydrogen (H)
  '0',     // Helium (He)
  '59.2',  // Lithium (Li)
  '12.0',  // Beryllium (Be)
  '0',     // Boron (B)
  '717',   // Carbon (C)
  '0',     // Nitrogen (N)
  '0',     // Oxygen (O)
  '0',     // Fluorine (F)
  '0',     // Neon (Ne)
  '97.0',  // Sodium (Na)
  '147',   // Magnesium (Mg)
  '293',   // Aluminium (Al)
  '30.2',  // Silicon (Si)
  '46.0',  // Phosphorus (P)
  '83.0',  // Sulfur (S)
  '33.0',  // Chlorine (Cl)
  '0',     // Argon (Ar)
  '71.0',  // Potassium (K)
  '148',   // Calcium (Ca)
  '0',     // Scandium (Sc)
  '0',     // Titanium (Ti)
  '0',     // Vanadium (V)
  '0',     // Chromium (Cr)
  '0',     // Manganese (Mn)
  '0',     // Iron (Fe)
  '0',     // Cobalt (Co)
  '0',     // Nickel (Ni)
  '0',     // Copper (Cu)
  '0',     // Zinc (Zn)
  '0',     // Gallium (Ga)
  '0',     // Germanium (Ge)
  '0',     // Arsenic (As)
  '0',     // Selenium (Se)
  '0',     // Bromine (Br)
  '0',     // Krypton (Kr)
  '0',     // Rubidium (Rb)
  '0',     // Strontium (Sr)
  '0',     // Yttrium (Y)
  '0',     // Zirconium (Zr)
  '0',     // Niobium (Nb)
  '0',     // Molybdenum (Mo)
  '0',     // Technetium (Tc)
  '0',     // Ruthenium (Ru)
  '0',     // Rhodium (Rh)
  '0',     // Palladium (Pd)
  '0',     // Silver (Ag)
  '0',     // Cadmium (Cd)
  '0',     // Indium (In)
  '0',     // Tin (Sn)
  '0',     // Antimony (Sb)
  '0',     // Tellurium (Te)
  '0',     // Iodine (I)
  '0',     // Xenon (Xe)
  '0',     // Cesium (Cs)
  '0',     // Barium (Ba)
  '0',     // Lanthanum (La)
  '0',     // Cerium (Ce)
  '0',     // Praseodymium (Pr)
  '0',     // Neodymium (Nd)
  '0',     // Promethium (Pm)
  '0',     // Samarium (Sm)
  '0',     // Europium (Eu)
  '0',     // Gadolinium (Gd)
  '0',     // Terbium (Tb)
  '0',     // Dysprosium (Dy)
  '0',     // Holmium (Ho)
  '0',     // Erbium (Er)
  '0',     // Thulium (Tm)
  '0',     // Ytterbium (Yb)
  '0',     // Lutetium (Lu)
  '0',     // Hafnium (Hf)
  '0',     // Tantalum (Ta)
  '0',     // Tungsten (W)
  '0',     // Rhenium (Re)
  '0',     // Osmium (Os)
  '0',     // Iridium (Ir)
  '0',     // Platinum (Pt)
  '0',     // Gold (Au)
  '0',     // Mercury (Hg)
  '0',     // Thallium (Tl)
  '0',     // Lead (Pb)
  '0',     // Bismuth (Bi)
  '0',     // Polonium (Po)
  '0',     // Astatine (At)
  '0',     // Radon (Rn)
  '0',     // Francium (Fr)
  '0',     // Radium (Ra)
  '0',     // Actinium (Ac)
  '0',     // Thorium (Th)
  '0',     // Protactinium (Pa)
  '0',     // Uranium (U)
  '0',     // Neptunium (Np)
  '0',     // Plutonium (Pu)
  '0',     // Americium (Am)
  '0',     // Curium (Cm)
  '0',     // Berkelium (Bk)
  '0',     // Californium (Cf)
  '0',     // Einsteinium (Es)
  '0',     // Fermium (Fm)
  '0',     // Mendelevium (Md)
  '0',     // Nobelium (No)
  '0',     // Lawrencium (Lr)
  '0',     // Rutherfordium (Rf)
  '0',     // Dubnium (Db)
  '0',     // Seaborgium (Sg)
  '0',     // Bohrium (Bh)
  '0',     // Hassium (Hs)
  '0',     // Meitnerium (Mt)
  '0',     // Darmstadtium (Ds)
  '0',     // Roentgenium (Rg)
  '0',     // Copernicium (Cn)
  '0',     // Nihonium (Nh)
  '0',     // Flerovium (Fl)
  '0',     // Moscovium (Mc)
  '0',     // Livermorium (Lv)
  '0'      // Oganesson (Og)
];
const elementMolarHeatCapacity = [
  '28.8',   // Hydrogen (H)
  '20.8',   // Helium (He)
  '37.2',   // Lithium (Li)
  '25.9',   // Beryllium (Be)
  '0',      // Boron (B)
  '25.0',   // Carbon (C)
  '0',      // Nitrogen (N)
  '0',      // Oxygen (O)
  '0',      // Fluorine (F)
  '0',      // Neon (Ne)
  '28.4',   // Sodium (Na)
  '24.4',   // Magnesium (Mg)
  '24.7',   // Aluminium (Al)
  '26.6',   // Silicon (Si)
  '25.4',   // Phosphorus (P)
  '25.6',   // Sulfur (S)
  '29.2',   // Chlorine (Cl)
  '0',      // Argon (Ar)
  '29.4',   // Potassium (K)
  '27.0',   // Calcium (Ca)
  '0',      // Scandium (Sc)
  '0',      // Titanium (Ti)
  '0',      // Vanadium (V)
  '0',      // Chromium (Cr)
  '0',      // Manganese (Mn)
  '0',      // Iron (Fe)
  '0',      // Cobalt (Co)
  '0',      // Nickel (Ni)
  '0',      // Copper (Cu)
  '0',      // Zinc (Zn)
  '0',      // Gallium (Ga)
  '0',      // Germanium (Ge)
  '0',      // Arsenic (As)
  '0',      // Selenium (Se)
  '0',      // Bromine (Br)
  '0',      // Krypton (Kr)
  '0',      // Rubidium (Rb)
  '0',      // Strontium (Sr)
  '0',      // Yttrium (Y)
  '0',      // Zirconium (Zr)
  '0',      // Niobium (Nb)
  '0',      // Molybdenum (Mo)
  '0',      // Technetium (Tc)
  '0',      // Ruthenium (Ru)
  '0',      // Rhodium (Rh)
  '0',      // Palladium (Pd)
  '0',      // Silver (Ag)
  '0',      // Cadmium (Cd)
  '0',      // Indium (In)
  '0',      // Tin (Sn)
  '0',      // Antimony (Sb)
  '0',      // Tellurium (Te)
  '0',      // Iodine (I)
  '0',      // Xenon (Xe)
  '0',      // Cesium (Cs)
  '0',      // Barium (Ba)
  '0',      // Lanthanum (La)
  '0',      // Cerium (Ce)
  '0',      // Praseodymium (Pr)
  '0',      // Neodymium (Nd)
  '0',      // Promethium (Pm)
  '0',      // Samarium (Sm)
  '0',      // Europium (Eu)
  '0',      // Gadolinium (Gd)
  '0',      // Terbium (Tb)
  '0',      // Dysprosium (Dy)
  '0',      // Holmium (Ho)
  '0',      // Erbium (Er)
  '0',      // Thulium (Tm)
  '0',      // Ytterbium (Yb)
  '0',      // Lutetium (Lu)
  '0',      // Hafnium (Hf)
  '0',      // Tantalum (Ta)
  '0',      // Tungsten (W)
  '0',      // Rhenium (Re)
  '0',      // Osmium (Os)
  '0',      // Iridium (Ir)
  '0',      // Platinum (Pt)
  '0',      // Gold (Au)
  '0',      // Mercury (Hg)
  '0',      // Thallium (Tl)
  '0',      // Lead (Pb)
  '0',      // Bismuth (Bi)
  '0',      // Polonium (Po)
  '0',      // Astatine (At)
  '0',      // Radon (Rn)
  '0',      // Francium (Fr)
  '0',      // Radium (Ra)
  '0',      // Actinium (Ac)
  '0',      // Thorium (Th)
  '0',      // Protactinium (Pa)
  '0',      // Uranium (U)
  '0',      // Neptunium (Np)
  '0',      // Plutonium (Pu)
  '0',      // Americium (Am)
  '0',      // Curium (Cm)
  '0',      // Berkelium (Bk)
  '0',      // Californium (Cf)
  '0',      // Einsteinium (Es)
  '0',      // Fermium (Fm)
  '0',      // Mendelevium (Md)
  '0',      // Nobelium (No)
  '0',      // Lawrencium (Lr)
  '0',      // Rutherfordium (Rf)
  '0',      // Dubnium (Db)
  '0',      // Seaborgium (Sg)
  '0',      // Bohrium (Bh)
  '0',      // Hassium (Hs)
  '0',      // Meitnerium (Mt)
  '0',      // Darmstadtium (Ds)
  '0',      // Roentgenium (Rg)
  '0',      // Copernicium (Cn)
  '0',      // Nihonium (Nh)
  '0',      // Flerovium (Fl)
  '0',      // Moscovium (Mc)
  '0',      // Livermorium (Lv)
  '0'       // Oganesson (Og)
];
const earthRarity = [
  140,     // Hydrogen (H)
  0.00005, // Helium (He)
  20,      // Lithium (Li)
  2.8,     // Beryllium (Be)
  2,       // Boron (B)
  200,     // Carbon (C)
  70,      // Nitrogen (N)
  4600,    // Oxygen (O)
  580,     // Fluorine (F)
  18,      // Neon (Ne)
  23,      // Sodium (Na)
  3.4,     // Magnesium (Mg)
  82,      // Aluminium (Al)
  30,      // Silicon (Si)
  100,     // Phosphorus (P)
  0.04,    // Sulfur (S)
  0.03,    // Chlorine (Cl)
  1.1,     // Argon (Ar)
  0.2,     // Potassium (K)
  0.03,    // Calcium (Ca)
  0.0003,  // Scandium (Sc)
  0.001,   // Titanium (Ti)
  0.001,   // Vanadium (V)
  0.0008,  // Chromium (Cr)
  0.0001,  // Manganese (Mn)
  0.1,     // Iron (Fe)
  0.0001,  // Cobalt (Co)
  0.0002,  // Nickel (Ni)
  0.00001, // Copper (Cu)
  0.00004, // Zinc (Zn)
  0.0002,  // Gallium (Ga)
  0.00002, // Germanium (Ge)
  0.00005, // Arsenic (As)
  0.0001,  // Selenium (Se)
  0.00002, // Bromine (Br)
  0.00001, // Krypton (Kr)
  0.0001,  // Rubidium (Rb)
  0.0001,  // Strontium (Sr)
  0.00001, // Yttrium (Y)
  0.00002, // Zirconium (Zr)
  0.000005,// Niobium (Nb)
  0.00001, // Molybdenum (Mo)
  0.00002, // Technetium (Tc)
  0.00003, // Ruthenium (Ru)
  0.00004, // Rhodium (Rh)
  0.00001, // Palladium (Pd)
  0.0001,  // Silver (Ag)
  0.0001,  // Cadmium (Cd)
  0.0002,  // Indium (In)
  0.00001, // Tin (Sn)
  0.00005, // Antimony (Sb)
  0.0001,  // Tellurium (Te)
  0.0001,  // Iodine (I)
  0.00002, // Xenon (Xe)
  0.0000003,// Cesium (Cs)
  0.0001,  // Barium (Ba)
  0.000005,// Lanthanum (La)
  0.00001, // Cerium (Ce)
  0.000002,// Praseodymium (Pr)
  0.000002,// Neodymium (Nd)
  0.00001, // Promethium (Pm)
  0.00004, // Samarium (Sm)
  0.00003, // Europium (Eu)
  0.0001,  // Gadolinium (Gd)
  0.00001, // Terbium (Tb)
  0.00001, // Dysprosium (Dy)
  0.00003, // Holmium (Ho)
  0.00003, // Erbium (Er)
  0.00002, // Thulium (Tm)
  0.00001, // Ytterbium (Yb)
  0.00001, // Lutetium (Lu)
  0.00002, // Hafnium (Hf)
  0.00001, // Tantalum (Ta)
  0.00002, // Tungsten (W)
  0.00003, // Rhenium (Re)
  0.00001, // Osmium (Os)
  0.00001, // Iridium (Ir)
  0.00005, // Platinum (Pt)
  0.00001, // Gold (Au)
  0.00004, // Mercury (Hg)
  0.00005, // Thallium (Tl)
  0.00004, // Lead (Pb)
  0.00001, // Bismuth (Bi)
  0.00003, // Polonium (Po)
  0.00001, // Astatine (At)
  0.00003, // Radon (Rn)
  0.0000001,// Francium (Fr)
  0.0000003,// Radium (Ra)
  0.00003, // Actinium (Ac)
  0.00001, // Thorium (Th)
  0.000003,// Protactinium (Pa)
  0.00003, // Uranium (U)
  0.000001,// Neptunium (Np)
  0.0000004,// Plutonium (Pu)
  0.00001, // Americium (Am)
  0.000005,// Curium (Cm)
  0.000002,// Berkelium (Bk)
  0.000004,// Californium (Cf)
  0.000002,// Einsteinium (Es)
  0.000004,// Fermium (Fm)
  0.000004,// Mendelevium (Md)
  0.000005,// Nobelium (No)
  0.000002,// Lawrencium (Lr)
  0.000003,// Rutherfordium (Rf)
  0.000002,// Dubnium (Db)
  0.000002,// Seaborgium (Sg)
  0.000002,// Bohrium (Bh)
  0.000002,// Hassium (Hs)
  0.000002,// Meitnerium (Mt)
  0.000002,// Darmstadtium (Ds)
  0.000002,// Roentgenium (Rg)
  0.000002,// Copernicium (Cn)
  0.000002,// Nihonium (Nh)
  0.000002,// Flerovium (Fl)
  0.000002,// Moscovium (Mc)
  0.000002,// Livermorium (Lv)
  0.000002  // Oganesson (Og)
];
const universeRarity = [
  0.75,    // Hydrogen (H)
  0.00003, // Helium (He)
  0.0000001, // Lithium (Li)
  0.00000001, // Beryllium (Be)
  0.000000001, // Boron (B)
  0.00000003, // Carbon (C)
  0.0000005, // Nitrogen (N)
  0.003,    // Oxygen (O)
  0.00000001, // Fluorine (F)
  0.0000005, // Neon (Ne)
  0.000000001, // Sodium (Na)
  0.00000001, // Magnesium (Mg)
  0.000000002, // Aluminium (Al)
  0.0000001, // Silicon (Si)
  0.000000002, // Phosphorus (P)
  0.00000002, // Sulfur (S)
  0.000000002, // Chlorine (Cl)
  0.00000002, // Argon (Ar)
  0.00000001, // Potassium (K)
  0.00000001, // Calcium (Ca)
  0.000000001, // Scandium (Sc)
  0.0000000005, // Titanium (Ti)
  0.0000000003, // Vanadium (V)
  0.0000000002, // Chromium (Cr)
  0.0000000002, // Manganese (Mn)
  0.0000000001, // Iron (Fe)
  0.00000000001, // Cobalt (Co)
  0.00000000001, // Nickel (Ni)
  0.000000000001, // Copper (Cu)
  0.000000000002, // Zinc (Zn)
  0.00000000002, // Gallium (Ga)
  0.00000000001, // Germanium (Ge)
  0.0000000001, // Arsenic (As)
  0.00000000003, // Selenium (Se)
  0.00000000003, // Bromine (Br)
  0.00000000001, // Krypton (Kr)
  0.00000000005, // Rubidium (Rb)
  0.00000000002, // Strontium (Sr)
  0.00000000002, // Yttrium (Y)
  0.00000000001, // Zirconium (Zr)
  0.000000000005, // Niobium (Nb)
  0.000000000002, // Molybdenum (Mo)
  0.000000000001, // Technetium (Tc)
  0.00000000001, // Ruthenium (Ru)
  0.00000000001, // Rhodium (Rh)
  0.00000000001, // Palladium (Pd)
  0.0000000001, // Silver (Ag)
  0.0000000002, // Cadmium (Cd)
  0.00000000002, // Indium (In)
  0.00000000002, // Tin (Sn)
  0.00000000001, // Antimony (Sb)
  0.0000000001, // Tellurium (Te)
  0.0000000001, // Iodine (I)
  0.00000000002, // Xenon (Xe)
  0.00000000001, // Cesium (Cs)
  0.00000000001, // Barium (Ba)
  0.00000000001, // Lanthanum (La)
  0.00000000002, // Cerium (Ce)
  0.00000000001, // Praseodymium (Pr)
  0.00000000002, // Neodymium (Nd)
  0.00000000001, // Promethium (Pm)
  0.00000000002, // Samarium (Sm)
  0.00000000002, // Europium (Eu)
  0.00000000002, // Gadolinium (Gd)
  0.00000000001, // Terbium (Tb)
  0.00000000002, // Dysprosium (Dy)
  0.00000000001, // Holmium (Ho)
  0.00000000001, // Erbium (Er)
  0.00000000001, // Thulium (Tm)
  0.00000000001, // Ytterbium (Yb)
  0.00000000001, // Lutetium (Lu)
  0.00000000001, // Hafnium (Hf)
  0.00000000001, // Tantalum (Ta)
  0.00000000001, // Tungsten (W)
  0.00000000001, // Rhenium (Re)
  0.00000000001, // Osmium (Os)
  0.00000000001, // Iridium (Ir)
  0.00000000001, // Platinum (Pt)
  0.00000000001, // Gold (Au)
  0.00000000002, // Mercury (Hg)
  0.00000000002, // Thallium (Tl)
  0.00000000001, // Lead (Pb)
  0.00000000001, // Bismuth (Bi)
  0.00000000001, // Polonium (Po)
  0.00000000001, // Astatine (At)
  0.00000000001, // Radon (Rn)
  0.00000000001, // Francium (Fr)
  0.00000000001, // Radium (Ra)
  0.00000000001, // Actinium (Ac)
  0.00000000001, // Thorium (Th)
  0.00000000001, // Protactinium (Pa)
  0.00000000001, // Uranium (U)
  0.00000000001, // Neptunium (Np)
  0.00000000001, // Plutonium (Pu)
  0.00000000001, // Americium (Am)
  0.00000000001, // Curium (Cm)
  0.00000000001, // Berkelium (Bk)
  0.00000000001, // Californium (Cf)
  0.00000000001, // Einsteinium (Es)
  0.00000000001, // Fermium (Fm)
  0.00000000001, // Mendelevium (Md)
  0.00000000001, // Nobelium (No)
  0.00000000001, // Lawrencium (Lr)
  0.00000000001, // Rutherfordium (Rf)
  0.00000000001, // Dubnium (Db)
  0.00000000001, // Seaborgium (Sg)
  0.00000000001, // Bohrium (Bh)
  0.00000000001, // Hassium (Hs)
  0.00000000001, // Meitnerium (Mt)
  0.00000000001, // Darmstadtium (Ds)
  0.00000000001, // Roentgenium (Rg)
  0.00000000001, // Copernicium (Cn)
  0.00000000001, // Nihonium (Nh)
  0.00000000001, // Flerovium (Fl)
  0.00000000001, // Moscovium (Mc)
  0.00000000001, // Livermorium (Lv)
  0.00000000001  // Oganesson (Og)
];
const electricalConductivity = [
  0.0000001, // Hydrogen (H)
  0,         // Helium (He)
  0.000017,  // Lithium (Li)
  0.000002,  // Beryllium (Be)
  0.000005,  // Boron (B)
  0.0002,   // Carbon (C)
  0.0001,   // Nitrogen (N)
  0.0001,   // Oxygen (O)
  0.0001,   // Fluorine (F)
  0,        // Neon (Ne)
  0.000010, // Sodium (Na)
  0.00016,  // Magnesium (Mg)
  0.000037, // Aluminium (Al)
  0.000015, // Silicon (Si)
  0.0002,  // Phosphorus (P)
  0.00001, // Sulfur (S)
  0.00001, // Chlorine (Cl)
  0,       // Argon (Ar)
  0.0006,  // Potassium (K)
  0.0003,  // Calcium (Ca)
  0.00008, // Scandium (Sc)
  0.0005,  // Titanium (Ti)
  0.00009, // Vanadium (V)
  0.00005, // Chromium (Cr)
  0.0001,  // Manganese (Mn)
  0.0001,  // Iron (Fe)
  0.00005, // Cobalt (Co)
  0.00007, // Nickel (Ni)
  0.0006,  // Copper (Cu)
  0.00001, // Zinc (Zn)
  0.00006, // Gallium (Ga)
  0.00002, // Germanium (Ge)
  0.00004, // Arsenic (As)
  0.00007, // Selenium (Se)
  0.00003, // Bromine (Br)
  0.00001, // Krypton (Kr)
  0.00002, // Rubidium (Rb)
  0.00003, // Strontium (Sr)
  0.00002, // Yttrium (Y)
  0.00003, // Zirconium (Zr)
  0.00001, // Niobium (Nb)
  0.00005, // Molybdenum (Mo)
  0.00007, // Technetium (Tc)
  0.0001,  // Ruthenium (Ru)
  0.0001,  // Rhodium (Rh)
  0.0001,  // Palladium (Pd)
  0.0004,  // Silver (Ag)
  0.00001, // Cadmium (Cd)
  0.0003,  // Indium (In)
  0.0001,  // Tin (Sn)
  0.00003, // Antimony (Sb)
  0.00002, // Tellurium (Te)
  0.00003, // Iodine (I)
  0.00002, // Xenon (Xe)
  0.000003,// Cesium (Cs)
  0.00003, // Barium (Ba)
  0.00002, // Lanthanum (La)
  0.0001,  // Cerium (Ce)
  0.00003, // Praseodymium (Pr)
  0.00003, // Neodymium (Nd)
  0.0002,  // Promethium (Pm)
  0.0001,  // Samarium (Sm)
  0.00003, // Europium (Eu)
  0.0001,  // Gadolinium (Gd)
  0.00003, // Terbium (Tb)
  0.0001,  // Dysprosium (Dy)
  0.0001,  // Holmium (Ho)
  0.0001,  // Erbium (Er)
  0.00003, // Thulium (Tm)
  0.00003, // Ytterbium (Yb)
  0.00003, // Lutetium (Lu)
  0.00002, // Hafnium (Hf)
  0.0001,  // Tantalum (Ta)
  0.00003, // Tungsten (W)
  0.0001,  // Rhenium (Re)
  0.0001,  // Osmium (Os)
  0.0001,  // Iridium (Ir)
  0.0001,  // Platinum (Pt)
  0.0005,  // Gold (Au)
  0.00004, // Mercury (Hg)
  0.00002, // Thallium (Tl)
  0.0001,  // Lead (Pb)
  0.00003, // Bismuth (Bi)
  0.00002, // Polonium (Po)
  0.00001, // Astatine (At)
  0.00001, // Radon (Rn)
  0.0001,  // Francium (Fr)
  0.0001,  // Radium (Ra)
  0.0001,  // Actinium (Ac)
  0.0001,  // Thorium (Th)
  0.0001,  // Protactinium (Pa)
  0.0001,  // Uranium (U)
  0.0001,  // Neptunium (Np)
  0.0001,  // Plutonium (Pu)
  0.0001,  // Americium (Am)
  0.0001,  // Curium (Cm)
  0.0001,  // Berkelium (Bk)
  0.0001,  // Californium (Cf)
  0.0001,  // Einsteinium (Es)
  0.0001,  // Fermium (Fm)
  0.0001,  // Mendelevium (Md)
  0.0001,  // Nobelium (No)
  0.0001,  // Lawrencium (Lr)
  0.0001,  // Rutherfordium (Rf)
  0.0001,  // Dubnium (Db)
  0.0001,  // Seaborgium (Sg)
  0.0001,  // Bohrium (Bh)
  0.0001,  // Hassium (Hs)
  0.0001,  // Meitnerium (Mt)
  0.0001,  // Darmstadtium (Ds)
  0.0001,  // Roentgenium (Rg)
  0.0001,  // Copernicium (Cn)
  0.0001,  // Nihonium (Nh)
  0.0001,  // Flerovium (Fl)
  0.0001,  // Moscovium (Mc)
  0.0001,  // Livermorium (Lv)
  0.0001   // Oganesson (Og)
];
const magneticProperties = [
  "Diamagnetic", // Hydrogen (H)
  "Diamagnetic", // Helium (He)
  "Paramagnetic", // Lithium (Li)
  "Diamagnetic", // Beryllium (Be)
  "Diamagnetic", // Boron (B)
  "Diamagnetic", // Carbon (C)
  "Paramagnetic", // Nitrogen (N)
  "Paramagnetic", // Oxygen (O)
  "Diamagnetic", // Fluorine (F)
  "Diamagnetic", // Neon (Ne)
  "Paramagnetic", // Sodium (Na)
  "Paramagnetic", // Magnesium (Mg)
  "Paramagnetic", // Aluminium (Al)
  "Diamagnetic", // Silicon (Si)
  "Paramagnetic", // Phosphorus (P)
  "Diamagnetic", // Sulfur (S)
  "Diamagnetic", // Chlorine (Cl)
  "Diamagnetic", // Argon (Ar)
  "Paramagnetic", // Potassium (K)
  "Paramagnetic", // Calcium (Ca)
  "Paramagnetic", // Scandium (Sc)
  "Paramagnetic", // Titanium (Ti)
  "Paramagnetic", // Vanadium (V)
  "Paramagnetic", // Chromium (Cr)
  "Paramagnetic", // Manganese (Mn)
  "Ferromagnetic", // Iron (Fe)
  "Paramagnetic", // Cobalt (Co)
  "Paramagnetic", // Nickel (Ni)
  "Diamagnetic", // Copper (Cu)
  "Diamagnetic", // Zinc (Zn)
  "Paramagnetic", // Gallium (Ga)
  "Diamagnetic", // Germanium (Ge)
  "Diamagnetic", // Arsenic (As)
  "Diamagnetic", // Selenium (Se)
  "Diamagnetic", // Bromine (Br)
  "Diamagnetic", // Krypton (Kr)
  "Paramagnetic", // Rubidium (Rb)
  "Paramagnetic", // Strontium (Sr)
  "Paramagnetic", // Yttrium (Y)
  "Diamagnetic", // Zirconium (Zr)
  "Paramagnetic", // Niobium (Nb)
  "Paramagnetic", // Molybdenum (Mo)
  "Diamagnetic", // Technetium (Tc)
  "Paramagnetic", // Ruthenium (Ru)
  "Paramagnetic", // Rhodium (Rh)
  "Paramagnetic", // Palladium (Pd)
  "Diamagnetic", // Silver (Ag)
  "Diamagnetic", // Cadmium (Cd)
  "Diamagnetic", // Indium (In)
  "Diamagnetic", // Tin (Sn)
  "Diamagnetic", // Antimony (Sb)
  "Diamagnetic", // Tellurium (Te)
  "Diamagnetic", // Iodine (I)
  "Diamagnetic", // Xenon (Xe)
  "Paramagnetic", // Cesium (Cs)
  "Paramagnetic", // Barium (Ba)
  "Paramagnetic", // Lanthanum (La)
  "Paramagnetic", // Cerium (Ce)
  "Paramagnetic", // Praseodymium (Pr)
  "Paramagnetic", // Neodymium (Nd)
  "Paramagnetic", // Promethium (Pm)
  "Paramagnetic", // Samarium (Sm)
  "Paramagnetic", // Europium (Eu)
  "Paramagnetic", // Gadolinium (Gd)
  "Paramagnetic", // Terbium (Tb)
  "Paramagnetic", // Dysprosium (Dy)
  "Paramagnetic", // Holmium (Ho)
  "Paramagnetic", // Erbium (Er)
  "Paramagnetic", // Thulium (Tm)
  "Paramagnetic", // Ytterbium (Yb)
  "Paramagnetic", // Lutetium (Lu)
  "Paramagnetic", // Hafnium (Hf)
  "Paramagnetic", // Tantalum (Ta)
  "Paramagnetic", // Tungsten (W)
  "Paramagnetic", // Rhenium (Re)
  "Paramagnetic", // Osmium (Os)
  "Paramagnetic", // Iridium (Ir)
  "Paramagnetic", // Platinum (Pt)
  "Paramagnetic", // Gold (Au)
  "Diamagnetic", // Mercury (Hg)
  "Diamagnetic", // Thallium (Tl)
  "Diamagnetic", // Lead (Pb)
  "Diamagnetic", // Bismuth (Bi)
  "Diamagnetic", // Polonium (Po)
  "Diamagnetic", // Astatine (At)
  "Diamagnetic", // Radon (Rn)
  "Paramagnetic", // Francium (Fr)
  "Paramagnetic", // Radium (Ra)
  "Paramagnetic", // Actinium (Ac)
  "Paramagnetic", // Thorium (Th)
  "Paramagnetic", // Protactinium (Pa)
  "Paramagnetic", // Uranium (U)
  "Paramagnetic", // Neptunium (Np)
  "Paramagnetic", // Plutonium (Pu)
  "Paramagnetic", // Americium (Am)
  "Paramagnetic", // Curium (Cm)
  "Paramagnetic", // Berkelium (Bk)
  "Paramagnetic", // Californium (Cf)
  "Paramagnetic", // Einsteinium (Es)
  "Paramagnetic", // Fermium (Fm)
  "Paramagnetic", // Mendelevium (Md)
  "Paramagnetic", // Nobelium (No)
  "Paramagnetic", // Lawrencium (Lr)
  "Paramagnetic", // Rutherfordium (Rf)
  "Paramagnetic", // Dubnium (Db)
  "Paramagnetic", // Seaborgium (Sg)
  "Paramagnetic", // Bohrium (Bh)
  "Paramagnetic", // Hassium (Hs)
  "Paramagnetic", // Meitnerium (Mt)
  "Paramagnetic", // Darmstadtium (Ds)
  "Paramagnetic", // Roentgenium (Rg)
  "Paramagnetic", // Copernicium (Cn)
  "Paramagnetic", // Nihonium (Nh)
  "Paramagnetic", // Flerovium (Fl)
  "Paramagnetic", // Moscovium (Mc)
  "Paramagnetic", // Livermorium (Lv)
  "Paramagnetic"  // Oganesson (Og)
];
const halfLife = [
  Infinity, // Hydrogen (H)
  Infinity, // Helium (He)
  Infinity, // Lithium (Li)
  Infinity, // Beryllium (Be)
  Infinity, // Boron (B)
  Infinity, // Carbon (C)
  Infinity, // Nitrogen (N)
  Infinity, // Oxygen (O)
  Infinity, // Fluorine (F)
  Infinity, // Neon (Ne)
  Infinity, // Sodium (Na)
  Infinity, // Magnesium (Mg)
  Infinity, // Aluminium (Al)
  Infinity, // Silicon (Si)
  Infinity, // Phosphorus (P)
  Infinity, // Sulfur (S)
  Infinity, // Chlorine (Cl)
  Infinity, // Argon (Ar)
  Infinity, // Potassium (K)
  Infinity, // Calcium (Ca)
  Infinity, // Scandium (Sc)
  Infinity, // Titanium (Ti)
  Infinity, // Vanadium (V)
  Infinity, // Chromium (Cr)
  Infinity, // Manganese (Mn)
  Infinity, // Iron (Fe)
  Infinity, // Cobalt (Co)
  Infinity, // Nickel (Ni)
  Infinity, // Copper (Cu)
  Infinity, // Zinc (Zn)
  Infinity, // Gallium (Ga)
  Infinity, // Germanium (Ge)
  Infinity, // Arsenic (As)
  Infinity, // Selenium (Se)
  Infinity, // Bromine (Br)
  Infinity, // Krypton (Kr)
  Infinity, // Rubidium (Rb)
  Infinity, // Strontium (Sr)
  Infinity, // Yttrium (Y)
  Infinity, // Zirconium (Zr)
  Infinity, // Niobium (Nb)
  Infinity, // Molybdenum (Mo)
  Infinity, // Technetium (Tc)
  Infinity, // Ruthenium (Ru)
  Infinity, // Rhodium (Rh)
  Infinity, // Palladium (Pd)
  Infinity, // Silver (Ag)
  Infinity, // Cadmium (Cd)
  Infinity, // Indium (In)
  Infinity, // Tin (Sn)
  Infinity, // Antimony (Sb)
  Infinity, // Tellurium (Te)
  Infinity, // Iodine (I)
  Infinity, // Xenon (Xe)
  Infinity, // Cesium (Cs)
  Infinity, // Barium (Ba)
  Infinity, // Lanthanum (La)
  Infinity, // Cerium (Ce)
  Infinity, // Praseodymium (Pr)
  Infinity, // Neodymium (Nd)
  Infinity, // Promethium (Pm)
  Infinity, // Samarium (Sm)
  Infinity, // Europium (Eu)
  Infinity, // Gadolinium (Gd)
  Infinity, // Terbium (Tb)
  Infinity, // Dysprosium (Dy)
  Infinity, // Holmium (Ho)
  Infinity, // Erbium (Er)
  Infinity, // Thulium (Tm)
  Infinity, // Ytterbium (Yb)
  Infinity, // Lutetium (Lu)
  Infinity, // Hafnium (Hf)
  Infinity, // Tantalum (Ta)
  Infinity, // Tungsten (W)
  Infinity, // Rhenium (Re)
  Infinity, // Osmium (Os)
  Infinity, // Iridium (Ir)
  Infinity, // Platinum (Pt)
  Infinity, // Gold (Au)
  Infinity, // Mercury (Hg)
  Infinity, // Thallium (Tl)
  Infinity, // Lead (Pb)
  Infinity, // Bismuth (Bi)
  Infinity, // Polonium (Po)
  Infinity, // Astatine (At)
  Infinity, // Radon (Rn)
  Infinity, // Francium (Fr)
  Infinity, // Radium (Ra)
  Infinity, // Actinium (Ac)
  Infinity, // Thorium (Th)
  Infinity, // Protactinium (Pa)
  Infinity, // Uranium (U)
  Infinity, // Neptunium (Np)
  Infinity, // Plutonium (Pu)
  Infinity, // Americium (Am)
  Infinity, // Curium (Cm)
  Infinity, // Berkelium (Bk)
  Infinity, // Californium (Cf)
  Infinity, // Einsteinium (Es)
  Infinity, // Fermium (Fm)
  Infinity, // Mendelevium (Md)
  Infinity, // Nobelium (No)
  Infinity, // Lawrencium (Lr)
  Infinity, // Rutherfordium (Rf)
  Infinity, // Dubnium (Db)
  Infinity, // Seaborgium (Sg)
  Infinity, // Bohrium (Bh)
  Infinity, // Hassium (Hs)
  Infinity, // Meitnerium (Mt)
  Infinity, // Darmstadtium (Ds)
  Infinity, // Roentgenium (Rg)
  Infinity, // Copernicium (Cn)
  Infinity, // Nihonium (Nh)
  Infinity, // Flerovium (Fl)
  Infinity, // Moscovium (Mc)
  Infinity, // Livermorium (Lv)
  Infinity  // Oganesson (Og)
];
const yearOfDiscovery = [
  1766, // Hydrogen (H)
  1895, // Helium (He)
  1817, // Lithium (Li)
  1798, // Beryllium (Be)
  1808, // Boron (B)
  1789, // Carbon (C)
  1772, // Nitrogen (N)
  1774, // Oxygen (O)
  1886, // Fluorine (F)
  1898, // Neon (Ne)
  1807, // Sodium (Na)
  1808, // Magnesium (Mg)
  1825, // Aluminium (Al)
  1824, // Silicon (Si)
  1669, // Phosphorus (P)
  1727, // Sulfur (S)
  1774, // Chlorine (Cl)
  1894, // Argon (Ar)
  1807, // Potassium (K)
  1808, // Calcium (Ca)
  1879, // Scandium (Sc)
  1795, // Titanium (Ti)
  1831, // Vanadium (V)
  1797, // Chromium (Cr)
  1774, // Manganese (Mn)
  1780, // Iron (Fe)
  1735, // Cobalt (Co)
  1751, // Nickel (Ni)
2023,  // Copper (Cu)
  1817, // Zinc (Zn)
  1875, // Gallium (Ga)
  1886, // Germanium (Ge)
  1886, // Arsenic (As)
  1817, // Selenium (Se)
  1826, // Bromine (Br)
  1898, // Krypton (Kr)
  1861, // Rubidium (Rb)
  1808, // Strontium (Sr)
  1794, // Yttrium (Y)
  1789, // Zirconium (Zr)
  1801, // Niobium (Nb)
  1781, // Molybdenum (Mo)
  1937, // Technetium (Tc)
  1844, // Ruthenium (Ru)
  1803, // Rhodium (Rh)
  1803, // Palladium (Pd)
  1804, // Silver (Ag)
  1817, // Cadmium (Cd)
  1864, // Indium (In)
  1856, // Tin (Sn)
-213,
  1782, // Tellurium (Te)
  1811, // Iodine (I)
  1898, // Xenon (Xe)
  1869, // Cesium (Cs)
  1772, // Barium (Ba)
  1839, // Lanthanum (La)
  1803, // Cerium (Ce)
  1885, // Praseodymium (Pr)
  1885, // Neodymium (Nd)
  1945, // Promethium (Pm)
  1953, // Samarium (Sm)
  1901, // Europium (Eu)
  1880, // Gadolinium (Gd)
  1842, // Terbium (Tb)
  1886, // Dysprosium (Dy)
  1878, // Holmium (Ho)
  1842, // Erbium (Er)
  1879, // Thulium (Tm)
  1878, // Ytterbium (Yb)
  1907, // Lutetium (Lu)
  1923, // Hafnium (Hf)
  1802, // Tantalum (Ta)
  1783, // Tungsten (W)
  1925, // Rhenium (Re)
  1803, // Osmium (Os)
  1803, // Iridium (Ir)
  1803, // Platinum (Pt)
  1797, // Gold (Au)
  1817, // Mercury (Hg)
  1861, // Thallium (Tl)
  1750, // Lead (Pb)
512,
  1898, // Polonium (Po)
  1899, // Astatine (At)
  1899, // Radon (Rn)
  1939, // Francium (Fr)
  1899, // Radium (Ra)
  1899, // Actinium (Ac)
  1898, // Thorium (Th)
  1913, // Protactinium (Pa)
  1789, // Uranium (U)
  1940, // Neptunium (Np)
  1940, // Plutonium (Pu)
  1944, // Americium (Am)
  1944, // Curium (Cm)
  1949, // Berkelium (Bk)
  1950, // Californium (Cf)
  1952, // Einsteinium (Es)
  1952, // Fermium (Fm)
  1955, // Mendelevium (Md)
  1958, // Nobelium (No)
  1961, // Lawrencium (Lr)
  1964, // Rutherfordium (Rf)
  1967, // Dubnium (Db)
  1974, // Seaborgium (Sg)
  1981, // Bohrium (Bh)
  1984, // Hassium (Hs)
  1982, // Meitnerium (Mt)
  1994, // Darmstadtium (Ds)
  2004, // Roentgenium (Rg)
  2009, // Copernicium (Cn)
  2004, // Nihonium (Nh)
  2012, // Flerovium (Fl)
  2016, // Moscovium (Mc)
  2012, // Livermorium (Lv)
  2016  // Oganesson (Og)
];
const thermalDiffusivity = [
  0.000065, // Hydrogen (H)
  0.000085, // Helium (He)
  0.00044, // Lithium (Li)
  0.00080, // Beryllium (Be)
  0.00029, // Boron (B)
  0.00022, // Carbon (C)
  0.00080, // Nitrogen (N)
  0.00050, // Oxygen (O)
  0.00076, // Fluorine (F)
  0.00081, // Neon (Ne)
  0.00092, // Sodium (Na)
  0.00095, // Magnesium (Mg)
  0.00068, // Aluminium (Al)
  0.00053, // Silicon (Si)
  0.00055, // Phosphorus (P)
  0.00055, // Sulfur (S)
  0.00068, // Chlorine (Cl)
  0.00090, // Argon (Ar)
  0.00089, // Potassium (K)
  0.00099, // Calcium (Ca)
  0.00053, // Scandium (Sc)
  0.00023, // Titanium (Ti)
  0.00028, // Vanadium (V)
  0.00024, // Chromium (Cr)
  0.00018, // Manganese (Mn)
  0.00080, // Iron (Fe)
  0.00018, // Cobalt (Co)
  0.00026, // Nickel (Ni)
  0.00016, // Copper (Cu)
  0.00016, // Zinc (Zn)
  0.00021, // Gallium (Ga)
  0.00023, // Germanium (Ge)
  0.00016, // Arsenic (As)
  0.00024, // Selenium (Se)
  0.00027, // Bromine (Br)
  0.00025, // Krypton (Kr)
  0.00055, // Rubidium (Rb)
  0.00066, // Strontium (Sr)
  0.00052, // Yttrium (Y)
  0.00023, // Zirconium (Zr)
  0.00025, // Niobium (Nb)
  0.00023, // Molybdenum (Mo)
  0.00024, // Technetium (Tc)
  0.00025, // Ruthenium (Ru)
  0.00022, // Rhodium (Rh)
  0.00023, // Palladium (Pd)
  0.00016, // Silver (Ag)
  0.00018, // Cadmium (Cd)
  0.00019, // Indium (In)
  0.00021, // Tin (Sn)
  0.00022, // Antimony (Sb)
  0.00021, // Tellurium (Te)
  0.00025, // Iodine (I)
  0.00028, // Xenon (Xe)
  0.00077, // Cesium (Cs)
  0.00062, // Barium (Ba)
  0.00024, // Lanthanum (La)
  0.00023, // Cerium (Ce)
  0.00022, // Praseodymium (Pr)
  0.00022, // Neodymium (Nd)
  0.00024, // Promethium (Pm)
  0.00022, // Samarium (Sm)
  0.00024, // Europium (Eu)
  0.00022, // Gadolinium (Gd)
  0.00020, // Terbium (Tb)
  0.00019, // Dysprosium (Dy)
  0.00022, // Holmium (Ho)
  0.00023, // Erbium (Er)
  0.00022, // Thulium (Tm)
  0.00023, // Ytterbium (Yb)
  0.00023, // Lutetium (Lu)
  0.00023, // Hafnium (Hf)
  0.00023, // Tantalum (Ta)
  0.00020, // Tungsten (W)
  0.00023, // Rhenium (Re)
  0.00023, // Osmium (Os)
  0.00022, // Iridium (Ir)
  0.00021, // Platinum (Pt)
  0.00016, // Gold (Au)
  0.00018, // Mercury (Hg)
  0.00022, // Thallium (Tl)
  0.00020, // Lead (Pb)
  0.00022, // Bismuth (Bi)
  0.00021, // Polonium (Po)
  0.00021, // Astatine (At)
  0.00021, // Radon (Rn)
  0.00024, // Francium (Fr)
  0.00024, // Radium (Ra)
  0.00023, // Actinium (Ac)
  0.00024, // Thorium (Th)
  0.00023, // Protactinium (Pa)
  0.00023, // Uranium (U)
  0.00023, // Neptunium (Np)
  0.00023, // Plutonium (Pu)
  0.00023, // Americium (Am)
  0.00023, // Curium (Cm)
  0.00023, // Berkelium (Bk)
  0.00023, // Californium (Cf)
  0.00023, // Einsteinium (Es)
  0.00023, // Fermium (Fm)
  0.00023, // Mendelevium (Md)
  0.00023, // Nobelium (No)
  0.00023, // Lawrencium (Lr)
  0.00023, // Rutherfordium (Rf)
  0.00023, // Dubnium (Db)
  0.00023, // Seaborgium (Sg)
  0.00023, // Bohrium (Bh)
  0.00023, // Hassium (Hs)
  0.00023, // Meitnerium (Mt)
  0.00023, // Darmstadtium (Ds)
  0.00023, // Roentgenium (Rg)
  0.00023, // Copernicium (Cn)
  0.00023, // Nihonium (Nh)
  0.00023, // Flerovium (Fl)
  0.00023, // Moscovium (Mc)
  0.00023, // Livermorium (Lv)
  0.00023  // Oganesson (Og)
];
const viscosity = [
  0.000089, // Hydrogen (H) - gas
  0.000200, // Helium (He) - gas
  0.000380, // Lithium (Li) - liquid metal
  0.001500, // Beryllium (Be) - solid
  0.000210, // Boron (B) - solid
  0.00010,  // Carbon (C) - solid
  0.000080, // Nitrogen (N) - gas
  0.000077, // Oxygen (O) - gas
  0.000051, // Fluorine (F) - gas
  0.000063, // Neon (Ne) - gas
  0.000071, // Sodium (Na) - liquid metal
  0.001200, // Magnesium (Mg) - solid
  0.001500, // Aluminium (Al) - solid
  0.001800, // Silicon (Si) - solid
  0.001000, // Phosphorus (P) - solid
  0.001200, // Sulfur (S) - solid
  0.00090,  // Chlorine (Cl) - gas
  0.00016,  // Argon (Ar) - gas
  0.00010,  // Potassium (K) - liquid metal
  0.001500, // Calcium (Ca) - solid
  0.001600, // Scandium (Sc) - solid
  0.001900, // Titanium (Ti) - solid
  0.001700, // Vanadium (V) - solid
  0.001600, // Chromium (Cr) - solid
  0.001700, // Manganese (Mn) - solid
  0.001600, // Iron (Fe) - solid
  0.002300, // Cobalt (Co) - solid
  0.002100, // Nickel (Ni) - solid
  0.001200, // Copper (Cu) - solid
  0.001200, // Zinc (Zn) - solid
  0.001500, // Gallium (Ga) - liquid metal
  0.001200, // Germanium (Ge) - solid
  0.001500, // Arsenic (As) - solid
  0.001000, // Selenium (Se) - solid
  0.001200, // Bromine (Br) - liquid
  0.00020,  // Krypton (Kr) - gas
  0.001300, // Rubidium (Rb) - liquid metal
  0.001200, // Strontium (Sr) - solid
  0.001300, // Yttrium (Y) - solid
  0.001100, // Zirconium (Zr) - solid
  0.001200, // Niobium (Nb) - solid
  0.001100, // Molybdenum (Mo) - solid
  0.001000, // Technetium (Tc) - solid
  0.001200, // Ruthenium (Ru) - solid
  0.001100, // Rhodium (Rh) - solid
  0.001200, // Palladium (Pd) - solid
  0.001500, // Silver (Ag) - solid
  0.001200, // Cadmium (Cd) - liquid metal
  0.001300, // Indium (In) - liquid metal
  0.001400, // Tin (Sn) - solid
  0.001200, // Antimony (Sb) - solid
  0.001100, // Tellurium (Te) - solid
  0.001100, // Iodine (I) - solid
  0.00021,  // Xenon (Xe) - gas
  0.001000, // Cesium (Cs) - liquid metal
  0.001200, // Barium (Ba) - solid
  0.001100, // Lanthanum (La) - solid
  0.001000, // Cerium (Ce) - solid
  0.001200, // Praseodymium (Pr) - solid
  0.001200, // Neodymium (Nd) - solid
  0.001200, // Promethium (Pm) - solid
  0.001200, // Samarium (Sm) - solid
  0.001100, // Europium (Eu) - solid
  0.001200, // Gadolinium (Gd) - solid
  0.001200, // Terbium (Tb) - solid
  0.001200, // Dysprosium (Dy) - solid
  0.001200, // Holmium (Ho) - solid
  0.001200, // Erbium (Er) - solid
  0.001200, // Thulium (Tm) - solid
  0.001200, // Ytterbium (Yb) - solid
  0.001200, // Lutetium (Lu) - solid
  0.001100, // Hafnium (Hf) - solid
  0.001100, // Tantalum (Ta) - solid
  0.001100, // Tungsten (W) - solid
  0.001200, // Rhenium (Re) - solid
  0.001200, // Osmium (Os) - solid
  0.001200, // Iridium (Ir) - solid
  0.001200, // Platinum (Pt) - solid
  0.001200, // Gold (Au) - solid
  0.001100, // Mercury (Hg) - liquid metal
  0.001300, // Thallium (Tl) - liquid metal
  0.001200, // Lead (Pb) - solid
  0.001200, // Bismuth (Bi) - solid
  0.001200, // Polonium (Po) - solid
  0.001200, // Astatine (At) - solid
  0.001200, // Radon (Rn) - gas
  0.001200, // Francium (Fr) - liquid metal
  0.001200, // Radium (Ra) - solid
  0.001200, // Actinium (Ac) - solid
  0.001200, // Thorium (Th) - solid
  0.001200, // Protactinium (Pa) - solid
  0.001200, // Uranium (U) - solid
  0.001200, // Neptunium (Np) - solid
  0.001200, // Plutonium (Pu) - solid
  0.001200, // Americium (Am) - solid
  0.001200, // Curium (Cm) - solid
  0.001200, // Berkelium (Bk) - solid
  0.001200, // Californium (Cf) - solid
  0.001200, // Einsteinium (Es) - solid
  0.001200, // Fermium (Fm) - solid
  0.001200, // Mendelevium (Md) - solid
  0.001200, // Nobelium (No) - solid
  0.001200, // Lawrencium (Lr) - solid
  0.001200, // Rutherfordium (Rf) - solid
  0.001200, // Dubnium (Db) - solid
  0.001200, // Seaborgium (Sg) - solid
  0.001200, // Bohrium (Bh) - solid
  0.001200, // Hassium (Hs) - solid
  0.001200, // Meitnerium (Mt) - solid
  0.001200, // Darmstadtium (Ds) - solid
  0.001200, // Roentgenium (Rg) - solid
  0.001200, // Copernicium (Cn) - solid
  0.001200, // Nihonium (Nh) - solid
  0.001200, // Flerovium (Fl) - solid
  0.001200, // Moscovium (Mc) - solid
  0.001200, // Livermorium (Lv) - solid
  0.001200  // Oganesson (Og) - solid
];
const prandtlNumber = [
  0.70, // Hydrogen (H) - gas
  0.67, // Helium (He) - gas
  0.43, // Lithium (Li) - liquid metal
  0.17, // Beryllium (Be) - solid
  0.80, // Boron (B) - solid
  0.70, // Carbon (C) - solid
  0.73, // Nitrogen (N) - gas
  0.71, // Oxygen (O) - gas
  0.72, // Fluorine (F) - gas
  0.69, // Neon (Ne) - gas
  0.29, // Sodium (Na) - liquid metal
  0.11, // Magnesium (Mg) - solid
  0.12, // Aluminium (Al) - solid
  0.12, // Silicon (Si) - solid
  0.16, // Phosphorus (P) - solid
  0.15, // Sulfur (S) - solid
  0.62, // Chlorine (Cl) - gas
  0.70, // Argon (Ar) - gas
  0.22, // Potassium (K) - liquid metal
  0.16, // Calcium (Ca) - solid
  0.15, // Scandium (Sc) - solid
  0.14, // Titanium (Ti) - solid
  0.13, // Vanadium (V) - solid
  0.13, // Chromium (Cr) - solid
  0.13, // Manganese (Mn) - solid
  0.14, // Iron (Fe) - solid
  0.13, // Cobalt (Co) - solid
  0.14, // Nickel (Ni) - solid
  0.12, // Copper (Cu) - solid
  0.11, // Zinc (Zn) - solid
  0.23, // Gallium (Ga) - liquid metal
  0.14, // Germanium (Ge) - solid
  0.16, // Arsenic (As) - solid
  0.20, // Selenium (Se) - solid
  0.09, // Bromine (Br) - liquid
  0.70, // Krypton (Kr) - gas
  0.18, // Rubidium (Rb) - liquid metal
  0.13, // Strontium (Sr) - solid
  0.13, // Yttrium (Y) - solid
  0.12, // Zirconium (Zr) - solid
  0.12, // Niobium (Nb) - solid
  0.12, // Molybdenum (Mo) - solid
  0.11, // Technetium (Tc) - solid
  0.12, // Ruthenium (Ru) - solid
  0.11, // Rhodium (Rh) - solid
  0.11, // Palladium (Pd) - solid
  0.11, // Silver (Ag) - solid
  0.12, // Cadmium (Cd) - liquid metal
  0.23, // Indium (In) - liquid metal
  0.12, // Tin (Sn) - solid
  0.12, // Antimony (Sb) - solid
  0.13, // Tellurium (Te) - solid
  0.13, // Iodine (I) - solid
  0.71, // Xenon (Xe) - gas
  0.18, // Cesium (Cs) - liquid metal
  0.13, // Barium (Ba) - solid
  0.12, // Lanthanum (La) - solid
  0.13, // Cerium (Ce) - solid
  0.14, // Praseodymium (Pr) - solid
  0.13, // Neodymium (Nd) - solid
  0.14, // Promethium (Pm) - solid
  0.12, // Samarium (Sm) - solid
  0.11, // Europium (Eu) - solid
  0.12, // Gadolinium (Gd) - solid
  0.12, // Terbium (Tb) - solid
  0.12, // Dysprosium (Dy) - solid
  0.12, // Holmium (Ho) - solid
  0.12, // Erbium (Er) - solid
  0.12, // Thulium (Tm) - solid
  0.12, // Ytterbium (Yb) - solid
  0.11, // Lutetium (Lu) - solid
  0.13, // Hafnium (Hf) - solid
  0.12, // Tantalum (Ta) - solid
  0.11, // Tungsten (W) - solid
  0.13, // Rhenium (Re) - solid
  0.13, // Osmium (Os) - solid
  0.13, // Iridium (Ir) - solid
  0.12, // Platinum (Pt) - solid
  0.12, // Gold (Au) - solid
  0.23, // Mercury (Hg) - liquid metal
  0.18, // Thallium (Tl) - liquid metal
  0.13, // Lead (Pb) - solid
  0.13, // Bismuth (Bi) - solid
  0.14, // Polonium (Po) - solid
  0.13, // Astatine (At) - solid
  0.70, // Radon (Rn) - gas
  0.18, // Francium (Fr) - liquid metal
  0.12, // Radium (Ra) - solid
  0.12, // Actinium (Ac) - solid
  0.12, // Thorium (Th) - solid
  0.12, // Protactinium (Pa) - solid
  0.12, // Uranium (U) - solid
  0.12, // Neptunium (Np) - solid
  0.12, // Plutonium (Pu) - solid
  0.12, // Americium (Am) - solid
  0.12, // Curium (Cm) - solid
  0.12, // Berkelium (Bk) - solid
  0.12, // Californium (Cf) - solid
  0.12, // Einsteinium (Es) - solid
  0.12, // Fermium (Fm) - solid
  0.12, // Mendelevium (Md) - solid
  0.12, // Nobelium (No) - solid
  0.12, // Lawrencium (Lr) - solid
  0.12, // Rutherfordium (Rf) - solid
  0.12, // Dubnium (Db) - solid
  0.12, // Seaborgium (Sg) - solid
  0.12, // Bohrium (Bh) - solid
  0.12, // Hassium (Hs) - solid
  0.12, // Meitnerium (Mt) - solid
  0.12, // Darmstadtium (Ds) - solid
  0.12, // Roentgenium (Rg) - solid
  0.12, // Copernicium (Cn) - solid
  0.12, // Nihonium (Nh) - solid
  0.12, // Flerovium (Fl) - solid
  0.12, // Moscovium (Mc) - solid
  0.12, // Livermorium (Lv) - solid
  0.12  // Oganesson (Og) - solid
];
const bulkModulus = [
  1.30e5, // Hydrogen (H) - gas
  2.29e5, // Helium (He) - gas
  4.5e10, // Lithium (Li) - solid
  3.5e10, // Beryllium (Be) - solid
  2.3e10, // Boron (B) - solid
  4.5e10, // Carbon (C) - solid
  1.6e10, // Nitrogen (N) - gas
  1.7e10, // Oxygen (O) - gas
  1.6e10, // Fluorine (F) - gas
  1.0e10, // Neon (Ne) - gas
  7.0e10, // Sodium (Na) - solid
  5.0e10, // Magnesium (Mg) - solid
  7.4e10, // Aluminium (Al) - solid
  8.0e10, // Silicon (Si) - solid
  7.2e10, // Phosphorus (P) - solid
  5.0e10, // Sulfur (S) - solid
  1.7e10, // Chlorine (Cl) - gas
  1.5e10, // Argon (Ar) - gas
  6.0e10, // Potassium (K) - solid
  5.0e10, // Calcium (Ca) - solid
  6.0e10, // Scandium (Sc) - solid
  5.0e10, // Titanium (Ti) - solid
  6.0e10, // Vanadium (V) - solid
  5.0e10, // Chromium (Cr) - solid
  6.0e10, // Manganese (Mn) - solid
  2.5e10, // Iron (Fe) - solid
  6.0e10, // Cobalt (Co) - solid
  2.5e10, // Nickel (Ni) - solid
  1.8e10, // Copper (Cu) - solid
  3.0e10, // Zinc (Zn) - solid
  5.0e10, // Gallium (Ga) - solid
  1.6e10, // Germanium (Ge) - solid
  1.4e10, // Arsenic (As) - solid
  1.2e10, // Selenium (Se) - solid
  5.0e10, // Bromine (Br) - liquid
  1.0e10, // Krypton (Kr) - gas
  4.0e10, // Rubidium (Rb) - solid
  6.0e10, // Strontium (Sr) - solid
  5.0e10, // Yttrium (Y) - solid
  4.0e10, // Zirconium (Zr) - solid
  4.5e10, // Niobium (Nb) - solid
  3.5e10, // Molybdenum (Mo) - solid
  4.5e10, // Technetium (Tc) - solid
  3.5e10, // Ruthenium (Ru) - solid
  3.0e10, // Rhodium (Rh) - solid
  3.5e10, // Palladium (Pd) - solid
  3.0e10, // Silver (Ag) - solid
  4.0e10, // Cadmium (Cd) - solid
  2.0e10, // Indium (In) - solid
  4.0e10, // Tin (Sn) - solid
  5.0e10, // Antimony (Sb) - solid
  4.5e10, // Tellurium (Te) - solid
  5.0e10, // Iodine (I) - solid
  1.0e10, // Xenon (Xe) - gas
  5.0e10, // Cesium (Cs) - solid
  6.0e10, // Barium (Ba) - solid
  4.5e10, // Lanthanum (La) - solid
  5.0e10, // Cerium (Ce) - solid
  4.5e10, // Praseodymium (Pr) - solid
  4.5e10, // Neodymium (Nd) - solid
  4.5e10, // Promethium (Pm) - solid
  4.5e10, // Samarium (Sm) - solid
  4.0e10, // Europium (Eu) - solid
  4.5e10, // Gadolinium (Gd) - solid
  4.0e10, // Terbium (Tb) - solid
  4.5e10, // Dysprosium (Dy) - solid
  4.0e10, // Holmium (Ho) - solid
  4.5e10, // Erbium (Er) - solid
  4.0e10, // Thulium (Tm) - solid
  4.0e10, // Ytterbium (Yb) - solid
  4.5e10, // Lutetium (Lu) - solid
  4.5e10, // Hafnium (Hf) - solid
  4.5e10, // Tantalum (Ta) - solid
  4.5e10, // Tungsten (W) - solid
  4.5e10, // Rhenium (Re) - solid
  4.0e10, // Osmium (Os) - solid
  4.0e10, // Iridium (Ir) - solid
  4.5e10, // Platinum (Pt) - solid
  4.5e10, // Gold (Au) - solid
  2.0e10, // Mercury (Hg) - liquid
  3.5e10, // Thallium (Tl) - solid
  4.0e10, // Lead (Pb) - solid
  4.0e10, // Bismuth (Bi) - solid
  4.5e10, // Polonium (Po) - solid
  3.0e10, // Astatine (At) - solid
  1.0e10, // Radon (Rn) - gas
  4.5e10, // Francium (Fr) - solid
  3.0e10, // Radium (Ra) - solid
  3.0e10, // Actinium (Ac) - solid
  3.5e10, // Thorium (Th) - solid
  3.0e10, // Protactinium (Pa) - solid
  3.5e10, // Uranium (U) - solid
  3.5e10, // Neptunium (Np) - solid
  3.5e10, // Plutonium (Pu) - solid
  3.5e10, // Americium (Am) - solid
  3.5e10, // Curium (Cm) - solid
  3.5e10, // Berkelium (Bk) - solid
  3.5e10, // Californium (Cf) - solid
  3.5e10, // Einsteinium (Es) - solid
  3.5e10, // Fermium (Fm) - solid
  3.5e10, // Mendelevium (Md) - solid
  3.5e10, // Nobelium (No) - solid
  3.5e10, // Lawrencium (Lr) - solid
  3.5e10, // Rutherfordium (Rf) - solid
  3.5e10, // Dubnium (Db) - solid
  3.5e10, // Seaborgium (Sg) - solid
  3.5e10, // Bohrium (Bh) - solid
  3.5e10, // Hassium (Hs) - solid
  3.5e10, // Meitnerium (Mt) - solid
  3.5e10, // Darmstadtium (Ds) - solid
  3.5e10, // Roentgenium (Rg) - solid
  3.5e10, // Copernicium (Cn) - solid
  3.5e10, // Nihonium (Nh) - solid
  3.5e10, // Flerovium (Fl) - solid
  3.5e10, // Moscovium (Mc) - solid
  3.5e10, // Livermorium (Lv) - solid
  3.5e10, // Tennessine (Ts) - solid
  3.5e10, // Oganesson (Og) - solid
];
const shearModulus = [
  1.50e4, // Hydrogen (H) - gas
  1.00e4, // Helium (He) - gas
  1.00e10, // Lithium (Li) - solid
  1.40e10, // Beryllium (Be) - solid
  3.2e10, // Boron (B) - solid
  2.0e10, // Carbon (C) - solid
  1.00e10, // Nitrogen (N) - gas
  1.00e10, // Oxygen (O) - gas
  1.00e10, // Fluorine (F) - gas
  1.00e10, // Neon (Ne) - gas
  2.6e10, // Sodium (Na) - solid
  1.6e10, // Magnesium (Mg) - solid
  2.7e10, // Aluminium (Al) - solid
  1.0e10, // Silicon (Si) - solid
  2.6e10, // Phosphorus (P) - solid
  2.0e10, // Sulfur (S) - solid
  1.00e10, // Chlorine (Cl) - gas
  1.00e10, // Argon (Ar) - gas
  1.5e10, // Potassium (K) - solid
  1.7e10, // Calcium (Ca) - solid
  1.8e10, // Scandium (Sc) - solid
  2.1e10, // Titanium (Ti) - solid
  2.0e10, // Vanadium (V) - solid
  1.8e10, // Chromium (Cr) - solid
  2.0e10, // Manganese (Mn) - solid
  1.8e10, // Iron (Fe) - solid
  2.2e10, // Cobalt (Co) - solid
  1.7e10, // Nickel (Ni) - solid
  1.4e10, // Copper (Cu) - solid
  1.5e10, // Zinc (Zn) - solid
  1.4e10, // Gallium (Ga) - solid
  1.2e10, // Germanium (Ge) - solid
  1.2e10, // Arsenic (As) - solid
  1.2e10, // Selenium (Se) - solid
  1.00e10, // Bromine (Br) - liquid
  1.0e10, // Krypton (Kr) - gas
  1.6e10, // Rubidium (Rb) - solid
  1.7e10, // Strontium (Sr) - solid
  1.9e10, // Yttrium (Y) - solid
  1.7e10, // Zirconium (Zr) - solid
  1.9e10, // Niobium (Nb) - solid
  2.0e10, // Molybdenum (Mo) - solid
  2.0e10, // Technetium (Tc) - solid
  2.0e10, // Ruthenium (Ru) - solid
  2.0e10, // Rhodium (Rh) - solid
  2.1e10, // Palladium (Pd) - solid
  2.0e10, // Silver (Ag) - solid
  1.8e10, // Cadmium (Cd) - solid
  1.5e10, // Indium (In) - solid
  1.6e10, // Tin (Sn) - solid
  1.4e10, // Antimony (Sb) - solid
  1.6e10, // Tellurium (Te) - solid
  1.4e10, // Iodine (I) - solid
  1.0e10, // Xenon (Xe) - gas
  1.6e10, // Cesium (Cs) - solid
  1.8e10, // Barium (Ba) - solid
  1.8e10, // Lanthanum (La) - solid
  1.8e10, // Cerium (Ce) - solid
  1.8e10, // Praseodymium (Pr) - solid
  1.8e10, // Neodymium (Nd) - solid
  1.8e10, // Promethium (Pm) - solid
  1.8e10, // Samarium (Sm) - solid
  1.8e10, // Europium (Eu) - solid
  1.8e10, // Gadolinium (Gd) - solid
  1.8e10, // Terbium (Tb) - solid
  1.8e10, // Dysprosium (Dy) - solid
  1.8e10, // Holmium (Ho) - solid
  1.8e10, // Erbium (Er) - solid
  1.8e10, // Thulium (Tm) - solid
  1.8e10, // Ytterbium (Yb) - solid
  1.8e10, // Lutetium (Lu) - solid
  1.8e10, // Hafnium (Hf) - solid
  1.8e10, // Tantalum (Ta) - solid
  1.8e10, // Tungsten (W) - solid
  1.8e10, // Rhenium (Re) - solid
  1.8e10, // Osmium (Os) - solid
  1.8e10, // Iridium (Ir) - solid
  1.8e10, // Platinum (Pt) - solid
  1.8e10, // Gold (Au) - solid
  1.0e10, // Mercury (Hg) - liquid
  1.5e10, // Thallium (Tl) - solid
  1.8e10, // Lead (Pb) - solid
  1.8e10, // Bismuth (Bi) - solid
  1.8e10, // Polonium (Po) - solid
  1.0e10, // Astatine (At) - solid
  1.0e10, // Radon (Rn) - gas
  1.8e10, // Francium (Fr) - solid
  1.8e10, // Radium (Ra) - solid
  1.8e10, // Actinium (Ac) - solid
  1.8e10, // Thorium (Th) - solid
  1.8e10, // Protactinium (Pa) - solid
  1.8e10, // Uranium (U) - solid
  1.8e10, // Neptunium (Np) - solid
  1.8e10, // Plutonium (Pu) - solid
  1.8e10, // Americium (Am) - solid
  1.8e10, // Curium (Cm) - solid
  1.8e10, // Berkelium (Bk) - solid
  1.8e10, // Californium (Cf) - solid
  1.8e10, // Einsteinium (Es) - solid
  1.8e10, // Fermium (Fm) - solid
  1.8e10, // Mendelevium (Md) - solid
  1.8e10, // Nobelium (No) - solid
  1.8e10, // Lawrencium (Lr) - solid
  1.8e10, // Rutherfordium (Rf) - solid
  1.8e10, // Dubnium (Db) - solid
  1.8e10, // Seaborgium (Sg) - solid
  1.8e10, // Bohrium (Bh) - solid
  1.8e10, // Hassium (Hs) - solid
  1.8e10, // Meitnerium (Mt) - solid
  1.8e10, // Darmstadtium (Ds) - solid
  1.8e10, // Roentgenium (Rg) - solid
  1.8e10, // Copernicium (Cn) - solid
  1.8e10, // Nihonium (Nh) - solid
  1.8e10, // Flerovium (Fl) - solid
  1.8e10, // Moscovium (Mc) - solid
  1.8e10, // Livermorium (Lv) - solid
  1.8e10, // Tennessine (Ts) - solid
  1.8e10, // Oganesson (Og) - solid
];
const youngsModulus = [
  1.00e-5, // Hydrogen (H) - gas
  1.00e-5, // Helium (He) - gas
  2.00e10, // Lithium (Li) - solid
  3.00e10, // Beryllium (Be) - solid
  4.00e10, // Boron (B) - solid
  1.00e11, // Carbon (C) - solid
  1.00e-5, // Nitrogen (N) - gas
  1.00e-5, // Oxygen (O) - gas
  1.00e-5, // Fluorine (F) - gas
  1.00e-5, // Neon (Ne) - gas
  1.00e10, // Sodium (Na) - solid
  4.00e10, // Magnesium (Mg) - solid
  7.00e10, // Aluminium (Al) - solid
  1.00e11, // Silicon (Si) - solid
  2.00e10, // Phosphorus (P) - solid
  3.00e10, // Sulfur (S) - solid
  1.00e-5, // Chlorine (Cl) - gas
  1.00e-5, // Argon (Ar) - gas
  1.00e10, // Potassium (K) - solid
  2.00e10, // Calcium (Ca) - solid
  2.50e10, // Scandium (Sc) - solid
  1.00e11, // Titanium (Ti) - solid
  2.00e10, // Vanadium (V) - solid
  2.50e10, // Chromium (Cr) - solid
  2.50e10, // Manganese (Mn) - solid
  2.50e10, // Iron (Fe) - solid
  2.00e10, // Cobalt (Co) - solid
  2.00e10, // Nickel (Ni) - solid
  1.50e10, // Copper (Cu) - solid
  1.00e10, // Zinc (Zn) - solid
  1.00e10, // Gallium (Ga) - solid
  1.00e10, // Germanium (Ge) - solid
  1.00e10, // Arsenic (As) - solid
  1.00e10, // Selenium (Se) - solid
  1.00e-5, // Bromine (Br) - liquid
  1.00e-5, // Krypton (Kr) - gas
  1.00e10, // Rubidium (Rb) - solid
  2.00e10, // Strontium (Sr) - solid
  3.00e10, // Yttrium (Y) - solid
  2.50e10, // Zirconium (Zr) - solid
  3.00e10, // Niobium (Nb) - solid
  4.00e10, // Molybdenum (Mo) - solid
  4.00e10, // Technetium (Tc) - solid
  4.00e10, // Ruthenium (Ru) - solid
  4.00e10, // Rhodium (Rh) - solid
  4.00e10, // Palladium (Pd) - solid
  3.00e10, // Silver (Ag) - solid
  2.00e10, // Cadmium (Cd) - solid
  2.00e10, // Indium (In) - solid
  2.00e10, // Tin (Sn) - solid
  2.00e10, // Antimony (Sb) - solid
  2.00e10, // Tellurium (Te) - solid
  2.00e10, // Iodine (I) - solid
  1.00e-5, // Xenon (Xe) - gas
  2.00e10, // Cesium (Cs) - solid
  2.00e10, // Barium (Ba) - solid
  2.00e10, // Lanthanum (La) - solid
  2.00e10, // Cerium (Ce) - solid
  2.00e10, // Praseodymium (Pr) - solid
  2.00e10, // Neodymium (Nd) - solid
  2.00e10, // Promethium (Pm) - solid
  2.00e10, // Samarium (Sm) - solid
  2.00e10, // Europium (Eu) - solid
  2.00e10, // Gadolinium (Gd) - solid
  2.00e10, // Terbium (Tb) - solid
  2.00e10, // Dysprosium (Dy) - solid
  2.00e10, // Holmium (Ho) - solid
  2.00e10, // Erbium (Er) - solid
  2.00e10, // Thulium (Tm) - solid
  2.00e10, // Ytterbium (Yb) - solid
  2.00e10, // Lutetium (Lu) - solid
  2.00e10, // Hafnium (Hf) - solid
  2.00e10, // Tantalum (Ta) - solid
  2.00e10, // Tungsten (W) - solid
  2.00e10, // Rhenium (Re) - solid
  2.00e10, // Osmium (Os) - solid
  2.00e10, // Iridium (Ir) - solid
  2.00e10, // Platinum (Pt) - solid
  2.00e10, // Gold (Au) - solid
  1.00e-5, // Mercury (Hg) - liquid
  2.00e10, // Thallium (Tl) - solid
  2.00e10, // Lead (Pb) - solid
  2.00e10, // Bismuth (Bi) - solid
  2.00e10, // Polonium (Po) - solid
  1.00e10, // Astatine (At) - solid
  1.00e-5, // Radon (Rn) - gas
  2.00e10, // Francium (Fr) - solid
  2.00e10, // Radium (Ra) - solid
  2.00e10, // Actinium (Ac) - solid
  2.00e10, // Thorium (Th) - solid
  2.00e10, // Protactinium (Pa) - solid
  2.00e10, // Uranium (U) - solid
  2.00e10, // Neptunium (Np) - solid
  2.00e10, // Plutonium (Pu) - solid
  2.00e10, // Americium (Am) - solid
  2.00e10, // Curium (Cm) - solid
  2.00e10, // Berkelium (Bk) - solid
  2.00e10, // Californium (Cf) - solid
  2.00e10, // Einsteinium (Es) - solid
  2.00e10, // Fermium (Fm) - solid
  2.00e10, // Mendelevium (Md) - solid
  2.00e10, // Nobelium (No) - solid
  2.00e10, // Lawrencium (Lr) - solid
  2.00e10, // Rutherfordium (Rf) - solid
  2.00e10, // Dubnium (Db) - solid
  2.00e10, // Seaborgium (Sg) - solid
  2.00e10, // Bohrium (Bh) - solid
  2.00e10, // Hassium (Hs) - solid
  2.00e10, // Meitnerium (Mt) - solid
  2.00e10, // Darmstadtium (Ds) - solid
  2.00e10, // Roentgenium (Rg) - solid
  2.00e10, // Copernicium (Cn) - solid
  2.00e10, // Nihonium (Nh) - solid
  2.00e10, // Flerovium (Fl) - solid
  2.00e10, // Moscovium (Mc) - solid
  2.00e10, // Livermorium (Lv) - solid
  2.00e10, // Tennessine (Ts) - solid
  2.00e10, // Oganesson (Og) - solid
];
const specificHeatCapacity = [
  14100, // Hydrogen (H) - gas
  5193,  // Helium (He) - gas
  3580,  // Lithium (Li) - solid
  1970,  // Beryllium (Be) - solid
  802,   // Boron (B) - solid
  710,   // Carbon (C) - solid
  1030,  // Nitrogen (N) - gas
  918,   // Oxygen (O) - gas
  740,   // Fluorine (F) - gas
  1040,  // Neon (Ne) - gas
  1250,  // Sodium (Na) - solid
  1020,  // Magnesium (Mg) - solid
  897,   // Aluminium (Al) - solid
  703,   // Silicon (Si) - solid
  770,   // Phosphorus (P) - solid
  712,   // Sulfur (S) - solid
  477,   // Chlorine (Cl) - gas
  520,   // Argon (Ar) - gas
  1000,  // Potassium (K) - solid
  384,   // Calcium (Ca) - solid
  540,   // Scandium (Sc) - solid
  521,   // Titanium (Ti) - solid
  420,   // Vanadium (V) - solid
  450,   // Chromium (Cr) - solid
  480,   // Manganese (Mn) - solid
  450,   // Iron (Fe) - solid
  420,   // Cobalt (Co) - solid
  445,   // Nickel (Ni) - solid
  385,   // Copper (Cu) - solid
  388,   // Zinc (Zn) - solid
  379,   // Gallium (Ga) - solid
  320,   // Germanium (Ge) - solid
  330,   // Arsenic (As) - solid
  320,   // Selenium (Se) - solid
  240,   // Bromine (Br) - liquid
  156,   // Krypton (Kr) - gas
  296,   // Rubidium (Rb) - solid
  253,   // Strontium (Sr) - solid
  287,   // Yttrium (Y) - solid
  234,   // Zirconium (Zr) - solid
  140,   // Niobium (Nb) - solid
  150,   // Molybdenum (Mo) - solid
  190,   // Technetium (Tc) - solid
  196,   // Ruthenium (Ru) - solid
  165,   // Rhodium (Rh) - solid
  245,   // Palladium (Pd) - solid
  256,   // Silver (Ag) - solid
  231,   // Cadmium (Cd) - solid
  234,   // Indium (In) - solid
  231,   // Tin (Sn) - solid
  206,   // Antimony (Sb) - solid
  240,   // Tellurium (Te) - solid
  207,   // Iodine (I) - solid
  159,   // Xenon (Xe) - gas
  242,   // Cesium (Cs) - solid
  280,   // Barium (Ba) - solid
  214,   // Lanthanum (La) - solid
  228,   // Cerium (Ce) - solid
  253,   // Praseodymium (Pr) - solid
  254,   // Neodymium (Nd) - solid
  232,   // Promethium (Pm) - solid
  217,   // Samarium (Sm) - solid
  195,   // Europium (Eu) - solid
  204,   // Gadolinium (Gd) - solid
  173,   // Terbium (Tb) - solid
  168,   // Dysprosium (Dy) - solid
  155,   // Holmium (Ho) - solid
  150,   // Erbium (Er) - solid
  148,   // Thulium (Tm) - solid
  138,   // Ytterbium (Yb) - solid
  140,   // Lutetium (Lu) - solid
  152,   // Hafnium (Hf) - solid
  142,   // Tantalum (Ta) - solid
  142,   // Tungsten (W) - solid
  125,   // Rhenium (Re) - solid
  130,   // Osmium (Os) - solid
  133,   // Iridium (Ir) - solid
  133,   // Platinum (Pt) - solid
  129,   // Gold (Au) - solid
  140,   // Mercury (Hg) - liquid
  128,   // Thallium (Tl) - solid
  128,   // Lead (Pb) - solid
  128,   // Bismuth (Bi) - solid
  128,   // Polonium (Po) - solid
  140,   // Astatine (At) - solid
  125,   // Radon (Rn) - gas
  128,   // Francium (Fr) - solid
  130,   // Radium (Ra) - solid
  130,   // Actinium (Ac) - solid
  130,   // Thorium (Th) - solid
  130,   // Protactinium (Pa) - solid
  130,   // Uranium (U) - solid
  130,   // Neptunium (Np) - solid
  130,   // Plutonium (Pu) - solid
  130,   // Americium (Am) - solid
  130,   // Curium (Cm) - solid
  130,   // Berkelium (Bk) - solid
  130,   // Californium (Cf) - solid
  130,   // Einsteinium (Es) - solid
  130,   // Fermium (Fm) - solid
  130,   // Mendelevium (Md) - solid
  130,   // Nobelium (No) - solid
  130,   // Lawrencium (Lr) - solid
  130,   // Rutherfordium (Rf) - solid
  130,   // Dubnium (Db) - solid
  130,   // Seaborgium (Sg) - solid
  130,   // Bohrium (Bh) - solid
  130,   // Hassium (Hs) - solid
  130,   // Meitnerium (Mt) - solid
  130,   // Darmstadtium (Ds) - solid
  130,   // Roentgenium (Rg) - solid
  130,   // Copernicium (Cn) - solid
  130,   // Nihonium (Nh) - solid
  130,   // Flerovium (Fl) - solid
  130,   // Moscovium (Mc) - solid
  130,   // Livermorium (Lv) - solid
  130,   // Tennessine (Ts) - solid
  130,   // Oganesson (Og) - solid
];
const thermalExpansionCoefficient = [
  1.00e-5, // Hydrogen (H) - gas
  1.00e-5, // Helium (He) - gas
  2.50e-5, // Lithium (Li) - solid
  1.50e-5, // Beryllium (Be) - solid
  1.00e-5, // Boron (B) - solid
  3.00e-6, // Carbon (C) - solid
  1.00e-5, // Nitrogen (N) - gas
  1.00e-5, // Oxygen (O) - gas
  1.00e-5, // Fluorine (F) - gas
  1.00e-5, // Neon (Ne) - gas
  2.50e-5, // Sodium (Na) - solid
  2.00e-5, // Magnesium (Mg) - solid
  2.30e-5, // Aluminium (Al) - solid
  3.00e-6, // Silicon (Si) - solid
  3.50e-5, // Phosphorus (P) - solid
   2.00e-5, // Sulfur (S) - solid
   1.00e-5, // Chlorine (Cl) - gas
   1.00e-5, // Argon (Ar) - gas
   3.00e-5, // Potassium (K) - solid
   2.00e-5, // Calcium (Ca) - solid
   2.00e-5, // Scandium (Sc) - solid
   1.00e-5, // Titanium (Ti) - solid
   1.50e-5, // Vanadium (V) - solid
   1.50e-5, // Chromium (Cr) - solid
   2.00e-5, // Manganese (Mn) - solid
   1.50e-5, // Iron (Fe) - solid
   1.00e-5, // Cobalt (Co) - solid
   1.00e-5, // Nickel (Ni) - solid
   1.50e-5, // Copper (Cu) - solid
   2.00e-5, // Zinc (Zn) - solid
   1.00e-5, // Gallium (Ga) - solid
   1.00e-5, // Germanium (Ge) - solid
   1.00e-5, // Arsenic (As) - solid
   1.00e-5, // Selenium (Se) - solid
   1.00e-5, // Bromine (Br) - liquid
   1.00e-5, // Krypton (Kr) - gas
   2.00e-5, // Rubidium (Rb) - solid
   1.50e-5, // Strontium (Sr) - solid
   1.00e-5, // Yttrium (Y) - solid
   1.00e-5, // Zirconium (Zr) - solid
   1.00e-5, // Niobium (Nb) - solid
   1.00e-5, // Molybdenum (Mo) - solid
   1.00e-5, // Technetium (Tc) - solid
   1.00e-5, // Ruthenium (Ru) - solid
   1.00e-5, // Rhodium (Rh) - solid
   1.00e-5, // Palladium (Pd) - solid
   1.00e-5, // Silver (Ag) - solid
   1.00e-5, // Cadmium (Cd) - solid
   1.00e-5, // Indium (In) - solid
   1.00e-5, // Tin (Sn) - solid
   1.00e-5, // Antimony (Sb) - solid
   1.00e-5, // Tellurium (Te) - solid
   1.00e-5, // Iodine (I) - solid
   1.00e-5, // Xenon (Xe) - gas
   1.00e-5, // Cesium (Cs) - solid
   1.00e-5, // Barium (Ba) - solid
   1.00e-5, // Lanthanum (La) - solid
   1.00e-5, // Cerium (Ce) - solid
   1.00e-5, // Praseodymium (Pr) - solid
   1.00e-5, // Neodymium (Nd) - solid
   1.00e-5, // Promethium (Pm) - solid
   1.00e-5, // Samarium (Sm) - solid
   1.00e-5, // Europium (Eu) - solid
   1.00e-5, // Gadolinium (Gd) - solid
   1.00e-5, // Terbium (Tb) - solid
   1.00e-5, // Dysprosium (Dy) - solid
   1.00e-5, // Holmium (Ho) - solid
   1.00e-5, // Erbium (Er) - solid
   1.00e-5, // Thulium (Tm) - solid
   1.00e-5, // Ytterbium (Yb) - solid
   1.00e-5, // Lutetium (Lu) - solid
   1.00e-5, // Hafnium (Hf) - solid
   1.00e-5, // Tantalum (Ta) - solid
   1.00e-5, // Tungsten (W) - solid
   1.00e-5, // Rhenium (Re) - solid
   1.00e-5, // Osmium (Os) - solid
   1.00e-5, // Iridium (Ir) - solid
   1.00e-5, // Platinum (Pt) - solid
   1.00e-5, // Gold (Au) - solid
   1.00e-5, // Mercury (Hg) - liquid
   1.00e-5, // Thallium (Tl) - solid
   1.00e-5, // Lead (Pb) - solid
   1.00e-5, // Bismuth (Bi) - solid
   1.00e-5, // Polonium (Po) - solid
   1.00e-5, // Astatine (At) - solid
   1.00e-5, // Radon (Rn) - gas
   1.00e-5, // Francium (Fr) - solid
   1.00e-5, // Radium (Ra) - solid
   1.00e-5, // Actinium (Ac) - solid
   1.00e-5, // Thorium (Th) - solid
   1.00e-5, // Protactinium (Pa) - solid
   1.00e-5, // Uranium (U) - solid
   1.00e-5, // Neptunium (Np) - solid
   1.00e-5, // Plutonium (Pu) - solid
   1.00e-5, // Americium (Am) - solid
   1.00e-5, // Curium (Cm) - solid
   1.00e-5, // Berkelium (Bk) - solid
   1.00e-5, // Californium (Cf) - solid
   1.00e-5, // Einsteinium (Es) - solid
   1.00e-5, // Fermium (Fm) - solid
   1.00e-5, // Mendelevium (Md) - solid
   1.00e-5, // Nobelium (No) - solid
   1.00e-5, // Lawrencium (Lr) - solid
   1.00e-5, // Rutherfordium (Rf) - solid
   1.00e-5, // Dubnium (Db) - solid
   1.00e-5, // Seaborgium (Sg) - solid
   1.00e-5, // Bohrium (Bh) - solid
   1.00e-5, // Hassium (Hs) - solid
   1.00e-5, // Meitnerium (Mt) - solid
   1.00e-5, // Darmstadtium (Ds) - solid
   1.00e-5, // Roentgenium (Rg) - solid
   1.00e-5, // Copernicium (Cn) - solid
   1.00e-5, // Nihonium (Nh) - solid
   1.00e-5, // Flerovium (Fl) - solid
   1.00e-5, // Moscovium (Mc) - solid
   1.00e-5, // Livermorium (Lv) - solid
   1.00e-5, // Tennessine (Ts) - solid
   1.00e-5, // Oganesson (Og) - solid
];
const soundVelocity = [
  1270,  // Hydrogen (H) - gas
  1250,  // Helium (He) - gas
  1320,  // Lithium (Li) - solid
  1280,  // Beryllium (Be) - solid
  2700,  // Boron (B) - solid
  2600,  // Carbon (C) - solid
  334,   // Nitrogen (N) - gas
  317,   // Oxygen (O) - gas
  1500,  // Fluorine (F) - gas
  2900,  // Neon (Ne) - gas
  8000,  // Sodium (Na) - solid
  2200,  // Magnesium (Mg) - solid
  11800, // Aluminum (Al) - solid
  5200,  // Silicon (Si) - solid
  4400,  // Phosphorus (P) - solid
  1400,  // Sulfur (S) - solid
  2000,  // Chlorine (Cl) - gas
  1500,  // Argon (Ar) - gas
  2500,  // Potassium (K) - solid
  1700,  // Calcium (Ca) - solid
  2800,  // Scandium (Sc) - solid
  2000,  // Titanium (Ti) - solid
  12000, // Vanadium (V) - solid
  6200,  // Chromium (Cr) - solid
  3700,  // Manganese (Mn) - solid
  5200,  // Iron (Fe) - solid
  5000,  // Cobalt (Co) - solid
  6000,  // Nickel (Ni) - solid
  4300,  // Copper (Cu) - solid
  2400,  // Zinc (Zn) - solid
  1500,  // Gallium (Ga) - solid
  5600,  // Germanium (Ge) - solid
  4000,  // Arsenic (As) - solid
  2100,  // Selenium (Se) - solid
  1550,  // Bromine (Br) - liquid
  1250,  // Krypton (Kr) - gas
  2000,  // Rubidium (Rb) - solid
  2500,  // Strontium (Sr) - solid
  1700,  // Yttrium (Y) - solid
  2700,  // Zirconium (Zr) - solid
  5000,  // Niobium (Nb) - solid
  6300,  // Molybdenum (Mo) - solid
  5000,  // Technetium (Tc) - solid
  5000,  // Ruthenium (Ru) - solid
  6000,  // Rhodium (Rh) - solid
  5500,  // Palladium (Pd) - solid
  4500,  // Silver (Ag) - solid
  3500,  // Cadmium (Cd) - solid
  4500,  // Indium (In) - solid
  3000,  // Tin (Sn) - solid
  4700,  // Antimony (Sb) - solid
  4100,  // Tellurium (Te) - solid
  2900,  // Iodine (I) - solid
  1300,  // Xenon (Xe) - gas
  2000,  // Cesium (Cs) - solid
  2000,  // Barium (Ba) - solid
  1800,  // Lanthanum (La) - solid
  1700,  // Cerium (Ce) - solid
  1600,  // Praseodymium (Pr) - solid
  1600,  // Neodymium (Nd) - solid
  1500,  // Promethium (Pm) - solid
  1500,  // Samarium (Sm) - solid
  1600,  // Europium (Eu) - solid
  1700,  // Gadolinium (Gd) - solid
  1600,  // Terbium (Tb) - solid
  1600,  // Dysprosium (Dy) - solid
  1500,  // Holmium (Ho) - solid
  1500,  // Erbium (Er) - solid
  1500,  // Thulium (Tm) - solid
  1500,  // Ytterbium (Yb) - solid
  1500,  // Lutetium (Lu) - solid
  1300,  // Hafnium (Hf) - solid
  1400,  // Tantalum (Ta) - solid
  2000,  // Tungsten (W) - solid
  1400,  // Rhenium (Re) - solid
  1300,  // Osmium (Os) - solid
  1200,  // Iridium (Ir) - solid
  1500,  // Platinum (Pt) - solid
  1350,  // Gold (Au) - solid
  1000,  // Mercury (Hg) - liquid
  1400,  // Thallium (Tl) - solid
  1600,  // Lead (Pb) - solid
  1300,  // Bismuth (Bi) - solid
  1500,  // Polonium (Po) - solid
  1500,  // Astatine (At) - solid
  1300,  // Radon (Rn) - gas
  1000,  // Francium (Fr) - solid
  1400,  // Radium (Ra) - solid
  1500,  // Actinium (Ac) - solid
  1600,  // Thorium (Th) - solid
  1600,  // Protactinium (Pa) - solid
  1800,  // Uranium (U) - solid
  1600,  // Neptunium (Np) - solid
  1600,  // Plutonium (Pu) - solid
  1600,  // Americium (Am) - solid
  1600,  // Curium (Cm) - solid
  1600,  // Berkelium (Bk) - solid
  1600,  // Californium (Cf) - solid
  1600,  // Einsteinium (Es) - solid
  1600,  // Fermium (Fm) - solid
  1600,  // Mendelevium (Md) - solid
  1600,  // Nobelium (No) - solid
  1600,  // Lawrencium (Lr) - solid
  1600,  // Rutherfordium (Rf) - solid
  1600,  // Dubnium (Db) - solid
  1600,  // Seaborgium (Sg) - solid
  1600,  // Bohrium (Bh) - solid
  1600,  // Hassium (Hs) - solid
  1600,  // Meitnerium (Mt) - solid
  1600,  // Darmstadtium (Ds) - solid
  1600,  // Roentgenium (Rg) - solid
  1600,  // Copernicium (Cn) - solid
  1600,  // Nihonium (Nh) - solid
  1600,  // Flerovium (Fl) - solid
  1600,  // Moscovium (Mc) - solid
  1600,  // Livermorium (Lv) - solid
  1600,  // Tennessine (Ts) - solid
  1600,  // Oganesson (Og) - solid
];
const absorptionCoefficient = [
  1.5,   // Hydrogen (H) - gas
  1.2,   // Helium (He) - gas
  0.9,   // Lithium (Li) - solid
  0.7,   // Beryllium (Be) - solid
  0.5,   // Boron (B) - solid
  0.4,   // Carbon (C) - solid
  2.0,   // Nitrogen (N) - gas
  1.8,   // Oxygen (O) - gas
  1.5,   // Fluorine (F) - gas
  0.8,   // Neon (Ne) - gas
  0.6,   // Sodium (Na) - solid
  1.2,   // Magnesium (Mg) - solid
  0.5,   // Aluminum (Al) - solid
  0.4,   // Silicon (Si) - solid
  0.6,   // Phosphorus (P) - solid
  0.7,   // Sulfur (S) - solid
  1.0,   // Chlorine (Cl) - gas
  0.8,   // Argon (Ar) - gas
  0.9,   // Potassium (K) - solid
  1.1,   // Calcium (Ca) - solid
  0.6,   // Scandium (Sc) - solid
  1.0,   // Titanium (Ti) - solid
  0.4,   // Vanadium (V) - solid
  0.5,   // Chromium (Cr) - solid
  0.7,   // Manganese (Mn) - solid
  0.6,   // Iron (Fe) - solid
  0.5,   // Cobalt (Co) - solid
  0.6,   // Nickel (Ni) - solid
  0.7,   // Copper (Cu) - solid
  1.0,   // Zinc (Zn) - solid
  0.6,   // Gallium (Ga) - solid
  0.5,   // Germanium (Ge) - solid
  0.7,   // Arsenic (As) - solid
  1.0,   // Selenium (Se) - solid
  1.2,   // Bromine (Br) - liquid
  1.0,   // Krypton (Kr) - gas
  0.8,   // Rubidium (Rb) - solid
  0.7,   // Strontium (Sr) - solid
  1.1,   // Yttrium (Y) - solid
  0.8,   // Zirconium (Zr) - solid
  0.5,   // Niobium (Nb) - solid
  0.4,   // Molybdenum (Mo) - solid
  0.5,   // Technetium (Tc) - solid
  0.4,   // Ruthenium (Ru) - solid
  0.3,   // Rhodium (Rh) - solid
  0.4,   // Palladium (Pd) - solid
  0.5,   // Silver (Ag) - solid
  0.6,   // Cadmium (Cd) - solid
  0.5,   // Indium (In) - solid
  0.4,   // Tin (Sn) - solid
  0.6,   // Antimony (Sb) - solid
  0.5,   // Tellurium (Te) - solid
  0.7,   // Iodine (I) - solid
  0.8,   // Xenon (Xe) - gas
  0.7,   // Cesium (Cs) - solid
  0.6,   // Barium (Ba) - solid
  0.8,   // Lanthanum (La) - solid
  0.7,   // Cerium (Ce) - solid
  0.6,   // Praseodymium (Pr) - solid
  0.7,   // Neodymium (Nd) - solid
  0.8,   // Promethium (Pm) - solid
  0.9,   // Samarium (Sm) - solid
  0.8,   // Europium (Eu) - solid
  0.7,   // Gadolinium (Gd) - solid
  0.6,   // Terbium (Tb) - solid
  0.6,   // Dysprosium (Dy) - solid
  0.7,   // Holmium (Ho) - solid
  0.8,   // Erbium (Er) - solid
  0.8,   // Thulium (Tm) - solid
  0.8,   // Ytterbium (Yb) - solid
  0.8,   // Lutetium (Lu) - solid
  0.7,   // Hafnium (Hf) - solid
  0.8,   // Tantalum (Ta) - solid
  0.6,   // Tungsten (W) - solid
  0.8,   // Rhenium (Re) - solid
  0.7,   // Osmium (Os) - solid
  0.6,   // Iridium (Ir) - solid
  0.5,   // Platinum (Pt) - solid
  0.7,   // Gold (Au) - solid
  0.9,   // Mercury (Hg) - liquid
  0.8,   // Thallium (Tl) - solid
  0.7,   // Lead (Pb) - solid
  0.8,   // Bismuth (Bi) - solid
  0.7,   // Polonium (Po) - solid
  0.8,   // Astatine (At) - solid
  0.6,   // Radon (Rn) - gas
  0.9,   // Francium (Fr) - solid
  0.8,   // Radium (Ra) - solid
  0.8,   // Actinium (Ac) - solid
  0.7,   // Thorium (Th) - solid
  0.6,   // Protactinium (Pa) - solid
  0.8,   // Uranium (U) - solid
  0.7,   // Neptunium (Np) - solid
  0.6,   // Plutonium (Pu) - solid
  0.6,   // Americium (Am) - solid
  0.6,   // Curium (Cm) - solid
  0.6,   // Berkelium (Bk) - solid
  0.6,   // Californium (Cf) - solid
  0.6,   // Einsteinium (Es) - solid
  0.6,   // Fermium (Fm) - solid
  0.6,   // Mendelevium (Md) - solid
  0.6,   // Nobelium (No) - solid
  0.6,   // Lawrencium (Lr) - solid
  0.6,   // Rutherfordium (Rf) - solid
  0.6,   // Dubnium (Db) - solid
  0.6,   // Seaborgium (Sg) - solid
  0.6,   // Bohrium (Bh) - solid
  0.6,   // Hassium (Hs) - solid
  0.6,   // Meitnerium (Mt) - solid
  0.6,   // Darmstadtium (Ds) - solid
  0.6,   // Roentgenium (Rg) - solid
  0.6,   // Copernicium (Cn) - solid
  0.6,   // Nihonium (Nh) - solid
  0.6,   // Flerovium (Fl) - solid
  0.6,   // Moscovium (Mc) - solid
  0.6,   // Livermorium (Lv) - solid
  0.6,   // Tennessine (Ts) - solid
  0.6,   // Oganesson (Og) - solid
];
