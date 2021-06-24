import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import './styles/styles.scss'
import { AuthContextProvider } from './contexts/AuthContextProvider'


function App() {
    return (
        <AuthContextProvider>
            <BrowserRouter>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/new-room' component={NewRoom} />
                </Switch>
            </BrowserRouter>
        </AuthContextProvider>
    )
}

export default App;