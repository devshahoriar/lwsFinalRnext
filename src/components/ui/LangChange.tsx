'use client'

import { useChangeLocale, useCurrentLocale } from '@/src/locales/client'

const LangChange = () => {

  
  const changeLocale = useChangeLocale()
  const locale = useCurrentLocale()

  return (
    <select
      onChange={(e) => {
        changeLocale(e.target.value as "en" | "bn")
      }}
      name="lang"
      defaultValue={locale}
    >
      <option value="bn">BN</option>
      <option value="en">EN</option>
    </select>
  )
}

export default LangChange
