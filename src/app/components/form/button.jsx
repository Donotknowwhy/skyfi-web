import clsx from 'clsx';

const Button = ( { onClick, disabled, label, Icon, type = "button", typeButton='primary', className } ) => {

	const typeButtonClass = {
		primary: 'bg-primary text-white hover:bg-primary/80',
		secondary: 'bg-secondary text-white hover:bg-secondary/80',
		tertiary: 'bg-tertiary text-white hover:bg-tertiary/80',
		outline: 'bg-white text-primary border border-primary hover:bg-primary/10',
		outlineSecondary: 'bg-white text-secondary border border-secondary hover:bg-secondary/10',
		outlineTertiary: 'bg-white text-tertiary border border-tertiary hover:bg-tertiary/10',
		ghost: 'bg-transparent text-primary hover:bg-primary/10',

	};

  return (
    <button
      onClick={ onClick }
		  className={ clsx( 'mt-4 sm:mt-5 md:mt-6 py-2.5 sm:py-3 px-4 sm:px-6 disabled:opacity-50 rounded-lg font-medium text-sm sm:text-base transition-colors w-full sm:w-auto',
		 typeButtonClass[ typeButton ], className ) }
      disabled={ disabled }
      type={ type }
    >
      { Icon ? <span className="icon">{ label }</span> : label }
    </button>
  )
}

export default Button