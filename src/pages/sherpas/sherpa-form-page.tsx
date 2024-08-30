import { Type, User } from './interfaces/user'
import { useParams } from 'react-router-dom'
import { UploadFileInput } from '../../components/common/core/upload-file-input'
import { AttachedFile } from '../../components/common/core/attached-file'
import { Title } from '../../components/common/core/title'
import { InputFormLabel } from '../../components/common/form/input-form-label'
import { useForm } from 'react-hook-form'
import { isDateBeforeTodayStr } from '../../utils/date-utils'
import { SelectForm } from '../../components/common/form/select-form'
import { TextAreaForm } from '../../components/common/form/text-area-form'
import { useUsersApi } from '../../hooks/use-users-api'
import { useMutation, useQuery } from 'react-query'
import { toast, Toaster } from 'sonner'

const validations = {
  uid: {
    maxLength: {
      value: 250,
      message: 'The uid cannot exceed 250 characters.',
    },
  },
  phoneNumber: {
    maxLength: {
      value: 50,
      message: 'The phone number cannot exceed 50 characters.',
    },
  },
  email: {
    required: { value: true, message: 'The email is required.' },
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: 'Invalid email address',
    },
    maxLength: {
      value: 250,
      message: 'The email cannot exceed 250 characters.',
    },
  },
  address: {
    maxLength: {
      value: 250,
      message: 'The address cannot exceed 250 characters.',
    },
  },
  name: {
    maxLength: {
      value: 250,
      message: 'The name cannot exceed 250 characters.',
    },
  },
  position: {
    maxLength: {
      value: 250,
      message: 'The position cannot exceed 250 characters.',
    },
  },
  hobbies: {
    maxLength: {
      value: 250,
      message: 'The hobbies cannot exceed 250 characters.',
    },
  },
  notes: {
    maxLength: {
      value: 1000,
      message: 'The notes cannot exceed 1000 characters.',
    },
  },
  birthDate: {
    validate: {
      isBeforeToday: (value: string | undefined) =>
        isDateBeforeTodayStr(value || '')
          ? undefined
          : 'Date must be before today',
    },
  },
}

const initialUser: User = {
  id: '',
  uid: '',
  name: 'New Sherpa',
  email: '',
  birthDate: '',
  position: 'Intern',
  matiralStatus: '',
  phoneNumber: '',
  address: '',
  hobbies: '',
  notes: '',
  avatar: '',
  type: Type.Temporally,
  haveChildren: false,
}

interface SherpaFormPageProps {
  mode: 'add' | 'edit'
}

export const SherpaFormPage = ({ mode = 'add' }: SherpaFormPageProps) => {
  const { id } = useParams()
  const { getUsers, createUser, updateUser } = useUsersApi()
  const {
    register,
    formState: { errors },
    getValues,
    handleSubmit,
    reset,
  } = useForm<User>({
    defaultValues: {
      ...initialUser,
    },
  })

  useQuery({
    queryKey: 'user',
    queryFn: () => getUsers(id),
    staleTime: 300000,
    cacheTime: 600000,
    onSuccess: (data: User) => {
      reset(data)
    },
    onError: () => {
      toast.error('An error occurred while trying to get users')
    },
  })

  const mutationAddUser = useMutation({
    mutationFn: (user: User) => {
      return createUser({
        ...user,
        type: Type.Temporally,
      })
    },
    onSuccess: () => {
      toast.success('User created successfully')
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to create a user, please try again'
      )
    },
  })

  const mutationEditUser = useMutation({
    mutationFn: (user: User) => {
      return updateUser({
        ...user,
      })
    },
    onSuccess: () => {
      toast.success('User updated successfully')
    },
    onError: () => {
      toast.error(
        'An error occurred while trying to update a user, please try again'
      )
    },
  })

  const src =
    getValues('avatar') ||
    `https://ui-avatars.com/api/?name=${getValues('name')?.replace(' ', '+') || ''}&background=random`

  console.log(src)

  const handleFormSubmit = (data: User) => {
    if (mode === 'add') {
      mutationAddUser.mutate(data)
    } else if (mode === 'edit') {
      mutationEditUser.mutate(data)
    }
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <Title>Sherpas / {mode === 'add' ? 'Add Sherpa' : 'Edit Sherpa'}</Title>
      <header className="grid grid-cols-8 mb-4">
        <img
          src={src}
          alt={`Profile picture of ${getValues('name')}`}
          className="w-40 h-40 rounded-full object-center row-span-2"
        />

        <h2 className="ml-3 text-2xl font-medium col-span-6">
          {getValues('name')}
        </h2>
        <p className="ml-3 text-xl col-span-6">{getValues('position')}</p>
      </header>
      <section
        className={
          mode === 'add'
            ? 'h-[calc(100vh-310px)]'
            : 'grid grid-cols-8 gap-5 h-[calc(100vh-310px)]'
        }
      >
        <form
          className="col-span-7 grid grid-cols-2 gap-4 h-fit"
          onSubmit={handleSubmit((data) => handleFormSubmit(data))}
        >
          <InputFormLabel
            id="uid"
            label="UID"
            autoComplete="off"
            InputContainerClassType={errors.uid ? 'error' : 'success'}
            error={errors.uid?.message}
            {...register('uid', validations.uid)}
          />
          <InputFormLabel
            id="name"
            label="Name"
            type="text"
            autoComplete="off"
            InputContainerClassType={errors.name ? 'error' : 'success'}
            error={errors.name?.message}
            {...register('name', validations.name)}
          />
          <InputFormLabel
            id="email"
            label="Email"
            type="text"
            autoComplete="off"
            InputContainerClassType={errors.email ? 'error' : 'success'}
            error={errors.email?.message}
            {...register('email', validations.email)}
          />
          <InputFormLabel
            id="birthDate"
            label="BirthDate"
            type="date"
            autoComplete="off"
            InputContainerClassType={errors.birthDate ? 'error' : 'success'}
            error={errors.birthDate?.message}
            {...register('birthDate', validations.birthDate)}
          />
          <InputFormLabel
            id="position"
            label="Position"
            type="text"
            autoComplete="off"
            InputContainerClassType={errors.position ? 'error' : 'success'}
            error={errors.position?.message}
            {...register('position', validations.position)}
          />
          <SelectForm
            id="matiralStatus"
            label="Matiral Status"
            selectClassType={errors.matiralStatus ? 'error' : 'success'}
            error={errors.matiralStatus?.message}
            {...register('matiralStatus')}
          >
            <option value="Married">Married</option>
            <option value="Single">Single</option>
            <option value="Divorced">Divorced</option>
            <option value="Widow">Widow</option>
          </SelectForm>
          <InputFormLabel
            id="phoneNumber"
            label="Phone Number"
            type="text"
            autoComplete="off"
            InputContainerClassType={errors.phoneNumber ? 'error' : 'success'}
            error={errors.phoneNumber?.message}
            {...register('phoneNumber', validations.phoneNumber)}
          />
          <InputFormLabel
            id="address"
            label="Address"
            type="text"
            autoComplete="off"
            InputContainerClassType={errors.address ? 'error' : 'success'}
            error={errors.address?.message}
            {...register('address', validations.address)}
          />
          <InputFormLabel
            id="hobbies"
            label="Hobbies"
            type="text"
            autoComplete="off"
            InputContainerClassType={errors.hobbies ? 'error' : 'success'}
            error={errors.hobbies?.message}
            {...register('hobbies', validations.hobbies)}
            stylesFieldset={{ gridColumn: '1 / span 2' }}
          />
          <TextAreaForm
            id="notes"
            label="Notes"
            textAreaClassType={errors.notes ? 'error' : 'success'}
            error={errors.notes?.message}
            {...register('notes', validations.notes)}
            stylesFieldset={{ gridColumn: '1 / span 2' }}
          />

          <button
            type="submit"
            className="w-40 cursor-pointer rounded-full bg-blue-550 px-4 py-2 ring-0 outline-none text-white transition-colors delay-0 duration-150 ease-linear hover:bg-blue-650 focus:bg-blue-650 active:bg-blue-650 mx-auto col-span-2 mt-5"
          >
            {mode == 'edit' ? 'Save' : 'Create'}
          </button>
        </form>
        {mode == 'edit' ? (
          <aside className="overflow-y-auto">
            <h3 className="text-xl mb-3">Upload files</h3>
            <form className="flex flex-col gap-3">
              <UploadFileInput />
              <AttachedFile
                fileName="test.pdf"
                fileStatus="Uploaded"
                progress={100}
              />
            </form>
          </aside>
        ) : null}
      </section>
    </>
  )
}
