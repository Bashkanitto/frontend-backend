'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';

export default function SignInPage() {
  const router = useRouter();
  const { login } = useAuthStore();

  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.emailOrUsername || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    const result = await login(formData.emailOrUsername, formData.password);

    setLoading(false);

    if (result.success) {
      router.push('/home');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="rounded-xl bg-white h-180 w-250 flex">
      <div className="flex-1 bg-black rounded-l-xl flex flex-col justify-center items-center">
        <Image
          className="invert m-7"
          alt="Void logo"
          src={'/icons/logo_icon.svg'}
          height={200}
          width={200}
        />
        <span className="text-white text-7xl font-bold">Void</span>
      </div>

      <div className="flex flex-col items-center w-full max-w-md mx-auto mt-10 gap-6 px-10">
        <span className="text-4xl font-bold mb-4">Sign In</span>

        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
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
              value={formData.emailOrUsername}
              onChange={(e) =>
                setFormData({ ...formData, emailOrUsername: e.target.value })
              }
            />
          </div>

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
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-40 h-15 bg-black rounded-xl mt-2 hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="text-white text-xl font-bold">
              {loading ? 'Loading...' : 'Sign in'}
            </span>
          </button>
        </form>

        <button
          className="-mt-4 px-2 hover:underline underline-offset-2 bg-transparent rounded-lg text-gray-400 
  text-[15px] font-medium cursor-pointer transition-all duration-300 ease-in-out outline-none"
        >
          Forgot password?
        </button>

        <div className="w-full border border-gray-300 my-4" />

        <div className="flex flex-col gap-3 w-3/4">
          <button
            type="button"
            className="h-15 rounded-xl bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
          >
            <Image
              alt="google"
              src={'/icons/google_icon.svg'}
              width={25}
              height={25}
            />
            <span className="pl-4 text-xl font-medium">
              Continue with Google
            </span>
          </button>
          <button
            type="button"
            className="h-15 rounded-xl bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition"
          >
            <Image
              alt="apple"
              src={'/icons/apple_icon.svg'}
              width={25}
              height={25}
            />
            <span className="pl-4 text-xl font-medium">
              Continue with Apple
            </span>
          </button>
        </div>

        <div className="flex items-center mt-6">
          <span>Not a member?</span>
          <Link
            href="/signup"
            className="px-2 hover:underline underline-offset-2 bg-transparent rounded-lg text-gray-400 
    text-[15px] font-medium cursor-pointer transition-all duration-300 ease-in-out outline-none"
          >
            Sign up now
          </Link>
        </div>
      </div>
    </div>
  );
}
