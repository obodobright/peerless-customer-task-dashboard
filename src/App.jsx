import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from './styles/theme'
import { GlobalStyles } from './styles/GlobalStyles'
import Dashboard from './pages/Dashboard'
import TaskDetail from './pages/TaskDetail'
import Layout from './components/Layout'

function App() {
    return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/task/:id" element={<TaskDetail />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  )
}

export default App
