import "server-only"

import { cache } from "react"

export function createServerCache<Args extends readonly unknown[], Result>(
  loader: (...args: Args) => Promise<Result>
): (...args: Args) => Promise<Result> {
  return cache(loader as (...args: Args) => Promise<Result>)
}
