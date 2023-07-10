import type { HolidaysAction, HolidaysState, SettingsAction, SettingsState } from './reducers/types.ts'
import type { TableData } from './components/Table/types.ts'

import { useCallback, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Layout from './components/Layout/Layout.tsx'
import Header from './components/Header/Header.tsx'
import Content from './components/Content/Content.tsx'
import Sidebar from './components/Sidebar/Sidebar.tsx'
import Table from './components/Table/Table.tsx'
import { settingsReducer } from './reducers/settings.reducer.ts'
import { holidaysReducer } from './reducers/holidays.reducer.ts'
import { useEnhancedReducer } from './hooks/useEnhancedReducer.ts'
import { getHolidaysMiddleware } from './middlewares/get-holidays.middleware.ts'

dayjs.extend(customParseFormat)

const initialSettingsState: SettingsState = {
  country: 'LT',
  language: 'EN',
  year: dayjs().format('YYYY'),
  month: dayjs().format('MM'),
}

const initialHolidaysState: HolidaysState = {
  holidays: [],
  loading: false,
}

const App = () => {
  const [showSidebar, setShowSidebar] = useState(true)
  const [holidaysState, dispatchHolidaysAction] = useEnhancedReducer<HolidaysState, HolidaysAction>(
    holidaysReducer,
    initialHolidaysState,
  )
  const [settingsState, dispatchSettingsAction] = useEnhancedReducer<SettingsState, SettingsAction>(
    settingsReducer,
    initialSettingsState,
    [getHolidaysMiddleware(dispatchHolidaysAction)],
  )

  const tableData = useMemo<TableData[]>(
    () => holidaysState.holidays?.map((el) => ({ date: el.startDate, title: el.name[0].text })) || [],
    [holidaysState],
  )

  const handleShowSidebar = useCallback(() => {
    setShowSidebar((prev) => !prev)
  }, [])

  return (
    <Layout>
      <Header showSidebar={showSidebar} handleShowSidebar={handleShowSidebar} />
      <Sidebar
        settingsState={settingsState}
        dispatchSettingsAction={dispatchSettingsAction}
        showSidebar={showSidebar}
      />
      <Content showSidebar={showSidebar}>
        <Table data={tableData} loading={holidaysState.loading || false} />
      </Content>
    </Layout>
  )
}

export default App
