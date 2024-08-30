import { useMsal } from '@azure/msal-react'
import { Toaster, toast } from 'sonner'
import FactorKLogo from '../../assets/images/factor-k-logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { InputForm } from './components/input-form'
import { SignInButton } from './components/sign-in-button'
import { SignUpMicrosoftButton } from '../../components/common/buttons/sign-up-microsoft-button'
import { TASKS_PAGE_URL } from '../../routes/routes-config'
export const LoginPage = () => {
  const { instance } = useMsal()
  const navigate = useNavigate()
  const handleLogin = () => {
    instance
      .loginRedirect({
        scopes: [process.env.VITE_APP_SCOPE!],
      })
      .then(() => {
        navigate(TASKS_PAGE_URL)
      })
      .catch(() => {
        toast.error(
          'An error occurred while trying to log in, please try again'
        )
      })
  }
  return (
    <div className="lg:grid lg:grid-cols-3 p-4 h-screen w-screen">
      <aside className="hidden lg:grid bg-blue-550 rounded-2xl p-12 text-white space-y-14 lg:content-center">
        <h1 className="font-bold text-6xl">
          Welcome to <strong className="text-blue-300">FKBoarding!</strong>
        </h1>
        <p className="font-medium text-2xl">Streamlining Your HR Processes</p>
        <p className="text-lg">
          We strive to be your nearshore software technology partner of choice
        </p>
      </aside>
      <main className="col-span-2 lg:w-2/4 lg:mx-auto grid place-items-center">
        <img
          src={FactorKLogo}
          alt="Factor K Software Logo"
          className="h-32 w-40"
        />
        <form
          action=""
          className="flex flex-col items-center gap-9 h-[calc(100vh-30rem)] w-2/3"
        >
          <InputForm
            id="email"
            label="Email"
            type="text"
            placeholder="name@email.com"
          />

          <InputForm
            id="password"
            label="Password"
            type="password"
            placeholder="Password"
          />

          <Link to="#" className="font-medium inline-block w-full text-right">
            Reset password
          </Link>
          <SignInButton />
          <p className="relative text-sm inline-block w-full overflow-hidden text-center before:absolute before:right-0 before:top-1/2 before:h-0.5 before:w-1/2 before:-translate-y-1/2 before:translate-x-20 before:rounded-full before:bg-gray-400 before:content-[''] after:absolute after:left-0 after:top-1/2 after:h-0.5 after:w-1/2 after:-translate-x-20 after:-translate-y-1/2 text-gray-500 after:rounded-full after:bg-gray-400 after:content-['']">
            Or Login with
          </p>

          <SignUpMicrosoftButton onClick={handleLogin} />
        </form>
        <Toaster position="top-right" richColors />
      </main>
    </div>
  )
}
