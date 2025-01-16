import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import Homepage from './components/Pages/Homepage'
import Coinpage from './components/Pages/Coinpage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "./index.css"


const App = () => {
 const router =createBrowserRouter([{
      path:"/",
      element:<AppLayout/>,
      children:[
        {
          path:"/",
          element:<Homepage/>
        },
        {
          path:"/:id",
          element:<Coinpage/>
        }
      ]
 }])
 const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}/>
    </QueryClientProvider>
  )
}

export default App
