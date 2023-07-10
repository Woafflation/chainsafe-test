import type { FC } from 'react'
import type { ContentProps } from './types.ts'

import cx from 'classnames'
import s from './Content.module.css'

const Content: FC<ContentProps> = ({ children, showSidebar }) => {
  return <main className={cx(s.content, showSidebar && s.withSidebar)}>{children}</main>
}

export default Content
