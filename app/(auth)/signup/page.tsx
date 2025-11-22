'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import Link from 'next/link';

export default function SignUpPage() {
  const router = useRouter();
  const { register } = useAuthStore();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!formData.username || !formData.email || !formData.password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    const result = await register(
      formData.username,
      formData.email,
      formData.password
    );

    setLoading(false);

    if (result.success) {
      router.push('/home');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  return (
    <div className="rounded-xl bg-white h-180 w-250 flex">
      <div className="flex flex-col items-center w-full max-w-md mx-auto mt-15 gap-6 px-10">
        <span className="text-4xl font-bold mb-4">Sign Up</span>

        {error && (
          <div className="w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl text-sm">
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
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <div className="w-full h-15 rounded-xl bg-gray-200 flex px-6 items-center">
            <Image
              alt="mail"
              src={'/icons/mail_icon.svg'}
              width={25}
              height={25}
            />
            <div className="h-[50%] border border-gray-400 mx-6" />
            <input
              className="h-full text-xl flex-1 bg-transparent focus:outline-none"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
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
              {loading ? 'Loading...' : 'Sign up'}
            </span>
          </button>
        </form>

        <div className="w-full border border-gray-300" />

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

        <div className="flex items-center">
          <span>Already have an account?</span>
          <Link
            href="/login"
            className="px-2 hover:underline underline-offset-2 bg-transparent rounded-lg text-gray-400 
                text-[15px] font-medium cursor-pointer transition-all duration-300 ease-in-out outline-none"
          >
            Sign in
          </Link>
        </div>
      </div>

      <div className="flex-1 bg-black rounded-r-xl flex flex-col justify-center items-center">
        <Image
          className="invert m-7"
          alt="Void logo"
          src={'/icons/logo_icon.svg'}
          height={200}
          width={200}
        />
        <span className="text-white text-7xl font-bold">Void</span>
      </div>
    </div>
  );
}
