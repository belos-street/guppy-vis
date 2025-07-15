export function interpolateNumber(t: number, start: number, stop: number) {
  return start * (1 - t) + stop * t
}

function interpolateColor(t: number, start: number[], stop: number[]) {
  const r = interpolateNumber(t, start[0], stop[0])
  const g = interpolateNumber(t, start[1], stop[1])
  const b = interpolateNumber(t, start[2], stop[2])
  return `rgb(${r}, ${g}, ${b})`
}

export function normalize(value: number, start: number, stop: number) {
  return (value - start) / (stop - start)
}

export function createLinear(domain: [d0: number, d1: number], range: [r0: number, r1: number], interpolate = interpolateNumber) {
  return (value: number) => {
    const t = normalize(value, domain[0], domain[1])
    return interpolate(t, range[0], range[1])
  }
}
