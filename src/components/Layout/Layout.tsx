import type { FC } from 'react'
import type { LayoutProps } from './types.ts'

import s from './Layout.module.css'

const Layout: FC<LayoutProps> = ({ children }) => <div className={s.layout}>{children}</div>

export default Layout
