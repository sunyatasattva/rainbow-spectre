declare module "pitch-set" {
  export default function pitchSet(
    pitches: string,
    startingTone: string
  ): string[]
}

declare module "pitch-sort" {
  export default function pitchSort(pitches: string[]): string[]
}

