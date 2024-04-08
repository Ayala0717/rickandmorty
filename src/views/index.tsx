import { useNavigate } from 'react-router-dom'

function Index() {
  const navigate = useNavigate()

  navigate('/home')
}

export default Index
