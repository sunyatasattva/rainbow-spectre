import { mdiCircleMultiple, mdiWaveform } from "@mdi/js";

const ROOT_URL = `/sound-of-color/`;

const infoBar = {
  HOW_DO_ENDS_MEET_CONTENT: `
  <p>
    To put it bluntly, it's a trick of our perception. Well… like
    everything else, I suppose. The thing is: our brains are surprisingly
    good at pattern recognition. That seems our primary meaning-making
    mechanism: we do not care about things in isolation, but only about
    relationships; things that do not form regularities, or orderly
    perceptions, we call “noise” and we filter them out very efficiently
    from our perceptual data.
  </p>
  <p>
    Incidentally, that is why we like very regular shapes like squares and
    circles; why we think simmetry is beautiful; why we invented
    (or discovered, depending on your school of thought) geometry and math.
  </p>
  <p>
    So, what is this relationship that makes the ends meet? It is indeed
    the <strong>simplest mathematical relationship of all times</strong>:
    2:1.
  </p>
  <p>
    The visible spectrum that I mentioned above is in fact a very small
    slice of the whole spectrum, in which the higher end is about twice
    the wavelength of the lower end (between around 380nm and 700nm).
  </p>
  <p>
    It is, you might have noticed, in fact a little bit less than twice,
    and indeed if you switch the
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiWaveform}" />
      </svg>
      Show visible spectrum
    </strong> option (which
    shows a more accurate representation of the physical spectrum of
    “pure wavelengths”—we'll get to that, don't worry), you will see
    that there is an invisible gap and the ends do not truly meet.
    <figure>
      <img src="${ROOT_URL}images/rgb-illumination.jpg" />
      <figcaption>
        <span class="caption">
          Notice how Magenta appears as a combination of equal amounts of blue
          and red light
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
    However, our eyes bridge that gap by making up the color commonly known
    as <em>magenta</em>, which is how we make sense of light with
    red and violet components of equal intensity: and thus a smooth
    transition between the two ends appears.
  </p>`,
  HOW_DO_ENDS_MEET_TITLE: `How do the two ends meet?`,
  ONE_COLOR_ONE_SOUND_CONTENT: `
  <p>
    We do explore this claim too: you can do so by clicking over the
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiCircleMultiple}" />
      </svg>
      Absolute mode
    </strong> .
  </p>
  <p>
    You'll see a few things change: for one, many of the options will
    disappear, as they are no longer relevant. Most importantly, the color
    wheel will be in the
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiWaveform}" />
      </svg>
      Visible spectrum
    </strong> mode.
  </p>
  <p>
    Let's look at the difference between the two: as
    <a href="#what-is-this">we have mentioned above</a>, in theory, a pure
    electromagnetic wave of a certain frequency or wavelength, such as one
    emitted by a laser, appears to our eyes as a specific color.
    <figure>
      <img src="${ROOT_URL}images/laser.jpg" />
      <figcaption>
        <span class="caption">
          Red lasers: 660nm, 635nm;
          Green lasers: 532nm, 520nm;
          Blue lasers: 445nm, 405nm
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
    That is what you see in the
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiWaveform}" />
      </svg>
      Visible spectrum
    </strong> mode. Starting
    from invisible, infrared wavelengths, you can follow clockwise as the
    wavelengths become shorter and we see all the rainbow colors, until
    we fade back into invisibility on the ultraviolets wavelengths.
  </p>
  <p>
    However, life is almost never as pure as physics, and the light we
    come across is oftentimes not a pure wave: it is instead a mix of
    many waves, which get interpreted by our eyes as being of one color.
    As such, a yellow color might be the result of very different mixtures
    of red and green light.
  </p>
  <p>
    In contrast, the <em>hue wheel</em> which we display by default is
    a smoother representation of the colors using the
    <a href="https://en.wikipedia.org/wiki/HSL_and_HSV">HSL Color
    Model</a>, which, in a nutshell represents the way our eyes perceive
    the smoother transitions between colors when adding them together.
    And that's why magenta is there, as we have mentioned above.

    <figure>
      <img src="${ROOT_URL}images/hsv-cylinder.png" />
      <figcaption>
        <span class="caption">
          In the HSL/HSV system, hues are arranged radially to more closely
          align with the way human vision perceives color-making attributes.
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
    To get back to the question of translating one color into one sound,
    the theory goes like this: each pure color is a wave with a certain
    frequency. The frequency is obviously very high, but what would happen
    if we took that frequency and <em>slowed it down</em> until it reached
    the range of audible, or even musical frequencies? Keeping in mind
    <a href="#what-about-sound">what we learned about the octave</a>, since
    the significance of the sound doesn't change with each circle doubling
    its frequency, we should get an equivalent sound that we can play
    and sing.
  </p>
  <p>
    In
    <strong class="option-name">
      <svg viewBox="0 0 24 24">
        <path d="${mdiCircleMultiple}" />
      </svg>
      Absolute mode
    </strong>, this is what you see: you can play around and you'll see on
    the information box the note which has been calculated through this
    process, halving the frequency of a given color about 40 times in order
    to get to audible ranges.
    You can see its wavelength on the top right corner, the closest note
    in our <a href="https://en.wikipedia.org/wiki/12_equal_temperament">
    12 Tone Equally Tempered System</a> using the 
    <a href="https://en.wikipedia.org/wiki/A440_(pitch_standard)">Stuttgart
    Pitch Reference</a>; and at the bottom how many
    <a href="https://en.wikipedia.org/wiki/Cent_(music)">cents</a> does it
    actually diverge from the reference note.

    <figure>
      <img src="${ROOT_URL}images/compression-wave.gif" />
      <figcaption>
        <span class="caption">
          Representation of the propagation of a sound wave through a medium
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
    We loved if all of this were true, but we want to be honest with you,
    and even though we wanted to explore this through our visualization,
    this theory has some fundamental problems: for one, as we mentioned,
    since the same color can be made of multiple combinations of waves,
    we could perhaps always go from an audible pitch to a specific color,
    but not the other way around.
  </p>
  <p>
    Secondly, even though we call both of them <em>waves</em>, sound and
    light are two essentially different kind of waves: the former are
    <a href="https://en.wikipedia.org/wiki/Longitudinal_wave">compression
    waves</a>, while the latter are
    <a href="https://en.wikipedia.org/wiki/Electromagnetic_radiation">
    electromagnetic waves</a>. As such, acoustic waves propagate by
    displacing matter (like waves on a lake, or seismic waves) and thus
    need a medium, while electromagnetic waves do not need a medium.
    So it's not like if you actually slowed down electromagnetic waves,
    you'd all of a sudden hear them, alas.
  </p>
  <p>
    Thirdly, light waves and sound waves have completely different speeds
    and interact with mediums in a different way. In a nutshell, you can
    double the frequency of a sound until you get in the range of the
    frequency of light, but the resulting wavelength will not be the
    one that you had expected. Simply, the math just doesn't add up.
  </p>
  <p>
    But play with it and have fun! Also, if you are
    <a href="https://en.wikipedia.org/wiki/Synesthesia">synesthetic</a>,
    let us know if the relationships correspond at all to the ones you
    perceive. We'd love to hear from you!
  </p>`,
  ONE_COLOR_ONE_SOUND_TITLE: `Wait, don't go! I've heard each color corresponds to one sound.
  Explain please.`,
  INFOBAR_TITLE: `The Sound of Color`,
  TL_DR: `
  <p>
    <strong>TL; DR:</strong> This is an exploration and visualization 
    on how sounds and colors could interact. There are two main points:
    one in which we explore the <a href="#what-about-sound">
    relationships between two sounds</a> (keeping one fixed reference
    point) as proportions on the color wheel.
  </p>
  <p>
    The second, less sound experiment (pun intended), we try to convert
    <a href="#one-color-one-sound"> pure colors into equivalent musical
    notes.</a>
  </p>
  <p>
    That's it in a nutshell! Enjoy!
  </p>`,
  WHAT_ABOUT_SOUND_CONTENT: `
  <p>
    Sound, too, is a wave—albeit of a different kind—and interestingly,
    there too does the relationship 2:1 have a very peculiar significance
    to the human brain. We call that relationship
    <a href="https://en.wikipedia.org/wiki/Octave">the octave</a>.
  </p>
  <p>
    For example, in our western musical system, you might have heard of
    our cycle of notes typically starting from C and going back to C.
    The “physical distance” between these two “C”s is, indeed, double
    the frequency. These notes, while objectively of different frequencies,
    sound to our ears as <strong>essentially of the same quality</strong>.
    In fact, if you typically ask a man and a woman to sing the same note,
    they will do so one octave apart.
  </p>
  <p>
    This fact is not cultural, and is basically perceived in this way
    universally, across human cultures. You can say that, in a sense,
    <strong>all music happens within the circle of the octave</strong>.
  </p>
  <p>
    The way you divide the circle into discrete notes is what makes an
    essential and distinctive part of the musical system of each culture.
    However, there are certain other simple mathematical ratios which
    are most often used cross-culturally (you can learn, experience, and
    experiment more with them on <a href="/overtones">the overtone
    spiral</a>).
  </p>
  <p>
    So we wondered: what if we tried to visualize on the color wheel
    the same proportions the we usually find harmonious in music? That's
    how this experiment was born.
  </p>`,
  WHAT_ABOUT_SOUND_TITLE: `Get to the point! What about sound?`,
  WHAT_IS_THIS_CONTENT: `
  <p>
    You are seeing a color wheel, but I assume you already know that.
    Have you ever wondered why colors are traditionally laid down on a
    circle, and that said circle seems to close itself? Well, that's complicated.
  </p>
  <p>
    Color is, as you know, light. But not all light appears to us as
    color. Our eyes can only perceive a very small fraction of
    the electromagnetic spectrum. Every light wave, like any other wave,
    can be characterized by one of its two essential components: its frequency
    (i.e. the amount of oscillations it makes in the space of one second),
    or its wavelength (the distance between each peak and valley
    of the wave).
  </p>
  <p>
    Within this continuum, we call <em>infrared</em> any electromagnetic wave
    which is too slow (or long) for our eyes to perceive, because on that lower
    end of the spectrum is where light starts appearing to us as red.
    Increasing the frequency, we get within the small range of all (humanly)
    visible colors; then, at some point, we perceive the violet tones and
    finallt the wave fades back into invisibility—being too fast (or short)
    for our eyes to perceive—in what we call—you guessed it—the
    <em>ultraviolets</em>.

    <figure>
      <img src="${ROOT_URL}images/em-spectrum.svg" />
      <figcaption>
        <span class="caption">
          A linear representation of the electro-magnetic spectrum
          with a highlight on the visible light
        </span>
      </figcaption>
    </figure>
  </p>
  <p>
    So, you might be thinking: that sounds a lot like a line, rather than
    a circle. How would the two ends meets?
  </p>`,
  WHAT_IS_THIS_TITLE: `What am I watching?`
}

const en_US = {
  ...infoBar,
  CREDITS: `
    Designed and crafted with joy by&nbsp;
    <a href="https://facebook.com/sunyatasattva">Marco Lucio Giannotta</a> and&nbsp;
    <a href="https://www.facebook.com/skye.lofvander">Skye Løfvander</a>.
  `,
  OPTION_AUTOPLAY_HELP: `
    <p>
      When this option is enabled, the interval will
      automatically play as soon as a new color from
      the color wheel is selected. When you disable this option,
      you can still play the sounds by clicking on the circle in the
      middle of the color wheel.
    </p>
    <p>
      <strong>Trick:</strong> you can play the sounds separately by holding
      <kbd>⎇ Alt</kbd> or <kbd>⌥ Option</kbd> on your keyboard when clicking
      the circle (or Long Pressing if you are on mobile).
    </p>`,
  OPTION_AUTOPLAY_LABEL: `Autoplay`,
  OPTION_COLOR_SLIDERS_HELP: `
  <p>
    This option will display two concentrical circles around
    the color picker, for you to refine the exact color you would like
    to pick, by allowing you to choose
    <a target="_blank" href="https://en.wikipedia.org/wiki/Lightness">
      lightness</a>
    and
    <a
      target="_blank"
      href="https://en.wikipedia.org/wiki/Colorfulness#Saturation">
      saturation.</a>
  </p>
  <p>
    Note that this won't have any effect on the notes being
    played, as they are only dependent on the selected hue.
  </p>`,
  OPTION_COLOR_SLIDERS_LABEL: `Show color sliders`,
  OPTION_LOCK_RATIO_HELP: `
  <p>
    When this option is enabled, moving one handle on the color wheel
    will preserve the currently active ratio.
  </p>`,
  OPTION_LOCK_RATIO_LABEL: `Lock ratio`,
  OPTION_MODE_ABSOLUTE_LABEL: `Absolute`,
  OPTION_MODE_HELP: `
  <p>
    In “interval” mode, you can experience the musical
    relationship between two colors. The actual hues of the colors
    are not important in this mode, only their relative relationship.
  </p>
  <p>
    On the other hand, in “absolute” mode, you can hear the sound
    of a single color, by hearing its frequency transposed to
    the audible range.
  </p>`,
  OPTION_MODE_INTERVAL_LABEL: `Interval`,
  OPTION_MODE_LABEL: `Mode`,
  OPTION_REFERENCE_HELP: `
  <p>
    In “interval” mode, the color wheel is a representation
    of an
    <a target="_blank" href="https://en.wikipedia.org/wiki/Octave">octave</a>;
    as such, the colors do not represent absolute values,
    but a ratio relative to each other.
  </p>
  <p>
    One of the handles in the color wheel (shown with a dot in the middle),
    represent the fixed reference frequency. You can change this frequency
    using this option.
  </p>`,
  OPTION_REFERENCE_LABEL: `Reference frequency`,
  OPTION_ROUND_HELP: `
  <p>
    It is probably most useful to see ratios that have some
  sort of
    <a target="_blank" href="https://en.wikipedia.org/wiki/Limit_(music)">
    relevance to practical music</a>.
    With this option, you can make sure the ratio shown in the box
    is among those used in a given temperament. A difference expressed in
    <a target="_blank" href="https://en.wikipedia.org/wiki/Cent_(music)">
    cents</a>
    with that ratio is shown below the ratio itself.
  </p>`,
  OPTION_ROUND_LABEL: `Round to closest ratio`,
  OPTION_ROUND_O_NONE: `None`,
  OPTION_ROUND_O_LIMIT: `{n}-limit`,
  OPTION_ROUND_O_12TET: `12 Equal Temperament`,
  OPTION_VISIBLE_SPECTRUM_HELP: `
  <p>
    The default color space representation for this mode involves a
    <a target="_blank" href="https://en.wikipedia.org/wiki/Color_wheel">
    hue color wheel</a>,
    which best represents the way our brain processes colors,
    but it is not a physically accurate representation.
  </p>
  <p>
    With this option, you can switch to show a physically accurate
    representation of the
    <a target="_blank" href="https://en.wikipedia.org/wiki/Visible_spectrum">
    visible light spectrum</a>.
  </p>`,
  OPTION_VISIBLE_SPECTRUM_LABEL: `Show visible spectrum wheel`,
  OPTIONS_HEADER: `Options`,
  OVERTONE_SPIRAL: `Overtone spiral`,
  RATIO_INPUT_INFO: `Enter your own interval and press <kbd>Enter ↵</kbd>`,
  RATIO_INPUT_ERROR: `Please enter a valid interval, in the form <pre>num/den</pre>
  or <pre>num:den</pre>`,
  SOCIAL_DONATE: `Donate`,
  SOCIAL_SHARE: `Share`,
  SOCIAL_SOURCE: `Source`,
  SOCIAL_TWEET: `Tweet`,
  VERSION_INFO: `
    &nbsp;Version&nbsp;
    <a href="https://github.com/sunyatasattva/rainbow-spectre/releases/">
      1.0.1
    </a>
  `
} as const;

export default en_US;
