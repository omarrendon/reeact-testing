import { render, screen } from "@testing-library/react";
import AsyncList from "../components/AsyncList";


describe('ASYNC TESTS', () => {
  test('Should be return de food data', async () => {
    render( <AsyncList />);
    const hamburger = await screen.findByText(/Hamburgesa/i);

    expect(hamburger).toBeInTheDocument();
  });
});