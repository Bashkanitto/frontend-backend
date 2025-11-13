import Image from 'next/image';
export default function SignInPage() {
  return (
    <div className="rounded-xl bg-white h-180 w-250 flex">
      <div className="flex-1 bg-black rounded-l-xl flex flex-col justify-center items-center">
        <Image
          className="invert m-7"
          alt="Void logo"
          src={'/icons/logo_icon.svg'}
          height={200}
          width={200}
        ></Image>
        <span className="text-white text-7xl font-bold">Void</span>
      </div>
      <div className="flex flex-col items-center w-full max-w-md mx-auto mt-10 gap-6 px-10">
        <span className="text-4xl font-bold mb-4">Sign In</span>

        {/* Username */}
        <div className="w-full h-15 rounded-xl bg-gray-200 flex px-6 items-center">
          <Image
            alt="profile"
            src={'/icons/person_icon.svg'}
            width={25}
            height={25}
          />
          <div className="h-[50%] border border-gray-400 mx-6" />
          <input
            className="h-full text-xl flex-1 bg-transparent focus:outline-none"
            type="text"
            placeholder="Username or email"
          />
        </div>

        {/* Password */}
        <div className="w-full h-15 rounded-xl bg-gray-200 flex px-6 items-center">
          <Image
            alt="lock"
            src={'/icons/lock_icon.svg'}
            width={25}
            height={25}
          />
          <div className="h-[50%] border border-gray-400 mx-6" />
          <input
            className="h-full text-xl flex-1 bg-transparent focus:outline-none"
            type="password"
            placeholder="Password"
          />
        </div>

        {/* Sign in button */}
        <button className="w-40 h-15 bg-black rounded-xl mt-2">
          <span className="text-white text-xl font-bold">Sign in</span>
        </button>

        {/* Forgot password */}
        <button
          className="-mt-4 px-2 hover:underline underline-offset-2 bg-transparent rounded-lg text-gray-400 
  text-[15px] font-medium cursor-pointer transition-all duration-300 ease-in-out outline-none"
        >
          Forgot password?
        </button>

        {/* Divider */}
        <div className="w-full border border-gray-300 my-4" />

        {/* OAuth buttons */}
        <div className="flex flex-col gap-3 w-3/4">
          <div className="h-15 rounded-xl bg-gray-200 flex items-center justify-center">
            <Image
              alt="google"
              src={'/icons/google_icon.svg'}
              width={25}
              height={25}
            />
            <span className="pl-4 text-xl font-medium">
              Continue with Google
            </span>
          </div>
          <div className="h-15 rounded-xl bg-gray-200 flex items-center justify-center">
            <Image
              alt="apple"
              src={'/icons/apple_icon.svg'}
              width={25}
              height={25}
            />
            <span className="pl-4 text-xl font-medium">
              Continue with Apple
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center mt-6">
          <span>Not a member?</span>
          <button
            className="px-2 hover:underline underline-offset-2 bg-transparent rounded-lg text-gray-400 
    text-[15px] font-medium cursor-pointer transition-all duration-300 ease-in-out outline-none"
          >
            Sign up now
          </button>
        </div>
      </div>
    </div>
  );
}
