import { mdiCircleMultiple, mdiWaveform } from "@mdi/js";
import projectInfo from "../../package.json";
import overtoneLogo from "../images/overtone.svg";

const ROOT_URL = `/${projectInfo.homepage.split("/")[3]}/`;

const infoBar = {
  HOW_DO_ENDS_MEET_CONTENT: `
  <p>
    For at sige det ligeud, så er det vores virkelighedsopfattelse,  
    der snyder os ... som man jo egentlig kan sige, at den gør i alle 
    mulige sammenhænge. Sagen er, at vores hjerne i så høj grad er  
    indstillet på mønstergenkendelse, at det kan synes at være dens 
    primære meningsskabende mekanisme: Vi bekymrer os i mindre grad om  
    ting set isoleret, som i sammenhæng med andre, og hvis de ikke indgår 
    i en relation med andre perceptuelle data og danner genkendelige
    former og mønstre, har vi en tendens til at kalde dem for “støj”.
  </p>
  <p>
    Det er i øvrigt derfor, at vi generelt drages af regulære figurer
    som kvadrater og cirkler og grunden til, at vi finder symmetri smukt.
    Og det er grunden til, at vi har skabt (eller opdaget, afhængigt af 
    synsvinkel) geometri and matematik.
  </p>
  <p>
    Men tilbage til spørgsmålet: Hvilken relation får enderne til at mødes?
    Det er <strong>den enkleste matematiske proportion overhovedet</strong>:
    1:2.
  </p>
  <p>
    Det synlige spektrum, som jeg nævnte ovenfor, er faktisk blot et lille
    udsnit af det elektromagnetiske spektrum, hvor vi bemærker, at dette
    udsnits bølgelængder i den høje ende (cirka 380nm, violet) er omtrent 
    den halve af den lave endes (cirka 700nm, rød).
  </p>
  <p>
    Proportionen er, som du måske har bemærket en smule mindre end 1:2,
    og hvis du i indstillingerne klikker på
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiWaveform}" />
      </svg>
      Vis synligt spektrum
    </strong> – som viser en mere naturtro repræsentation af en farvecirkels
    “rene bølgelængder”, hvilket vi senere vender tilbage til — så vil du
    se at der findes en sort kløft, hvor enderne tydeligvis netop ikke mødes.
        <figure>
      <img src="${ROOT_URL}images/rgb-illumination.jpg" />
      <figcaption>
        <span class="caption">
          Bemærk, hvordan farven magenta opstår som en kombination af lige
          dele af blåt og rødt lys.
        </span>
        <span class="attribution">
          <a href="http://en.wikipedia.org/wiki/Image:RGB_illumination.jpg">
            Bb3cxv
          </a>,
          <a href="https://creativecommons.org/licenses/by-sa/3.0">
            CC BY-SA 3.0
          </a>, via Wikimedia Commons
        </span>
      </figcaption>
    </figure>
  </p>
  <p>
    Vores øjne og perception skaber altså en bro over den sorte kløft ved
    at indsætte farven <em>magenta</em>, som egentlig er en måde at skabe
    mening af en situation, hvor der er lys med lige stor intensitet for 
    røde og blå komponenter. Dermed opstår tilsyneladende en glat overgang
    mellem de to ender rød og violet.
  </p>`,
  HOW_DO_ENDS_MEET_TITLE: `Hvordan mødes de to ender?`,
  ONE_COLOR_ONE_SOUND_CONTENT: `
  <p>
    Vi undersøger denne forestilling også: Du kan selv afprøve ved at klikke på
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiCircleMultiple}" />
      </svg>
      Absolut modus
    </strong> .
  </p>
  <p>
    Du vil bemærke, at nogle ting ændrer sig: For det første vil de fleste
    indstillingsmuligheder forsvinde, da de ikke længere er relevante, og 
    så vil farvecirklen ikke mindst være den fra
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiWaveform}" />
      </svg>
      Synligt spektrum
    </strong> modus.
  </p>
  <p>
    Lad os se nærmere på forskellen mellem de to farvecirkler: Som vi har
    <a href="#what-is-this">nævnt ovenfor</a>, vil en enkelt, ren elektromagnetisk
    bølge med en veldefineret frekvens og bølgelængde, som den for eksempel kan ses
    udsendt fra en laser, af vores øjne opfattes som havende en specifik farve.
    <figure>
      <img src="${ROOT_URL}images/laser.jpg" />
      <figcaption>
        <span class="caption">
          Røde laserstråler: 660nm, 635nm;
          Grønne laserstråler: 532nm, 520nm;
          Blå laserstråler: 445nm, 405nm
        </span>
        <span class="attribution">
          <a href="https://commons.wikimedia.org/wiki/File:Light_Amplification_by_Stimulated_Emission_of_Radiation.jpg">
            彭嘉傑
          </a>,
          <a href="https://creativecommons.org/licenses/by-sa/3.0">
            CC BY-SA 3.0
          </a>, via Wikimedia Commons
        </span>
      </figcaption>
    </figure>
    Dette er, hvad du ser i
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiWaveform}" />
      </svg>
      Synligt spektrum
    </strong>-modus. Med urets retning fra klokken 12, findes først de
    usynlige infrarøde bølgelængder. Ved at fortsætte i samme retning
    bliver bølgelængderne stadig kortere, og vi passerer de kendte 
    regnbuefarver, indtil vi igen kommer ind i et område, hvor vores
    perceptionsapparat ikke kan følge med, og de ultraviolette 
    bølgelængder for os er usynlige.
  </p>
  <p>
    Men livet og vores oplevelse af det bliver aldrig ren fysik, og det
    lys, vi oftest sanser, vil sjældent være rene bølger, men i stedet
    en blanding af mange forskellige bølgelængder, som vi tilsammen
    opfatter som værende af én farve. Det, vi oplever som gult lys, vil
    eksempelvis oftest være en blanding af rødt og grønt lys.
  </p>
  <p>
    I modsætning hertil er <em>farvecirklen</em>, som vises som standard
    en mere udjævnet repræsentation af farverne, der benytter
    <a href="https://en.wikipedia.org/wiki/HSL_and_HSV">HSL-farvemodellen</a>,
    som i en nøddeskal præsenterer den måde vores øjne opfatter den blødere
    overgang mellem farverne, når de blandes. Og det er, som nævnt ovenfor,
    også grunden til, at magenta indgå i den.

    <figure>
      <img src="${ROOT_URL}images/hsv-cylinder.png" />
      <figcaption>
        <span class="caption">
          I HSL/HSV-systemet er de forskellige farvenuancer arrangeret radialt
          for at stemme bedre overens med den måde, vi opfatter farvernes egenskaber.
        </span>
        <span class="attribution">
          <a href="https://commons.wikimedia.org/wiki/File:HSV_cylinder.png">
            (3ucky(3all
          </a>,
          <a href="http://creativecommons.org/licenses/by-sa/3.0/">
            CC BY-SA 3.0
          </a>, via Wikimedia Commons
        </span>
      </figcaption>
    </figure>
  </p>
  <p>
    For at vende tilbage til spørgsmålet om en direkte oversættelse mellem
    en farve og en tone, findes en meget udbredt forestilling: Hver ren
    farve er en bølge med en entydig frekvens, som i sagens natur er meget
    høj. Hvad ville der så ske, hvis vi udvalgte en sådan farvefrekvens og
    <em>oktaverede</em> den ned, indtil den nåede det hørbare frekvensområde?
    Vi erindrer, <a href="#what-about-sound">hvad vi lærte om oktaven</a>, at
    tonen bevarer sin grundidentitet, uanset om man fordobler dens frekvens
    én eller flere gange, så i teorien burde vi også med halveringer af
    en farvefrekvens kunne opnå en lydfrekvens, en tone, som vi kan spille
    og synge.
  </p>
  <p>
    Når du i indstillinger vælger
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiCircleMultiple}" />
      </svg>
      Absolute modus
    </strong>, anskueliggøres netop dette. Ved klik på det centrale felt
    kan du høre tonen, og du vil i info-boksen kunne se navnet på tonen,
    som korresponderer med en farvefrekvens omkring 40 oktaver højere.
    I info-boksens øverste højre hjørne kan du se farvens bølgelængde,
    og tonenavnet gælder den nærmest tilsvarende tone i vores 
    <a href="https://www.musikipedia.dk/leksikon/ligesvaevende-stemning">
    ligesvævende stemning</a>, idet der henvises til den internationale 
    konvention for tonehøjder,
    <a href="https://en.wikipedia.org/wiki/A440_(pitch_standard)">Stuttgart
    Pitch Reference</a>. Nederst i info-boksen angives, hvor mange
    <a href="https://www.musikipedia.dk/leksikon/cent">cent</a>,
    tonen, som høres, afviger fra referencetonen.

    <figure>
      <img src="${ROOT_URL}images/compression-wave.gif" />
      <figcaption>
        <span class="caption">
          Gengivelse af en lydbølges udbredelse i et medie.
        </span>
        <span class="attribution">
          <a href="https://commons.wikimedia.org/wiki/File:Ondes_compression_2d_20_petit.gif">
            CDang
          </a>,
          <a href="http://creativecommons.org/licenses/by-sa/3.0/">
          CC BY-SA 3.0
          </a>, via Wikimedia Commons
        </span>
      </figcaption>
    </figure>
  </p>
  <p>
    Vi ville elske, hvis det var så enkelt, men hvis vi skal være ærlige –
    og på trods af, at vi gerne ville muliggøre en undersøgelse af denne
    sammenstilling i vores visualisering – så er denne forestilling et meget
    forsimplet billede og har nogle fundamentale problemer: 
    For det første har vi nævnt, at farve som regel er et udtryk for en
    blanding af bølger, så man kunne måske gå fra en specifik sinustone
    til en korresponderende farvefrekvens, men sjældent den modsatte vej
    i praksis.
    </p>
  <p>
    For det andet er lyd og farver, selvom de begge kommer til udtryk
    gennem <em>bølger</em>, essentielt meget forskellige bølgeformer.
    Lyd udbredes longitudinalt og er 
    <a href="https://fysikleksikon.nbi.ku.dk/l/lyd/">trykbølger</a>, 
    mens farver og lys udbredes transversalt og er
    <a href="https://da.wikipedia.org/wiki/Elektromagnetisk_str%C3%A5ling">
    elektromagnetiske bølger</a>. I kraft af dette vil lydbølger udbredes
    ved at bringe partikler i bevægelse (som det sker i vand eller seismiske
    bølger) og har således brug for et fast, flydende eller luftformigt medie.
    Elektromagnetiske bølger har ikke brug for et medie til udbredelse.
    Så det er desværre ikke sådan, at hvis du blot gradvist kunne sænke en
    elektromagnetisk bølges hastighed, så ville du pludselig på et tidspunkt
    kunne høre den ... desværre!
  </p>
  <p>
    For det tredje har lysbølger og lydbølger helt forskellige 
    udbredelseshastigheder og interagerer med medier på helt forskellige
    måder. Hvis du gentagne gange oktaverer en lydbølge opad, vil du
    rigtignok efter omkring 40 fordoblinger ende i det frekvensområde,
    som farverne kommer til udtryk igennem, men den oktaverede tones
    tilhørende bølgelængde vil være en, som slet ikke korresponderer
    med en farves. Matematikken går simpelthen ikke op.
      </p>
  <p>
    Men leg med mulighederne, reflektér og mor dig! 
    Hvis du tilmed skulle have vakt din 
    <a href="https://da.wikipedia.org/wiki/Syn%C3%A6stesi">synæstiske sans</a>,
    så må du meget gerne fortælle os, om der er overensstemmelse mellem, hvad
    du oplever, og de korrespondancer som vises i visualiseringen. Giv gerne lyd!
  </p>`,
  ONE_COLOR_ONE_SOUND_TITLE: `Hov, vent lidt! Jeg har hørt, at hver en farve
  svarer til en tone. Forklar venligst!`,
  INFOBAR_TITLE: `Farvens lyd`,
  TL_DR: `
  <p>
    <strong>TL; DR:</strong> Dette er en undersøgelse og visualisering 
    af, hvordan lyd og lys, toner og farver, kunne tænkes at interagere.
    Der er to grundlæggende situationer:
    I den ene undersøger vi <a href="#what-about-sound">
    intervaller mellem to toner</a> (hvoraf den ene fastholdes som reference) 
    som proportioner i en farvecirkel.
  </p>
  <p>
    I den anden – lidt mere vidtløftige – undersøgelse ser vi på mulige 
    <a href="#one-color-one-sound"> korrespondancer mellem rene farver 
    og toner.</a>
  </p>
  <p>
    Det er sagen i en nøddeskal. God fornøjelse!
  </p>`,
  WHAT_ABOUT_SOUND_CONTENT: `
  <p>
    Lyd kommer også til udtryk gennem bølger, om end af en anden type,
    men det er bemærkelsesværdigt, at vores hjerner også inden for det
    felt opfatter proportionen 1:2 (ét til to) som værende noget særligt. 
    Vi kalder denne proportion
    <a href="https://www.musikipedia.dk/leksikon/oktav">oktaven</a>.
  </p>
  <p>
    Du har sikkert stiftet bekendtskab med vores vestlige tonesystem,
    hvor skalaer typisk går fra en dyb tone, for eksempel C, til en høj
    tone, som sandelig også kaldes C. I et fysisk, akustisk perspektiv
    har det højere C den dobbelte frekvens af det dybere.
    Selvom disse toner altså har meget forskellige frekvenser, vil de i
    vores ører <strong>essentielt have samme kvalitet</strong>.
    Hvis du eksempelvis spørger en mand og en kvinde om at synge den samme
    tone, vil de i reglen synge samme tone, men i oktavafstand. Frekvensen
    af kvindens tone vil være den dobbelte af mandens.
  </p>
  <p>
    Dette faktum er snarere et udtryk for natur end kultur, og det opleves
    universelt, på tværs af klodens kulturer.  Man kunne på en måde sige,
    at <strong>al musik kan anskues inden for rammen af en oktavcirkel</strong>.
  </p>
  <p>
    Måden, hvorpå de forskellige kulturer deler oktavcirklen i toner med
    forskellige intervalstørrelser, er en stor del af, hvad der giver
    hvert tonesystem og skala sit særpræg.
    Foruden oktaven findes der dog også andre enkle matematiske proportioner, 
    som benyttes på tværs af kulturer. Det vil du kunne lære mere om ved
    at eksperimentere med overtoner i programmet
    <a class="option-name" href="/overtones">
      <img src=${overtoneLogo} alt="Representation of 8th Overtone" />
      Overtonespiralen
    </a>
    ).
  </p>
  <p>
    Så det var oplagt, at vi spurgte os selv: Kan vi på en farvecirkel 
    visualisere og anskueliggøre de samme intervaller, som vi finder
    velklingende som toneintervaller? 
    Sådan blev dette eksperiment til.
  </p>`,
  WHAT_ABOUT_SOUND_TITLE: `Kom nu til pointen! Hvad med lyd?`,
  WHAT_IS_THIS_CONTENT: `
  <p>
    Det, du kan se, er en farvecirkel, men en sådan har du sikkert stiftet
    bekendtskab med allerede. Har du nogensinde undret dig over, at de 
    spektrale farver, som i en regnbue ligger i lag fra violet nederst til
    rød øverst, her gengives, så disse to er mødes som nabofarver i en sluttet
    cirkel? Det er et spændende spørgsmål, og årsagen er kompleks.
  </p>
  <p>
    Farve er, som du sikkert ved, et udtryk for lys, men ikke alt lys opleves
    af os som farve. Vores øjne kan kun opfatte et begrænset udsnit af det
    elektromagnetiske spektrum. Enhver lysbølge kan – som alle andre bølger – 
    karakteriseres ud fra dens to grundlæggende komponenter:
    - Dens frekvens (hvor mange gange, den svinger per sekund).
    - Dens bølgelængde (afstanden mellem to bølgetoppe).
  </p>
  <p>
    Inden for dette kontinuum kalder vi elektromagnetiske bølger, som er for
    langsomme (frekvens) eller lange (bølgelængde) til, at vores øjne kan 
    opfatte dem, for <em>infrarøde</em>. Det er i denne ende af frekvens- og
    bølgelængde-spektret, at lys begynder at give os oplevelsen af farven rød.
    I takt med, at frekvensen stiger og bølgelængden mindskes, får vi oplevelsen
    af de synlige farver, indtil vi når de violette nuancer. Derfra vil 
    farveoplevelsen igen forsvinde, da frekvenserne bliver for høje og 
    bølgelængderne for korte til, at vores øjne kan opfange dem, og så har vi
    – som du måske har gættet – nået den <em>ultraviolette</em> del af spektret.

    <figure>
      <img src="${ROOT_URL}images/em-spectrum.svg" />
      <figcaption>
        <span class="caption">
          En lineær gengivelse af elektromagnetiske spektrum, hvor den
          synlige del, regnbuespektret, er fremhævet
          </span>
      </figcaption>
    </figure>
  </p>
  <p>
    Man kunne altså tænke, at spektret lyder som noget lineært, snarere end
    noget cirkulært, så hvordan mødes de to ender?
  </p>`,
  WHAT_IS_THIS_TITLE: `Hvad ser jeg her?`
}

const intervals = {
  "Perfect unison": "Ren unison",
  "Ragisma": "Ragisma",
  "Breedsma": "Breedsma",
  "Cent": "Cent",
  "Millioctave": "Milli-oktav",
  "Schisma": "Schisma",
  "Savart": "Savart",
  "Septimal kleisma": "Septimal kleisma",
  "Kleisma": "Kleisma",
  "Semicomma": "Semikomma",
  "Sixteenth tone":"Sekstendedel tone",
  "Orwell comma": "Orwell-komma",
  "Small septimal semicomma": "Lille septimalt semikomma",
  "Undecimal seconds comma": "Biyatisma",
  "Diaschisma": "Diaschisma",
  "Syntonic comma": "Syntonisk komma",
  "Pythagorean comma": "Pythagoræisk komma",
  "Septimal comma": "Septimalt komma",
  "Undecimal diesis": "Undecimal diesis",
  "Sixth tone": "Sjettedel tone",
  "Jubilisma": "Jubilisma",
  "Septimal diesis": "Septimal diesis",
  "Inferior quarter tone": "Mindre kvarttone",
  "Fifth tone": "Femtedel tone",
  "Enharmonic diesis": "Lille diesis",
  "Augmented unison": "Forstørret unison",
  "Superior quarter-tone": "Større kvarttone",
  "Septimal quarter tone": "Septimal kvarttone",
  "Just quarter tone": "Ren kvarttone",
  "Greater quarter-tone": "Stor kvarttone",
  "Septimal minor second": "Septimal halvtone",
  "Chromatic diesis": "Kromatisk diesis",
  "Third tone": "Tredjedel tone",
  "Tridecimal third tone": "Tridecimal tredjedel tone",
  "Narrow fourth": "Septimal kvart",
  "Hard semitone": "Hård halvtone",
  "Septimal chromatic semitone": "Septimal kromatisk halvtone",
  "Limma": "Limma",
  "Chromatic semitone": "Kromatisk halvtone",
  "Just minor semitone": "Ren lille halvtone",
  "Tempered minor second": "Ligesvævende lille sekund",
  "Minor diatonic semitone": "Lille diatonisk halvtone",
  "Minor second": "Halvtone",
  "Apotome": "Apotome",
  "Septimal diatonic semitone": "Septimal diatonisk halvtone",
  "Supraminor second": "Tridecimal to-tredjedel tone",
  "Large limma": "Stor limma",
  "Two-third tone": "To-tredjedel tone",
  "Small neutral second": "Lille, neutral sekund",
  "Tempered neutral second": "Ligesvævende neutral sekund",
  "Grave whole tone": "“Grave” heltone",
  "Neutral second": "Neutral sekunnd",
  "Submajor second": "Undecimal sekund",
  "Pythagorean minor tone": "Pythagoræisk lille heltone",
  "Minor tone": "Lille heltone",
  "Tempered major second": "Ligesvævende stor sekund",
  "Major second": "Stor sekund",
  "Just diminished third": "Ren formindsket terts",
  "Semi-augmented whole tone": "Halvforstørret heltone",
  "Supermajor second": "Septimal sekund",
  "Subminor third": "Septimal terts",
  "Just augmented second": "Ren forstørret sekund",
  "Tridecimal minor third": "Tridecimal lille terts",
  "Pythagorean minor third semiditone": "Pythagoræisk lille terts",
  "Overtone minor third": "Lille overtoneterts",
  "Tempered minor third": "Ligesvævende lille terts",
  "Minor third": "Lille terts",
  "Pythagorean augmented second": "Pythagoræisk forstørret sekund",
  "Superminor third": "Let forstørret lille terts",
  "Acute minor third": "Let forstørret lille terts",
  "Septimal neutral third": "Septimal neutral terts",
  "Undecimal neutral third": "Undecimal neutral terts",
  "Tempered neutral third": "Ligesvævende neutral terts",
  "Tridecimal neutral third": "Tridecimal neutral terts",
  "Grave major third": "Let formindsket stor terts",
  "Just augmented fifth": "Ren forstørret kvint",
  "Pythagorean diminished fourth": "Pythagoræisk formindsket kvart",
  "Major third": "Ren stor terts",
  "Tempered major third": "Ligesvævende stor terts",
  "Pythagorean major third": "Pythagoræisk stor terts",
  "Undecimal diminished fourth": "Undecimal formindsket kvart",
  "Just diminished fourth": "Ren formindsket kvart",
  "Septimal major third": "Septimal stor terts",
  "Tridecimal major third": "Tridecimal stor terts",
  "Just augmented third": "Ren forstørret terts",
  "Wide augmented third": "Forstørret terts",
  "Perfect fourth": "Ren kvart",
  "Tempered fourth": "Ligesvævende kvart",
  "Imperfect fourth": "Imperfekt kvart",
  "Pythagorean major sixth": "Pythagoræisk stor sekst",
  "Undecimal augmented fourth": "Undecimal forstørret kvart",
  "Superfourth": "Overkvart",
  "Tridecimal augmented fourth": "Tridecimal forstørret kvart",
  "Just augmented fourth": "Ren forstørret kvart",
  "Lesser septimal tritone": "Mindre septimal tritonus",
  "Pythagorean diminished fifth": "Pythagoræisk formindsket kvint",
  "Augmented fourth": "Forstørret kvart",
  "Tempered tritone": "Ligesvævende tritonus",
  "Diminished fifth": "Formindsket kvint",
  "Pythagorean tritone": "Pythagoræisk tritonus",
  "Greater septimal tritone": "Større septimal tritonus",
  "Just diminished fifth": "Ren formindsket kvint",
  "Undecimal subfifth": "Undecimal underkvint",
  "Pythagorean diminished sixth": "Pythagoræisk formindsket sekst",
  "5-limit wolf fifth": "5-limit (“ren”) ulvekvint",
  "Tempered perfect fifth": "Ligesvævende kvint",
  "Perfect fifth": "Ren kvint",
  "Classic diminished sixth": "Klassisk formindsket sekst",
  "Septimal minor sixth": "Septimal lille sekst",
  "Undecimal minor sixth": "Undecimal lille sekst",
  "Pythagorean minor sixth": "Pythagoræisk lille sekst",
  "Tempered minor sixth": "Ligesvævende lille sekst",
  "Minor sixth": "Lille sekst",
  "Pythagorean augmented fifth": "Pythagoræisk forstørret kvint",
  "Golden ratio": "Den gyldne ratio",
  "Acute minor sixth": "Akut lille sekst",
  "Neutral sixth": "Neutral sekst",
  "Tempered neutral sixth": "Ligesvævende neutral sekst",
  "Undecimal neutral sixth": "Undecimal neutral sekst",
  "Grave major sixth": "“Grave” stor sekst",
  "Pythagorean diminished seventh": "Pythagoræisk formindsket septim",
  "Major sixth": "Stor sekst",
  "Tempered major sixth": "Ligesvævende stor sekst",
  "Just diminished seventh": "Ren formindsket septim",
  "Septimal major sixth": "Septimal stor sekst",
  "Just augmented sixth": "Ren forstørret sekst",
  "Harmonic seventh": "Naturtoneseptim",
  "Minor seventh": "Lille septim",
  "Tempered minor seventh": "Ligesvævende lille septim",
  "Greater just minor seventh": "Større ren lille septim",
  "Pythagorean augmented sixth": "Pythagoræisk forstørret sekst",
  "Lesser undecimal neutral seventh": "Mindre undecimal neutral septim",
  "Acute minor seventh": "Akut lille septim",
  "Septimal neutral seventh": "Septimal neutral septim",
  "Undecimal neutral seventh": "Undecimal neutral septim",
  "Tempered neutral seventh": "Ligesvævende neutral septim",
  "Grave major seventh": "“Grave” stor septim",
  "Tridecimal neutral seventh": "Tridecimal neutral septim",
  "Pythagorean diminished octave": "Pythagoræisk formindsket oktav",
  "Major seventh": "Stor septim",
  "Tempered major seventh": "Ligesvævende stor septim",
  "Octave − major chroma": "Oktav' − stort chroma",
  "Pythagorean major seventh": "Pythagoræisk stor septim",
  "Classic diminished octave": "Klassisk formindsket oktav",
  "Septimal major seventh": "Septimal stor septim",
  "Thirty-first harmonic": "31. deltone",
  "Septimal supermajor seventh": "Septimal let forstørret septim",
  "Just augmented seventh": "Ren forstørret septim",
  "Semi-diminished octave": "Halvformindsket oktav",
  "Perfect octave": "Perfekt oktav",
  "Unknown interval": "Ukendt interval"
};

const da_DA = {
  ...infoBar,
  ...intervals,
  CREDITS: `
    Formgivet og programmeret af &nbsp;
    <a href="https://facebook.com/sunyatasattva">Marco Lucio Giannotta</a> and&nbsp;
    <a href="https://www.facebook.com/skye.lofvander">Skye Løfvander</a>.
  `,
  OPTION_AUTOPLAY_HELP: `
    <p>
      Når denne mulighed er valgt, vil intervallet automatisk blive
      afspillet, så snart at en ny nuance fra farvecirklen er valgt.
      Når du vælger denne mulighed fra, kan du stadig spille tonerne
      ved at klikke på cirklen i midten af farvekredsen.
    </p>
    <p>
      <strong>Trick:</strong> Du kan afspille tonerne  separat ved på dit
      tastatur at holde <kbd>⎇ Alt</kbd> eller <kbd>⌥ Option</kbd> mens du
      klikker på cirklen (eller bruger langt fingertryk på smartphone).
    </p>`,
  OPTION_AUTOPLAY_LABEL: `Autoplay`,
  OPTION_COLOR_SLIDERS_HELP: `
  <p>
    Ved klik på denne mulighed fremkommer to koncentriske cirkler udenom
    farvevælgeren. Her vil du selv kunne vælge, hvordan farverne fremstår
    ud fra <a target="_blank" href="https://en.wikipedia.org/wiki/Lightness">
      lysstyrke</a>
    og
    <a
      target="_blank"
      href="https://da.wikipedia.org/wiki/M%C3%A6tning">
      farvemætning.</a>
  </p>
  <p>
    Bemærk, at dette ikke vil påvirke de afspillede toners klange,
    da de udelukkende fastlægges ud fra den valgte farvenuance. 
  </p>`,
  OPTION_COLOR_SLIDERS_LABEL: `Vis farveskydere`,
  OPTION_LOCK_RATIO_HELP: `
  <p>
    Når denne mulighed vælges, vil intervallet mellem de to markører
    blive bevaret, når de bevæges. 
  </p>`,
  OPTION_LOCK_RATIO_LABEL: `Lås ratio`,
  OPTION_MODE_ABSOLUTE_LABEL: `Absolut`,
  OPTION_MODE_HELP: `
  <p>
    I “interval”-modus kan du opleve den musikalske relation mellem
    to farver. Her vil der være fokus på de to farvers indbyrdes
    interval. Forholdet mellem dem er fokus, så deres respektive
    farvenuancer i relation til en tonefrekvens er mindre vigtige.
  </p>
  <p>
    I “Absolut” modus vil du derimod kunne høre den korresponderende
    tone til en valgt farve, da dens frekvens er blevet oktaveret ned
    i det hørbare frekvensområde.
  </p>`,
  OPTION_MODE_INTERVAL_LABEL: `Interval`,
  OPTION_MODE_LABEL: `Modus`,
  OPTION_REFERENCE_HELP: `
  <p>
    I “interval”-modus vil farvecirklen være en gengivelse af en
    <a target="_blank" href="https://www.musikipedia.dk/leksikon/oktav">oktav</a>.
    Her vil farverne ikke repræsentere absolutte værdier, men afspejle en indbyrdes
    proportion.
  </p>
  <p>
    Den ene af markørerne i farvekredsen har en prik i midten og repræsenterer
    en fast referencefrekvens. Du kan ændre denne frekvens efter eget ønske ved
    at taste værdien ind i boksen her.
      </p>`,
  OPTION_REFERENCE_LABEL: `Referencefrekvens`,
  OPTION_ROUND_HELP: `
  <p>
    Det er sikkert mest udbytterigt at undersøge interval-ratioer, der har en
    slags 
    <a target="_blank" href="https://en.wikipedia.org/wiki/Limit_(music)">
    relevans til musik i praksis</a>.
    Med denne mulighed kan du sikre dig, at den ratio (talforhold), som vises
    i boksen, er en værdi for et interval, som benyttes i et beskrevet tonesystem.
    Nedenunder selve ratioværdien kan du se afvigelsen målt i
    <a target="_blank" href="https://www.musikipedia.dk/leksikon/cent">
    cent</a>
    mellem ratio vist på skærmen og intervallet, som høres.
  </p>`,
  OPTION_ROUND_LABEL: `Afrund til nærmeste ratio`,
  OPTION_ROUND_O_NONE: `Ingen`,
  OPTION_ROUND_O_LIMIT: `{n}-limit`,
  OPTION_ROUND_O_12TET: `Ligesvævende temperatur`,
  OPTION_VISIBLE_SPECTRUM_HELP: `
  <p>
    Standardvisningens gengivelse af et farverum benytter sig af en
    <a target="_blank" href="https://da.wikipedia.org/wiki/Farvecirkel">
    farvecirkel</a>,
    som må siges at komme nærmest til den måde, vores hjerner bearbejder
    farveindtryk, men det er ikke nødvendigvis en repræsentation, som
    stemmer overens med fysiske forhold.
  </p>
  <p>
    Med denne mulighed kan du skifte til en visning, som er mere i 
    overensstemmelse med en fysisk nøjagtig repræsentation af det
    <a target="_blank" href="https://da.wikipedia.org/wiki/Synlige_spektrum">
    synlige farvespektrum</a>.
  </p>`,
  OPTION_VISIBLE_SPECTRUM_LABEL: `Vis synligt spektrum`,
  OPTIONS_HEADER: `Indstillinger`,
  OVERTONE_SPIRAL: `Overtonespiral`,
  RATIO_INPUT_INFO: `Indtast dit eget intervalratio og tryk <kbd>Enter ↵</kbd>`,
  RATIO_INPUT_ERROR: `Indtast et lovligt interval i formen <pre>tæller/nævner</pre>
  or <pre>tæller:nævner</pre>`,
  SOCIAL_DONATE: `Donér`,
  SOCIAL_SHARE: `Del`,
  SOCIAL_SOURCE: `Kilde`,
  SOCIAL_TWEET: `Tweet`,
  VERSION_INFO: `
    &nbsp;Version&nbsp;
    <a href="https://github.com/sunyatasattva/rainbow-spectre/releases/">
      ${projectInfo.version}
    </a>
  `
} as const;

export default da_DA;