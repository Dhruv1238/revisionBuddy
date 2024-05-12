import { useState } from 'react'
import './App.css'
import { ApiKeyContext } from './context/apiKeyContext'
import { Input, Button, Link } from '@nextui-org/react'
import { useContext } from 'react'
import NavBar from './components/NavBar'
import RevisionBuddy from './components/RevisionBuddy'
function App() {

  const { apiKey, setApiKey, getApiKey } = useContext(ApiKeyContext);

  const [keyInput, setKeyInput] = useState('')

  return (
    <>
      <div className='h-full bg-neutral-800 '>
        {apiKey === null ?
          <div className='flex flex-col w-full justify-center items-center gap-5 p-10'>
            <h1 className='text-4xl text-white text-center'>This Key will be used to interact with your revision buddy</h1>
            <Link
              isExternal
              href="https://aistudio.google.com/app/apikey"
              showAnchorIcon
            >
              Generate API Key
            </Link>
            <div className='flex justify-center items-center gap-5 w-full'>
              <Input
                description="Enter your API key"
                onChange={(e) => setKeyInput(e.target.value)}
                label='API Key'
                labelPlacement='outside'
                color='defualt'
              />
              <Button onClick={() => {
                getApiKey(keyInput)
              }}
                color='success'
              >Save</Button>
            </div>
          </div> :
          <div className='flex flex-col w-full justify-center items-center gap-5'>
            <NavBar />
            <RevisionBuddy />
          </div>
        }
      </div>
    </>
  )
}

export default App
