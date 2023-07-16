import clsx from 'clsx'

function Office({ name, children, invert = false }) {
  return (
    <address
      className={clsx(
        'text-sm not-italic',
        invert ? 'text-neutral-300' : 'text-neutral-600'
      )}
    >
      <strong className={invert ? 'text-white' : 'text-neutral-950'}>
        {name}
      </strong>
      <br />
      {children}
    </address>
  )
}

export function Offices({ invert = false, ...props }) {
  return (
    <ul role="list" {...props}>
      <li>
        <Office name="Martigny" invert={invert}>
          92, av. de la Fusion
          <br />
          1920 Martigny, Switzerland
        </Office>
      </li>
      <li>
        <Office name="Bishkek" invert={invert}>
          24 Lego Allé
          <br />
          720000 Bishkek, Kyrgyzstan
        </Office>
      </li>
    </ul>
  )
}
