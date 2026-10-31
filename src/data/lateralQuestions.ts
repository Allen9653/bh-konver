export interface LateralQuestion {
  id: string;
  question: {
    bs: string;
    "bs-Cyrl": string;
    en: string;
    de: string;
    tr: string;
  };
  options: {
    id: string;
    text: {
      bs: string;
      "bs-Cyrl": string;
      en: string;
      de: string;
      tr: string;
    };
  }[];
  correctOptionId: string;
  explanation: {
    bs: string;
    "bs-Cyrl": string;
    en: string;
    de: string;
    tr: string;
  };
}

export const LATERAL_QUESTIONS: LateralQuestion[] = [
  {
    id: "lat-1",
    question: {
      bs: "Otac i sin dožive saobraćajnu nesreću. Hitna pomoć ih odvozi u bolnicu. Dječaka uvode u operacionu salu, a dežurni hirurg preblijedi i kaže: 'Ja ne mogu operisati ovog dječaka, on je moj sin!' Ko je hirurg?",
      "bs-Cyrl": "Отац и син доживе саобраћајну несрећу. Хитна помоћ их одвози у болницу. Дјечака уводе у операциону салу, а дежурни хирург преблиједи и каже: 'Ја не могу оперисати овог дјечака, он је мој син!' Ко је хирург?",
      en: "A father and son are in a car accident. The ambulance rushes them to the hospital. The boy is taken into the operating room, where the surgeon turns pale and says: 'I cannot operate on this boy, he is my son!' Who is the surgeon?",
      de: "Ein Vater und sein Sohn haben einen Autounfall. Der Krankenwagen bringt sie ins Krankenhaus. Der Junge kommt in den OP, wo der Chirurg erbleicht und sagt: 'Ich kann diesen Jungen nicht operieren, er ist mein Sohn!' Wer ist der Chirurg?",
      tr: "Bir baba ve oğlu trafik kazası geçirir. Ambulans onları hastaneye yetiştirir. Çocuk ameliyathaneye alınır, nöbetçi cerrahın rengi solar ve der ki: 'Bu çocuğu ameliyat edemem, o benim oğlum!' Cerrah kimdir?",
    },
    options: [
      { id: "opt-1", text: { bs: "Dječakova majka", "bs-Cyrl": "Дјечакова мајка", en: "The boy's mother", de: "Die Mutter des Jungen", tr: "Çocuğun annesi" } },
      { id: "opt-2", text: { bs: "Dječakov očuh", "bs-Cyrl": "Дјечаков очух", en: "The boy's stepfather", de: "Der Stiefvater des Jungen", tr: "Çocuğun üvey babası" } },
      { id: "opt-3", text: { bs: "Dječakov djed", "bs-Cyrl": "Дјечаков дјед", en: "The boy's grandfather", de: "Der Großvater des Jungen", tr: "Çocuğun dedesi" } },
      { id: "opt-4", text: { bs: "Hirurg ima halucinacije", "bs-Cyrl": "Хирург има халуцинације", en: "The surgeon is hallucinating", de: "Der Chirurg halluziniert", tr: "Cerrah halüsinasyon görüyor" } },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Hirurg je dječakova majka! Klasična zamka nesvjesne rodne predrasude navodi ljude da hirurga automatski zamišljaju kao muškarca.",
      "bs-Cyrl": "Хирург је дјечакова мајка! Класична замка несвјесне родне предрасуде наводи људе да хирурга аутоматски замишљају као мушкарца.",
      en: "The surgeon is the boy's mother! This classic riddle exposes the subconscious assumption that a surgeon must be male.",
      de: "Die Chirurgin ist die Mutter des Jungen! Das klassische Rätsel entlarvt das unbewusste Vorurteil, Chirurgen seien stets Männer.",
      tr: "Cerrah çocuğun annesidir! Bilinçaltındaki cinsiyet kalıp yargısı cerrahın erkek olduğunu varsaymaya yönlendirir.",
    },
  },
  {
    id: "lat-2",
    question: {
      bs: "Čovjek živi na desetom spratu zgrade. Svakog jutra ulazi u lift i spušta se skroz do prizemlja kako bi otišao na posao. Međutim, kada se vraća s posla u zgradu, ako je sam i nije padala kiša, liftom se vozi samo do 7. sprata, a preostala 3 sprata ide pješice uz stepenice. Zašto?",
      "bs-Cyrl": "Човјек живи на десетом спрату зграде. Сваког јутра улази у лифт и спушта се скроз до приземља како би отишао на посао. Међутим, када се враћа с посла у зграду, ако је сам и није падала киша, лифтом се вози само до 7. спрата, а преостала 3 спрата иде пјешице уз степенице. Зашто?",
      en: "A man lives on the 10th floor. Every morning he takes the elevator all the way down to the ground floor. When returning home from work, if he is alone and it didn't rain, he rides the elevator to the 7th floor and walks the remaining 3 floors up. Why?",
      de: "Ein Mann wohnt im 10. Stock. Jeden Morgen fährt er mit dem Aufzug bis ins Erdgeschoss. Wenn er von der Arbeit zurückkehrt, fährt er, falls er allein ist und es nicht geregnet hat, nur bis zum 7. Stock und läuft die restlichen 3 Stockwerke zu Fuß. Warum?",
      tr: "Bir adam 10. katta yaşamaktadır. Her sabah asansörle zemin kata iner. Akşam işten dönerken, eğer yalnızsa ve yağmur yağmamışsa asansörle 7. kata kadar çıkar, kalan 3 katı merdivenle yürür. Neden?",
    },
    options: [
      { id: "opt-1", text: { bs: "Niskog je rasta i rukom može dohvatiti samo dugme za 7. sprat", "bs-Cyrl": "Ниског је раста и руком може дохватити само дугме за 7. спрат", en: "He is a person of short stature and can only reach the 7th floor button", de: "Er ist kleinwüchsig und erreicht nur den Knopf für den 7. Stock", tr: "Kısa boyludur ve kolu sadece 7. katın düğmesine yetişir" } },
      { id: "opt-2", text: { bs: "Želi vježbati kardio penjanje uz stepenice", "bs-Cyrl": "Жели вјежбати кардио пењање уз степенице", en: "He wants cardio exercise by climbing stairs", de: "Er möchte Konditionstraining auf der Treppe machen", tr: "Merdiven çıkarak kardiyo egzersizi yapmak istiyor" } },
      { id: "opt-3", text: { bs: "Lift je pokvaren između 7. i 10. sprata", "bs-Cyrl": "Лифт је покварен између 7. и 10. спрата", en: "The elevator is broken above floor 7", de: "Der Aufzug ist ab dem 7. Stock defekt", tr: "Asansör 7. kattan sonra bozuktur" } },
      { id: "opt-4", text: { bs: "Komšija sa sedmog sprata mu duguje novac", "bs-Cyrl": "Комшија са седмог спрата му дугује новац", en: "His neighbor on the 7th floor owes him money", de: "Der Nachbar im 7. Stock schuldet ihm Geld", tr: "7. kattaki komşusu ona borçludur" } },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Čovjek je patuljastog / niskog rasta! Može dohvatiti dugme prizemlja jer je na dnu, ali prema gore dosegne najviše do 7. sprata. Kad pada kiša, kišobranom pritisne dugme za 10. sprat, a kad ima drugih ljudi, zamoli nekoga da pritisne deseti sprat!",
      "bs-Cyrl": "Човјек је патуљастог / ниског раста! Може дохватити дугме приземља јер је на дну, али према горе досегне највише до 7. спрата. Кад пада киша, кишобраном притисне дугме за 10. спрат, а кад има других људи, замоли некога да притисне десети спрат!",
      en: "He is short in stature! He can reach the ground floor button easily, but going up he can only reach the button for the 7th floor. When it rains, he pushes the 10th button with his umbrella; when others ride with him, he asks them to press 10!",
      de: "Er ist kleinwüchsig! Den Erdgeschoss-Knopf erreicht er problemlos, nach oben reicht sein Arm nur bis zur 7. Wenn es regnet, drückt er mit dem Schirm die 10, und wenn Mitfahrer dabei sind, bittet er sie darum!",
      tr: "Adam kısa boyludur! Zemin kat düğmesine kolayca yetişir, ancak yukarı çıkarken en fazla 7. katın düğmesine eli uzanır. Yağmur yağdığında şemsiyesiyle 10'a basar, yanında biri varken ise rica eder!",
    },
  },
  {
    id: "lat-3",
    question: {
      bs: "U potpunom mraku ulazite u ledenu planinsku kolibu. Imate samo jednu jedinu šibicu. U sobi se nalaze: petrolejska lampa, peć na drva sa suhim potpalom i debela voštana svijeća. Šta ćete prvo upaliti?",
      "bs-Cyrl": "У потпуном мраку улазите у ледену планинску колибу. Имате само једну једину шибицу. У соби се налазе: петролејска лампа, пећ на дрва са сухим потпалом и дебела воштана свијећа. Шта ћете прво упалити?",
      en: "In pitch dark, you enter a freezing mountain cabin. You have only one single match. Inside are: an oil lamp, a wood stove with kindling, and a thick wax candle. What do you light first?",
      de: "In völliger Dunkelheit betreten Sie eine eiskalte Hütte. Sie haben genau ein einziges Streichholz. Im Raum befinden sich: eine Petroleumlampe, ein Kaminholzofen und eine dicke Kerze. Was zünden Sie zuerst an?",
      tr: "Zifiri karanlıkta buz gibi bir dağ kulübesine giriyorsunuz. Elinizde yalnızca tek bir kibrit var. Odada bir gaz lambası, çıralı odun sobası ve kalın bir mum bulunuyor. İlk önce neyi yakarsınız?",
    },
    options: [
      { id: "opt-1", text: { bs: "Šibicu", "bs-Cyrl": "Шибицу", en: "The match", de: "Das Streichholz", tr: "Kibriti" } },
      { id: "opt-2", text: { bs: "Svijeću", "bs-Cyrl": "Свијећу", en: "The candle", de: "Die Kerze", tr: "Mumu" } },
      { id: "opt-3", text: { bs: "Petrolejsku lampu", "bs-Cyrl": "Петролејску лампу", en: "The oil lamp", de: "Die Petroleumlampe", tr: "Gaz lambasını" } },
      { id: "opt-4", text: { bs: "Peć na drva", "bs-Cyrl": "Пећ на дрва", en: "The wood stove", de: "Den Holzofen", tr: "Odun sobasını" } },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Prvo morate upaliti šibicu! Bez nje ne možete zapaliti niti jedan od navedenih predmeta.",
      "bs-Cyrl": "Прво морате упалити шибицу! Без ње не можете запалити нити један од наведених предмета.",
      en: "You have to light the match first! Without lighting the match, you cannot ignite any of the other items.",
      de: "Zuerst müssen Sie das Streichholz anzünden! Ohne dieses lässt sich kein einziger der Gegenstände entzünden.",
      tr: "İlk önce kibriti yakmalısınız! Kibrit yanmadan odadaki diğer hiçbir şeyi yakamazsınız.",
    },
  },
  {
    id: "lat-4",
    question: {
      bs: "Brod je usidren u luci. Preko boka broda visi mornarska ljestva od konopca čije prečke su razmaknute tačno 30 cm. Plima nadolazi brzinom od 15 cm na sat. Ako je trenutno najniža prečka tačno na površini vode, koliko će prečki biti pod vodom nakon 4 sata?",
      "bs-Cyrl": "Брод је усидрен у луци. Преко бока брода виси морнарска љества од конопца чије пречке су размакнуте тачно 30 cm. Плима надолази брзином од 15 cm на сат. Ако је тренутно најнижа пречка тачно на површини воде, колико ће пречки бити под водом након 4 сата?",
      en: "A ship is anchored in a harbor. A rope ladder hangs over the side with rungs spaced 30 cm apart. The tide rises at 15 cm per hour. If the bottom rung is currently touching the water surface, how many rungs will be underwater after 4 hours?",
      de: "Ein Schiff liegt im Hafen vor Anker. An der Seite hängt eine Strickleiter, deren Sprossen 30 cm Abstand haben. Die Flut steigt um 15 cm pro Stunde. Wenn die unterste Sprosse die Wasseroberfläche berührt, wie viele Sprossen stehen nach 4 Stunden unter Wasser?",
      tr: "Bir gemi limanda demirlidir. Yan tarafından sarkan ip merdivenin basamakları 30 cm aralıklıdır. Gelgit saatte 15 cm yükselmektedir. En alt basamak suyun yüzeyindeyse, 4 saat sonra kaç basamak su altında kalır?",
    },
    options: [
      { id: "opt-1", text: { bs: "Nijedna (nula)", "bs-Cyrl": "Ниједна (нула)", en: "None (zero)", de: "Keine einzige (null)", tr: "Hiçbiri (sıfır)" } },
      { id: "opt-2", text: { bs: "Tačno 2 prečke", "bs-Cyrl": "Тачно 2 пречке", en: "Exactly 2 rungs", de: "Genau 2 Sprossen", tr: "Tam 2 basamak" } },
      { id: "opt-3", text: { bs: "Tačno 4 prečke", "bs-Cyrl": "Тачно 4 пречке", en: "Exactly 4 rungs", de: "Genau 4 Sprossen", tr: "Tam 4 basamak" } },
      { id: "opt-4", text: { bs: "Zavisi od težine broda", "bs-Cyrl": "Зависи од тежине брода", en: "Depends on ship's tonnage", de: "Hängt vom Schiffsgewicht ab", tr: "Geminin ağırlığına bağlıdır" } },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Nijedna prečka! Kako plima raste, brod pluta i podiže se zajedno s nivoom mora, a s njim i ljestve pričvršćene za njegov bok.",
      "bs-Cyrl": "Ниједна пречка! Како плима расте, брод плута и подиже се заједно с нивоом мора, а с њим и љестве причвршћене за његов бок.",
      en: "Zero rungs! As the tide rises, the ship floats and rises along with the water level, keeping the ladder in the exact same position relative to water.",
      de: "Keine einzige Sprosse! Wenn die Flut steigt, schwimmt das Schiff mit dem Wasserpegel nach oben und die Leiter mit ihm.",
      tr: "Hiçbir basamak! Gelgit yükseldikçe gemi de suyun üstünde yükselir, dolayısıyla merdivenin suya olan mesafesi değişmez.",
    },
  },
  {
    id: "lat-5",
    question: {
      bs: "Pet sestara je zajedno u kući i svaka je zauzeta nekom aktivnošću: Ana čita knjigu, Maja kuha ručak, Sara igra šah, a Lana pere veš. Šta u ovom trenutku radi peta sestra, Ema?",
      "bs-Cyrl": "Пет сестара је заједно у кући и свака је заузета неком активношћу: Ана чита књигу, Маја куха ручак, Сара игра шах, а Лана пере веш. Шта у овом тренутку ради пета сестра, Ема?",
      en: "Five sisters are in a house, each busy with an activity: Ana is reading a book, Maja is cooking, Sara is playing chess, and Lana is doing laundry. What is the fifth sister, Ema, doing?",
      de: "Fünf Schwestern sind zusammen im Haus, jede ist beschäftigt: Ana liest ein Buch, Maja kocht, Sara spielt Schach, und Lana wäscht Wäsche. Was macht die fünfte Schwester, Ema?",
      tr: "Beş kız kardeş evdedir ve her biri bir işle meşguldür: Ana kitap okuyor, Maja yemek pişiriyor, Sara satranç oynuyor, Lana ise çamaşır yıkıyor. Beşinci kardeş Ema şu anda ne yapıyor?",
    },
    options: [
      { id: "opt-1", text: { bs: "Igra šah sa Sarom", "bs-Cyrl": "Игра шах са Саром", en: "Playing chess with Sara", de: "Spielt Schach mit Sara", tr: "Sara ile satranç oynuyor" } },
      { id: "opt-2", text: { bs: "Spava u sobi", "bs-Cyrl": "Спава у соби", en: "Sleeping in her room", de: "Schläft in ihrem Zimmer", tr: "Odasında uyuyor" } },
      { id: "opt-3", text: { bs: "Gleda televiziju", "bs-Cyrl": "Гледа телевизију", en: "Watching television", de: "Schaut fern", tr: "Televizyon izliyor" } },
      { id: "opt-4", text: { bs: "Pomaže Maji u kuhinji", "bs-Cyrl": "Помаже Маји у кухињи", en: "Helping Maja in kitchen", de: "Hilft Maja beim Kochen", tr: "Maja'ya mutfakta yardım ediyor" } },
    ],
    correctOptionId: "opt-1",
    explanation: {
      bs: "Ema igra šah sa Sarom! Za igranje šaha potrebna su dva igrača, a s obzirom na to da su sve ostale sestre zauzete pojedinačnim poslovima, Ema mora biti Sarin suigrač.",
      "bs-Cyrl": "Ема игра шах са Саром! За играње шаха потребна су два играча, а с обзиром на то да су све остале сестре заузете појединачним пословима, Ема мора бити Сарин суиграч.",
      en: "Ema is playing chess with Sara! Chess requires two players, and since all other sisters are engaged in solo activities, Ema must be playing against Sara.",
      de: "Ema spielt Schach mit Sara! Für Schach braucht man zwei Personen. Da die anderen drei mit Einzelaufgaben beschäftigt sind, ist Ema Saras Spielpartnerin.",
      tr: "Ema, Sara ile satranç oynuyor! Satranç iki kişiyle oynanır ve diğer kardeşler tek kişilik işlerle meşgul olduğundan Ema, Sara'nın rakibidir.",
    },
  },
];
