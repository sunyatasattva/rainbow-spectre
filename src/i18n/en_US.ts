const en_US = {
  OPTION_AUTOPLAY_HELP: `When this option is enabled, the interval will
    automatically play as soon as a new color from
    the color wheel is selected. When you disable this option,
    you can still play the sounds by clicking on the circle in the
    middle of the color wheel. Trick: you can play the sounds
    separately by holding [Alt] or [Option] on your keyboard
    when clicking the circle (or Long Pressing if you are on
    mobile).`,
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
    OPTIONS_HEADER: `Options`
} as const;

export default en_US;
