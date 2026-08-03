'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { LoginType } from '../../[locale]/login/page';
import authService from '../../services/auth';
import { useLoad } from '../../utils/load';
import { showModalMess } from '../modals/modalMess';
import {trackLogin} from "@/app/utils/trackingHelper";

export default function VerificationPage() {
  const t = useTranslations( 'verification' );

  const [ timeLeft, setTimeLeft ] = useState( 60 ); // 1 minute countdown
  const [ isResending, setIsResending ] = useState( false );

  const { control, register, handleSubmit ,setValue} = useFormContext();
  const load = useLoad();

  const [ listActive, email ] = useWatch( {
    control,
    name: [ 'listActive', 'email' ]
  } );



  // Handle code input change
  const handleCodeChange = ( index, value ) => {
    if ( value.length <= 2 && /^\d*$/.test( value ) ) {
      const newCode = [ ...code ];
      newCode[ index ] = value;
      setCode( newCode );
    }
  };


  const resendCode = async () => {
    try {
      load.open();
      const res = await authService.checkEmail( email );
      if ( !res.success ) {
        return showModalMess( {
          label: 'Thông báo',
          message: res.message,
          type: 'error',
        } );
      }

      if ( res.data.check ) return;
      setValue( 'listActive', res.data.listActive );

    } finally {
      load.close();
    }

  };

  // Timer effect for code expiration
  useEffect( () => {
    if ( timeLeft <= 0 ) return;

    const timer = setTimeout( () => {
      setTimeLeft( timeLeft - 1 );
    }, 1000 );

    return () => clearTimeout( timer );
  }, [ timeLeft ] );

  // Handle resend code
  const handleResendCode = () => {
    setIsResending( true );
    setTimeout( () => {
      setTimeLeft( 60 ); // Reset timer
      setIsResending( false );
    }, 2000 );
    resendCode();
  };



  // Handle form submission
  const onSubmit = async ( data ) => {
    try {
      load.open();
      const res = await authService.verifyCode( email, data.verificationCode );
      trackLogin({
        login_method: 'email verifyCode',
        is_first_time: false,
        login_status: res.success,
        error_message: res.message
      }).catch(err => console.error('Track login error:', err));
      if ( !res.success ) {
        return showModalMess( {
          label: t('titleMadal'),
          message: t('errorMessage'),
          type: 'error',
          icon: '/assets/auth/qr-code.png',
          labelConfirm: t( 'tryAgainButton' ),
          onConfirm: () => {
            resendCode();
          }
        } );
      }

      setValue( 'status', LoginType.resetPassword );


    } finally {
      load.close();
    }

  };

  return (

    <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-10 flex flex-col items-center">
      <div className="mb-6">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="SkyFi Logo"
            width={ 120 }
            height={ 40 }
            priority
          />
        </Link>
      </div>

      {/* Title section */ }
      <div className="w-full flex flex-col items-center mb-6">
        <h1 className="text-3xl font-semibold text-[#333333] text-center">
          { t( 'title' ) }
        </h1>
        <p className="text-base font-medium text-[#5C5C5C] mt-3 text-center">
          { t( 'description', { email } ) }
        </p>
      </div>

      <form onSubmit={ handleSubmit( onSubmit ) } className="w-full flex flex-col items-center gap-6">
        {/* Code inputs */ }
        <div className="flex items-end justify-center gap-5 w-full py-3">
          { listActive && listActive.map( ( digit, index ) => (
            <label
              key={ index }
              className="w-[60px] relative h-[60px] cursor-pointer border border-[#DDDDDD] rounded-full flex items-center hover:scale-95  justify-center"
            >
              <input
                type="radio"
                name="verificationCode"
                { ...register( 'verificationCode' ) }
                className="w-full peer hidden h-full text-center bg-transparent text-[22px] font-semibold text-[#333333] focus:outline-none rounded-full"
                value={ digit }
              />

              <div className='w-full  flex justify-center items-center  peer-checked:text-neutral-50 peer-checked:bg-primary h-full text-center bg-transparent text-[22px] font-semibold text-[#333333] focus:outline-none rounded-full' >
                { digit }
              </div>


            </label>
          ) ) }
        </div>

        {/* Continue button */ }
        <button
          type="submit"
          className="w-full bg-[#E69818] text-white py-4 px-6 rounded-lg hover:bg-[#d48c16] transition-colors font-semibold text-lg"
        >
          { t( 'continueButton' ) }
        </button>

        {/* Resend code section */ }
        <div className="flex flex-row items-center justify-center gap-2">
          <p className="text-base text-[#333333]">{ t( 'noCodeReceived' ) }</p>
          <button
            type="button"
            onClick={ handleResendCode }
            disabled={ isResending || timeLeft > 0 }
            className={ `text-base font-semibold ${ isResending || timeLeft > 0 ? 'text-gray-400' : 'text-[#2F74FF] hover:text-[#1a5fd1]'
              }` }
          >
            { isResending
              ? t( 'resending' )
              : timeLeft > 0
                ? `${ t( 'resendCode' ) } (${ timeLeft }s)`
                : t( 'resendCode' ) }
          </button>
        </div>
      </form>
    </div>

  );
}
