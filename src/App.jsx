import React from 'react'
import Router from './Router/router'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { Toaster } from 'sonner';
const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router/>
      <Toaster richColors/>
    </QueryClientProvider>
  )
}

export default App
