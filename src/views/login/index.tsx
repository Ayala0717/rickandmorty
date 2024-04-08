import { useNavigate } from 'react-router'
import { z } from 'zod'
import { CardBox } from '@/components/box/card'
import { FormBox } from '@/components/box/form'
import { useAppDataStore } from '@/store'
import { FormFieldsModel } from '@/types/components/form'
import { UserModel } from '@/types/models/user'
import { index as getUser } from '@/api/common'
import { compareObjects } from '@/utils/obj'

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'Logitu mínima de 3 caracteres' })
    .trim(),
  password: z
    .string()
    .min(3, { message: 'Logitu mínima de 3 caracteres' })
    .trim()
})

const defaultValues: UserModel = {
  username: '',
  password: ''
}

const formFields: FormFieldsModel<UserModel>[] = [
  {
    fieldName: 'username',
    label: 'Nombre de usuario',
    componentProps: { autoFocus: true }
  },
  {
    fieldName: 'password',
    label: 'Contraseña',
    componentProps: { type: 'password' }
  }
]

function Login() {
  const authUser = useAppDataStore((state) => state.setAuthState)
  const navigate = useNavigate()

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    const { auth } = await getUser()
    const validAuth = compareObjects(auth, values)

    if (validAuth) {
      authUser(true, auth)
      navigate('/home')
    }
  }

  return (
    <section className='flex h-dvh flex-col items-center justify-center'>
      <CardBox
        headerDescription='Ingresa tu información para acceder'
        title='Bienvenido'
        titleClasses='text-3xl'
        wrapperClassses='md:w-[32rem] w-11/12'
      >
        <FormBox
          requireSubmit
          defaultValues={defaultValues}
          formField={formFields}
          formSchema={formSchema}
          formWrapperClasses='w-full'
          onSubmit={handleSubmit}
        />
      </CardBox>
    </section>
  )
}

export default Login
