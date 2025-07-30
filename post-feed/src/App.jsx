import './index.css'
import { BrowserRouter ,Routes, Route} from 'react-router-dom'
import PostFeed from './components/PostFeed'
import PostDetail from './components/PostDetail'
import { Post } from './components/PostContext'

function App() {

  return (
    <Post>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PostFeed />} />
          <Route path="/postdetail/:id" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </Post>
  );
}

export default App
