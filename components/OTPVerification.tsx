'use client'

import { useState } from 'react'
import { Mail, ArrowLeft } from 'lucide-react'

interface OTPVerificationProps {
  email: string
  onVerify: (otp: string) => void
  onBack: () => void
  isLoading: boolean
}

const OTPVerification = ({ email, onVerify, onBack, isLoading }: OTPVerificationProps) => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])

  const handleChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)

      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`)
        nextInput?.focus()
      }

      // Auto-submit when all fields are filled
      if (newOtp.every(digit => digit !== '') && newOtp.join('').length === 6) {
        onVerify(newOtp.join(''))
      }
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
      <button
        onClick={onBack}
        className="flex items-center text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </button>

      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
          <Mail className="h-8 w-8 text-primary-600 dark:text-primary-400" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">Verify Email</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Enter the 6-digit code sent to<br />
          <span className="font-medium">{email}</span>
        </p>
      </div>

      <div className="flex justify-center space-x-3 mb-8">
        {otp.map((digit, index) => (
          <input
            key={index}
            id={`otp-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-12 h-12 text-center text-xl font-bold border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-primary-500 focus:outline-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            maxLength={1}
          />
        ))}
      </div>

      <button
        onClick={() => onVerify(otp.join(''))}
        disabled={isLoading || otp.some(digit => digit === '')}
        className="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-primary-400 text-white py-3 rounded-lg font-semibold transition-colors"
      >
        {isLoading ? 'Verifying...' : 'Verify Code'}
      </button>
    </div>
  )
}

export default OTPVerification