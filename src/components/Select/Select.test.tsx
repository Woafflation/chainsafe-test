import { vi, describe } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'

import Select from './Select.tsx'

const options = [
  { title: 'Jan', value: '01' },
  { title: 'Feb', value: '02' },
  { title: 'Mar', value: '03' },
  { title: 'Apr', value: '04' },
  { title: 'May', value: '05' },
  { title: 'Jun', value: '06' },
  { title: 'Jul', value: '07' },
  { title: 'Aug', value: '08' },
  { title: 'Sep', value: '09' },
  { title: 'Oct', value: '10' },
  { title: 'Nob', value: '11' },
  { title: 'Dec', value: '12' },
]

describe('<Select />', () => {
  it('There must be attr [data-selected="true"] for placeholder', async () => {
    const handleChange = vi.fn()

    render(<Select options={options} onChange={handleChange} selected={options[0]} placeholder="placeholder" />)

    const placeholder = screen.queryByText(options[0].title)
    expect(placeholder).toHaveAttribute('data-selected', 'true')
  })
  it('There must be attr [data-selected="false"] for placeholder, if there is no selected value', async () => {
    const handleChange = vi.fn()

    render(<Select options={options} onChange={handleChange} selected={null} placeholder="placeholder" />)

    const placeholder = screen.queryByText('placeholder')

    expect(placeholder).toHaveAttribute('data-selected', 'false')
  })

  it('There must be attr [data-mode="rows"] for selectWrapper, if mode=rows', async () => {
    const handleChange = vi.fn()

    render(<Select options={options} onChange={handleChange} selected={null} placeholder="placeholder" mode="rows" />)

    const selectWrapper = screen.getByTestId('selectWrapper')
    expect(selectWrapper).toHaveAttribute('data-mode', 'rows')
  })
  it('There must be attr [data-mode="cells"] for selectWrapper, if mode=cells', async () => {
    const handleChange = vi.fn()

    render(<Select options={options} onChange={handleChange} selected={null} placeholder="placeholder" mode="cells" />)

    const selectWrapper = screen.getByTestId('selectWrapper')
    expect(selectWrapper).toHaveAttribute('data-mode', 'cells')
  })
  it('There must be attr [data-mode="rows"] for selectWrapper, if there is no mode', async () => {
    const handleChange = vi.fn()

    render(<Select options={options} onChange={handleChange} selected={null} placeholder="placeholder" />)

    const selectWrapper = screen.getByTestId('selectWrapper')
    expect(selectWrapper).toHaveAttribute('data-mode', 'rows')
  })

  it('There must be attr [data-status="default"] for placeholder, if there is "status: default"', async () => {
    const handleChange = vi.fn()

    render(<Select options={options} onChange={handleChange} selected={null} placeholder="placeholder" />)

    const placeholder = screen.queryByText('placeholder')
    expect(placeholder).toHaveAttribute('data-status', 'default')
  })
  it('There must be attr [data-status="invalid"] for placeholder, if there is "status: invalid"', async () => {
    const handleChange = vi.fn()

    render(
      <Select options={options} onChange={handleChange} selected={null} placeholder="placeholder" status="invalid" />,
    )

    const placeholder = screen.queryByText('placeholder')
    expect(placeholder).toHaveAttribute('data-status', 'invalid')
  })
  it('There must be attr [data-status="default"] for placeholder, if there is no status', async () => {
    const handleChange = vi.fn()

    render(<Select options={options} onChange={handleChange} selected={null} placeholder="placeholder" />)

    const placeholder = screen.queryByText('placeholder')
    expect(placeholder).toHaveAttribute('data-status', 'default')
  })

  it('There must be attr [data-is-active="true"] for selectWrapper on placeholder click', async () => {
    const handleSelect = vi.fn()

    render(
      <Select options={options} onChange={handleSelect} selected={null} placeholder="placeholder" status="invalid" />,
    )

    const placeholder = screen.getByText('placeholder')
    fireEvent.click(placeholder)

    const selectWrapper = screen.getByTestId('selectWrapper')

    expect(selectWrapper).toHaveAttribute('data-is-active', 'true')
  })
  it('There must be attr [data-is-active="false"](with open dropdown) for selectWrapper on placeholder click', async () => {
    const handleSelect = vi.fn()

    render(
      <Select options={options} onChange={handleSelect} selected={null} placeholder="placeholder" status="invalid" />,
    )

    const placeholder = screen.getByText('placeholder')
    fireEvent.click(placeholder)
    fireEvent.click(placeholder)

    const selectWrapper = screen.getByTestId('selectWrapper')
    expect(selectWrapper).toHaveAttribute('data-is-active', 'false')
  })

  it('On placeholder click dropdown should be opened', async () => {
    const handleSelect = vi.fn()

    render(
      <Select options={options} onChange={handleSelect} selected={null} placeholder="placeholder" status="invalid" />,
    )

    const placeholder = screen.getByText('placeholder')
    fireEvent.click(placeholder)

    const selectDropdown = screen.getByTestId('selectDropdown')
    expect(selectDropdown).toBeInTheDocument()
  })
  it('On placeholder click (with open dropdown) dropdown should be closed', async () => {
    const handleSelect = vi.fn()

    render(
      <Select options={options} onChange={handleSelect} selected={null} placeholder="placeholder" status="invalid" />,
    )

    const placeholder = screen.getByText('placeholder')
    fireEvent.click(placeholder)
    fireEvent.click(placeholder)

    const selectDropdown = screen.queryByTestId('selectDropdown')
    expect(selectDropdown).not.toBeInTheDocument()
  })
  it('On option click "onChange" should be emitted and dropdown should be closed', async () => {
    const handleSelect = vi.fn()

    render(
      <Select options={options} onChange={handleSelect} selected={null} placeholder="placeholder" status="invalid" />,
    )

    const placeholder = screen.getByText('placeholder')
    fireEvent.click(placeholder)

    const option = screen.getByText(options[0].title)
    fireEvent.click(option)

    const optionAfterClick = screen.queryByText(options[0].title)

    expect(optionAfterClick).not.toBeInTheDocument()
    expect(handleSelect).toHaveBeenCalledTimes(1)
  })
  it('On outside click "onClose" should be emitted and dropdown should be closed', async () => {
    const handleClose = vi.fn()

    render(
      <div>
        <div data-testid="1">outer element</div>
        <Select
          options={options}
          onChange={vi.fn()}
          onClose={handleClose}
          selected={null}
          placeholder="placeholder"
          status="invalid"
        />
      </div>,
    )

    const placeholder = screen.getByText('placeholder')
    fireEvent.click(placeholder)

    const outerElement = screen.getByTestId('1')
    fireEvent.click(outerElement)

    const option = screen.queryByText(options[0].title)

    expect(option).not.toBeInTheDocument()
  })
})
