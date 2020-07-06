import React from "react"
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import { App } from './App'


describe("The App component, when loaded, ", () => {
    it("says Hello, World", () => {
        const titleMatch = { name: /hello, world/i }

        render(<App/>)
        
        expect(screen.getByRole('heading', titleMatch)).toBeTruthy()
    })
})