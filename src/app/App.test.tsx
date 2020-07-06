import React from "react"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { App } from './App'
import userEvent from '@testing-library/user-event'


describe("The App component, when loaded, ", () => {
    it("says Hello, World", () => {
        const titleMatch = { name: /hello, world/i }

        const {debug} = render(<App/>)

        expect(screen.getByRole('heading', titleMatch)).toBeTruthy()
    })

    it("contains the task list", () => {
        const {debug} = render(<App/>)

        expect(screen.getByRole('heading', {name: /backlog/i })).toBeTruthy()
    })

    it("contains the task list", () => {
        const {debug} = render(<App/>)
        const testInput = "myItem";

        const input = screen.getByRole('textbox')

        userEvent.type(input, testInput)
        userEvent.click(screen.getByRole('button'))

        expect(screen.getByRole('listitem')).toBeTruthy()
    })
})