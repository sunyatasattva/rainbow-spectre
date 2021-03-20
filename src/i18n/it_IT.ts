import { mdiCircleMultiple, mdiWaveform } from "@mdi/js";
import projectInfo from "../../package.json";
import overtoneLogo from "../images/overtone.svg";

const ROOT_URL = `/${projectInfo.homepage.split("/")[3]}/`;

const infoBar = {
  HOW_DO_ENDS_MEET_CONTENT: `
  <p>
    Senza tanti giri di parole, è un trucco della nostra percezione. Beh…
    come tutto il resto, suppongo. Il fatto è questo: il cervello ha una
    grande capacità di identificazione di modelli. Pare che questo sia il
    meccanismo con cui diamo senso alle cose: non ci importano le cose
    in isolamento, ma solo le relazioni; ciò che non forma regolarità,
    o percezioni ordinate, lo chiamiamo “rumore” e lo filtriamo fuori dai
    nostri dati percettivi.
  </p>
  <p>
    Per inciso, questo è il motivo per cui siamo attratti da forme molto
    regolari come quadrati e cerchi; il motivo per cui pensiamo che la simmetria
    sia bella; il motivo per cui abbiamo inventato (o scoperto, a seconda
    della tua scuola di pensiero) la geometria e la matematica.
  </p>
  <p>
    Dunque, qual è questa relazione che fa incontrare i due capi? È proprio
    <strong>la più semplice relazione matematica di tutti i tempi</strong>:
    2:1.
  </p>
  <p>
    Lo spettro visibile che abbiamo menzionato sopra è in effetti solo una
    piccola fetta di tutto lo spettro; in questa fetta, la parte finale è
    circa il doppio della lunghezza d'onda della parte iniziale (tra circa
    380nm e 700nm).
  </p>
  <p>
    In effetti, come potresti aver notato, è un po' meno del doppio, ed infatti
    se attivi l'opzione
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiWaveform}" />
      </svg>
      Mostra lo spettro visibile
    </strong>
    (che mostra una rappresentazione più accurata dello spettro fisico delle
    lunghezze d'onda “pure”–ci arriviamo dopo, non ti preoccupare), vedrai che
    c'è un buco invisibile e che i capi in effetti non si incontrano
    davvero.
    <figure>
      <img src="${ROOT_URL}images/rgb-illumination.jpg" />
      <figcaption>
        <span class="caption">
          Nota come il Magenta appare come combinazione di quantità uguali di
          luce blue e rossa
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
    Nonostante questo, i nostri occhi tamponano il problema creando il colore
    comunemente conosciuto come <em>magenta</em>, e dunque creando una
    transizione organica tra i due capi del cerchio.
  </p>`,
  HOW_DO_ENDS_MEET_TITLE: `Come si incontrano i due capi del cerchio?`,
  ONE_COLOR_ONE_SOUND_CONTENT: `
  <p>
    In questo esperimento esploriamo anche questa ipotesi: puoi dare
    un'occhiata cliccando
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiCircleMultiple}" />
      </svg>
      Modalità Assoluta
    </strong> .
  </p>
  <p>
    Vedrai cambiare due cose: primo, molte delle opzioni spariranno, perché
    non più rilevanti. Ma soprattutto, la ruota dei colori sarà in modalità
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiWaveform}" />
      </svg>
      Spettro visibile
    </strong>.
  </p>
  <p>
    Guardiamo alla differenza tra le due: come
    <a href="#what-is-this">abbiamo menzionato sopra</a>, in teoria, un'onda
    elettromagnetica “pura” di una certa frequenza o lunghezza d'onda, come
    quella emessa da un laser, appari ai nostri occhi di un colore
    ben preciso.
    <figure>
      <img src="${ROOT_URL}images/laser.jpg" />
      <figcaption>
        <span class="caption">
          Laser rossi: 660nm, 635nm;
          Laser verdi: 532nm, 520nm;
          Laser blu: 445nm, 405nm
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
    Questo è esattamente ciò che vedi nella modalità
    That is what you see in the
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiWaveform}" />
      </svg>
      Spettro visibile
    </strong>
    Incominciando dalle invisibile frequenze infrarosse, puoi seguire il
    cerchio in senso orario, e, all'aumentare della frequenza, possiamo
    vedere tutti i colori dell'arcobaleno, fin quando torniamo di nuovo
    nel regno dell'invisibile con le frequenze ultraviolette.
  </p>
  <p>
    Tuttavia, la vitanon è quasi mai pura come la fisica, e la luce che
    incontriamo nella nostra vita raramente sono onde “pure”: invece sono
    un miscuglio di varie onde, che vengono interpretate dai nostri occhi
    come di un certo colore. Per questo motivo, per esempio un giallo
    specifico, potrebbe essere il risultato di varie diverse misture di
    luce verde e rossa.
  </p>
  <p>
    Al contrario, il <em>cerchio cromatico</em> che mostriamo di default è
    una rappresentazione più armoniosa dei colori che utilizza il
    <a href="https://it.wikipedia.org/wiki/Hue_Saturation_Brightness">Modello
    di Colore HSL</a>, che, in soldoni, rappresenta la maniera in cui i nostri
    occhi percepiscono le transizioni tra i colori quando vengono mescolati
    fra loro. Motivo per cui il magenta è presente, come abbiamo detto.
    <figure>
      <img src="${ROOT_URL}images/hsv-cylinder.png" />
      <figcaption>
        <span class="caption">
          Nel sistema HSL/HSV, le tonalità sono sistemate radialmente in modo
          da allinearsi in maniera più naturale con l'esperienza umana
          del colore.
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
    Per tornare alla questione di tradurre un colore in un singolo suono,
    la teoria è la seguente: ogni colore puro è un'onda con una certa
    frequenza. La frequenza è chiaramente molto alta (parliamo di THz), ma
    cosa succederebbe se prendessimo questa frequenza e la
    <em>rallentassimo</em> fino a raggiungere lo spettro delle frequenze
    udibili, o addirittura di quelle musicali? Tenendo in conto
    <a href="#what-about-sound">quello che abbiamo imparato riguardo
    l'ottava</a>, dal momento che il significato di un suono non cambia con
    ogni rotazione del cerchio che ne raddoppia la frequenza, dovremmo
    ottenere un suono equivalente che possiamo suonare o cantare, no?
  </p>
  <p>
    Nella
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiCircleMultiple}" />
      </svg>
      Modalità Assoluta
    </strong>, è esattamente questo quello che vedi: puoi giocarci e vedere
    nel riquadro informativo la nota che è stata calcolata attraverso questo
    procedimento, cioé dimezzando la frequenza di un dato colore circa 40
    volte fino a rientrare nello spettro udibile.
    Puoi vedere la lunghezza d'onda equivalente in alto a destra, la nota più
    vicina nel nostro
    <a href="https://it.wikipedia.org/wiki/Temperamento_equabile">Temperamento
    equabile</a>, usando il <a href="https://it.wikipedia.org/wiki/ISO_16">
    Riferimento di Stoccarda</a>; in basso, puoi vedere di quanti
    <a href="https://it.wikipedia.org/wiki/Cent_(musica)">cent</a> diverge
    dalla nota di riferimento.
    <figure>
      <img src="${ROOT_URL}images/compression-wave.gif" />
      <figcaption>
        <span class="caption">
          Rappresentazione della propagazione di un'onda sonora attraverso
          un medium fisico.
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
    Ci sarebbe piaciuto se tutto questo fosse stato vero, ma vogliamo essere
    onesti con te; anche se abbiamo voluto esplorare questa teoria attraverso
    la nostra visualizzazione, ci sono diversi problemi fondamentali: primo,
    come abbiamo menzionato, dal momento che lo stesso colore può essere
    composto da varie combinazioni di onde, potremmo al meglio andare sempre
    da una nota ad un colore specifico, ma non al contrario.
  </p>
  <p>
    In secondo luogo, anche se le chiamiamo entrambe <em>onde</em>, il suono
    e la luce sono due tipi di onde essenzialmente diverse: le prime sono
    <a href="https://it.wikipedia.org/wiki/Onda_longitudinale>onde di
    compressione</a>, mentre le seconde sono
    <a href="https://it.wikipedia.org/wiki/Radiazione_elettromagnetica">
    onde elettromagnetiche</a>. Pertanto, le onde acustiche si propagano
    spostando la materia (come le onde su un lago, o quelle sismiche), e quindi
    necessitano di un mezzo di cui propagarsi, mentre le onde elettromagnetiche
    no. Quindi non è che se davvero rallentassimo le onde elettromagnetiche
    ad un certo punto le udiremmo, ahimé!
  </p>
  <p>
    In terzo luogo, le onde di luce e quelle sonore hanno velocità
    completamente diverse, ed interagiscono con l'ambiente di propagazione
    in maniere fondamentalmente differenti. In pratica, potresti raddoppiare
    la frequenza di un suono finché non raggiungi il raggio delle frequenze
    visibili, ma la lunghezza d'onda che ne risulta non sarà quella che ti
    saresti aspettato. Per farla semplice, i conti non tornano.
  </p>
  <p>
    Ma giocaci e divertiti! Tra l'altro, se sei un
    <a href="https://it.wikipedia.org/wiki/Sinestesia_(psicologia)">
    sinesteta</a>, facci sapere se le relazioni corrispondono in qualche
    modo a quelle che percepisci. Ci piacerebbe sentire la tua esperienza!
  </p>`,
  ONE_COLOR_ONE_SOUND_TITLE: `Aspetta, non andartene! Ho sentito dire che
  ogni colore corrisponde ad un suono. Spiegamelo per favore.`,
  INFOBAR_TITLE: `Il Suono dei Colori`,
  TL_DR: `
  <p>
    <strong><a target="_blank" href="https://www.slengo.it/define/tl;dr">
    TL; DR:</a></strong> Questa è un'esplorazione e visualizzazione di come
    i suoni ed i colori potrebbero interagire fra loro. Ci sono due punti
    principali: uno in cui esploriamo le <a href="#what-about-sound">relazioni
    tra due suoni</a> (tenendo un punto di riferimento fisso) come proporzioni sulla
    ruota cromatica.
  </p>
  <p>
    Nel secondo esperimento, proviamo a convertire
    <a href="#one-color-one-sound">colori puri in suoni equivalenti</a>.
  </p>
  <p>
    In soldoni tutto quì! Divertiti!
  </p>`,
  WHAT_ABOUT_SOUND_CONTENT: `
  <p>
    Anche il suono è un'onda—sebbene di un altro tipo—ed è interessante
    notare come anche lì, la relazione 2:1 ha un significato molto
    peculiare per il cervello umano. Questa relazione si chiama
    <a href="https://it.wikipedia.org/wiki/Ottava_(musica)">ottava</a>.
  </p>
  <p>
    Per esempio, avrai sentito che, nel nostro sistema musicale occidentale,
    un ciclo di note inizia tipicamente da un Do e finisce ad un Do
    “più alto”. Questa “distanza fisica” tra questi due Do è, in effetti,
    il doppio della frequenza. Queste due note, pur essendo oggettivamente
    frequenze differenti, appaiono e suonano alle nostre orecchie come se
    fossero <strong>essenzialmente della stessa qualità</strong>. Infatti,
    tipicamente se chiedi ad un uomo ed una donna di cantare la stessa nota,
    finiranno per cantare una nota ad un'ottava di distanza.
  </p>
  <p>
    Questo fatto non è fenomeno culturale, ma è percepito così praticamente
    in maniera universale, da tutte le culture umane. Possiamo dire che,
    in un certo senso, <strong>tutta la musica acccade entro il cerchio
    dell'ottava</strong>.
  </p>
  <p>
    La maniera in cui decidi di dividere il cerchio in note discrete è ciò
    che crea la parte essenziale e distintiva di un sistema musicale di ogni
    cultura. Nonostante questo, ci sono certi rapporti matematici che sono
    più comunemente usati nelle varie culture (puoi imparare, esperire e
    sperimentare un po' di più con questi nel nostro altro esperimento
    <a class="option-name" href="/overtones">
      <img src=${overtoneLogo} alt="Rappresentazione dell'ottavo armonico" />
      Spirale Armonica
    </a>
    ).
  </p>
  <p>
    Quindi ci siamo chiesti: e se tentassimo di visualizzare la ruota cromatica
    con le stesse proporzioni che di solito troviamo armoniose nella musica?
    Ed è così che è nato questo esperimento.
  </p>`,
  WHAT_ABOUT_SOUND_TITLE: `Vai al punto! Che c'entra il suono?`,
  WHAT_IS_THIS_CONTENT: `
  <p>
    Stai vedendo la ruota cromatica, ma do per scontato che questo già lo sai.
    Ti sei mai chiesto perché i colori sono tradizionalmente organizzati
    in un cerchio, e che questo cerchio sei chiude completamente su sé stesso?
    Beh, è complicato.
  </p>
  <p>
    Il colore è, come sai, luce. Ma non tutta la luce appare a noi come colore.
    I nostri occhi possono percepire una frazione molto piccola dello spettro
    elettromagnetico. Ogni onda elettromagnetica può essere caratterizzata,
    come ogni altra onda, da una delle sue due componenti essenziali: la sua
    frequenza (cioé il numero di oscillazioni che fa nello spazio di
    un secondo), oppure la sua lunghezza d'onda (cioé la distanza tra ogni
    “picco” ed ogni “valle” dell'onda).
  </p>
  <p>
    All'interno di questo continuo, noi chiamiamo <em>infrarossi</em> quelle
    onde elettromagnetiche che sono troppo lente (o lunghe) per essere
    percepite dai nostri occhi, perché è in quella parte dello spettro che
    la luce inizia ad apparirci rossa. Aumentando la frequenza, entriamo
    nel piccolo raggio di tutti i colori (umanamente) visibili; di lì, ad un
    certo punto, percepiamo i toni violetti ed alla fine l'onda svanisce
    di nuovo—essendo troppo veloce (o corta) per essere percepita dai nostri
    occhi—in quelle frequenze che noi chiamiamo—l'hai indovinato—gli
    <em>ultravioletti</em>.
    <figure>
      <img src="${ROOT_URL}images/em-spectrum.svg" />
      <figcaption>
        <span class="caption">
          Una rappresentazione lineare dello spettro elettromagnetico
          evidenziando lo spettro visibile
        </span>
      </figcaption>
    </figure>
  </p>
  <p>
    Quindi, starai forse pensando: questo suona un sacco come una linea, e non
    tanto come un cerchio. Come si incontrano i due capi di questa linea?
  </p>`,
  WHAT_IS_THIS_TITLE: `Che cosa sto guardando?`
}

const intervals = {
  "Perfect unison": "Unisono",
  "Ragisma": "Ragisma",
  "Breedsma": "Breedsma",
  "Cent": "Cent",
  "Millioctave": "Milliottava",
  "Schisma": "Scisma",
  "Savart": "Savart",
  "Septimal kleisma": "Kleisma settenario",
  "Kleisma": "Kleisma",
  "Semicomma": "Semicomma",
  "Sixteenth tone": "Sedicesimo di tono",
  "Orwell comma": "Comma di Orwell",
  "Small septimal semicomma": "Semicomma settenario piccolo",
  "Undecimal seconds comma": "Comma undecimale",
  "Diaschisma": "Diascisma",
  "Syntonic comma": "Comma sintonico",
  "Pythagorean comma": "Comma pitagorico",
  "Septimal comma": "Comma settenario",
  "Undecimal diesis": "Diesis undecimale",
  "Sixth tone": "Sesto di tono",
  "Jubilisma": "Jubilisma",
  "Septimal diesis": "Diesis settenario",
  "Inferior quarter tone": "Quarto di tono inferiore",
  "Fifth tone": "Quinto di tono",
  "Enharmonic diesis": "Diesis enarmonico",
  "Augmented unison": "Unisono aumentato",
  "Superior quarter-tone": "Quarto di tono superiore",
  "Septimal quarter tone": "Quarto di tono settenario",
  "Just quarter tone": "Quarto di tono giusto",
  "Greater quarter-tone": "Quarto di tono maggiore",
  "Septimal minor second": "Seconda minore settenaria",
  "Chromatic diesis": "Diesis cromatico",
  "Third tone": "Terzo di tono",
  "Tridecimal third tone": "Terzo di tono tridecimale",
  "Narrow fourth": "Quarta stretta",
  "Hard semitone": "Semitono duro",
  "Septimal chromatic semitone": "Semitono cromatico settenario",
  "Limma": "Limma",
  "Chromatic semitone": "Semitono cromatico",
  "Just minor semitone": "Semitono minore giusto",
  "Equal-tempered minor second": "Seconda minore temperata",
  "Minor diatonic semitone": "Semitono diatonico minore",
  "Minor second": "Seconda minore",
  "Apotome": "Apotomo",
  "Septimal diatonic semitone": "Semitono diatonico settenario",
  "Supraminor second": "Seconda supraminore",
  "Large limma": "Limma largo",
  "Two-third tone": "Due terzi di tono",
  "Small neutral second": "Seconda neutrale piccola",
  "Equal-tempered neutral second": "Seconda neutrale temperata",
  "Grave whole tone": "Tono grave",
  "Neutral second": "Seconda neutrale",
  "Submajor second": "Seconda sottomaggiore",
  "Pythagorean minor tone": "Tono minore pitagorico",
  "Minor tone": "Tono minore",
  "Equal-tempered major second": "Seconda maggiore temperata",
  "Major second": "Seconda maggiore",
  "Just diminished third": "Terza diminuita giusta",
  "Semi-augmented whole tone": "Tono semi-aumentato",
  "Supermajor second": "Seconda supramaggiore",
  "Subminor third": "Terza sottominore",
  "Just augmented second": "Seconda aumentata giusta",
  "Tridecimal minor third": "Terza minore tridecimale",
  "Pythagorean minor third semiditone": "Semiditono pitagorico",
  "Overtone minor third": "Terza minore armonica",
  "Equal-tempered minor third": "Terza minore temperata",
  "Minor third": "Terza minore",
  "Pythagorean augmented second": "Seconda aumentata pitagorica",
  "Superminor third": "Terza supraminore",
  "Acute minor third": "Terza minore acuta",
  "Septimal neutral third": "Terza neutrale settenaria",
  "Undecimal neutral third": "Terza neutrale undecimale",
  "Equal-tempered neutral third": "Terza neutrale temperata",
  "Tridecimal neutral third": "Terza neutrale tridecimale",
  "Grave major third": "Terza maggiore grave",
  "Just augmented fifth": "Quinta aumentata giusta",
  "Pythagorean diminished fourth": "Quarta pitagorica diminuita",
  "Major third": "Terza maggiore",
  "Equal-tempered major third": "Terza maggiore temperata",
  "Pythagorean major third": "Terza maggiore pitagorica",
  "Undecimal diminished fourth": "Quarta diminuita undecimale",
  "Just diminished fourth": "Quarta diminuita giusta",
  "Septimal major third": "Terza maggiore settenaria",
  "Tridecimal major third": "Terza maggiore tridecimale",
  "Just augmented third": "Terza aumentata giusta",
  "Wide augmented third": "Terza aumentata larga",
  "Perfect fourth": "Quarta giusta",
  "Equal-tempered perfect fourth": "Quarta temperata",
  "Imperfect fourth": "Quarta imperfetta",
  "Pythagorean major sixth": "Sesta maggiore pitagorica",
  "Undecimal augmented fourth": "Quarta aumentata undecimale",
  "Superfourth": "Supraquarta",
  "Tridecimal augmented fourth": "Quarta aumentata tridecimale",
  "Just augmented fourth": "Quarta aumentata giusta",
  "Lesser septimal tritone": "Tritono settenario minore",
  "Pythagorean diminished fifth": "Quinta diminuita pitagorica",
  "Augmented fourth": "Quarta aumentata",
  "Equal-tempered tritone": "Tritono temperato",
  "Diminished fifth": "Quinta diminuita",
  "Pythagorean tritone": "Tritono pitagorico",
  "Greater septimal tritone": "Tritono settenario maggiore",
  "Just diminished fifth": "Quinta diminuita giusta",
  "Undecimal subfifth": "Sottoquinta undecimale",
  "Pythagorean diminished sixth": "Sesta diminuita pitagorica",
  "5-limit wolf fifth": "Quinta del lupo",
  "Equal-tempered perfect fifth": "Quinta temperata",
  "Perfect fifth": "Quinta giusta",
  "Classic diminished sixth": "Sesta diminuita classica",
  "Septimal minor sixth": "Sesta minore settenaria",
  "Undecimal minor sixth": "Sesta minore undecimale",
  "Pythagorean minor sixth": "Sesta minore pitagorica",
  "Equal-tempered minor sixth": "Sesta minore temperata",
  "Minor sixth": "Sesta minore",
  "Pythagorean augmented fifth": "Quinta aumentata pitagorica",
  "Golden ratio": "Rapporto aureo",
  "Acute minor sixth": "Sesta acuta minore",
  "Neutral sixth": "Sesta neutrale",
  "Equal-tempered neutral sixth": "Sesta neutrale temperata",
  "Undecimal neutral sixth": "Sesta neutrale undecimale",
  "Grave major sixth": "Sesta maggiore grave",
  "Pythagorean diminished seventh": "Settima diminuita pitagorica",
  "Major sixth": "Sesta maggiore",
  "Equal-tempered major sixth": "Sesta maggiore temperata",
  "Just diminished seventh": "Settima diminuita giusta",
  "Septimal major sixth": "Sesta maggiore settenaria",
  "Just augmented sixth": "Sesta aumentata giusta",
  "Harmonic seventh": "Settima armonica",
  "Minor seventh": "Settima minore",
  "Equal-tempered minor seventh": "Settima minore temperata",
  "Greater just minor seventh": "Settima minore giusta",
  "Pythagorean augmented sixth": "Sesta aumentata pitagorica",
  "Lesser undecimal neutral seventh": "Settima neutrale undecimale",
  "Acute minor seventh": "Settima minore acuta",
  "Septimal neutral seventh": "Settima neutrale settenaria",
  "Undecimal neutral seventh": "Settima neutrale undecimale",
  "Equal-tempered neutral seventh": "Settima neutrale temperata",
  "Grave major seventh": "Settima maggiore grave",
  "Tridecimal neutral seventh": "Settima neutrale tridecimale",
  "Pythagorean diminished octave": "Ottava diminuita pitagorica",
  "Major seventh": "Settima maggiore",
  "Equal-tempered major seventh": "Settima maggiore temperata",
  "Octave − major chroma": "Ottava − croma maggiore",
  "Pythagorean major seventh": "Settima maggiore pitagorica",
  "Classic diminished octave": "Ottava diminuita classica",
  "Septimal major seventh": "Settima maggiore settenaria",
  "Thirty-first harmonic": "Trentunesimo armonico",
  "Septimal supermajor seventh": "Settima supramaggiore settenaria",
  "Just augmented seventh": "Settima aumentata giusta",
  "Semi-diminished octave": "Ottava semidiminuita",
  "Perfect octave": "Ottava",
  "Unknown interval": "Intervallo sconosciuto"
};

const it_IT = {
  ...infoBar,
  ...intervals,
  CREDITS: `
    Progettato e partorito con gioia da&nbsp;
    <a href="https://facebook.com/sunyatasattva">Marco Lucio Giannotta</a> e&nbsp;
    <a href="https://www.facebook.com/skye.lofvander">Skye Løfvander</a>.
  `,
  OPTION_AUTOPLAY_HELP: `
    <p>
      Quando questa opzione è attiva, l'intervallo suonerà automaticamente
      non appena un nuovo colore viene selezionato nella ruota cromatica.
      Quando disattivi questa opzione, puoi continuare a far suonare questi
      suoni cliccando sul cerchio al centro della ruota cromatica.
    </p>
    <p>
      <strong>Trucchetto:</strong> puoi far suonare i due suoni separatamente
      tenendo premuto <kbd>⎇ Alt</kbd> o <kbd>⌥ Opzione</kbd> sulla tastiera
      mentre clicchi sul cerchio (oppure, se sei sul cellulare, semplicemente
      tenendo premuto uno dei colori).
    </p>`,
  OPTION_AUTOPLAY_LABEL: `Autoplay`,
  OPTION_COLOR_SLIDERS_HELP: `
  <p>
    Questa opzione mostrerà due cerchi concentrici attorno alla ruota cromatica
    che ti permetteranno di raffinare il colore che vuoi visualizzare,
    selezionando
    <a
      target="_blank"
      href="https://it.wikipedia.org/wiki/Luminosit%C3%A0_(percezione)"
    >
      luminosità</a>
    e
    <a
      target="_blank"
      href="https://it.wikipedia.org/wiki/Saturazione_(colorimetria)">
      saturazione
    </a>.
  </p>
  <p>
    Nota che questo non avrà nessun effetto sulle note suonate, visto
    che queste dipendono solo dalla tonalità selezionata.
  </p>`,
  OPTION_COLOR_SLIDERS_LABEL: `Mostra controlli colore`,
  OPTION_LOCK_RATIO_HELP: `
  <p>
    Quando questa opzione è abilitata, muovendo una delle manopole della
    ruota cromatica preserverà il rapporto attualmente attivo.
  </p>`,
  OPTION_LOCK_RATIO_LABEL: `Blocca rapporto`,
  OPTION_MODE_ABSOLUTE_LABEL: `Assoluta`,
  OPTION_MODE_HELP: `
  <p>
    Nella modalità “intervallo”, puoi esperire la relazione musicale tra
    due colori. Le tonalità dei colori non sono importanti in questa modalità,
    solo la relazione fra di loro.
  </p>
  <p>
    D'altro canto, in modalità “assoluta”, puoi udire il suono di un
    singolo colore, ascoltando la sua frequenza trasposta ad un raggio
    udibile.
  </p>`,
  OPTION_MODE_INTERVAL_LABEL: `Intervallo`,
  OPTION_MODE_LABEL: `Modalità`,
  OPTION_REFERENCE_HELP: `
  <p>
    Nella modalità “intervallo”, la ruota cromatica è la rappresentazione
    di un'
    <a
      target="_blank"
      href="https://it.wikipedia.org/wiki/Ottava_(musica)"
    >
      ottava
    </a>; pertanto, i colori non rappresentano valori assoluti, ma un
    rapporto relativo fra di loro.
  </p>
  <p>
    Una delle manopole della ruota cromatica (mostrata con un puntino
    al centro), rappresenta questa frequenza fissa. Puoi cambiare questa
    frequenza usando questa opzione.
  </p>`,
  OPTION_REFERENCE_LABEL: `Frequenza di riferimento`,
  OPTION_ROUND_HELP: `
  <p>
    È probabilmente più utile visualizzare rapporti che hanno una qualche
    sorta di
    <a target="_blank" href="https://en.wikipedia.org/wiki/Limit_(music)">
    rilevanza pratica in musica</a>.
    Con questa opzione, puoi assicurarti che il rapporto mostrato nel riquadro
    sia tra quelli utilizzati in un dato temperamento. La differenze, espressa
    in <a target="_blank" href="https://it.wikipedia.org/wiki/Cent_(musica)">
    cent</a> con quel dato rapporto è mostrata sotto il rapporto stesso.
  </p>`,
  OPTION_ROUND_LABEL: `Arrotonda al rapporto più vicino`,
  OPTION_ROUND_O_NONE: `Nessuno`,
  OPTION_ROUND_O_LIMIT: `Limite {n}`,
  OPTION_ROUND_O_12TET: `Temperamento Equabile`,
  OPTION_VISIBLE_SPECTRUM_HELP: `
  <p>
    La rappresentazione di default per questa modalità è quella di un
    <a target="_blank" href="https://it.wikipedia.org/wiki/Cerchio_cromatico">
    cerchio cromatico</a>, che rappresenta la maniera nella quale il nostro
    cervello processa i colori, ma non è una rappresentazione fisica accurata.
  </p>
  <p>
    Con questa opzione, puoi passare ad una rappresentazione più accurata in
    termini fisici dello
    <a target="_blank" href="https://it.wikipedia.org/wiki/Spettro_visibile">
    spettro della luce visibile</a>.
  </p>`,
  OPTION_VISIBLE_SPECTRUM_LABEL: `Mostra spettro della luce visibile`,
  OPTIONS_HEADER: `Opzioni`,
  OVERTONE_SPIRAL: `Spirale Armonica`,
  RATIO_INPUT_INFO: `Entra un intervallo e premi <kbd>Invio ↵</kbd>`,
  RATIO_INPUT_ERROR: `Per favore entra un intervallo valido, nella forma <pre>num/den</pre>
  o <pre>num:den</pre>`,
  SOCIAL_DONATE: `Dona`,
  SOCIAL_SHARE: `Condividi`,
  SOCIAL_SOURCE: `Codice Sorgente`,
  SOCIAL_TWEET: `Tweet`,
  VERSION_INFO: `
    &nbsp;Versione&nbsp;
    <a href="https://github.com/sunyatasattva/rainbow-spectre/releases/">
      ${projectInfo.version}
    </a>
  `
} as const;

export default it_IT;
