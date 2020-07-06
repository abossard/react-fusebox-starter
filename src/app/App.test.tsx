import React from "react"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { App } from './App'


describe("The App compontent, when loaded, ", () => {
    it("says Hello, World", () => {
        render(<App/>)
        expect(screen.getByRole('heading', { name: /hello, world/i })).toBeTruthy()
    })
})