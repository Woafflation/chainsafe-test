import type { FC } from 'react'
import type { TableProps } from './types.ts'

import dayjs from 'dayjs'
import s from './Table.module.css'

const Table: FC<TableProps> = ({ data, loading }) => {
  if (!data.length) {
    return <div>No data</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <table className={s.table}>
      <thead>
        <tr>
          <th className={s.th}>Date</th>
          <th className={s.th}>Reason</th>
        </tr>
      </thead>
      <tbody>
        {data.map(({ date, title }) => (
          <tr key={title}>
            <td className={s.td}>{dayjs(date).format('YYYY-MM-DD')}</td>
            <td className={s.td}>{title}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
