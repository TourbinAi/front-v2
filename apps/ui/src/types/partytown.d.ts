declare module "@builder.io/partytown/react" {
  export interface PartytownConfig {
    debug?: boolean
    forward?: string[]
  }

  export function Partytown(props: PartytownConfig): JSX.Element
}
