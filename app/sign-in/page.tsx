import Login from 'components/login'

export default async function SignInPage() {
  return (
    <div className="flex h-[calc(100vh-theme(spacing.16))] items-center justify-center py-10">
      <Login />
    </div>
  )
}
