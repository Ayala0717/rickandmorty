import { useEffect, useState } from 'react'
import { CardBox } from '@/components/box/card'
import { useAppDataStore } from '@/store'
import { isEmptyObject } from '@/utils/obj'
import { index as getCharacters } from '@/api/characters'
import { CharactersModel } from '@/types/models/characters'
import { isEmptyArray } from '@/utils/array'
import { Button } from '@/components/ui/button'
import { DialogBox } from '@/components/box/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'

function Home() {
  const [characters, setCharacters] = useState<CharactersModel>()
  const [page, setPage] = useState(1)
  const user = useAppDataStore((state) => state.user)

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await getCharacters({ page })
        setCharacters(response)
      } catch (error) {
        throw new Error(String(error))
      }
    }

    fetchCharacters()
  }, [page])

  const pagination = (url: string) => {
    const urlSplit = url.split('=')
    const pageNumber = urlSplit.at(-1)

    setPage(Number(pageNumber || 1))
  }

  return (
    <section>
      {!isEmptyObject(user) && (
        <h1 className='sticky top-0 z-50 mb-1 bg-black p-10 text-white'>
          {user?.username}
        </h1>
      )}
      <div className='block h-14 md:h-10'>
        {Boolean(characters?.info.prev) && (
          <Button
            className='absolute left-10 mt-3'
            onClick={() => pagination(String(characters?.info.prev))}
          >
            {'Anterior'}
          </Button>
        )}
        {Boolean(characters?.info.next) && (
          <Button
            className='absolute right-10 mt-3'
            onClick={() => pagination(String(characters?.info.next))}
          >
            {'Siguiente'}
          </Button>
        )}
      </div>

      <div className='grid grid-cols-8 gap-5 sm:p-5'>
        {Boolean(characters) &&
          !isEmptyArray(characters?.results || []) &&
          characters?.results?.map((character) => (
            <CardBox
              key={character.id}
              headerDescription={`Especie: ${character?.species || ''}`}
              title={character?.name || 'Title'}
              titleClasses='text-xl'
              wrapperClassses='col-span-8 md:col-span-2 sm:col-span-4 relative'
            >
              <section className='flex w-full flex-col items-center justify-center'>
                <img
                  alt={`character ${character?.name || ''}`}
                  className='aspect-square rounded-sm'
                  src={character.image}
                />
                <div className='mb-6 mt-3 flex w-full flex-row items-center justify-around'>
                  <p>
                    <b>{'Genero: '}</b>
                    {character?.gender || ''}
                  </p>
                  <p>
                    <b>{'Estado: '}</b>
                    {character?.status || ''}
                  </p>
                </div>
                <DialogBox
                  description={`Origen: ${character.origin.name}`}
                  requireAcceptButton={false}
                  title={character.name}
                  trigger={
                    <Button className='absolute bottom-0 top-auto w-full'>
                      {'Información del personaje'}
                    </Button>
                  }
                >
                  <section className='flex w-full flex-col items-center justify-center'>
                    <img
                      alt={`character ${character?.name || ''}`}
                      className='aspect-square rounded-sm'
                      src={character.image}
                    />
                    <div className='mb-6 mt-3 min-w-fit  columns-2 space-y-2'>
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
                    <div className='w-full space-y-4'>
                      <p>
                        <b>{'Capítulos en donde aparece: '}</b>
                      </p>
                      {Boolean(character.episode) && (
                        <ScrollArea className='h-36 w-full rounded-md border p-1'>
                          <ul>
                            {character.episode.map((cap, idx) => (
                              // eslint-disable-next-line react/no-array-index-key
                              <li key={idx}>
                                <a
                                  href={cap}
                                  rel='noopener noreferrer'
                                  target='_blank'
                                >
                                  <b>{`Capítulo: ${cap.split('/').at(-1)}`}</b>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </ScrollArea>
                      )}
                    </div>
                  </section>
                </DialogBox>
              </section>
            </CardBox>
          ))}
      </div>
    </section>
  )
}

export default Home
