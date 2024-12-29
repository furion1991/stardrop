import Image from 'next/image'

import classes from './SocialNetworksAuth.module.scss'

export const SocialNetworksAuth = () => {
  const socialNetworks = [
    {
      label: 'Телеграм',
      iconPath: '/social/white/telegram.svg'
    },
    {
      label: 'Вконтакте',
      iconPath: '/social/white/vk.svg'
    },
    {
      label: 'Яндекс',
      iconPath: '/social/white/yandex.svg'
    },
    {
      label: 'Steam',
      iconPath: '/social/white/steam.svg'
    },
    {
      label: 'Google',
      iconPath: '/social/white/google.svg'
    }
  ]

  return (
    <ul className={classes.socialNetworksAuth}>
      {socialNetworks.map(({ label, iconPath }) => {
        return (
          <li key={label}>
            <button type='button'>
              <Image src={iconPath} width={49} height={49} alt={label} />
            </button>
          </li>
        )
      })}
    </ul>
  )
}
