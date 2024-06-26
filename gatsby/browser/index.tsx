import React from 'react'
import Bugsnag from '@bugsnag/js'
import BugsnagPluginReact from '@bugsnag/plugin-react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BuyButtonProvider } from 'src/components/buybutton'

const unSnag = ['development', 'test'].includes(process.env.NODE_ENV)

if (!unSnag) {
  Bugsnag.start({
    apiKey: process.env.GATSBY_BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
  })
}

const ErrorBoundary = unSnag
  ? React.Fragment
  : Bugsnag.getPlugin('react').createErrorBoundary(React)

export const wrapRootElement = ({ element }) => {
  const queryClient = new QueryClient()

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <BuyButtonProvider>{element}</BuyButtonProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export const onClientEntry = () => {
  // IE11 timezone polyfill
  require('date-time-format-timezone')
}
