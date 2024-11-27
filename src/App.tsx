import { Amplify } from 'aws-amplify'
import outputs from '../amplify_outputs.json'
import { Flex, TextAreaField, Loader, Text, View, Button, Input, SelectField } from "@aws-amplify/ui-react"
import { useAIGeneration } from './client'

import '@aws-amplify/ui-react/styles.css'
import { useState } from 'react'

Amplify.configure(outputs)

function App() {
  const [genre, setGenre] = useState('')
  const [tone, setTone] = useState('')
  const [style, setStyle] = useState('')
  const [{ data, isLoading }, generateShortStory] = useAIGeneration('generateShortStory')

  const handleClick = async () => {
    generateShortStory({
      genre,
      tone,
      style
    })
  }
  return (
    <Flex
      direction="column"
      alignContent="center"
      justifyContent="center"
      height="100vh"
    >
      <Text fontSize="32px" alignSelf="center" paddingBottom="80px">Short Story Generator POC</Text>
      <Flex direction="row" justifyContent="center" alignContent="center" paddingBottom="32px">
        <SelectField
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          variation='quiet'
        >
          <option value="fantasy">Fantasy</option>
          <option value="sci-fi">Sci-fi</option>
          <option value="mystery">Mystery</option>
          <option value="romance">Romance</option>
          <option value="horror">Horror</option>
        </SelectField>
        <SelectField
          label="Tone"
          value={tone}
          onChange={(e) => setTone(e.target.value)}
          variation='quiet'
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="humorous">Humorous</option>
          <option value="adventorous">Adventorous</option>
        </SelectField>
        <SelectField
          label="Style"
          value={style}
          onChange={(e) => setStyle(e.target.value)}
          variation='quiet'
        >
          <option value="fairyTale">Fairy Tale</option>
          <option value="firstPerson">First Person</option>
          <option value="thirdPerson">Third Person</option>
          <option value="poetic">Poetic</option>
        </SelectField>
        <Button variation='primary' onClick={handleClick}>Generate Story</Button>
      </Flex>
      {isLoading ? (
        <Loader variation="linear" />
      ) : (
        <>
          <Text padding="0 50px">{data?.story ?? ''}</Text>
        </>
      )}
    </Flex>
  )
}

export default App
