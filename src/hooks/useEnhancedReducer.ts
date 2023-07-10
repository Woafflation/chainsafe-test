import type { Dispatch } from 'react'

import { useCallback, useMemo, useReducer, useRef } from 'react'

type Reducer<S, A> = (state: S, action: A) => S

type Middleware<S, A> = (state: S) => (getState: () => S) => (next: (action: A) => void) => Dispatch<A>

export const useEnhancedReducer = <S, A>(
  reducer: Reducer<S, A>,
  initState: S,
  middlewares: Middleware<S, A>[] = [],
): [S, Dispatch<A>, () => S] => {
  const lastState = useRef<S>(initState)
  const middlewaresRef = useRef<Middleware<S, A>[]>(middlewares)
  const enhancedReducer = useRef<Reducer<S, A>>((state, action) => (lastState.current = reducer(state, action))).current

  const [state, dispatch] = useReducer<Reducer<S, A>>(enhancedReducer, initState)

  const getState = useCallback(() => lastState.current, [])

  const enhancedDispatch = useMemo(
    () => middlewaresRef.current.reduceRight((acc, mdw) => (action) => mdw(state)(getState)(acc)(action), dispatch),
    [getState, state],
  )

  return [state, enhancedDispatch, getState]
}
