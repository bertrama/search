import { useEffect } from 'react'

function reducer(state, action) {
  switch(action.type) {
    case 'setStatus':
      return { ...state, status: action.status }
    default:
      return state
  }
}

export default function useSearch() {
  const [state, dispatch] = useReducer(reducer, { status: null });

  useEffect(() => {
    if (state.status === null) setupPride() 
  })

  return [
    props,
    dispatch
  ]
}

function setupPride() {
  console.log('setupPride ...')
}