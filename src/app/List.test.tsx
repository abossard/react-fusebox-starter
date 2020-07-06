import React from "react"
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { List, ListAdder } from './List'


describe("A List, when rendered, ", ()=> {
    it("should display items.", () => {
        const props = {
            items: ["List Item 1"],
            onAdd: jest.fn()
        }

        render(<List {...props}></List>)

        expect(screen.getByRole('listitem')).toBeTruthy()
    })

    it("should display and information when empty.", () => {
        const props = {
            items: [],
            onAdd: jest.fn()
        }

        render(<List {...props}></List>)
        
        expect(screen.getByRole('heading', {name: /empty/i })).toBeTruthy()
    })

})

describe("A Item add, when rendered", () => {
    it("Should display an empty form with a button", () => {
        const callback = jest.fn()

        render(<ListAdder onAdd={callback}></ListAdder>)
        const input = screen.getByRole("textbox") as HTMLInputElement
        expect(input).toBeTruthy() 
        expect(input.value).toEqual("")
        expect(screen.getByRole("button")).toBeTruthy()
    })
    
    it("should call the callback on submit", () => {
        const callback = jest.fn()
        const testInput = "Hello, World"

        render(<ListAdder onAdd={callback}></ListAdder>)
        const input = screen.getByRole('textbox') as HTMLInputElement

        userEvent.type(input, testInput)

        expect(input.value).toBe(testInput);
        userEvent.click(screen.getByRole('button'))
        expect(input.value).toBe("");
        
        expect(callback).toBeCalledWith(expect.stringMatching(testInput))
    })
})