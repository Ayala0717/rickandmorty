import { useEffect, useState } from 'react'
import { CardBox } from '@/components/box/card'
import { useAppDataStore } from '@/store'
import { isEmptyObject } from '@/utils/obj'
import { index as getCharacters } from '@/api/characters'
import { CharactersModel } from '@/types/models/characters'
import { isEmptyArray } from '@/utils/array'
import { Button } from '@/components/ui/button'

function Home() {
  const [characters, setCharacters] = useState<CharactersModel>()
  const user = useAppDataStore((state) => state.user)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await getCharacters()
        setCharacters(response)
      } catch (error) {
        throw new Error(String(error))
      }
    }

    fetchCharacters()
  }, [])

  return (
    <section>
      {!isEmptyObject(user) && (
        <h1 className='sticky top-0 z-50 mb-1 bg-black p-10 text-white'>
          {user?.username}
        </h1>
      )}
      <div className='grid grid-cols-6 gap-5 sm:p-5'>
        {Boolean(characters) &&
          !isEmptyArray(characters?.results || []) &&
          characters?.results?.map((character) => (
            <CardBox
              key={character.id}
              headerDescription={`Especie: ${character?.species || ''}`}
              title={character?.name || 'Title'}
              titleClasses='text-xl'
              wrapperClassses='col-span-8 md:col-span-2 relative'
            >
              <section className='flex w-full flex-col items-center justify-center'>
                <img
                  alt={`character ${character?.name || ''}`}
                  src={character.image}
                />
                <div className='mb-6 mt-3 min-w-fit columns-1 space-y-2 lg:columns-2'>
                  <p>
                    <b>{'Genero: '}</b>
                    {character?.gender || ''}
                  </p>
                  <p>
                    <b>{'Ubicación: '}</b>
                    {character?.location?.name || ''}
                  </p>
                  <p>
                    <b>{'Origen: '}</b>
                    {character?.origin?.name || ''}
                  </p>
                  <p>
                    <b>{'Tipo: '}</b>
                    {character?.type || ''}
                  </p>
                  <p>
                    <b>{'Estado: '}</b>
                    {character?.status || ''}
                  </p>
                </div>
                <Button className='absolute bottom-0 top-auto w-full'>
                  {'Información del personaje'}
                </Button>
              </section>
            </CardBox>
          ))}
      </div>
    </section>
  )
}

export default Home
